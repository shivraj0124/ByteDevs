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
console.log(db);
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

const Razorpay = require("razorpay")
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_l0BaBYVfmDglWM",

  key_secret: "7BUAam4GvrHRkrWui54BWscP",
});

app.post("/createOrder", (req, res) => {
  // STEP 1:
  const { amount, currency, receipt } = req.body;

  // STEP 2:
  razorpayInstance.orders.create(
    { amount, currency, receipt },
    (err, order) => {
      //STEP 3 & 4:
      if (!err) res.json(order);
      else res.send(err);
    }
  );
});

app.use("/api/auth", require("./Routes/AuthRoutes"));
app.use("/api/manager", require("./Routes/ManagerRoutes"));
app.use("/api/artist", require("./Routes/ComedianRoutes"));
app.use("/api/admin", require("./Routes/AdminRoutes"));
app.use("/api/maps", require("./Routes/Maproute"));
app.use("/api/user", require("./Routes/UserRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
