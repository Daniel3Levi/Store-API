require('dotenv').config();
require('express-async-errors'); //async errors

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const express = require('express');

const app = express();

//routes
app.get('/', (req, res) => {
  res.send(
    '<h1>Store Api v1</h1><a href="/api/v1/products">product routes</a>'
  );
});
app.use('/api/v1/products', productsRouter); // products routes

app.use(notFoundMiddleware); // error middelware
app.use(errorHandlerMiddleware); // error middelware
app.use(express.json()); //middleware

//port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
