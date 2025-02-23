import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_l0BaBYVfmDglWM",

  key_secret: "7BUAam4GvrHRkrWui54BWscP",
});

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

//Inside app.js
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

app.listen(PORT, () => {
  console.log("Server is Listening on Port ", PORT);
});
