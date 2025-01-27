import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordUser, loginUser, setIsOpenLogin, setStatus} from "../../../store/actions/login";
import Input from "../../mini/Input";
import Button from "../../mini/Button";
import {ReactComponent as Close} from "../../../assets/icon/close-x.svg"
import _ from "lodash";
import {useNavigate} from "react-router-dom";


const fields = [
    {
        id: 1,
        name: "email",
        label: "E-mail",
        validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        info: "Please enter correct e-mail.",
    },
    {
        id: 2,
        name: "password",
        label: "Password",
        validation: /^(?=.*\d).{8,}$/,
        info: "Password must be at least 8 characters long",
    },
]


function ModalLogin({open, onClose}) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.login.status)
    const token = useSelector(state => state.login.token)
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()
    const [inputName, setInputName] = useState([]);
    const [isForgot, setIsForgot] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo

    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    console.log(status)

    const {email, password} = user

    const scrollModal = () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('width');
        document.body.ontouchmove = () => true;
        window.removeEventListener("keydown", handleEsc)
    }

    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && password && !inputName.length && !isForgot) {
            setIsLogin(true)
        } else if (isForgot && email && !inputName.length) {
            setIsForgotPassword(true)
        } else {
            setIsLogin(false)
            setIsForgotPassword(false)

        }
    }, [user, inputName.length, isForgot]);

    const handleEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, []);


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
            setIsForgot(false)
            setUser({
                email: "",
                password: ""
            })
            setInputName([])
            setUserInfo({
                title: "",
                value: "",
            })
        }
    }, [open]);


    const onChange = (event) => {

        let v = event.target.value
        let n = event.target.name


        setUser((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
        setUserInfo({value: v, title: n})
        if (status === "error") dispatch(setStatus(""))
    }


    const login = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(loginUser({email, password}))
        }
    }
    const getForgotPassword = (e) => {
        e.preventDefault();
        if (isForgotPassword) {
            dispatch(forgotPasswordUser({email}))
        }
    }

    const test = () => {

        fields.forEach(({validation, name, id}) => {
                if (title === name) {
                    let test = validation.test(value)
                    if (test === false || !value.length) {
                        setInputName((prevState) => (_.uniq([...prevState, title])))
                        console.log("if")
                    } else {
                        const filter = inputName.filter(item => item !== title)
                        setInputName(filter)
                        console.log("else")
                    }
                }
            }
        )
    }


    const forgotPassword = () => {
        setIsForgot(true);
        setUser({
            email: "",
            password: ""
        })
        setInputName([])
        setUserInfo({
            title: "",
            value: "",
        })
    }

    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div onClick={onClose} className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>{isForgot ? "Reset password" : "LOGIN"}</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">
                    <div className="container-modal">
                        {!isForgot ?
                            <>
                                <div className="background-login"></div>
                                <div className="container-form">
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
                                                        onBlur={test}
                                                        onChange={onChange}
                                                        value={user[field.name]}
                                                        // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                                        id={field.id}
                                                        label={field.label}
                                                        classNameLabel={user[field.name].length ? "active" : "label"}
                                                    />
                                                </div>

                                                <div className="validation-info">

                                                    {status === "error" && field.name === "password" ?
                                                        <span>Wrong login or password.</span>
                                                        :


                                                        inputName.map(((item, index) => (
                                                            item === field.name ?
                                                                <>
                                                                    <div className="test2"></div>
                                                                    <span>{status === "error" ? "Wrong login or password." : !user[item].length ? "Field Required" : field.info}</span>
                                                                </> :
                                                                status === "error" ?
                                                                    <span>Wrong login or password.</span>
                                                                    : null

                                                        )))}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="forgot-block">
                                            <span onClick={forgotPassword}>Forgot password ?</span>
                                        </div>
                                        <div className="form-button-block" style={{marginTop: 20}}>
                                            <Button status={status} text="LOGIN" type={isLogin ? "submit" : "button"}
                                                    className={isLogin && status !== "pending" ? "active-button"
                                                        : isLogin && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                                        </div>
                                        <div className="register-now">
                                            <div className="text">
                                                <div className="line"></div>
                                                <span>Don't have an account ?</span>
                                                <div className="line"></div>

                                            </div>

                                            <div className="form-button-block">
                                                <Button
                                                    onClick={()=> {
                                                        dispatch(setIsOpenLogin(false))
                                                        navigate("/register")
                                                    }}
                                                    text="REGISTER-NOW" className="register-button"
                                                    type="button">
                                                </Button>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                            </>
                            :
                            <div className="container-form">
                                <form onSubmit={getForgotPassword}>
                                    <div className="login">
                                        <div style={{
                                            height: "50px",
                                        }}>
                                            <Input
                                                name={fields[0].name}
                                                maxLength={fields[0].maxLength}
                                                onBlur={test}
                                                className="input"
                                                onChange={onChange}
                                                value={user[fields.name]}
                                                id={fields[0].id}
                                                autoComplete="off"
                                                label={fields[0].label}
                                                classNameLabel={user[fields[0].name].length ? "active" : "label"}
                                            />
                                        </div>
                                        <div className="validation-info">
                                            {inputName.map(((item, index) => (
                                                item === fields[0].name ?
                                                    <>
                                                        <div className="test2"></div>
                                                        <span>{!user[item].length ? "Field Required" : fields[0].info}</span>
                                                    </> : null)))}
                                        </div>
                                    </div>

                                    <div className="form-button-block">
                                        <Button status={status} text="CONTINUE"
                                                className={isForgotPassword && status !== "pending" ? "active-button"
                                                    : isForgotPassword && status === "pending" ? "pending-button" : "disabled"}
                                                type={isForgotPassword ? "submit" : "button"}>LOGIN
                                        </Button>
                                    </div>
                                </form>

                            </div>
                        }

                    </div>

                </div>
            </div>
        </div>,
        document.body
    )
        ;
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
