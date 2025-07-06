import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-5">
      <div className="container text-center">
        <h5 className="mb-3">🍴 FoodieExpress</h5>
        <p className="mb-2">Delivering your cravings, one bite at a time.</p>
        <div className="d-flex justify-content-center mb-3">
          <a href="https://www.instagram.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <small>© {new Date().getFullYear()} FoodieExpress. All rights reserved.</small>
      </div>
    </footer>
  );
}
