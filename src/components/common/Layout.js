import React, {useCallback, useEffect, useRef, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faAngleDown, faCartShopping, faUser, faCube} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setIsOpenLogin} from "../../store/actions/login";

//main
const token = localStorage.getItem("token");

function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const user = useSelector(state => state.login.user)
    // const [isOpenLogin, setIsOpenLogin] = useState(false)
    const statusKey = useSelector(state => state.registration.statusKey)
    const isOpenLogin = useSelector(state => state.login.isOpenLogin)
    const [value, setValue] = useState("");
    const [isProfile, setIsProfile] = useState(false)
    const [isMouse, setIsMouse] = useState(false);

    const userRef = useRef(null);

    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [token]);
    console.log(user)

    const onChange = (e) => {
        if (e.target.value !== " ") {
            setValue(e.target.value);
        }
    }


    console.log(isProfile)


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

                                <Link className="nav-item" to="/#">
                                    <li>Products</li>
                                </Link>
                                <Link className="nav-item" to="/#">
                                    <li>Category</li>
                                </Link>
                                {/*<Link className="nav-item" to="/#">*/}
                                {/*    <li>Specialist</li>*/}
                                {/*</Link>*/}
                                <Link className="nav-item" to="/#">
                                    <li>Contact</li>
                                </Link>
                            </ul>


                        </nav>

                        <div className="search-block">
                            <div className="search-field">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="glass"/>
                                <Input value={value} onChange={onChange} className="search-input" placeholder="Search"/>
                            </div>
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

                                    <div className="cart">
                                        <Link to="/">
                                            <FontAwesomeIcon icon={faCube} className="cart-icon"/>
                                        </Link>
                                    </div>

                                    <div className="user"
                                         ref={userRef}
                                         onClick={() => {
                                             !isProfile ? setIsProfile(true)
                                                 : setIsProfile(false)
                                         }
                                         }
                                        // onBlur={()=>setIsProfile(false)}
                                    >
                                        <Link to="/" className="user-img"
                                              style={{
                                                  border: isProfile ? "2px solid limegreen" : "2px solid #d1d1d1",
                                              }}>
                                            <FontAwesomeIcon icon={faUser} className="user-icon"

                                            />
                                            <FontAwesomeIcon icon={faAngleDown} className="user-arrow"
                                                             style={{
                                                                 color: isProfile ? "limegreen" : "#d1d1d1",
                                                                 transform: isProfile ? "rotate(180deg)" : "none"
                                                             }}
                                            />
                                        </Link>
                                    </div>


                                    <div className="user-func"
                                         onFocus={() => setIsProfile(true)}
                                         onBlur={() => setIsProfile(false)}
                                         style={{
                                             zIndex: isProfile ? 999 : -1,
                                             opacity: isProfile ? 1 : 0,
                                             height: isProfile ? 200 : 0,
                                         }}
                                    >
                                        <ul className="user-func-item">
                                            {/*<li><img src="#"/>{user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</li>*/}
                                            {/*<li><img src="#"/>{user.email.charAt(0).toUpperCase() + user.email.slice(1)}</li>*/}
                                            <li><img src="#"/>Profile</li>
                                        </ul>

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
