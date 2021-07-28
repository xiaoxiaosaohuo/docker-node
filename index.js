const express = require("express");
const mongoose = require('mongoose');
const {MONGO_IP,MONGO_USER,MONGO_PASSWORD,MONGO_PORT}  = require('./config/config');
const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
console.log('mongo config',MONGO_IP,MONGO_USER,MONGO_PASSWORD,MONGO_PORT)
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
    .then(()=>console.log('链接mongodb成功'))
    .catch((e)=>console.log(e))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
});
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

app.get('/',(req,res)=>{
    res.send('<h1>hello world,it is new world 11</h1>')
})
const port  = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})