import React, {useEffect, useRef, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";

import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faAngleDown,
    faCartShopping,
    faCube, faEnvelope, faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setIsOpenLogin} from "../../store/actions/login";
import visa from "../../assets/icon/Visa.svg"
import group5 from "../../assets/icon/Group_5.svg"
import group6 from "../../assets/icon/Group_6.svg"
import sim from "../../assets/icon/sim.svg"


import {getAllProducts, setSearchValue, getAllNames, setNameData, setUserId} from "../../store/actions/home";
import Notifications from "./Notifications";
import Profile from "./Profile";

const token = localStorage.getItem("token");

function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const user = useSelector(state => state.login.user)
    // const [isOpenLogin, setIsOpenLogin] = useState(false)
    const statusKey = useSelector(state => state.registration.statusKey)
    const isOpenLogin = useSelector(state => state.login.isOpenLogin)
    const [value, setValue] = useState("");
    const searchValue = useSelector(state => state.home.searchValue);
    const selectId = useSelector(state => state.home.selectId);
    const page = useSelector(state => state.home.page);
    const minPrice = useSelector(state => state.home.minPrice);
    const maxPrice = useSelector(state => state.home.maxPrice);
    const [limit, setLimit] = useState(12);
    const storeId = useSelector(state => state.home.storeId);
    const productsNames = useSelector(state => state.home.productsNames);
    const userId = useSelector(state => state.login.user?.id);
    const nameData = useSelector(state => state.home.nameData);


    const {pathname} = useLocation()


    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            dispatch(setUserId(user.id))
        }
    }, [user]);

    useEffect(() => {
        dispatch(getAllNames({page, limit, s: searchValue || " "}))
    }, [searchValue]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleSearch = (e) => {
        navigate("/products")
        e.preventDefault();
        if (searchValue.trim() !== " ") {
            if (localStorage.getItem("token")) {
                if (userId) {
                    dispatch(getAllProducts({
                        categoryId: selectId,
                        page,
                        limit,
                        minPrice,
                        maxPrice,
                        s: searchValue ? searchValue : "",
                        storeId,
                        userId
                    }));
                }
            } else {
                dispatch(getAllProducts({
                    categoryId: selectId,
                    page,
                    limit,
                    minPrice,
                    maxPrice,
                    s: searchValue ? searchValue : "",
                    storeId
                }));
            }
        }

    }

    const chooseName = (item) => {
        dispatch(setNameData(item))
        navigate(`one-product/${item.id}`)
        dispatch(setSearchValue(""))
    }


    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <div className="nav-header">
                        <div className="container-header">
                            <Link to="/" className="logo-block">
                                <div className="logo">
                                    Logo
                                </div>
                            </Link>

                            <nav className="nav">
                                <ul className="nav-list">

                                    <li className="nav-item">Store
                                        <FontAwesomeIcon icon={faAngleDown} className="store-arrow"/>
                                        <ul className="nav-more">
                                            <li><img src="#"/>IDEAL</li>
                                            <li><img src="#"/>DOMUS</li>
                                            <li><img src="#"/>ESIM</li>
                                        </ul>
                                    </li>

                                    <Link    className={window.location.pathname === "/products" ? "nav-item-active" : "nav-item"} to="/products">
                                        <li>Products</li>
                                    </Link>
                                    <Link className="nav-item" to="/#">
                                        <li>Contact</li>
                                    </Link>
                                </ul>

                                {/*<Link className="nav-item" to="/#">*/}
                                {/*    <li>Specialist</li>*/}
                                {/*</Link>*/}

                            </nav>

                            {/*<div className="search-block">*/}
                            {/*  <form onSubmit={handleSearch} className="form-search">*/}
                            {/*    <div className="search-field">*/}
                            {/*      <FontAwesomeIcon icon={faMagnifyingGlass} className="glass"/>*/}
                            {/*      <Input*/}
                            {/*        value={searchValue}*/}
                            {/*        onChange={(e) => dispatch(setSearchValue(e.target.value))}*/}
                            {/*        className="search-input"*/}
                            {/*        placeholder="Search"*/}
                            {/*      />*/}
                            {/*    </div>*/}
                            {/*  </form>*/}
                            {/*</div>*/}

                            <div ref={searchRef} className="search-box">
                                <div className="search-row">
                                    <form
                                        onSubmit={handleSearch}
                                    >
                                        <input
                                            onFocus={() => setIsSearchOpen(true)}
                                            className="new-search-input"
                                            type="text"
                                            placeholder="Search"
                                            autoComplete="off"
                                            value={searchValue}
                                            onChange={(e) => dispatch(setSearchValue(e.target.value))}
                                        />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="glass"/>
                                    </form>


                                </div>

                                {!!searchValue.length && productsNames.length && isSearchOpen &&
                                    <div className="result-box">
                                        <div className="search-ul">
                                            {productsNames.map(item => (
                                                <div className="search-li" key={item.id}
                                                     onClick={() => chooseName(item)}>
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                }
                            </div>


                            <div className="user-block">
                                {!token ?
                                    <>
                                        <div className="sign-block">
                                            <Button text="LOGIN" className="active-button"
                                                    onClick={() => dispatch(setIsOpenLogin(true))}></Button>
                                        </div>
                                        <div className="sign-block"
                                        >
                                            <Button text="REGISTER" className="register-button"
                                                    onClick={() => navigate("/register")}></Button>
                                        </div>

                                    </>
                                    :
                                    <>
                                            <Notifications/>


                                        <div className="cart">
                                            <Link to="/basket">
                                                <FontAwesomeIcon icon={faCartShopping}
                                                                 className={window.location.pathname === "/basket" ? "cart-icon-active" : "cart-icon"}/>
                                            </Link>
                                        </div>

                                        <div className="cart">
                                            <Link to="/order">
                                                <FontAwesomeIcon icon={faCube}
                                                                 className={window.location.pathname === "/order" ? "cart-icon-active" : "cart-icon"}/>
                                            </Link>
                                        </div>

                                        <Profile/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                </header>

                <main className="main">
                    <Outlet/>
                </main>

                <footer className="footer">
                    <div className="footer-container">
                        <div className="footer-blocks">
                            <div className="footer-block">
                                <div className="footer-shop-info">
                                    <h3>Logo Story</h3>
                                </div>
                                <div className="footer-shop-info">
                                    <FontAwesomeIcon icon={faEnvelope} className="footer-icon"/>
                                    <span>info@stroykastore.ru</span>
                                </div>
                                <div className="footer-shop-info">
                                    <FontAwesomeIcon icon={faLocationDot} className="footer-icon"/>
                                    <span>Москва, ул. Камушкина 10</span>
                                </div>
                            </div>


                            <div className="footer-block">
                                <div className="footer-link"><Link>Profile</Link></div>
                                <div className="footer-link"><Link to="/order">Order</Link></div>
                                <div className="footer-link"><Link to="/basket">Basket</Link></div>
                            </div>
                            <div className="footer-block">
                                <div className="footer-link"><Link>Category</Link></div>
                                <div className="footer-link"><Link>Shares</Link></div>
                                <div className="footer-link"><Link>Contact</Link></div>
                            </div>
                            <div className="footer-block">
                                <div className="footer-link"><Link>Стать продавцом</Link></div>

                            </div>
                        </div>
                        <hr/>

                        <div className="footer-end">
                            <div className="footer-end-block">
                                <span>&copy; STORY</span>
                            </div>
                            <div className="footer-end-block">
                                <img src={visa} className="footer-cart"/>
                                <img src={group5} className="footer-cart"/>
                                <img src={group6} className="footer-cart"/>
                                <img src={sim} className="footer-cart"/>
                            </div>
                            <div className="footer-end-block">
                                <span>Cделано в KRUGLOV STUDIO</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <ModalRegister
                open={isOpenRegister} onClose={() => {
                setIsOpenRegister(false)
            }}/>
            <ModalLogin
                open={isOpenLogin} onClose={() => {
                dispatch(setIsOpenLogin(false))
            }}/>
        </>

    );
}

export default Layout;
