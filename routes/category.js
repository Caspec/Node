const express = require('express')
const router = express.Router()
const getConnection = require('./mysqlconnection.js')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: 'false' }));
router.use(bodyParser.json());

// Gets one category by ID
router.get("/category/:id", (req, res) => {
    const categoryId = req.params.id
    const queryString = "SELECT * FROM category WHERE category_id = ?"
    getConnection().query(queryString, [categoryId], (err, rows, fields) => {
        if (err) {
            console.log("log --> Failed to query: /category/:id " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> SELECT: /category/:id fetched successfully")
        res.json(rows)
    })
})

// Gets all categories
router.get("/categories", (req, res) => {
    const queryString = "SELECT * FROM category"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("log --> Failed to query: /category " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> SELECT: /category fetched successfully")
        res.json(rows)
    })
})

module.exports = router