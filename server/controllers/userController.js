const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtConvert = require('../helpers/jwtConvert')
const kue = require('kue')
const queue = kue.createQueue()

class UserController {
    static register (req,res) {
        console.log("masuk ke method register", req.body)
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: "user"
            })
            .then(newUser => {
                console.log("hasil create user===>", newUser)
                res.status(201).json(newUser)
                queue.create('welcome-newuser', {
                    data: newUser.email }).save()
            })
            .catch (err => {
                console.log("Terjadi error ===>", err.errors.email.message)
                if(err.errors.email) {
                    res.status(409).json(err)
                } else if (rr.errors.password) {
                    res.status(409).json(err)
                } else {
                    res.status(500).json(err)
                }
                
            })
    }
    
    static login (req,res) {
        if(req.body.loginVia == 'website') {
            console.log("Masuk ke login via website, input:", req.body)
            User
                .findOne({
                    email: req.body.email
                })
                .then(user => {
                    if(!user) {
                        res.status(400).json({
                            message: `Wrong Email/Password`
                        })
                    } else {
                        console.log("User berhasil ditemukan ====>", user)
                        let isValid = bcrypt.compareSync(req.body.password, user.password)
                        console.log("Cek validity", isValid)
                        if(isValid) {
                            let token = jwtConvert.sign({email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                token: token,
                                id: user._id,
                            })
                        } else {
                            res.status(400).json({
                                message: 'Wrong Email/Password'
                            })
                        }
                    }

                })
        } else if (req.body.loginVia == 'google') {

        }

    }
}

module.exports = UserController;