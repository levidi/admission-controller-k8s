const mutate = (req, res, next) => {
    console.log(req.body)
    console.log(req.body.request)
    let adminResp = {
        response: {
            allowed: true,
            patch: Buffer.from("[{ \"op\": \"add\", \"path\": \"/metadata/labels/foo\", \"value\": \"bar\" }]").toString('base64'),
            patchType: "JSONPatch",
        }
    }
    console.log(adminResp)
    res.send(adminResp)
}

module.exports = mutate