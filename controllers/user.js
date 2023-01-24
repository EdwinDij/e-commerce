const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const  User  = require('../models/user.js')

exports.signup = (req, res, next) => {
    if(req.body.password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = ({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hash
            })
            User.create(user)
                .then(() => res.status(201).json({ message: 'User created' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ where: {email: req.body.email} })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'User not found' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Incorrect password' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN,
                            {
                                expiresIn: '24h'

                            }),
                            message: 'User found'
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}