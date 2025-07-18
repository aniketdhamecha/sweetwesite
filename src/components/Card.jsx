import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { motion } from 'framer-motion';

export const Card = (props) => {
  const data = useCart();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [localStock, setLocalStock] = useState(props.foodItem.stock || 0);
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem;
  const finalPrice = qty * parseInt(options[size] || 0);
  const isOutOfStock = localStock <= 0;

  const fetchImageFromUnsplash = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=BpzoFEjkRLGCqDuwpB7yjFH3KUFqj42sMz5Z72zqdnE`
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        setImgUrl(data.results[0].urls.small);
      } else {
        setImgUrl("https://via.placeholder.com/300x200?text=No+Image");
      }
    } catch {
      setImgUrl("https://via.placeholder.com/300x200?text=Error");
    }
  };

  useEffect(() => {
    setSize(priceRef.current?.value || "");
    fetchImageFromUnsplash(props.foodItem.name);
  }, [props.foodItem.name]);

  const handleAddToCart = async () => {
    if (localStock < qty) {
      alert("Not enough stock available!");
      return;
    }

    const existingFood = data.find(item => item.id === foodItem._id && item.size === size);
    if (existingFood) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: props.foodName,
        price: finalPrice,
        size,
        qty
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId: foodItem._id, quantity: qty })
      });

      const result = await res.json();
      if (result.success) {
        setLocalStock(result.newStock);
        if (result.newStock === 0) {
          alert(`${props.foodItem.name} is now out of stock.`);
        }
      } else {
        alert(result.message || "Failed to update stock");
      }
    } catch {
      alert("Error updating stock");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className="my-3 mx-2"
    >
      <div
        className="card border-0 rounded-4 shadow-lg"
        style={{
          width: "20rem",
          background: "#f9f9f9",
          overflow: "hidden"
        }}
      >
        <img
          src={imgUrl || "https://via.placeholder.com/300x200?text=Loading..."}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{
            height: "180px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem"
          }}
        />
        <div className="card-body p-3 d-flex flex-column justify-content-between" style={{ minHeight: "260px" }}>
          <h5 className="card-title mb-2 fw-bold">{props.foodItem.name}</h5>
          <p className="text-muted small mb-2">{props.foodItem.description}</p>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className={`badge rounded-pill ${isOutOfStock ? "bg-danger" : "bg-success"}`}>
              {isOutOfStock ? "Out of Stock" : `Stock: ${localStock}`}
            </span>
            <span className="fw-bold">₹{finalPrice}/-</span>
          </div>

          <div className="d-flex gap-2 mb-2">
            <select
              className="form-select form-select-sm"
              onChange={(e) => setQty(e.target.value)}
              disabled={isOutOfStock}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="form-select form-select-sm"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
              disabled={isOutOfStock}
            >
              {priceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`btn btn-sm w-100 fw-semibold shadow ${isOutOfStock ? "btn-secondary" : "btn-success"}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart 🍽"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
