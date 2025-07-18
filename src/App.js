import Home from "./screens/Home";
import Login from "./screens/Login.jsx";
import SignUp from "./screens/SignUp.jsx";
import MyOrder from "./screens/MyOrder.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { CartProvider } from "./components/ContextReducer.jsx";

function App() {
  return (
    <CartProvider>
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* Add more routes here as needed */}
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="myOrder" element={<MyOrder />} />
          </Routes>
        </Router>
      </>
    </CartProvider>
  );
}

export default App;
