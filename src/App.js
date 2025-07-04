import Home from "./screens/Home";
import Login from "./screens/Login.jsx";
import SignUp from "./screens/SignUp.jsx";
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* Add more routes here as needed */}
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          {/* You can add more routes for other components/screens */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
