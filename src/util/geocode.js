const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZmFodTI2IiwiYSI6ImNrOTNvOTJxajAzd3YzZ296OWNoYjR1dmkifQ.LKeTP2voRgLB9O0r7TQTxg'
    request({url,json:true,rejectUnauthorized: false},(error,{body}) =>{
        if(error){
            callback('Unable to connect to location service',undefined)
        }
        else if(body.features.length === 0){
            callback("Unable to find the location provided. Kindly try other location",undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode