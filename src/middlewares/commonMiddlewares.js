const moment = require('moment')

const assignment = function (req, res, next) {
    console.log(moment().format('YYYY-MM-DD HH:MM:SS'),",", req.ip, ",", req.path);
    next()
}

module.exports.assignment = assignment

// MMMM Do YYYY h:mm:ss a