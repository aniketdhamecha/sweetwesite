import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import i1 from "../img/img1.jpg";
import i2 from "../img/img2.jpg";
import i3 from "../img/img3.jpg";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/displayData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Carousel indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Search Bar Overlay */}
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: 10 }}
          >
            <div className="d-flex justify-content-center mt-3">
              <input
                className="form-control w-50 p-2 fs-5 rounded-3 shadow border-0"
                type="search"
                placeholder="🔍 Search food, category or exact price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Carousel Items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={i1}
                className="d-block w-100"
                alt="Burger"
                style={{
                  objectFit: "cover",
                  filter: "brightness(60%)",
                  height: "450px",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={i2}
                className="d-block w-100"
                alt="Pizza"
                style={{
                  objectFit: "cover",
                  filter: "brightness(60%)",
                  height: "450px",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={i3}
                className="d-block w-100"
                alt="Sandwich"
                style={{
                  objectFit: "cover",
                  filter: "brightness(60%)",
                  height: "450px",
                }}
              />
            </div>
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Food Section */}
      <div className="container my-4">
        {foodCat.length > 0 ? (
          foodCat.map((category) => {
            // Filter food items matching this category and the search
            const matchedItems = foodItem.filter((item) => {
              const nameMatch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());
              const categoryMatch = item.CategoryName
                .toLowerCase()
                .includes(search.toLowerCase());
              const priceMatch =
                !isNaN(search) &&
                Object.values(item.options[0]).some(
                  (price) => Number(price) === Number(search)
                );

              return (
                item.CategoryName === category.CategoryName &&
                (nameMatch || categoryMatch || priceMatch)
              );
            });

            // Skip category if no items match
            if (matchedItems.length === 0) return null;

            return (
              <div key={category._id} className="mb-5">
                <h3 className="text-success fw-bold border-bottom border-2 border-success pb-2 mb-4">
                  🍽 {category.CategoryName}
                </h3>
                <div className="row">
                  {matchedItems.map((filteredItem) => (
                    <div
                      key={filteredItem._id}
                      className="col-12 col-md-6 col-lg-3 mb-4"
                    >
                      <Card
                        foodItem={filteredItem}
                        options={filteredItem.options[0]}
                        ImgSrc={filteredItem.img}
                        foodName={filteredItem.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted">No categories found</div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;