import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const [imageMap, setImageMap] = useState({});

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/myOrderData", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') })
    });

    const response = await res.json();
    setOrderData(response.orderData);
  };

  const fetchImageFromUnsplash = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=BpzoFEjkRLGCqDuwpB7yjFH3KUFqj42sMz5Z72zqdnE`
      );
      const data = await res.json();
      return data?.results?.[0]?.urls?.small || "https://via.placeholder.com/300x200?text=No+Image";
    } catch {
      return "https://via.placeholder.com/300x200?text=Error";
    }
  };

  useEffect(() => { fetchMyOrder(); }, []);

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

  const groupedOrders = {};
  orderData?.order_data?.forEach((orderArray) => {
    let currentDate = '';
    orderArray.forEach((item) => {
      if (item.order_date) {
        currentDate = item.order_date;
        if (!groupedOrders[currentDate]) groupedOrders[currentDate] = [];
      } else if (currentDate) {
        groupedOrders[currentDate].push(item);
      }
    });
  });

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-5">Your Orders</h2>

        {Object.keys(groupedOrders).reverse().map((date, idx) => (
          <div key={idx} className="mb-5">
            <div className="mb-3 border-bottom border-success pb-2">
              <h4 className="text-success">📅 {date}</h4>
            </div>
            <div className="row g-4">
              {groupedOrders[date].map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="card h-100 shadow rounded"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <img
                      src={imageMap[item.name] || "https://via.placeholder.com/300x200?text=Loading..."}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-success">{item.name}</h5>
                      <p className="mb-1"><strong>Qty:</strong> {item.qty}</p>
                      <p className="mb-1"><strong>Size:</strong> {item.size}</p>
                      <p className="fw-bold fs-5 text-success mb-0">₹{item.price}/-</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
