const fs = require('fs');
const path = require('path');

module.exports = {
    // read file
    readProps: () =>
    {
        const data = fs.readFileSync(path.join(__dirname, '/data/properties.json'));
        return JSON.parse(data);
    },
    readEqs: () =>
    {
        const data = fs.readFileSync(path.join(__dirname, '/data/equations.json'));
        return JSON.parse(data);
    },
    // write file
    writeProps: (json) =>
    {
        fs.writeFileSync(path.join(__dirname, '/data/properties.json'), JSON.stringify(json, null, 2));
    },
    writeEqs: (json) =>
    {
        fs.writeFileSync(path.join(__dirname, '/data/equations.json'), JSON.stringify(json, null, 2));
    },
    // utils
    getMaxCount: (json) =>
    {
        const keys = Object.keys(json);
        const last = keys[keys.length-1];
        const arr = json[last];
        const maxCount = arr[arr.length-1].id;
        return maxCount;
    },
    loopThroughAllProps: (json) =>
    {
        let count = 0;
        for (let key in json)
        {
            for (let i = 0; i < json[key].length; i++)
            {
                let prop = json[key][i];
                // do something
            }
        }
    },
    // create new property/equation
    createProp: (json, group, item) =>
    {
        const maxCount = getMaxCount(json);
        const nItem = {
            "id": maxCount+1,
            ...item
        }
        json[group].push(nItem);
    },
    createEq: (json, branch, latex, arr) =>
    {
        if (!json[branch]) json[branch] = [];
        json[branch].push({latex, arr});
    }
}