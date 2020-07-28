const k8s = require('./k8s')

const mutate = async (req, res, next) => {

    let patchBase64
    try {

        const appName = req.body.request.object.metadata.labels.app
        const namespace = req.body.request.namespace
        const configMapName = `${namespace}-${appName}-security`

        const configMap = await k8s.getConfigmap(namespace, configMapName)

        if (configMap && configMap.statusCode != 200) {
            await k8s.createConfigmap(namespace, configMapName)
        }

        const volume = {
            op: "add",
            path: "/spec/volumes/-",
            value: {
                name: "authz-config-map",
                configMap: {
                    name: configMapName
                },
            },
        }

        const container = {
            op: "add",
            path: "/spec/containers/-",
            value: {
                image: "leviditomazzo/authz:v1",
                name: "authz",
                env: [{
                    name: "PATH_CONFIG_MAP",
                    value: "./configMap"
                }],
                ports: [{
                    containerPort: 50051
                }],
                volumeMounts: [{
                    mountPath: "/configMap",
                    name: "authz-config-map",
                }]
            }
        }

        const inject = JSON.stringify([container, volume])
        console.log("INJECT: ", inject)
        patchBase64 = Buffer.from(inject).toString("base64");
        const result = {
            response: {
                allowed: true,
                patch: patchBase64,
                patchType: "JSONPatch",
            }
        }
        res.send(result)
    } catch (error) {
        console.log(error)
        const result = {
            response: {
                allowed: false,
                patch: patchBase64,
                patchType: "JSONPatch",
            }
        }
        res.send(result)
    }
}

module.exports = mutate