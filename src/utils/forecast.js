const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7701151177a72be15f90c991086af2be&query=' + latitude + ','+ longitude + '&units=f'

    request({url, json:true}, (error, {body}) => {
        const res_error = body.error
        if(error){
            callback('Unable to connect Weather Service!', undefined)
        }else if(res_error){
            callback('Unable to find the location!', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out there.')
        }
    } )
}

module.exports = forecast