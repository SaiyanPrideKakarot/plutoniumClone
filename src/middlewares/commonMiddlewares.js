const validation = function (req, res, next) {
    let data = req.headers.isfreeappuser
    if (!data) {
        return res.send({ msg: "The request is missing a mandatory header" })
    } else {
        next()
    }
}

module.exports.validation = validation