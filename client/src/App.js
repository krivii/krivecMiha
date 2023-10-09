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

import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import UserList from "./scenes/users/UserList";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="*" element={<ClientComponentWithNavbar />} />            
            <Route path="/admin/*" element={<AdminComponent />} />
        </Routes>
      </Router>
    </div>
  );
}


function ClientComponentWithNavbar() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <AnimatePresence mode="wait">
        <ClientComponent/>
      </AnimatePresence>
    </>
  );
}

function ClientComponent() {
  const location = useLocation();

  return (
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
  );
}

function AdminComponent() {
  return (
    <div className="admin">
      <Sidebar /> {/* Render the Sidebar component */}
      <div className="admin-content">
        <Topbar /> {/* Render the Topbar component */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            {/* Define other routes here */}
          </Routes>
        </main>
      </div>
    </div>


  );
}


export default App;

