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
    faEnvelope, faAddressCard, faArrowRightFromBracket, faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setIsOpenLogin} from "../../store/actions/login";
import {login} from "../../store/reducers/login";
import visa from "../../assets/icon/Visa.svg"
import group5 from "../../assets/icon/Group_5.svg"
import group6 from "../../assets/icon/Group_6.svg"
import sim from "../../assets/icon/sim.svg"
import axios from "axios";


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
    const [avatar, setAvatar] = useState([])
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

    // useEffect(() => {
    //     if (isProfile) {
    //         document.querySelector('.wrapper').onmousemove = function (e) {
    //             setIsMouse(true)
    //         }
    //         document.querySelector('.wrapper').onMouseLeave = function (e) {
    //             setIsMouse(false)
    //         }
    //     }
    //
    // }, [window.body, isProfile]);


    // const func = async () => {
    //     try {
    //         // const formData = new FormData();
    //         // formData.append("firstName", "esim");
    //         // formData.append("lastName", "esim");
    //         // formData.append("gender", "male");
    //         // formData.append("dateOfBirth", "2000-10-10");
    //         // formData.append("avatar", avatar);
    //         const {data} = await axios.put(`https://world-of-construction.onrender.com/users/update`,
    //             {
    //                 firstName:"esim",
    //                 lastName:"esim",
    //                 gender:"male",
    //                 dateOfBirth:"2000-10-10",
    //                 avatar:avatar[0],
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const animUser = () => {
        if (!isProfile) {
            setIsProfile(true);
            // setIsMouse(true)


        } else {
            setIsProfile(false);
            // setIsMouse(false)

        }

    }
    console.log(avatar)
    return (
        <>
            <div className="wrapper">
                {/*<button onClick={func}>click</button>*/}

                {/*<input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files)}/>*/}

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
                                            <Link to="/order">
                                                <FontAwesomeIcon icon={faCube} className="cart-icon"/>
                                            </Link>
                                        </div>

                                        <div className="user"
                                             onClick={animUser}
                                             onMouseEnter={() => setIsMouse(false)}
                                             onMouseLeave={() => {
                                                 setIsMouse(true)
                                                 userRef.current.focus()
                                             }}

                                        >
                                            <Link className="user-img"
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
                                            // onMouseLeave={() => setIsMouse(true)}
                                            // onMouseEnter={() => setIsMouse(false)}
                                             onBlur={() => isMouse ? setIsProfile(false) : null}

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
                                                     onMouseEnter={() => setIsMouse(false)}
                                                     onMouseLeave={() => {
                                                         setIsMouse(true)
                                                         userRef.current.focus()
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
                                <div className="footer-link"><Link>Basket</Link></div>
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
