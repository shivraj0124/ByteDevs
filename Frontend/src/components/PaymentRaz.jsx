import { useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(0);
  const currency = "INR";
  const [receiptNo, setReceiptNo] = useState(0);

  function generateOrder() {
    const newReceiptNo = receiptNo + 1; // Ensure correct receipt number
    const receipt = `receipt#${newReceiptNo}`;
    setReceiptNo(newReceiptNo); // Update receipt number correctly

    console.log("Creating order with amount:", amount, "receipt:", receipt);

    axios
      .post("http://localhost:8000/createOrder", { amount, currency, receipt })
      .then((res) => {
        // if (!res.data || !res.data.amount || !res.data.id) {
        //   alert("Error: Invalid order response from server");
        //   return;
        // }

        const options = {
          key: "rzp_test_l0BaBYVfmDglWM",
          amount: res.data.amount  * 100, // Ensure backend sends amount in paise
          currency: "INR",
          name: "Ticket Payment",
          description: "Pay & Meet at the Venue.",
          image: "https://shorturl.at/cXFic",
          order_id: res.data.id,
          handler: function (response) {
            console.log("Payment Success:", response);
            alert("Payment Successful!");
          },
          prefill: {
            contact: "7715033283",
            name: "Yash Mulik",
            email: "yashmulik@gmail.com",
          },
          theme: {
            color: "#2300a3",
          },
          modal: {
            ondismiss: function () {
              alert("Payment popup closed!");
            },
          },
        };

        const razorpayObject = new window.Razorpay(options);

        // Handle Payment Failure Inside 'handler' (since 'on' may not work)
        options.handler = function (response) {
          if (response.error) {
            console.error("Payment Failed:", response.error);
            alert("Payment Failed! Please try again.");
          } else {
            console.log("Payment Success:", response);
            alert("Payment Successful!");
          }
        };

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
