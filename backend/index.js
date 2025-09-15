const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const db=require("./db")
db();



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello World");
})



app.use('/api', require('./routes/CreateUser'));


app.listen(port,()=>{
    console.log(`Example app lister on port ${port}`)
})