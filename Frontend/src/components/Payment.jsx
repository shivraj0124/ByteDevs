import React, { useEffect } from "react";
import axios from "axios";

const Payment = () => {
  useEffect(() => {
    const loadCashfree = async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Cashfree SDK Loaded");
      };
    };
    loadCashfree();
  }, []);

  const createOrder = async () => {
    try {
      const orderId = `order_${Date.now()}`;
      const amount = 100; // Amount in INR

      // Send request to backend
      const response = await axios.post("http://localhost:5000/create-order", {
        orderId,
        amount,
        customer: {
          customer_name: "Test User",
          customer_email: "test@example.com",
          customer_phone: "9999999999",
        },
      });

      const paymentSessionId = response.data.payment_session_id;

      // Start Payment
      if (window.Cashfree) {
        window.Cashfree({
          paymentSessionId,
          redirectTarget: "_self",
        });
      } else {
        alert("Cashfree SDK not loaded. Please refresh the page.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error creating payment. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Cashfree Payment</h2>
      <button onClick={createOrder}>Pay ₹100</button>
    </div>
  );
};

export default Payment;
