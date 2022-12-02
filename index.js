const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//using middleware
app.use(cors());
app.use(express.json());

//basic
app.get("/", (req, res) => {
  res.send("resale products assignment 12 server running");
});

app.listen(port, () => {
  console.log("resale products assignment 12 server running on port ", port);
});
