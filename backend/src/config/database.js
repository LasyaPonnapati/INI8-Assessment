const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://lasyaponnapati:qvSpnQh0WFXt7mQt@cluster1.ivzri.mongodb.net/IVI8");
}

module.exports = connectDB;