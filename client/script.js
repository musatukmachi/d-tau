var content = document.querySelector('textarea');
var options = document.querySelector('.options');
options.style.display = 'none';
var latexDiv = document.querySelector('.latex-equations');

httpGet = (url) => {
    content.value = '';
    options.style.display = 'none';
    fetch(url, {
        method: 'GET'
    })
    .then(res => res.json())
    .then((res) =>
    {
        content.value += JSON.stringify(res, null, 2);
        latexDiv.innerHTML = '';
        if (Array.isArray(res))
        {
            for (let i = 0; i < res.length; i++)
            {
                let eq = res[i]["latex"];
                latexDiv.innerHTML += '<p>$$ ' + eq + ' $$</p>';
            }
            MathJax.typesetPromise();
            console.log(res.length); // num of eqs
        }
        else
        {
            let count = 0; // to remove
            for (let key in res)
            {
                let arr = res[key];
                for (let i = 0; i < arr.length; i++)
                {
                    let eq = null;
                    if (arr[i]["latex"]) eq = arr[i]["latex"];
                    else eq = arr[i]["symbol"];
                    latexDiv.innerHTML += '<p>$$ ' + eq + ' $$</p>';
                    count++
                }
            }
            MathJax.typesetPromise();
            console.log(count); // nm of eqs
        }
    });
}

httpPost = (url, body) => {
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(res => res)
    .then((res) =>
    {
        console.log('success');
    });
}

// create eventListeners for routes
(() => 
{
    const routes = {
        '.prop-all': 'properties',
        '.eq-all': 'equations',
        '.cm': 'equations?branch=classical+mechanics',
        '.thermo': 'equations?branch=thermodynamics',
        '.wave': 'equations?branch=wave+theory',
        '.sr': 'equations?branch=special+relativity',
        '.fm': 'equations?branch=fluid+mechanics',
        '.em': 'equations?branch=electromagnetism',
        '.grav': 'equations?branch=gravitation',
        '.opt': 'equations?branch=optics',
        '.qm': 'equations?branch=quantum+mechanics',
        '.pp': 'equations?branch=particle+physics'
    }
    for (let className in routes)
    {
        document.querySelector(className).addEventListener("click", () => httpGet('http://localhost:3000/' + routes[className]));
    } 
})();

document.querySelector('.eq-add').addEventListener("click", () =>
{
    const template = {
        "branch": "",
        "latex": "",
        "arr": []
    }
    content.value = JSON.stringify(template, null, 2);
    options.style.display = 'block';
});

document.querySelector('.submit').addEventListener("click", () =>
{
    let body = content.value;
    body = body.replace(/\\/g, "\\\\");
    httpPost('http://localhost:3000/addEq', body);
});