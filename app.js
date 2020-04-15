const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
var router = express.Router();


const productRouter = require('./routes/product.js')
const ordersRouter = require('./routes/order.js')

//app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('short'))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', router);

app.use(productRouter)
app.use(ordersRouter)


app.get('/', (req, res) => {
	res.send('<h1>Server API Root...</h1>');
});

app.get('/api', function (req, res) {
    res.send('<h1>Server API Root...</h1>');
  });

app.listen(5000, 'localhost', () =>  {
    console.log('App listening on port 5000!');
});