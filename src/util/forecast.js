const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url  = "http://api.weatherstack.com/current?access_key=ad41b3eecc6ac548df6e7a34f895956c&query="+latitude+","+longitude
    
    request({url,json: true,rejectUnauthorized: false}, (error,{body}) =>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        }
        else if(body.error){
            callback("Bad Request for weather service, Please try with other input",undefined)
        }
        else{
           callback(undefined,{
               weather: body.current.weather_descriptions,
               temperature: body.current.temperature,
               feelslike: body.current.feelslike,
           })
        }
    
    })
    }
    
module.exports = forecast