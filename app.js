const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const productRouter = require('./routes/product.js')
const ordersRouter = require('./routes/order.js')

//app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('short'))
app.use(cors())
app.use(bodyParser.json())

app.use(productRouter)
app.use(ordersRouter)


app.get('/', (req, res) => {
});

app.listen(5000, () =>  {
    console.log('App listening on port 5000!');
});