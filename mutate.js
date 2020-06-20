const mutate = (req, res, next) => {

    const authz_container = {
        "image": "leviditomazzo/authz:v1",
        "name": "authz",
        "ports": [{
            "containerPort": 50051
        }]
    }

    const label = {
        "op": "add",
        "path": "/metadata/labels/securityTypeInBound",
        "value": "enable"
    }

    const container = {
        "op": "add",
        "path": "/spec/containers/-",
        "value": authz_container,
    }

    const patch = [label, container]

    const patchBase64 = Buffer.from(JSON.stringify(patch)).toString("base64");

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