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


import {
  getAllProducts,
  setSearchValue,
  getAllNames,
  setNameData,
  setUserId,
  getStores,
  clearProductNames
} from "../../store/actions/home";
import Notifications from "./Notifications";
import Profile from "./Profile";

//main
const token = localStorage.getItem("token");

function Layout() {
  const [limit, setLimit] = useState(12);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [haveNames, setHaveNames] = useState(false)

  const searchRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false)
  const user = useSelector(state => state.login.user)
  // const [isOpenLogin, setIsOpenLogin] = useState(false)
  const statusKey = useSelector(state => state.registration.statusKey)
  const isOpenLogin = useSelector(state => state.login.isOpenLogin)
  const [value, setValue] = useState("");
  const [isProfile, setIsProfile] = useState(false)
  const [isMouse, setIsMouse] = useState(false);
  const statusUser = useSelector(state => state.login.statusUser)
  const [avatar, setAvatar] = useState([])
  const userRef = useRef(null);
  const searchValue = useSelector(state => state.home.searchValue);
  const selectId = useSelector(state => state.home.selectId);
  const page = useSelector(state => state.home.page);
  const minPrice = useSelector(state => state.home.minPrice);
  const maxPrice = useSelector(state => state.home.maxPrice);
  const storeId = useSelector(state => state.home.storeId);
  const productsNames = useSelector(state => state.home.productsNames);
  const userId = useSelector(state => state.login.user?.id);
  const nameData = useSelector(state => state.home.nameData);
  const stores = useSelector(state => state.home.storesList)


  const {pathname} = useLocation()

  useEffect(() => {
    dispatch(getStores({page: 1, limit: 10}))
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])


  useEffect(() => {
    if (user) {
      dispatch(setUserId(user.id))
    }
  }, [user]);

  useEffect(() => {
    dispatch(clearProductNames());
    dispatch(getAllNames({page, limit, s: searchValue || ""}));
  }, [searchValue]);

  useEffect(() => {
    setHaveNames(Array.isArray(productsNames) && productsNames.length > 0);
  }, [productsNames]);


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
  console.log(window.location.pathname)


  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = searchValue.trim();

    if (!trimmedSearch) {
      // Don't do anything if search is empty
      return;
    }

    setIsSearchOpen(false);
    navigate("/products");

    const searchParams = {
      page,
      limit,
      minPrice,
      maxPrice,
      s: trimmedSearch,
      storeId,
    };

    if (userId) {
      searchParams.userId = userId;
    }

    dispatch(getAllProducts(searchParams));
  };


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
                  Multify
                </div>
              </Link>

              <nav className="nav">
                <ul className="nav-list">

                  <li className="nav-item">Store
                    <FontAwesomeIcon icon={faAngleDown} className="store-arrow"/>
                    <ul className="nav-more">
                      {stores.map((item) => (
                        <li>
                          <div className="store-logo">
                            {/*<img src={item.storeLogo[0].path} alt="logo"/>*/}
                          </div>
                          {/*<div className="store-name">*/}
                          {/*    <span>{item.name}</span>*/}
                          {/*</div>*/}
                        </li>

                      ))}


                    </ul>
                  </li>

                  <Link className="nav-item" to="/products">
                    <li>Products</li>
                  </Link>
                  <Link className="nav-item" to="/contact">
                    <li>Contact</li>
                  </Link>
                </ul>


              </nav>


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
                    <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className="glass"/>
                  </form>


                </div>

                {!!searchValue.length && haveNames && isSearchOpen && (
                  <div className="result-box">
                    <div className="search-ul">
                      {productsNames.map((item) => (
                        <div className="search-li" key={item.id} onClick={() => chooseName(item)}>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

                    <Link to="/basket">
                      <div className="cart">

                        <FontAwesomeIcon icon={faCartShopping}
                                         className={window.location.pathname === "/basket" ? "cart-icon-active" : "cart-icon"}/>

                      </div>
                    </Link>
                    <Link to="/order">
                      <div className="cart">

                        <FontAwesomeIcon icon={faCube}
                                         className={window.location.pathname === "/order" ? "cart-icon-active" : "cart-icon"}/>

                      </div>
                    </Link>
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
                <div className="footer-link"><Link to="/user">Profile</Link></div>
                <div className="footer-link"><Link to="/order">Order</Link></div>
                <div className="footer-link"><Link to="/basket">Basket</Link></div>
              </div>
              <div className="footer-block">
                <div className="footer-link"><Link>Share</Link></div>
                <div className="footer-link"><Link>Contact</Link></div>
              </div>
              <div className="footer-block">
                <div className="footer-link"><Link>Become a seller</Link></div>

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
