import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setStatus} from "../../../store/actions/login";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Input from "../../mini/Input";
import Button from "../../mini/Button";

const fields = [
    {
        id: 1,
        name: "email",
        label: "Email",
    },
    {
        id: 2,
        name: "password",
        label: "Password",
        type: "password",

    },
]


function ModalLogin({open, onClose}) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.login.status)
    const token = useSelector(state => state.login.token)
    const [isLogin, setIsLogin] = useState(false)
    const [inputName, setInputName] = useState([]);
    const [eye, setEye] = useState(faEyeSlash)

    const [user, setUser] = useState({
        email: "",
        password: "",
    })


    const {email, password} = user

    const scrollModal = () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('width');
        document.body.ontouchmove = () => true;
        window.removeEventListener("keydown", handleEsc)
    }


    const handleEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, []);
    useEffect(() => {
        if (email && password) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [user]);
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
            window.location.reload(true);
        }
    }, [token]);

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    document.body.style.width = ` ${document.body.getBoundingClientRect().width}px`
                    document.body.style.overflowY = 'hidden';
                    document.body.ontouchmove = () => false;
                    window.addEventListener('keydown', handleEsc);

                } catch (err) {
                    console.log(err)
                }
            })()
        } else {
            scrollModal()
        }
    }, [open]);


    const onChange = (event) => {
        setUser((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
        if (status === "error") dispatch(setStatus(""))
    }


    const login = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(loginUser({email, password}))
        }
    }


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div onClick={onClose} className="shadow">
            </div>
            <div id="modal_window">
                <div className="modal-block">
                    <div className="container-login">
                        <form onSubmit={login}>
                            {fields.map((field) => (
                                <div key={field.id} className="login">
                                    <div style={{
                                        height: "50px",
                                    }}>
                                        <Input
                                            name={field.name}
                                            className="input"
                                            {...field}
                                            onChange={onChange}
                                            value={user[field.name]}
                                            // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                            id={field.id}
                                            label={field.label}
                                            classNameLabel={user[field.name].length ? "active" : "label"}
                                        />
                                    </div>


                                </div>
                            ))}
                            <div className="register-button">
                                <Button text="LOGIN" className={isLogin ? "active-button" : "disabled"}
                                        type={isLogin ? "submit" : "button"}>LOGIN
                                </Button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

ModalLogin.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalLogin;
