const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const { ValidationError, NotFoundError } = require('./lib/errors');
const app = express();

//connect database
connectDB();

//Init moddleware
app.use(express.json({ extended: false }));

app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message
  });
});

const PORT = process.env.PORT_ENV || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
