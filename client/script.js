var content = document.querySelector('textarea');
var options = document.querySelector('.options');
options.style.display = 'none';

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

document.querySelector('.prop-all').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/properties');
});

document.querySelector('.eq-all').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations');
});

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