const User = require('../models/User')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const admin = require('firebase-admin')

module.exports = {
    createUser: async (req, res) =>{
        const user = req.body;
        
        try {
            await admin.auth().getUserByEmail(user.email);
            
            res.status(400).json({message: "Email already registered"})
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                try {
                    const userRespone = await admin.auth().createUser({
                        email: user.email,
                        password: user.password,
                        emailVerified: false,
                        disabled: false
                    })

                    console.log(userRespone.uid);
                    const newUser = new User({
                        username: user.username,
                        email: user.email,
                        password: CryptoJs.AES.encrypt(user.password, process.env.SECRET).toString(),
                        uid: userRespone.uid,
                        userType: 'Client'
                    })

                    await newUser.save()

                    res.status(201).json({status: true})
                } catch (error) {
                    res.status(500).json({status: false, error: "Error creating user"})
                }
            }
        }

    },
    
    loginUser: async (req, res) =>{
        try {
            const user = await User.findOne({email: req.body.email},{__v: 0, updatedAt: 0, createdAt: 0})
            !user && res.status(401).json("Wrong credentials")

            const decryptedpassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
            const decrypted = decryptedpassword.toString(CryptoJs.enc.Utf8);

            decrypted!== req.body.password && res.status(401).json("Wrong password")

            const userToken = jwt.sign({
                id: user._id, userType: user.userType,email: user.email,

            }, process.env.JWT_SEC, {expiresIn: '21d'});

            const{password, email, ...others} = user._doc;
            res.status(200).json({...others, userToken})



        } catch (error) {
            res.status(500).json({status: false, error: "err" })
            
        }
        
    }
}
