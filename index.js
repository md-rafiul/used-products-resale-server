const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//using middleware
app.use(cors());
app.use(express.json());

//mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cdvoxlm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usersCollection = client.db("resaleDB").collection("users");
    const productsCollection = client.db("resaleDB").collection("products");

    // to add firebase users to db
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //get user
    app.get("/users", async (req, res) => {
      let query = {};
      console.log(req.query);
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      if (req.query.role) {
        query = {
          role: req.query.role,
        };
      }
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    // to add products to db
    app.post("/products", async (req, res) => {
      const user = req.body;
      const result = await productsCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

//basic
app.get("/", (req, res) => {
  res.send("resale products assignment 12 server running");
});

app.listen(port, () => {
  console.log("resale products assignment 12 server running on port ", port);
});
