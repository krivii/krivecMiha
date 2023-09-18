import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home-pages/home"; 
import About from "./pages/home-pages/about";
import OurWork from "./pages/home-pages/ourWork";
import Contact from "./pages/home-pages/contact";
import Login from "./pages/home-pages/login";
import Register from "./pages/home-pages/register";
import Library from "./pages/home-pages/library";
import { Navbar } from "./components/navbar";





function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ourWork" element={<OurWork />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
