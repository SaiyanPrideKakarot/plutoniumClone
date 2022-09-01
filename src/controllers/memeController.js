const axios = require('axios')

const createDrakeMeme = async function (req, res) {
    try {
        let memeId = req.query.template_id
        let upperText = req.query.text0
        let lowerText = req.query.text1
        let username = req.query.username
        let pass = req.query.password
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${memeId}&text0=${upperText}&text1=${lowerText}&username=${username}&password=${pass}`
        }
        let result= await axios(options)
        res.status(200).send({data: result.data.data})
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports.createDrakeMeme= createDrakeMeme