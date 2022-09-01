const axios= require('axios')

const getTempOfLondon= async function(req, res){
    try {
        let city= req.query.q
        let key= req.query.appid
        let options= {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        }
        let result= await axios(options)
        console.log(result.data)
        res.status(200).send({city: result.data.name, temp: result.data.main.temp})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

const getTempOfCities= async function(req, res){
    try {
        let cities= ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArr= []
        for(i = 0 ; i < cities.length ; i++){
            let obj= {city: cities[i]}
            let options= {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=ac34d00004653429d538ce42006c9a90`
            }
            let resp= await axios(options)
            console.log(resp.data.main.temp)
            obj.temp= resp.data.main.temp
            cityObjArr.push(obj)
        }
        let sorted= cityObjArr.sort(function(a, b){return a.temp - b.temp})
        console.log(sorted)
        res.status(200).send({status: true, data: sorted})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports.getTempOfLondon= getTempOfLondon
module.exports.getTempOfCities= getTempOfCities