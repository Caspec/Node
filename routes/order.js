const express = require('express')
const router = express.Router()
const getConnection = require('./mysqlconnection.js')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: 'false' }));
router.use(bodyParser.json());

// Gets one orders by ID
router.get("/orders/:id", (req, res) => {
    const ordersId = req.params.id
    const queryString = "SELECT * FROM orders WHERE orders_id = ?"
    getConnection().query(queryString, [ordersId], (err, rows, fields) => {
        if (err) {
            console.log("log --> Failed to query: /orders/:id " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> SELECT: /orders/:id fetched successfully")
        res.json(rows)
    })
})

// Gets all orders
router.get("/orders", (req, res) => {
    const queryString = "SELECT * FROM orders"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("log --> Failed to query: /orders " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> SELECT: /orders fetched successfully")
        res.json(rows)
    })
})

// Create a new orders
router.post("/ordersadd", (req, res) => {
    const orders_msg = req.body.orders_msg.toString();
    const orders_firstname = req.body.orders_firstname.toString();
    const orders_lastname = req.body.orders_lastname.toString();
    const orders_address = req.body.orders_address.toString();
    const orders_zipcode = req.body.orders_zipcode.toString();
    const orders_email = req.body.orders_email.toString();
    const orders_other = req.body.orders_other.toString();
    const orders_price = req.body.orders_price.toString();
    const orders_buydate = req.body.orders_buydate.toString();
    const orders_enddate = req.body.orders_enddate.toString();
    const orders_status = req.body.orders_status.toString();
    const orders_code = req.body.orders_code.toString();
    const orders_folio = req.body.orders_folio.toString();

    if(orders_other === "YES")
    {
        const orders_other_firstname = req.body.orders_other_firstname.toString();
        const orders_other_lastname = req.body.orders_other_lastname.toString();
        const orders_other_address = req.body.orders_other_address.toString();
        const orders_other_zipcode = req.body.orders_other_zipcode.toString();
        const orders_other_email = req.body.orders_other_email.toString();
        const queryString = "INSERT INTO `orders` (orders_msg, orders_firstname, orders_lastname, orders_address, orders_zipcode, orders_email, orders_other, orders_other_firstname, orders_other_lastname, orders_other_address, orders_other_zipcode, orders_other_email, orders_price, orders_buydate, orders_enddate, orders_status, orders_code, orders_folio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        getConnection().query(queryString, [orders_msg, orders_firstname, orders_lastname, orders_address, orders_zipcode, orders_email, orders_other, orders_other_firstname, orders_other_lastname, orders_other_address, orders_other_zipcode, orders_other_email, orders_price, orders_buydate, orders_enddate, orders_status, orders_code, orders_folio], (err, results) => {
            if (err) {
                console.log("log --> Failed to query: /ordersadd " + err)
                res.sendStatus(500)
                return
            }
            console.log("log --> create new orders: /ordersadd created successfully")
            res.end()
        })
    }
    else
    {
        const queryString = "INSERT INTO `orders` (orders_msg, orders_firstname, orders_lastname, orders_address, orders_zipcode, orders_email, orders_other, orders_price, orders_buydate, orders_enddate, orders_status, orders_code, orders_folio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        getConnection().query(queryString, [orders_msg, orders_firstname, orders_lastname, orders_address, orders_zipcode, orders_email, orders_other, orders_price, orders_buydate, orders_enddate, orders_status, orders_code, orders_folio], (err, results) => {
        if (err) {
            console.log("log --> Failed to query: /ordersadd " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> create new orders: /ordersadd created successfully")
        res.end()
    })
    }
})

// Edit a orders
router.put("/ordersedit", (req, res) => {
    const orders_id = req.body.orders_id.toString();
    const orders_msg = req.body.orders_msg.toString();
    const orders_firstname = req.body.orders_firstname.toString();
    const orders_lastname = req.body.orders_lastname.toString();
    const orders_address = req.body.orders_address.toString();
    const orders_zipcode = req.body.orders_zipcode.toString();
    const orders_email = req.body.orders_email.toString();
    const orders_other = req.body.orders_other.toString();
    const orders_price = req.body.orders_price.toString();
    const orders_buydate = req.body.orders_buydate.toString();
    const orders_enddate = req.body.orders_enddate.toString();
    const orders_status = req.body.orders_status.toString();
    const orders_code = req.body.orders_code.toString();
    const orders_folio = req.body.orders_folio.toString();
    
    if(orders_other === "YES")
    {
        const orders_other_firstname = req.body.orders_other_firstname.toString();
        const orders_other_lastname = req.body.orders_other_lastname.toString();
        const orders_other_address = req.body.orders_other_address.toString();
        const orders_other_zipcode = req.body.orders_other_zipcode.toString();
        const orders_other_email = req.body.orders_other_email.toString();
        const queryString = "UPDATE orders SET orders_msg = ?, orders_firstname = ?, orders_lastname = ?, orders_address = ?, orders_zipcode = ?, orders_email = ?, orders_other = ?, orders_other_firstname = ?, orders_other_lastname = ?, orders_other_address = ?, orders_other_zipcode = ?, orders_other_email = ?, orders_price = ?, orders_buydate = ?, orders_enddate = ?, orders_status = ?, orders_code = ?, orders_folio = ? WHERE orders_id = ? ;";
        getConnection().query(queryString, [orders_msg, orders_firstname, orders_lastname, orders_address, orders_zipcode, orders_email, orders_other, orders_other_firstname, orders_other_lastname, orders_other_address, orders_other_zipcode, orders_other_email, orders_price, orders_buydate, orders_enddate, orders_status, orders_code, orders_folio, orders_id], (err, results) => {
            if (err) {
                console.log("log --> Failed to query: /ordersedit " + err)
                res.sendStatus(500)
                return
            }
            console.log("log --> edit product: /ordersedit edited successfully")
            res.end()
        })
    }
    else
    {
        orders_other_firstname = null;
        orders_other_lastname = null;
        orders_other_address = null;
        orders_other_zipcode = null;
        orders_other_email = null;
        const queryString = "UPDATE orders SET orders_msg = ?, orders_firstname = ?, orders_lastname = ?, orders_address = ?, orders_zipcode = ?, orders_email = ?, orders_other = ?, orders_other_firstname = ?, orders_other_lastname = ?, orders_other_address = ?, orders_other_zipcode = ?, orders_other_email = ?, orders_price = ?, orders_buydate = ?, orders_enddate = ?, orders_status = ?, orders_code = ?, orders_folio = ? WHERE orders_id = ? ;";
        getConnection().query(queryString, [orders_msg, orders_firstname, orders_lastname, orders_address, orders_zipcode, orders_email, orders_other, orders_other_firstname, orders_other_lastname, orders_other_address, orders_other_zipcode, orders_other_email, orders_price, orders_buydate, orders_enddate, orders_status, orders_code, orders_folio, orders_id], (err, results) => {
            if (err) {
                console.log("log --> Failed to query: /ordersedit " + err)
                res.sendStatus(500)
                return
            }
            console.log("log --> edit product: /ordersedit edited successfully")
            res.end()
        })
    }
})

// Delete a orders
router.delete("/ordersdelete/:id", (req, res) => {
    const orders_id = req.params.id;
    const queryString = "DELETE FROM orders WHERE orders_id = ? ;"
    getConnection().query(queryString, [orders_id], (err, results) => {
        if (err) {
            console.log("log --> Failed to query: /ordersdelete/:id " + err)
            res.sendStatus(500)
            return
        }
        console.log("log --> delete orders: /ordersdelete/:id successfully")
        res.end()
    })
})

module.exports = router