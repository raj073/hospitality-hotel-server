const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mlxaon5.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client
      .db("hospitableHotel")
      .collection("hotelRoomCategories");

    const hotelRoomCollection = client
      .db("hospitableHotel")
      .collection("hotelRoom");

    //Room Categories Load from MongoDB
    app.get("/categories", async (req, res) => {
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories);
    });

    //Add Room into the Database
    app.post("/addroom", async (req, res) => {
      const room = req.body;
      console.log(room);
      const roomData = await hotelRoomCollection.insertOne(room);
      res.send(roomData);
    });
  } finally {
  }
}

run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Hospitable Hotel Server is Running");
});

app.listen(port, () => {
  console.log(`Hospitable Hotel Server is Running on ${port}`);
});
