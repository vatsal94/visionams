const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const saltRounds = 10
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./config')

var usertoken = ""

require("./src/db/conn")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'templates/views'))
hbs.registerPartials(path.join(__dirname, 'templates/partials'))

const UserDetails = require('./src/models/user')

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/Register', (req, res) => {
    res.render("register")
})

app.post('/Register', (req, res) => {

    if(req.body.pass == req.body.re_pass)
    {
        try{
            const hashpassword = ""
            bcrypt.genSalt(saltRounds,(err, salt) => {
                if(err) {
                    throw err
                }
                else {
                    bcrypt.hash(req.body.pass, salt, async (err, hash) => {
                        if(err) {
                            throw err
                        } else {
                            const NewUser = new UserDetails({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                usertype: "Teacher"
                            })
                
                            const SaveUserData = await NewUser.save()
                            res.render("login")
                        }
                    })
                }
            })
        }
        catch (e) {
            res.render('Register',{ErrorMsg: [{Msg:"Something go wrong.. please try again"}]})
        }
    }
    else
    {
        res.render('Register',{ErrorMsg: [{Msg:"Password And Repeat Password Are Not Match..."}]})
    }
})

app.get('/Login', (req,res) => {
    res.render("login")
})

app.post('/Login', (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
            console.log("Wrong")
        } else {
            UserDetails.find({email:req.body.your_email},(e, data) => {
                if(data[0].status == true)
                {
                    if(bcrypt.compareSync(req.body.your_pass,data[0].password))
                    {
                        const duser = {
                            id:data[0]._id,
                            type:data[0].usertype
                        }

                        jwt.sign(duser, 'secret', async function(err, token) {
                            res.cookie("Authorization", token)
                            res.redirect('Dashboard')
                        });
                    } else {
                        res.render('Login',{ErrorMsg: [{Msg:"Your password must be wrong..."}]})
                    }
                } else {
                    res.render('Login',{ErrorMsg: [{Msg:"Your account not activate yet..."}]})
                }
            })
        }
    })
})

app.get('/Dashboard',verifyToken, (req,res) => {
    jwt.verify(req.token, 'secret', (err,autuData) => {
        if(err) throw err
        //res.json(autuData)
    })
    res.render("dashboard")
})

function verifyToken(req, res, next){
    const bearerTokenHeader = req.cookie["authorization"]
    if(typeof bearerTokenHeader !== 'undefined'){
        req.token = bearerTokenHeader
        next()
    }
    else
    {
        res.sendStatus(403)
    }
}

app.listen(8080)