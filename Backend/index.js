const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
const db = process.env.DB_URL;
mongoose
  .connect(db)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

app.get("/", (req, res) => {
  res.send({
    msg: "Hello, world",
  });
});

const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;
const CASHFREE_API_URL = "https://sandbox.cashfree.com/pg/orders"; // Test Mode URL

app.post("/create-order", async (req, res) => {
  try {
      const { order_id, amount, customer_name, customer_email, customer_phone } = req.body;

      const response = await axios.post(
          CASHFREE_API_URL,
          {
              order_id,
              order_amount: amount,
              order_currency: "INR",
              customer_details: {
                  customer_name,
                  customer_email,
                  customer_phone
              }
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  "x-client-id": CASHFREE_CLIENT_ID,
                  "x-client-secret": CASHFREE_CLIENT_SECRET,
                  "x-api-version": "2022-01-01"
              }
          }
      );
      console.log(response)
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating order" });
  }
});
// app.use("/api/auth", require("./routes/AuthRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
