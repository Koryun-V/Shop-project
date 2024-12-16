import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import axios from "axios";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faAngleDown, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons";

//main
const token = localStorage.getItem("token");

function Layout() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)


    const [value, setValue] = useState("");

    const onChange = (e) => {
        if (e.target.value !== " ") {
            setValue(e.target.value);
        }
    }

    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <div className="container">
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
                                <Link className="nav-item" to="/#">
                                    <li>Specialist</li>
                                </Link>
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
                                                onClick={() => setIsOpenLogin(true)}></Button>
                                    </div>
                                    <div className="sign-block"
                                    >
                                        <Button text="REGISTER" className="register-button"
                                        onClick={()=>navigate("/register")}></Button>
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
                setIsOpenLogin(false)
            }}/>
        </>

    );
}

export default Layout;
