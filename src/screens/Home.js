import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

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
    console.log(response[0]);
    console.log(response[1]);
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

          {/* Carousel inner items */}
          <div className="carousel-inner">
            {/* Search bar overlay */}
            <div
              className="carousel-caption d-none d-md-block"
              style={{ zIndex: 10 }}
            >
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-50"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src="https://picsum.photos/seed/burger/900/500"
                className="d-block w-100 carousel-img"
                alt="Burger"
              />
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src="https://picsum.photos/seed/pizza/900/500"
                className="d-block w-100 carousel-img"
                alt="Pizza"
              />
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src="https://picsum.photos/seed/sandwich/900/500"
                className="d-block w-100 carousel-img"
                alt="Sandwich"
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
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div className="mb-4" key={category._id}>
              <h3 className="fs-3 m-3">{category.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div
                        key={filteredItem._id}
                        className="col-12 col-md-6 col-lg-3 mb-3"
                      >
                        <Card
                          foodItem={filteredItem}
                          options={filteredItem.options[0]}
                          ImgSrc={filteredItem.img}
                          foodName={filteredItem.name}
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-center">No items found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No categories found</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
