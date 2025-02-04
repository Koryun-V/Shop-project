import React, {useCallback, useEffect, useRef, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faAngleDown,
    faCartShopping,
    faUser,
    faCube,
    faEnvelope, faAddressCard, faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setIsOpenLogin} from "../../store/actions/login";
import {login} from "../../store/reducers/login";

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
    const statusUser = useSelector(state => state.login.statusUser)

    const userRef = useRef(null);


    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [token]);

    const onChange = (e) => {
        if (e.target.value !== " ") {
            setValue(e.target.value);
        }
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
                                    <Input value={value} onChange={onChange} className="search-input"
                                           placeholder="Search"/>
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
                                             onClick={() => {
                                                 !isProfile ? setIsProfile(true)
                                                     : setIsProfile(false)

                                             }
                                             }
                                             onMouseLeave={() => userRef.current?.focus()}

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
                                             tabIndex={0}
                                             ref={userRef}
                                             id="user-modal"
                                             onBlur={() => isMouse ? null : setIsProfile(false)}

                                             style={{
                                                 zIndex: isProfile ? 999 : -1,
                                                 opacity: isProfile ? 1 : 0,
                                                 height: isProfile ? 200 : 0,
                                                 visibility: isProfile ? "visible" : "hidden"
                                             }}
                                        >

                                            <ul className="user-func-item">
                                                <ul className="user-func-item">
                                                    {statusUser === "ok" ?
                                                        <>
                                                            <li className="user-modal-item">
                                                                <FontAwesomeIcon icon={faUser} className="icon"/>
                                                                <span>
                                                        {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)} {user.firstName.charAt(0).toUpperCase() + user.lastName.slice(1)}
                                                    </span>
                                                            </li>
                                                            <li>
                                                                <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                                                                <span>{user.email.charAt(0).toUpperCase() + user.email.slice(1)}</span>
                                                            </li>
                                                            <li>
                                                                <FontAwesomeIcon icon={faAddressCard} className="icon"/>
                                                                <span>Profile</span>
                                                            </li>
                                                        </>
                                                        :
                                                        <>
                                                            <li>
                                                                <div className="loading-gradient">
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="loading-gradient">
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="loading-gradient">
                                                                </div>
                                                            </li>
                                                        </>}
                                                </ul>

                                            </ul>

                                            <div className="log-out">
                                                <div className="button-block"
                                                     onMouseEnter={() => setIsMouse(true)}
                                                     onMouseLeave={() => {
                                                         setIsMouse(false)
                                                         userRef.current?.focus()
                                                     }}

                                                >
                                                    <Button onClick={() => {
                                                        localStorage.removeItem("token")
                                                        window.location.reload(true)
                                                    }}
                                                            text={<>
                                                                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{
                                                                    marginRight: 7,
                                                                }}/>
                                                                Log Out
                                                            </>}
                                                            type="button"
                                                            className="active-button">
                                                    </Button>

                                                </div>
                                            </div>

                                        </div>
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
