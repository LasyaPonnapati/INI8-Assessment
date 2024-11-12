const express = require("express");
const connectDB = require("./config/database");
const usersRouter = require("./routes/users");
const cors = require('cors');

const app = express();
 
app.use(cors());
app.use(express.json());  

app.use("/api/users",usersRouter);

connectDB().then(()=>{
console.log("db connected");
app.listen(3000,()=>{
    console.log("server running at port 3000");  
});
}).catch((err)=>{
console.error(err);
})