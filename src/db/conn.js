const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/AMS',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("Database Connection Successfully....")
}).catch((e) => {
    console.log("Database Connection Error")
})