const express = require('express')
const router = express.Router()
const getConnection = require('./mysqlconnection.js')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: 'false' }));
router.use(bodyParser.json());

// login for hotel
router.post("/login", (req, res) => {
    const useremail = req.body.user_email.toString();
    const password = req.body.user_password.toString();
    if(useremail && password) {
    const queryString = "SELECT * FROM user WHERE user_email = ? AND user_password = ?"
    getConnection().query(queryString, [useremail, password], (err, results, fields) => {
        if(results.length > 0) {
            console.log("log --> login hotel admin: /login successfully... user found in DB")
            res.sendStatus(200)
        }
        else{
            console.log("log --> User does not exist")
            res.sendStatus(404)
        }
        if (err) {
            console.log("log --> Failed to query: /login " + err)
            res.sendStatus(500)
            return
        }
        res.end()
    })
    }
    else 
    {
        console.log("log --> login admin: /login please enter username and password correct")
        res.sendStatus(404)
    }
})


module.exports = router