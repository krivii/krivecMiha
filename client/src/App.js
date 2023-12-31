//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate  } from "react-router-dom";
import  Navbar  from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import GlobalStyle from './components/GlobalStyle'
import { useAuthContext } from "./hooks/useAuthContext";

import About from "./pages/home-pages/about";
import OurWork from "./pages/home-pages/ourWork";
import Contact from "./pages/home-pages/contact";
import Photo from "./pages/home-pages/photo";
import CategoryGallery from "./pages/home-pages/categoryGallery";
import Video from "./pages/home-pages/video";
import Register from "./pages/home-pages/register";
import Login from "./pages/home-pages/login";
import Library from "./pages/home-pages/library";
import AdminLogin from "./pages/admin-pages/AdminLogin";


import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import UserList from "./scenes/users/UserList";
import UserAdd from "./scenes/users/UserAdd";
import UserEdit from "./scenes/users/UserEdit";
import UserOrderList from "./scenes/orders/UserOrderList";
import OrderList from "./scenes/orders/OrderList";
import OrderAdd from "./scenes/orders/OrderAdd";
import OrderEdit from "./scenes/orders/OrderEdit";
import CPhotosAdd from "./scenes/cphotos/CPhotosAdd";
import OrderPhotoList from "./scenes/cphotos/OrderPhotoList";
import CategoryAdd from "./scenes/categories/CategoryAdd";
import CategoryList from "./scenes/categories/CategoryList";
import CategoryEdit from "./scenes/categories/CategoryEdit";
import CategoryImageList from "./scenes/categories/CategoryImageList";
import ImageList from "./scenes/pageElements/ImageList";
import VideoAdd from "./scenes/categories/VideoAdd";
import VideoList from "./scenes/categories/VideoList";
import FAQAdmin from "./scenes/faq/FaqList";
import OrderZipAdd from "./scenes/orders/OrderZipEdit";



function App() {
  
  const {user} = useAuthContext();

  let isAdmin = false; 

  if (user && user.role === "admin") {
    isAdmin = true; 
  }
  

  return (
    
    <div className="App">
      <Router>
        <Routes>
            <Route path="*" element={<ClientComponentWithNavbar />} />  
            <Route 
              path="/admin/*" 
              element={isAdmin ? <AdminComponent /> : <Navigate to="/adminLogin" />} 
            />      
            <Route 
              path="/adminLogin" 
              element={!isAdmin ? <AdminLogin /> : <AdminComponent /> } 
            />     
            {/* <Route path="/admin/*" element={<AdminComponent />} /> */}
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
  const {user} = useAuthContext();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<About />} />
      <Route path="/work" element={<OurWork />} />
      <Route path="/work/photo" element={<Photo />} />
      <Route path="/work/photo/:categoryId" element={<CategoryGallery />} />
      <Route path="/work/video" element={<Video />} />
      <Route path="/contact" element={<Contact />} />
      <Route 
        path="/library" 
        element={user ? <Library /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/library" />} 
      />
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/library" />} 
      />

    </Routes>
  );
}

function AdminComponent() {


  return (
    <div className="admin">
      <Sidebar /> 
      <div className="admin-content">
        <Topbar /> 
        <main className="content">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<UserList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<UserAdd />} />
            <Route path="/users/edit/:userId" element={<UserEdit />} />
            <Route path="/orders/:userId" element={<UserOrderList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/add" element={<OrderAdd />} />
            <Route path="/orders/edit/:orderId" element={<OrderEdit />} />
            <Route path="/orders/editZip/:orderId" element={<OrderZipAdd />} />            
            <Route path="/cphotos/add" element={<CPhotosAdd />} />
            <Route path="/cphotos/:orderId" element={<OrderPhotoList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/add" element={<CategoryAdd />} />
            <Route path="/categories/edit/:categoryId" element={<CategoryEdit />} />
            <Route path="/categories/images/:categoryId" element={<CategoryImageList />} />
            <Route path="/pphotos" element={<ImageList />} />
            <Route path="/videos" element={<VideoList />} />
            <Route path="/videos/add" element={<VideoAdd />} />
            <Route path="/faq" element={<FAQAdmin />} />
            

              

            
          </Routes>
        </main>
      </div>
    </div>


  );
}


export default App;

