import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Navbar.css'
//  import { IoLogOutOutline, CgProfile, SiGnuprivacyguard, FiLogIn } from "react-icons/all"

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/signup');
  }
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navv" to="/">
          NotesZipper
        </Link>
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
              <Link className={`nav-link ${location.pathname==='/' ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about' ? "active" : ""}`} to="/create">
                Create
              </Link>
            </li>
          </ul>
          { !localStorage.getItem('token')?<form className="d-flex">
          <Link to='/signup'>
            {/* <SiGnuprivacyguard color='white' size = '28' className="displayIcon1" /> */}
            </Link>
          <Link to='/login'>
            {/* <FiLogIn color='white' size = '28' className="displayIcon1" /> */}
            </Link>
          </form>:<form>
            <Link to='/profile'>
              {/* <CgProfile color='white' size = '28' className="displayIcon1"/> */}
              </Link>
            {/* <IoLogOutOutline color='white' size='28' className="displayIcon" onClick={handleLogout}/> */}
            </form>
            }  
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
