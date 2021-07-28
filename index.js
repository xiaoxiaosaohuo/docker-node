const express = require("express");
const mongoose = require('mongoose');
const {MONGO_IP,MONGO_USER,MONGO_PASSWORD,MONGO_PORT}  = require('./config/config');
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
console.log('mongo config',MONGO_IP,MONGO_USER,MONGO_PASSWORD,MONGO_PORT)



const connectWithRetry = ()=>{
    mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
    .then(()=>console.log('链接mongodb成功'))
    .catch((e)=>{
        console.log(e)
        setTimeout(connectWithRetry,5000)
    })
}
connectWithRetry();
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function() {
//   // we're connected!
// });
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('<h1>hello world,it is new world 11</h1>')
})
// 路由控制 localhost:3000/posts
// app.use("/posts",postRouter);

// localhost:3000/api/v1/posts
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/users",userRouter);

const port  = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})