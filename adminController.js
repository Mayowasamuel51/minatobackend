// const { validationResult } = require('express-validator')
// const Admin = require('../controller/adminController')
// const jwt = require('jsonwebtoken')


const databaseadmin = {
    email: "admin@gmail.com",
    password: "123456"
}


// password might be changed in the future by the owner of to, also creating a admin creation 

// this funtion called login will login the admin user into the admin dashboard 
const login = async (req, res, next) => {
    let loadedAmin;
    try {
        const { password, email } = req.body;
        if (databaseadmin.password === password && databaseadmin.email === email) {
            loadedAmin = {
                email: email,
                password: password
            }
           
            res.status(201).json({
                response: loadedAmin,
                message:'welcome!!!!'
            })
    
        }
        else {
            res.status(422).json({
                message:'no details please contact admin',
                response: 'no details please contact admin'
            })
    
        }
       
       
    } catch (er) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}
module.exports = {
    login
}



// console.log('password is not good ')
            // // throw error 
            // const error = new Error("worng details  !!!!!")
            // error.statusCode = 422;
            // throw error