const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:ZakD0iMDuPmOIeuU@cluster0.yoleh.mongodb.net/AWS?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("Database Connection Successfully....")
}).catch((e) => {
    console.log("Database Connection Error")
})
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:ZakD0iMDuPmOIeuU@cluster0.yoleh.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    console.log("Database Connection Successfully")
  const collection = client.db("test").collection("devices");
  client.close();
});*/