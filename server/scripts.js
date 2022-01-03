module.exports = {
    generateUnits: (json) =>
    {
        const variables = json["variables"];
        const firstID = variables[0]["id"];
        const composedUnits = [];

        for (let i = 0; i < 3; i++)
        {
            composedUnits.push(firstID + Math.floor(Math.random() * variables.length));
        }
        console.log(composedUnits);
    }
}