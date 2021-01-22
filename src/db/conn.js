const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:root@cluster0.yoleh.mongodb.net/Cluster0?retryWrites=true&w=majority',{
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
const uri = "";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});*/