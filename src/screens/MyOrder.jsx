import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const [imageMap, setImageMap] = useState({}); // Store fetched images per item

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    });

    const response = await res.json();
    setOrderData(response.orderData);
  };

  // 🖼️ Fetch Unsplash image for a given food name
  const fetchImageFromUnsplash = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=BpzoFEjkRLGCqDuwpB7yjFH3KUFqj42sMz5Z72zqdnE`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      } else {
        return "https://via.placeholder.com/300x200?text=No+Image";
      }
    } catch (err) {
      console.error("Unsplash fetch error:", err);
      return "https://via.placeholder.com/300x200?text=Error";
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  // 🧠 Fetch images after order data is loaded
  useEffect(() => {
    const loadImages = async () => {
      if (orderData?.order_data) {
        let tempImageMap = {};
        for (let orderArray of orderData.order_data) {
          for (let item of orderArray) {
            if (!item.order_date && item.name && !tempImageMap[item.name]) {
              const img = await fetchImageFromUnsplash(item.name);
              tempImageMap[item.name] = img;
            }
          }
        }
        setImageMap(tempImageMap);
      }
    };

    loadImages();
  }, [orderData]);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData?.order_data?.slice(0).reverse().map((orderArray, i) =>
            orderArray.map((item, j) => (
              <div key={`${i}-${j}`}>
                {item.order_date ? (
                  <div className='m-auto mt-5'>
                    <hr />
                    <strong>{item.order_date}</strong>
                  </div>
                ) : (
                  <div className='col-12 col-md-6 col-lg-3'>
                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                      <img
                        src={
                          imageMap[item.name] ||
                          "https://via.placeholder.com/300x200?text=Loading..."
                        }
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: "120px", objectFit: "fill" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                          <span className='m-1'>{item.qty}</span>
                          <span className='m-1'>{item.size}</span>
                          <div className='d-inline ms-2 h-100 w-20 fs-5'>
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
