import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import axios from "axios";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faAngleDown, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenLogin} from "../../store/actions/login";
import {getProducts, setSearchValue} from "../../store/actions/home";

//main
const token = localStorage.getItem("token");

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isOpenRegister, setIsOpenRegister] = useState(false)
  // const [isOpenLogin, setIsOpenLogin] = useState(false)
  const statusKey = useSelector(state => state.registration.statusKey)
  const isOpenLogin = useSelector(state => state.login.isOpenLogin)
  const searchValue = useSelector(state => state.home.searchValue);
  const selectId = useSelector(state => state.home.selectId);
  const page = useSelector(state => state.home.page);
  const minPrice = useSelector(state => state.home.minPrice);
  const maxPrice = useSelector(state => state.home.maxPrice);
  const [limit, setLimit] = useState(12);
  const storeId = useSelector(state => state.home.storeId);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== " ") {
      navigate("/products");
      dispatch(getProducts({categoryId: selectId, page, limit, minPrice, maxPrice, s: searchValue || " ",}));
    }
  };


  return (
    <>
      <div className="wrapper">
        <header className="header">
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

                <Link className="nav-item" to="/products">
                  <li>Products</li>
                </Link>
                <Link className="nav-item" to="/category">
                  <li>Category</li>
                </Link>
                <Link className="nav-item" to="/#">
                  <li>Specialist</li>
                </Link>
                <Link className="nav-item" to="/#">
                  <li>Contact</li>
                </Link>
              </ul>


            </nav>

            <div className="search-block">
              <form onSubmit={handleSearch} className="form-search">
                <div className="search-field">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="glass"/>
                  <Input
                    value={searchValue}
                    onChange={(e) => dispatch(setSearchValue(e.target.value))}
                    className="search-input"
                    placeholder="Search"
                  />
                </div>
              </form>
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
                  <div className="cart">
                    <Link to="/#">
                      <FontAwesomeIcon icon={faCartShopping} className="cart-icon"/>
                    </Link>
                  </div>
                  <div className="user">
                    <Link to="/" className="user-img">
                      <FontAwesomeIcon icon={faUser} className="user-icon"/>
                    </Link>
                  </div>
                </>
              }
            </div>
          </div>
        </header>

        <main className="main">
          <Outlet/>
        </main>

        <footer className="footer">

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
