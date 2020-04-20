//libraries added
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

//app initialized
const app = express()

//paths defined
const staticFilePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//handlebar cofiguration
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static content defination
app.use(express.static(staticFilePath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather'
        
        ,
        name: 'Fahim Shaikh',
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'Fahim Shaikh',
    })
})


app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help',
        msg: 'Thank you for contacting us!!',
        name: 'Fahim Shaikh',

    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide address value in query string'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, place_name} ={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,{weather}) =>{
            if(error){
                return res.send({error})
            }

        res.send({
        forecast: weather[0],
        location: place_name,
        address: req.query.address,
    })

    })
})




    // res.send({
    //     forecast: "Sunny",
    //     location: "Mumbai,India",
    //     address: req.query.address,
    // })
})

app.get('/help/*',(req,res) =>{
    res.render('error',{
        title: 'Error 404',
        errorMsg: 'Page you are looking under Help section does not exist',
        name: 'Fahim Shaikh'
    })
})

app.get('*',(req,res) =>{
    res.render('error',{
        title: 'Error- 404',
        errorMsg: 'Page not found',
        name: 'Fahim Shaikh'
    })
})

app.listen(8080,() =>{
    console.log("Listening on port 8080")
})

// console.log(staticFilePath+"\\help.html")

// app.get('/help',(req,res) =>{
//     res.send(app.use(express.static(staticFilePath+"\\help.html")))
// })

// app.get('/about',(req,res) =>{
//     res.send("<h1>About</h1>")
// })