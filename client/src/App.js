import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import Home from "./pages/home-pages/home"; 
import About from "./pages/home-pages/about";
import OurWork from "./pages/home-pages/ourWork";
import Contact from "./pages/home-pages/contact";
import Photo from "./pages/home-pages/photo";
import Register from "./pages/home-pages/register";
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
      <Route path="/contact" element={<Contact />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  )
}

export default App;