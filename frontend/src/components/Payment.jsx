import React, { useContext, useState } from "react";
import { UserContext } from "../Store";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const store = useContext(UserContext);
  const [upiId, setUpiId] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("COD");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    let user = localStorage.getItem("user");
    if (!user) return;
    let userid = JSON.parse(user);

    if (store.cartDetail.total === 0) return;

    let paymentData = {
      products: store.cartList,
      userid: userid._id,
      method: selectedMethod,
      upiId: selectedMethod !== "COD" ? upiId : null,
    };

    // Simulate backend payment call
    fetch("http://localhost:4000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.status) {
          store.setCartDetail({ subcost: 0, discount: 0, tax: 0, total: 0 });
          store.setcartList([]);
          alert(
            selectedMethod === "COD"
              ? "✅ Order placed successfully (Cash on Delivery)"
              : `✅ Payment successful via ${selectedMethod}`
          );
          navigate("/");
        } else {
          alert("⚠️ Error while processing payment");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("⚠️ Server error");
      });
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl flex overflow-hidden w-full max-w-3xl">
        {/* Left Banner */}
        <img
          src="./I4.jpg"
          alt="Payment Banner"
          className="w-1/3 object-cover hidden md:block"
        />

        {/* Payment Form */}
        <form
          className="flex-1 p-8 flex flex-col gap-6"
          onSubmit={(e) => handleClick(e)}
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            Your Details <span className="text-gray-500">›</span> Payment
          </h2>

          {/* Payment Method Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                selectedMethod === "COD"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => setSelectedMethod("COD")}
            >
              COD
            </button>

            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                selectedMethod === "GPay"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => setSelectedMethod("GPay")}
            >
              <img src="/gpay-logo.png" alt="GPay" className="h-5" />
              GPay
            </button>

            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                selectedMethod === "Paytm"
                  ? "bg-sky-500 text-white"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => setSelectedMethod("Paytm")}
            >
              <img src="/paytm-logo.png" alt="Paytm" className="h-5" />
              Paytm
            </button>
          </div>

          {/* Show UPI ID input only for UPI methods */}
          {selectedMethod !== "COD" && (
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">
                Enter UPI ID or Generate QR
              </label>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => alert("📱 QR Code generated (mock)!")}
              >
                Generate QR
              </button>
            </div>
          )}

          {/* Payment Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{store.cartDetail.subcost}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-medium">₹{store.cartDetail.discount}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹{store.cartDetail.total}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-4 w-full py-3 rounded-lg font-semibold shadow-md transition ${
              selectedMethod === "COD"
                ? "bg-gray-800 text-white hover:bg-gray-900"
                : selectedMethod === "GPay"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-sky-500 text-white hover:bg-sky-600"
            }`}
          >
            {selectedMethod === "COD"
              ? "Place Order (COD)"
              : `Pay with ${selectedMethod}`}
          </button>
        </form>
      </div>
    </div>
  );
}
