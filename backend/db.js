const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebookDB";

const connectTomongoose=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connect to mongoose sucessfully");
    })
}

module.exports = connectTomongoose;

