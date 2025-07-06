import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-white fs-3 m-5">🛒 Your Cart is Empty!</div>
    );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/OrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toISOString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      alert("✅ Order placed successfully!");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container my-5 p-4 rounded" style={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
      <h2 className="text-center mb-4 text-success fw-bold">🧾 Your Order Summary</h2>

      <div className='table-responsive'>
        <table className='table table-dark table-hover table-bordered border-success text-center align-middle'>
          <thead className='table-success text-dark'>
            <tr>
              <th>#</th>
              <th>🍽️ Name</th>
              <th>🔢 Quantity</th>
              <th>📏 Option</th>
              <th>💰 Amount</th>
              <th>❌ Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className='fw-semibold'>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button
                    className='btn btn-outline-danger btn-sm'
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 px-2">
        <h4 className='text-white fw-bold'>Total Price: ₹{totalPrice}/-</h4>
        <button
          className='btn btn-success btn-lg px-4 shadow-sm'
          onClick={handleCheckout}
        >
          ✅ Checkout
        </button>
      </div>
    </div>
  );
}
