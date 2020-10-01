const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
console.log(__dirname)
//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)

hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hanu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hanu'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Hanu',
        helpText: 'This is help message'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send('Please provide the search text')
    }
    
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide the location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, retValue) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: retValue,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hanu',
        message: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hanu',
        message: 'Page not found'
    })
})
app.listen(3000, () =>{
    console.log('Server is up in port 3000.')
})