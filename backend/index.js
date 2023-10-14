const connectTomongoose = require('./db');
const express = require('express');
var cors = require('cors')
connectTomongoose();

const app = express();


app.use(cors())
app.use(express.json())
//Available routes

app.use('/auth',require('./routes/auth'))
app.use('/note',require('./routes/note'))

app.get('/',function(req,res){
    res.send("hello");
})


app.listen(5000,function(){
    console.log("Connected to server at port 3000!");
})
