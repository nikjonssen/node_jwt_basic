require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const router = require("./routes/main");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1", router);

// errors
app.use(notFound);
app.use(errorHandler);

// connection
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
