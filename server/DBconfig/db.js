const mongoose = require('mongoose')
require('dotenv').config(); 
const connectDB = async() =>{
    console.log("MONGO_URI from env:", process.env.MONGO_URI);

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected Successfully");
    }
    catch(err){
        console.error("DB connection failed due to ",err);
        process.exit(1);
    }
};
module.exports = connectDB;
if (require.main === module) {  
  connectDB();
}