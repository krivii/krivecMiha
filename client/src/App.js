import ".App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from ".pages/home-pages/home"
import {About} from ".pages/home-pages/About"
import {Photos} from ".pages/home-pages/Photos"
import {Videos} from ".pages/home-pages/Videos"
import {Contact} from ".pages/home-pages/Contact"
import {Login} from ".pages/home-pages/Login"
import {Register} from ".pages/home-pages/Register"
import {Library} from ".pages/home-pages/Library"
//import {Admin} from ".pages/home-pages/Admin"

function App(){
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path="/about" element= {<About />}/>
          <Route path="/photos" element= {<Photos />}/>
          <Route path="/videos" element= {<Videos />}/>
          <Route path="/contact" element= {<Contact />}/>
          <Route path="/login" element= {<Login />}/>
          <Route path="/register" element= {<Register />}/>
          <Route path="/library" element= {<Library />}/>
          <Route path="/admin" element= {<Admin />}/>
        </Routes>
      </Router>
    </div>
  )
}