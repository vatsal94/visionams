const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 8000

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'templates/views'))
hbs.registerPartials(path.join(__dirname, 'templates/partials'))

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/Register', (req, res) => {
    res.render("register")
})

app.get('/Login', (req,res) => {
    res.render("login")
})

app.listen(port)