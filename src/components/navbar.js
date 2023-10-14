import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
function Navbar() {
  let history = useHistory();
  const handlelogout=()=>{
    localStorage.removeItem('token')
    history.push("/login")
    
  }
  let location = useLocation();
  //this is use to give hover effect jb v hm home p click krege tb wo bright hoga ni to dull rhega
  React.useEffect(() => {}, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            iNoteBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  } `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  } `}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            
            {!localStorage.getItem('token')? <><Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link><Link className="btn btn-primary" to="/signup" role="button">Signup</Link></> :<button className="btn btn-primary" onClick={handlelogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
