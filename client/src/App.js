import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";

import About from "./pages/home-pages/about";
import OurWork from "./pages/home-pages/ourWork";
import Contact from "./pages/home-pages/contact";
import Photo from "./pages/home-pages/photo";
import CategoryGallery from "./pages/home-pages/categoryGallery";
import Video from "./pages/home-pages/video";
import Register from "./pages/home-pages/register";
import Login from "./pages/home-pages/login";
import Library from "./pages/home-pages/library";
import  Navbar  from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import GlobalStyle from './components/GlobalStyle'





function App() {
  return (
    <div className="App">
      <Router>
      <GlobalStyle />
      <Navbar />
      <AnimatePresence mode="wait">
        <Inner/>
      </AnimatePresence>
      </Router>
    </div>
  );
}

function Inner() {
  const location = useLocation();

  return(
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<About />} />
      <Route path="/work" element={<OurWork />} />
      <Route path="/work/photo" element={<Photo />} />
      <Route path="/work/photo/:categoryId" element={<CategoryGallery />} />
      <Route path="/work/video" element={<Video />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/library" element={<Library />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App;