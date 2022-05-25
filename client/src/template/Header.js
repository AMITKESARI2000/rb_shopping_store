import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { Button, Tooltip, IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

const getCurrentDate = (separator = '/') => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
};

const Header = () => {
    // Getting details of the user
    const userData = JSON.parse(localStorage.getItem('profile'));
    let Cid = userData ? userData.uid + 2000 : 2001;

    const [openedDrawer, setOpenedDrawer] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/get-cart`, {
                cid: Cid,
            })
            .then((res) => {
                setCartCount(res.data.length);
            })
            .catch((err) => console.log(err));
    }, []);

    const reinitializeDB = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/createdb`)
            .then((res) => {
                console.log('All tables initiated');
                window.location = `${process.env.REACT_APP_FRONTEND_URL}`;
            })
            .catch((err) => console.log(err));
    };

    function toggleDrawer() {
        setOpenedDrawer(!openedDrawer);
    }

    function changeNav(event) {
        if (openedDrawer) {
            setOpenedDrawer(false);
        }
    }

    const handleCardCount = () => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/get-cart`, {
                cid: Cid,
            })
            .then((res) => {
                setCartCount(res.data.length);
            })
            .catch((err) => console.log(err));
    };

    return (
        <header onMouseEnter={handleCardCount}>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={``} onClick={changeNav}>
                        <FontAwesomeIcon
                            icon={['fab', 'bootstrap']}
                            className="ms-1"
                            size="lg"
                        />
                        <span className="ms-2 h5">RB Shopping Store ;)</span>
                    </Link>

                    <div
                        className={
                            'navbar-collapse offcanvas-collapse ' +
                            (openedDrawer ? 'open' : '')
                        }
                    >
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    to="/products"
                                    className="nav-link"
                                    replace
                                    onClick={changeNav}
                                >
                                    Explore
                                </Link>
                            </li>
                            {userData !== null && userData.is_seller === 0 ? (
                                <li className="nav-item">
                                    <Link
                                        to={`/checkout/track/${Cid}`}
                                        className="nav-link"
                                        replace
                                        onClick={changeNav}
                                    >
                                        Track Cart
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link
                                        to="/products/add-product"
                                        className="nav-link"
                                        replace
                                        onClick={changeNav}
                                    >
                                        Add Item
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <Tooltip title="Refresh DB">
                            <IconButton
                                size="small"
                                aria-label="show new home"
                                edge="end"
                                sx={{
                                    color: 'blue',
                                    background: 'white',
                                    margin: '0.2em',
                                }}
                                onClick={() => reinitializeDB()}
                            >
                                <CachedIcon />
                            </IconButton>
                        </Tooltip>
                        {userData === null ? (
                            <h6 style={{ margin: '0.5em' }}>
                                Please Login First
                            </h6>
                        ) : (
                            <p
                                style={{
                                    margin: '0.5em',
                                    backgroundColor: 'rgb(221,131,114,0.09)',
                                }}
                            >
                                <LaptopMacIcon />
                                &nbsp;
                                {getCurrentDate()}
                            </p>
                        )}
                        <Link to={`/checkout/${Cid}`}>
                            <button
                                type="button"
                                className="btn btn-outline-dark me-3 d-none d-lg-inline"
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'shopping-cart']}
                                />
                                <span className="ms-3 badge rounded-pill bg-dark">
                                    {cartCount}
                                </span>
                            </button>
                        </Link>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a
                                    href="/"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FontAwesomeIcon
                                        icon={['fas', 'user-alt']}
                                    />
                                </a>
                                {userData === null ? (
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="userDropdown"
                                    >
                                        <li>
                                            <Link
                                                to="/login"
                                                className="dropdown-item"
                                                onClick={changeNav}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/signup"
                                                className="dropdown-item"
                                                onClick={changeNav}
                                            >
                                                Sign Up
                                            </Link>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="userDropdown"
                                    >
                                        <h5>
                                            &nbsp; &nbsp;Hi {userData.user_name}
                                        </h5>
                                        <hr></hr>
                                        <li>
                                            <Link
                                                to={`/profile/${userData.uid}`}
                                                className="dropdown-item"
                                                onClick={changeNav}
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/logout"
                                                className="dropdown-item"
                                                onClick={changeNav}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className="d-inline-block d-lg-none">
                        <Link to={`/checkout/${Cid}`}>
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'shopping-cart']}
                                />
                                <span className="ms-3 badge rounded-pill bg-dark">
                                    {cartCount}
                                </span>
                            </button>
                        </Link>
                        <button
                            className="navbar-toggler p-0 border-0 ms-3"
                            type="button"
                            onClick={toggleDrawer}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
