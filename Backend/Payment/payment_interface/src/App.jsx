import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const currency = "INR";
  const [receiptNo, setReceiptNo] = useState(0);

  function generateOrder() {
    const receipt = `receipt#${receiptNo}`;
    setReceiptNo((prev) => prev + 1); // Correctly updating receipt number

    console.log("Creating order with amount:", amount, "receipt:", receipt); // Debugging

    axios
      .post("http://localhost:8000/createOrder", { amount, currency, receipt })
      .then((res) => {
        // Debug API response

        if (!res.data || !res.data.amount || !res.data.id) {
          alert("Error: Invalid order response from server");
          return;
        }

        var options = {
          key: "rzp_test_l0BaBYVfmDglWM",
          amount: res.data.amount * 100, // Convert to paise (important fix)
          currency: "INR",
          name: "Ticket Payment",
          description: "Pay & Meet at the Venue.",
          image: "https://shorturl.at/cXFic",
          order_id: res.data.id,
          handler: function (response) {
            console.log("Payment Success:", response);
            alert("This step of Payment Succeeded");
          },
          prefill: {
            contact: "7715033283",
            name: "Yash Mulik",
            email: "yashmulik@gmail.com",
          },
          theme: {
            color: "#2300a3",
          },
        };

        var razorpayObject = new Razorpay(options);
        razorpayObject.on("payment.failed", function (response) {
          console.log("Payment Failed:", response);
          alert("This step of Payment Failed");
        });
        razorpayObject.open();
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        alert("Failed to create order. Check console for details.");
      });
  }

  return (
    <>
      <input  
        type="text"
        placeholder="Enter your amount in rupees..."
        style={{
          background: "white",
          color: "black",
          padding: "20px",
          borderRadius: "10px",
          width: "200px",
        }}
        onChange={(e) => setAmount(parseInt(e.target.value) * 100 || 0)}
      />
      <br />
      <br />
      <button onClick={generateOrder}>Pay Now</button>
    </>
  );
}

export default App;
