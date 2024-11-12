const express = require("express");
const User = require("../models/user"); 

const usersRouter = express.Router();

//add user details - signup
usersRouter.post("/signup", async (req, res) => {
    try {
      const { name, emailId, password, DOB } = req.body;

      if (!name || !emailId || !password || !DOB) {
        return res.status(400).json({ message: "Name, emailId, DOB and password are required to sign up!" });
      }
  
      const user = new User({ name, emailId, password, DOB });

      const isUserAlreadyExist = await User.findOne({ emailId: emailId });
      if (isUserAlreadyExist) {
        return res.status(400).json({ message: "Email already exists!" });
      }

      await user.save();
  
      const userResponse = { name: user.name, emailId: user.emailId };
      res.status(200).json({ message: "User added successfully!", user: userResponse });

    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ message: "Email already exists!" });
      } else {
        res.status(500).json({ message: `Something went wrong! ${err.message}` });
      }
    }
  });
  

//login user
usersRouter.post('/login',async(req,res)=>{
    try {
    const {emailId, password} = req.body;
    if (!emailId || !password) {
        throw new Error("Email and password are required");
    }
    const user = await User.findOne({emailId: emailId});
    if(!user){
        throw new Error("User not found");
    }
    const isMatch = password === user.password;
    if(!isMatch){
        throw new Error("Invalid credentials");
    }
    const userResponse = {
        name: user.name,
        emailId: user.emailId
    }
    res.status(200).json({message:"Login successful", user: userResponse});
    }catch(err){
        res.status(500).json({message: `something went wrong! ${err.message}`});
    }
});

//update user details

usersRouter.put("/update", async (req, res) => {
    try {
        const emailId = req.body.emailId;
        const user = await User.findOne({ emailId: emailId });
        user.name = req.body.name;
        user.password = req.body.password;
        user.DOB = req.body.DOB;
        user.dpURL = req.body.dpURL;
        await user.save();  

        res.status(200).json({ message: "User updated successfully!", user });
    } catch (err) {
        res.status(500).json({ message: `Something went wrong! ${err.message}` });
    }
});

//delete user
usersRouter.delete("/delete", async (req, res) => {
    try {
        const emailId = req.body.emailId;
        await User.findOneAndDelete({ emailId: emailId });

        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: `Something went wrong! ${err.message}` });
    }
});

//get logged in user
usersRouter.get("/loggedInUser", async (req, res) => {
    try {
        const { emailId } = req.query; 
        if (!emailId) {
            return res.status(400).json({ message: "Email ID is required" });
        }
        const user = await User.findOne({ emailId: emailId }).select('name password DOB dpURL');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Something went wrong! ${err.message}` });
    }
});



//get all users
usersRouter.get("/allUsers", async (req, res) => {
    try {
        const allUsers = await User.find({}).select('name emailId DOB dpURL');
        res.status(200).json({ users: allUsers });
    } catch (err) {
        res.status(500).json({ message: `Something went wrong! ${err.message}` });
    }
});


module.exports = usersRouter;