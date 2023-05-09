require('dotenv').config();
require('./firebase.config');
require('./database');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const cutomerRouter = require('./routes/customer.route')
const orderRouter = require('./routes/order.route')

const app = express();
const PORT = 5201
const api = '/api/v1'

app.use(morgan('combined'))
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${api}/customer`, cutomerRouter);
app.use(`${api}/order`, orderRouter);

app.get(`${api}`, (req, res) => {
  res.send({
    message: 'Enyata',
    time: new Date().getTime(),
    version: "v1"
  })
});

app.listen(PORT, () => {
  console.log(`App Listening on http://localhost:${PORT}`)
})