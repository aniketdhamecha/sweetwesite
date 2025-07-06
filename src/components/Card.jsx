import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { motion } from 'framer-motion';

export const Card = (props) => {
  const data = useCart();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [imgUrl, setImgUrl] = useState(""); 
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem;
  const finalPrice = qty * parseInt(options[size]);

  const fetchImageFromUnsplash = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=BpzoFEjkRLGCqDuwpB7yjFH3KUFqj42sMz5Z72zqdnE`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setImgUrl(data.results[0].urls.small);
      } else {
        setImgUrl("https://via.placeholder.com/300x200?text=No+Image");
      }
    } catch (err) {
      console.error("Unsplash fetch error:", err);
      setImgUrl("https://via.placeholder.com/300x200?text=Error");
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
    fetchImageFromUnsplash(props.foodItem.name);
  }, [props.foodItem.name]);

  const handleAddToCart = async () => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="my-3 mx-2"
    >
      <div
        className="card border-0 shadow-lg rounded-4 backdrop-blur"
        style={{
          width: "18rem",
          maxHeight: "420px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          transition: "transform 0.3s ease"
        }}
      >
        <img
          src={imgUrl || "https://via.placeholder.com/300x200?text=Loading..."}
          className="card-img-top rounded-top-4"
          alt={props.foodItem.name}
          style={{
            height: "150px",
            objectFit: "cover",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            transition: "transform 0.3s ease",
            filter: "brightness(0.9)"
          }}
        />

        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-success fw-bold">{props.foodItem.name}</h5>
            <p className="card-text text-muted small">{props.foodItem.description}</p>
          </div>

          <div className="container w-100 d-flex flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <select
                className="form-select form-select-sm w-50 me-2 border-success shadow-sm"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                className="form-select form-select-sm w-50 border-success shadow-sm"
                onChange={(e) => setSize(e.target.value)}
                ref={priceRef}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </div>

            <div className="mt-3 w-100 d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-6 text-dark">💸 ₹{finalPrice}/-</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm btn-outline-success fw-semibold shadow"
                onClick={handleAddToCart}
              >
                🍽️ Add
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;