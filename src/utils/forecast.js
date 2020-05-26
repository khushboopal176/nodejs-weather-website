const request= require('request')


const forecast= (latitude , longitude, callback )=>{
    const url= 'https://api.darksky.net/forecast/0f57b003f73877198e92d19c545c924e/' + latitude + ',' + longitude

    request({ url, json: true}, (error, {body }) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined,  body.daily.data[0].summary +' It is currently ' + body.currently.temperature +' degrees out. The temperature high for the day is ' + body.daily.data[0].temperatureHigh + ' degrees. The temperature low for the day is ' + body.daily.data[0].temperatureLow +' degress. There is a '+  body.currently.precipProbability + ' % chance of rain.')
        }

    }) 
}

module.exports= forecast