//admin 
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/sign-up", async (req, res) => {
    try{
        const { username, email, password, address } = req.body;

        if(username.length <4)
        {
            return res.status(400).json({ message: "Username lenght should be greater than 3." });
        }

        const existingUsername = await User.findOne({ username: username });
        if(existingUsername)
        {
            return res.status(400).json({ message: "Username already taken."})   
        }

        const existingEmail = await User.findOne({ email: email });
        if(existingEmail)
        {
            return res.status(400).json({ message: "Email already taken."})   
        }

        if(password.length <=5)
        {
            return res.status(400).json({ message: "Password length should be greater than 5." });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User ({ 
            username: username,
            email: email, 
            password: hashPass, 
            address: address, 
        });
        await newUser.save();
        return res.status(200).json({ message: "SignUp Successfull." });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error." });
    }
});

router.post("/sign-in", async (req, res) => {
    try{
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser)
        {
            res.status(400).json({ mesaage: "Invalid Credentials."});
        }

        await bcrypt.compare( password, existingUser.password, (err, data) => {
        if(data) {
            const authClaims = [
                { name: existingUser.username },
                { role: existingUser.role },
            ];            
            const token = jwt.sign({ authClaims }, "Hamro Book Pasal" , {
            expiresIn: "30d",
        });
        
            res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
        }
        else {
            res.status(500).json({ message: "Invalid Credentials." });
        }
        });
    }catch(error){
        res.status(400).json({ message: "Internal Server Error." });
    }
});

router.get("/get-user-information",  authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({ message: "Internal Server Error." });
    }
});

router.put("/update-address", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate( id, { address: address });
        return res.status(200).json({ message: "Address Updated Successfully." });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error." });
    }
});

module.exports = router;