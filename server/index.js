const express = require('express');
const path = require('path');
const bp = require('body-parser');
const crud = require('./crud');
const app = express();
const port = 3000;

// req.body configs
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/')));

// get all
app.get('/properties', (req, res) =>
{
    const json = crud.readProps();
    res.send(json);
});

app.get('/equations', (req, res) =>
{
    const json = crud.readEqs();
    res.send(json);
});

// add equation
app.post('/addEq', (req, res) =>
{
    let { branch, latex, arr } = req.body;
    console.log(latex);
    if (!branch) branch = 'unassigned';
    const json = crud.readEqs();
    crud.createEq(json, branch, latex, arr);
    crud.writeEqs(json);
    res.send('success');
});

app.listen(port, () =>
{
    console.log(`listening on port http://localhost:${port}`);
});