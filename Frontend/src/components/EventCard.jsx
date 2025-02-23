import React, { useState } from "react";
import axios from "axios";
function generateOrder(amount) {
  const receipt = `receiptRandomiser`;
  const currency = "INR";
  amount = Number(amount) * 100
  axios
    .post("http://localhost:8000/createOrder", { amount, currency})
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

const EventCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  console.log("data", data);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based

    return `${year}-${day}-${month}`;
  } // Output: 2025-22-02

  const handleClick = async () => {
    alert("Hello");
  };
  return (
    <div className="max-w-[345px] rounded-lg shadow-md overflow-hidden bg-gray-950 text-white">
      <div
        className="cursor-pointer "
        onClick={() => {
          setOpen(true);
        }}
      >
        <img
          className="w-full h-[180px] object-cover"
          src={data?.images}
          alt="#"
        />
        <div className="p-4">
          <h6 className="text-lg font-semibold">{data.title}</h6>
          <p className="text-gray-400 text-sm font-normal line-clamp-2 overflow-hidden">
            {data.description}
          </p>
          <div className="flex justify-between my-2 text-sm">
            <span>{formatDate(data.date)}</span>
            <span>{data.time}</span>
          </div>
          <p className="text-sm">{data?.comedian?.name}</p>
          <span className="text-gray-400 text-xs font-normal">
            {data?.venue?.displayName}
          </span>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <button
            className="absolute  text-white text-4xl top-2 right-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
          <div className="bg-gray-950 text-white rounded-lg p-6 max-w-lg w-full relative">
            {/* Close Button */}

            {/* Modal Content */}
            <img
              className="w-full h-[200px] object-cover rounded"
              src={data?.images}
              alt="#"
            />
            <h2 className="text-2xl font-bold mt-4">{data.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{data.description}</p>
            <div className="flex justify-between my-3 text-sm">
              <span>{formatDate(data.date)}</span>
              <span>{data.time}</span>
            </div>
            <p className="text-sm">{data?.comedian?.name}</p>
            <span className="text-gray-400 text-xs font-normal">
              {data?.venue?.displayName}
            </span>

            <div className="flex gap-2 mt-2">
              {data?.ticketPrice?.map((ticketPrice, index) => {
                return (
                  <div key={index}
                    className="flex flex-left border rounded-md p-1 px-4"
                    onClick={(e) => {
                      generateOrder(e.target.innerText.slice(1));
                    }}
                  >
                    ₹{ticketPrice?.price}
                  </div>
                );
              })}
            </div>

            {
              // <div className="mt-5 flex flex-left">
              //   <button
              //     className="cursor-pointer p-2 border inset-0 bg-gradient-to-tr dark:from-[#121e26] dark:via-[#12100E] dark:to-[#113853] from-[#c6deef] via-[#e8e8ec] to-[#a9d0eb] rounded-md px-4 "
              //     disabled={data?.availableTickets <= 0}
              //     onClick={handleClick}
              //   >
              //     {data?.availableTickets <= 0
              //       ? "No Tickets Available"
              //       : "Book"}
              //   </button>
              // </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
