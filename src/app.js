
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast= require('./utils/forecast')
const geocode= require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const PublicDirPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const PartialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine' , 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(PartialsPath)

// Setup static directory to serve
app.use(express.static(PublicDirPath))

app.get('', (req,res) =>  {

    res.render('index' , {
        title : 'Weather App',
        name : 'Khushboo'
    })

})

app.get('/about' , (req,res) =>{
    res.render('about' ,{
        title: 'About Me' ,
        name: 'Khushboo'
    })
})

app.get('/help' , (req,res) =>{
    res.render('help' ,{
        helpText: 'This is some helpful text.',
        title: 'Help' ,
        name: 'Khushboo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address/location'
        })
     }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) =>{
    if(error){
        return res.send({error})
    }
   forecast(latitude, longitude, (error, ForecastData) => {
        if(error){
            return res.send({error})
        }

        res.send(
        {
            forecast : ForecastData,
            location,
            address : req.query.address
        })
     })
    }) 
})

app.get('/products' , (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send(
        {
            products:[]
        }
    )
})

app.get('/help/*' , (req,res) => {
    res.render('404' , {
        errorMessage : 'Help page not found',
        name : 'Khushboo',
        title : '404'
    })
})

app.get('*' , (req,res)=> {
    res.render('404' , {
        errorMessage : 'Page not found',
        name : 'Khushboo',
        title : '404'
    })
})
app.listen(port, () =>{
    console.log('Server is up at port ' + port)
})