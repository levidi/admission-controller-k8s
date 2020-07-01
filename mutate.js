const fs = require('fs');

const mutate = (req, res, next) => {

    const inject = fs.readFileSync('/configMap/inject.json').toString();

    const patchBase64 = Buffer.from(inject).toString("base64");

    const result = {
        response: {
            allowed: true,
            patch: patchBase64,
            patchType: "JSONPatch",
        }
    }
    res.send(result)
}

module.exports = mutate