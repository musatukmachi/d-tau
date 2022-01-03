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

document.querySelector('.cm').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=classical+mechanics');
});

document.querySelector('.thermo').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=thermodynamics');
});

document.querySelector('.wave').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=wave+theory');
});

document.querySelector('.sr').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=special+relativity');
});

document.querySelector('.fm').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=fluid+mechanics');
});

document.querySelector('.em').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=electromagnetism');
});

document.querySelector('.grav').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=gravitation');
});

document.querySelector('.opt').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=optics');
});

document.querySelector('.qm').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=quantum+mechanics');
});

document.querySelector('.pp').addEventListener("click", () =>
{
    httpGet('http://localhost:3000/equations?branch=particle+physics');
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