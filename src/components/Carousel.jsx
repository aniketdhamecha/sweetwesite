import React from "react";

const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      {/* Carousel inner items */}
      <div className="carousel-inner">
        {/* Search bar overlay */}
        <div className="carousel-caption d-none d-md-block" style={{ zIndex: 10 }}>
          <form className="d-flex justify-content-center">
            <input className="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light bg-success" type="submit">Search</button>
          </form>
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
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
