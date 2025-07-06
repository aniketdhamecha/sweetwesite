import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

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

  // ✅ Fetch image from Unsplash
  const fetchImageFromUnsplash = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=BpzoFEjkRLGCqDuwpB7yjFH3KUFqj42sMz5Z72zqdnE`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setImgUrl(data.results[0].urls.small); // Use regular or small as needed
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
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: props.foodName,
        price: finalPrice,
        size: size,
        qty: qty,
      });
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem", maxHeight: "400px" }}>
        <img
          src={imgUrl || "https://via.placeholder.com/300x200?text=Loading..."}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{ height: "135px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
