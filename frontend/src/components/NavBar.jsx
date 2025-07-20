import React, { useContext, useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../Store'

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const store = useContext(UserContext)
    const location = useLocation();
    const navigate = useNavigate();
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }

    // Sync user state with localStorage and context login state
    useEffect(() => {
        const syncUser = () => {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                setUser(JSON.parse(storedUser))
                store.setLogin(true)
            } else {
                setUser(null)
                store.setLogin(false)
            }
        }
        syncUser();
        window.addEventListener('storage', syncUser);
        return () => window.removeEventListener('storage', syncUser);
    }, [])

    // Also update user state when login state changes
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        } else {
            setUser(null)
        }
    }, [store.login])

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownOpen])

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
        localStorage.removeItem('user');
        setUser(null);
        setDropdownOpen(false);
        store.setLogin(false);
        store.setcartList([]);
        store.setCartDetail({ subcost: 0, discount: 0, tax: 0, total: 0 });
        navigate('/');
    }
    const handleUserIconClick = () => {
        setDropdownOpen((open) => !open);
    };
    return (
        <nav>
            <span className='headingNav'  ><Link to="/">Grocify </Link></span>
            <ul className='navLi'>
                <li><Link to="/">Home</Link></li>
                <li><a href="#about" onClick={handleAboutClick}>About us</a></li>
                <li><Link to="/shop">Store</Link></li>
            </ul>
            <ul className='RightNavLi'>
                <li >
                    <Link to="/Cart" className='Cart'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket2-fill" viewBox="0 0 16 16">
                            <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
                        </svg>
                        <div className='TotalCartItem'>
                            {store.cartList.length}
                        </div>
                    </Link>
                </li>
                {user ? (
                    <li className='userDropdownWrapper' ref={dropdownRef}>
                        <span className='userIcon' onClick={handleUserIconClick} style={{ cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0 0 14A7 7 0 0 0 8 1zm0 13a6 6 0 1 1 0-12A6 6 0 0 1 8 14z" />
                            </svg>
                        </span>
                        {dropdownOpen && (
                            <div className='userDropdown'>
                                <div className='userDropdownName'>
                                    {user.userName}
                                </div>
                                <div className='userDropdownLogout' onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </li>
                ) : (
                    <li><Link to="/SignUp" className='signUp'>sign up</Link></li>
                )}
            </ul>
            <ul className='CartSmall' >
                <Link to="/shop" className='SShop'>Store</Link>
                <Link to="/Cart" className='Cart'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket2-fill" viewBox="0 0 16 16">
                        <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
                    </svg>
                    <div className='TotalCartItem'>
                        {store.cartList.length}
                    </div>
                </Link>
            </ul>
            <button className='NavBTN' onClick={() => setIsOpen(isOpen => !isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>

            <motion.nav className='mobileNav'
                animate={isOpen ? "open" : "closed"}
                variants={variants}>
                <ul className='mobileUl'>

                    <li><Link to="/">Home</Link></li>
                    <li><a href="#about" onClick={handleAboutClick}>About us</a></li>
                    <li><Link to="/shop">Store</Link></li>
                    <li >
                        <Link to="/Cart" >
                            <div >
                                cart ({store.cartList.length})
                            </div>
                        </Link>
                    </li>
                    {user ? (
                        <li className='userDropdownWrapper' ref={dropdownRef}>
                            <span className='userIcon' onClick={handleUserIconClick} style={{ cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0 0 14A7 7 0 0 0 8 1zm0 13a6 6 0 1 1 0-12A6 6 0 0 1 8 14z" />
                                </svg>
                            </span>
                            {dropdownOpen && (
                                <div className='userDropdown'>
                                    <div className='userDropdownName'>
                                        {user.userName}
                                    </div>
                                    <div className='userDropdownLogout' onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li><Link to="/SignUp" className='signUp'>sign up</Link></li>
                    )}
                </ul>
            </motion.nav>
        </nav>
    )
}
