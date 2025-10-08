import React, { useContext, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Store";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { login, user, setLogin, setUser, cartList, setcartList, setCartDetail } =
    useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  // Sync user state with localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, [setLogin, setUser]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#about";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setLogin(false);
    setcartList([]);
    setCartDetail({ subcost: 0, discount: 0, tax: 0, total: 0 });
    navigate("/");
  };

  const handleUserIconClick = () => {
    setDropdownOpen((open) => !open);
  };

  return (
    <nav>
      <span className="headingNav">
        <Link to="/">Grocify </Link>
      </span>
      <ul className="navLi">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#about" onClick={handleAboutClick}>
            About us
          </a>
        </li>
        <li>
          <Link to="/shop">Store</Link>
        </li>
      </ul>
      <ul className="RightNavLi">
        <li>
          <Link to="/Cart" className="Cart">
            🛒
            <div className="TotalCartItem">{cartList?.length || 0}</div>
          </Link>
        </li>
        {user ? (
          <li className="userDropdownWrapper" ref={dropdownRef}>
            <span
              className="userIcon"
              onClick={handleUserIconClick}
              style={{ cursor: "pointer" }}
            >
              {user.email
                ? user.email.charAt(0).toUpperCase()
                : "👤"}
            </span>
            {dropdownOpen && (
              <div className="userDropdown">
                <div className="userDropdownName">
                  {user.email || "User"}
                </div>
                <div
                  className="userDropdownLogout"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </div>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link to="/Auth" className="signUp">
              Sign Up / Login
            </Link>
          </li>
        )}
      </ul>
      {/* Mobile menu toggle */}
      <button
        className="NavBTN"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        ☰
      </button>

      <motion.nav
        className="mobileNav"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <ul className="mobileUl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#about" onClick={handleAboutClick}>
              About us
            </a>
          </li>
          <li>
            <Link to="/shop">Store</Link>
          </li>
          <li>
            <Link to="/Cart">Cart ({cartList?.length || 0})</Link>
          </li>
          {user ? (
            <li>
              <span onClick={handleUserIconClick} style={{ cursor: "pointer" }}>
                {user.email
                  ? user.email.charAt(0).toUpperCase()
                  : "👤"}
              </span>
              {dropdownOpen && (
                <div className="userDropdown">
                  <div className="userDropdownName">
                    {user.email || "User"}
                  </div>
                  <div
                    className="userDropdownLogout"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link to="/Auth" className="signUp">
                Sign Up / Login
              </Link>
            </li>
          )}
        </ul>
      </motion.nav>
    </nav>
  );
}
