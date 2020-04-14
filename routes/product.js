const express = require('express')
const router = express.Router()
const getConnection = require('./mysqlconnection.js')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: 'false' }));
router.use(bodyParser.json());

// Gets one product by ID
router.get("/product/:id", (req, res) => {
    const productId = req.params.id
    const queryString = "SELECT * FROM product WHERE product_id = ?"
    getConnection().query(queryString, [productId], (err, rows, fields) => {
        if (err) {
            console.log("log --> Failed to query: /product/:id " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> SELECT: /product/:id fetched successfully")
        res.json(rows)
    })
})

// Gets all products
router.get("/products", (req, res) => {
    const queryString = "SELECT * FROM product"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("log --> Failed to query: /products " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> SELECT: /products fetched successfully")
        res.json(rows)
    })
})

// Create a new product
router.post("/productadd", (req, res) => {
    const product_name = req.body.product_name.toString();
    const product_desc = req.body.product_desc.toString();
    const product_img = req.body.product_img.toString();
    const fk_category_id = req.body.fk_category_id.toString();
    const queryString = "INSERT INTO `product` (product_name, product_desc, product_img, fk_category_id) VALUES (?, ?, ?, ?);"
    getConnection().query(queryString, [product_name, product_desc, product_img, fk_category_id], (err, results) => {
        if (err) {
            console.log("log --> Failed to query: /productadd " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> create new product: /productadd created successfully")
        res.end()
    })
})

// Edit a product
router.put("/productedit", (req, res) => {
    const product_id = req.body.product_id.toString();
    const product_name = req.body.product_name.toString();
    const product_desc = req.body.product_desc.toString();
    const product_img = req.body.product_img.toString();
    const fk_category_id = req.body.fk_category_id.toString();
    const queryString = "UPDATE product SET product_name = ?, product_desc = ?, product_img = ?, fk_category_id = ? WHERE product_id = ? ;"
    getConnection().query(queryString, [product_name, product_desc, product_img, fk_category_id, product_id], (err, results) => {
        if (err) {
            console.log("log --> Failed to query: /product_edit " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> edit product: /product_edit edited successfully")
        res.end()
    })
})

// Delete a product
router.delete("/productdelete/:id", (req, res) => {
    const product_id = req.params.id;
    const queryString = "DELETE FROM product WHERE product_id = ? ;"
    getConnection().query(queryString, [product_id], (err, results) => {
        if (err) {
            console.log("log --> Failed to query: /productdelete/:id " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> delete product: /productdelete/:id successfully")
        res.end()
    })
})

module.exports = router