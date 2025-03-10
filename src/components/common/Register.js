import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    registrationUser,
    setDeleteEmail,
    setStatus,
    setStatusActive,
    setStatusKey, userDelete
} from "../../store/actions/registration";
import _ from "lodash"
import 'react-phone-input-2/lib/material.css'
import Input from "../mini/Input";
import Button from "../mini/Button";
import validator from "validator";
import bg from "../../assets/background/register.jpg"

import RadioButton from "../mini/RadioButton";
import PinInput from "../mini/PinInput";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Timer from "../mini/Timer";
import {useNavigate} from "react-router-dom";
import {setIsOpenLogin} from "../../store/actions/login";
import {login} from "../../store/reducers/login";

const fields = [
    {
        id: 1,
        name: "firstName",
        label: "First name",
        validation: /^[a-zA-Z]{2,20}$/,
        info: "Use only Latin characters, no space, symbols, or numbers.",
        maxLength: "20",
    },
    {
        id: 2,
        name: "lastName",
        label: "Last name",
        validation: /^[a-zA-Z]{2,30}$/,
        info: "Use only Latin characters, no space, symbols, or numbers.",
        maxLength: "30",
    },
    {
        id: 3,
        name: "day",
        label: "Day",
        validation: /^(0[1-9]|[12][0-9]|3[01])$/,
        maxLength: "2",
    },
    {
        id: 4,
        name: "month",
        label: "Month",
        validation: /^(0[1-9]|1[0-2])$/,
        maxLength: "2",
    },
    {
        id: 5,
        name: "year",
        label: "Year",
        validation: /^(19\d{2}|20(0[0-9]|1[0-4]))$/,
        maxLength: "4",
    },
    {
        id: 6,
        name: "email",
        label: "E-mail",
        validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        info: "Please enter correct e-mail.",
    },
    {
        id: 7,
        name: "password",
        label: "Password",
        validation: /^.{8,}$/,
        info: "Your password must be at least 8 characters long, or a mismatch.",
    },
    // long or password does not match /^(?=.*\d).{8,}$/,
    {
        id: 8,
        name: "repeatPassword",
        label: "RP/password",
        validation: "",
        info: "Password don't match.",
    },
]

const genderOptions = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'},
];

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isDate, setIsDate] = useState("")
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo
    const status = useSelector(state => state.registration.status)
    const statusKey = useSelector(state => state.registration.statusKey)
    const isEmail = useSelector(state => state.registration.deleteEmail)
    const [inputName, setInputName] = useState([]);
    const [isRegister, setIsRegister] = useState(false)
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        gender: "male",
        day: "",
        month: "",
        year: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const {firstName, lastName, gender, email, password, repeatPassword} = user

    const statusActive = useSelector(state => state.registration.statusActive)
    const [isCheck, setIsCheck] = useState(false)

    const [isAnimation, setIsAnimation] = useState(false)


    useEffect(() => {
        setIsDate("")
        setDateOfBirth(`${user.day}-${user.month}-${user.year}`);
        return () => {
            dispatch(setStatusKey(""))
            dispatch(setStatus(""))
        }
    }, [user.day, user.month, user.year]);

    useEffect(() => {
        if (user.day.length === 2 &&
            user.month.length === 2
            && user.year.length === 4) {
            validateDate(dateOfBirth)
        } else if (user.day > 29 && user.month === "02") {
            validateDate(dateOfBirth)
        }
    }, [dateOfBirth]);


    const validateDate = (value) => {
        if (
            validator.isDate(value, {
                format: "DD-MM-YYYY",
                strictMode: true
            })
            &&
            user.year < 2015
        ) {
            setIsDate("ok");
        } else {
            setIsDate("no");
        }
    };


    const deleteEmail = () => {
        (async () => {
            try {
                await dispatch(userDelete())
                await console.log("yes")
                // await dispatch(setStatusActive(""))
            } catch (err) {
                console.log(err)
            }
        })()
    }

    useEffect(() => {
        return () => statusActive === "pending" ? deleteEmail() : null
    }, []);

    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && firstName && lastName && password && repeatPassword && dateOfBirth && !inputName.length) {
            setIsRegister(true)
            dispatch(setDeleteEmail(true))

        } else {
            setIsRegister(false)
        }
    }, [user, inputName.length]);


    const onChange = (event) => {
        let v = event.target.value
        let n = event.target.name

        if (n === "day" || n === "month" || n === "year") {
            setUser((prevState) => (
                {...prevState, [n]: v.replace(/[^0-9+]/g, '')}
            ))
            setUserInfo({value: v.replace(/[^0-9+]/g, ''), title: n,})
        } else {
            setUser((prevState) => (
                {...prevState, [event.target.name]: event.target.value}
            ))
            setUserInfo({value: v, title: n})
        }
    }

    useEffect(() => {
        if (statusKey === "ok") {
            const time = setTimeout(() => {
                setIsCheck(true)
            }, 1000);
            return () => clearTimeout(time)
        }
    }, [statusKey]);

    useEffect(() => {
        if (isCheck) {
            const time = setTimeout(() => {
                setIsAnimation(true)
            }, 100);
            return () => clearTimeout(time)
        }
    }, [isCheck]);

    useEffect(() => {
        if (isAnimation) {
            const time = setTimeout(() => {
                navigate("/")
                dispatch(setStatus(""))
                dispatch(setStatusKey(""))
                dispatch(setIsOpenLogin(true))
            }, 2000);
            return () => clearTimeout(time)
        }
    }, [isAnimation]);


    const test = () => {
        fields.forEach(({validation, name, id}) => {
                if (title === name) {
                    let test = name !== "repeatPassword" ? validation.test(value) : null
                    if (test === false || !value.length || isDate === "no" ||
                        user["repeatPassword"].length && user["password"] !== user["repeatPassword"]) {
                        setInputName((prevState) => (_.uniq([...prevState, title])))
                    } else if (title === "password" || title === "repeatPassword" && user.repeatPassword === user.password) {
                        const filter = inputName.filter(item => item !== "repeatPassword" && item !== "password");
                        setInputName(filter)

                    } else if (isDate === "ok") {
                        const filter = inputName.filter(item => item === "day" && item === "month" && item === "year");
                        setInputName(filter)

                    } else {
                        const filter = inputName.filter(item => item !== title)
                        setInputName(filter)
                    }
                }
            }
        )
    }

    const register = (e) => {
        if (isRegister) {
            dispatch(setDeleteEmail(true))
            e.preventDefault();
            dispatch(registrationUser({firstName, lastName, gender, email, password, dateOfBirth}))
        }
    }


    return (
        <div className="section">
            <div className="container"
                 style={{
                     width: "70%",
                     border: "2px solid #e3e3e3",
                     padding: 30,
                     marginTop: 20,
                     minHeight: 695,
                     borderRadius: 5,

                 }}
            >

                <div className="container-register">
                    <button onClick={() => dispatch(userDelete())}>click</button>

                    <div className="container-form" style={{width: 320}}>
                        <div className="title">
                            <span>Create a new Account</span>
                        </div>
                        {status !== "ok" ? <form onSubmit={register}>
                                {fields.map((field) => (
                                    <div className="field-block" key={field.id}>
                                        <div style={{height: "50px"}}>
                                            <Input
                                                name={field.name}
                                                maxLength={field.maxLength}
                                                onBlur={test}
                                                className="input"
                                                {...field}
                                                onChange={onChange}
                                                value={user[field.name]}
                                                id={field.id}
                                                autoComplete="off"
                                                label={field.label}
                                                classNameLabel={user[field.name].length ? "active" : "label"}
                                                status={status}
                                            /></div>


                                        <div className="validation-info">
                                            {inputName.map(((item, index) => (
                                                item === field.name ?
                                                    <>
                                                        <div className="test2"></div>
                                                        <span>{!user[item].length ? "Field Required" : field.info}</span>
                                                    </> : null)))}
                                        </div>
                                    </div>

                                ))}

                                <div className="gender-radio-group">
                                    <span>Gender</span>
                                    <div className="gender-block">
                                        {genderOptions ? genderOptions.map((option) => (

                                            <RadioButton
                                                key={option.value}
                                                name="gender"
                                                value={option.value}
                                                checked={user.gender === option.value}
                                                onChange={onChange}
                                                label={option.label}
                                            />
                                        )) : null}
                                    </div>
                                </div>

                                <div className="form-button-block" style={{marginTop: 20}}>
                                    <Button status={status} text="CONTINUE" type={isRegister ? "submit" : "button"}
                                            className={isRegister && status !== "pending" ? "active-button"
                                                : isRegister && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                                </div>
                            </form>
                            : !isCheck ?
                                <div className="container-form" style={{
                                    marginTop: 50,

                                }}>

                                    <div className="email-icon-block">
                                        <div className="email-line-block">
                                            <div className="email-line"></div>
                                            <div className="email-line"></div>
                                            <div className="email-line"></div>
                                        </div>
                                        <FontAwesomeIcon icon={faEnvelope} className="email"/>
                                    </div>

                                    <div className="email-text">
                                        <span>Enter Confirmation Code</span>
                                        <span>Enter the confirmation code we sent to ebba93@ethereal.email</span>
                                    </div>

                                    <div className="pin-block">
                                        <PinInput/>
                                    </div>

                                    <div className="timer">
                                        <Timer email={email}/>
                                    </div>

                                </div>

                                :
                                <div className="check-container">
                                    <div className="check-block" style={{
                                        opacity: isAnimation ? 1 : 0,
                                        zIndex: isAnimation ? 1 : -1,
                                    }}>
                                        <div className="key">
                                            <div className="check-circle">
                                                <div className="check-mark" style={{
                                                    width: isAnimation ? 85 : 0,
                                                    transform: isAnimation ? "rotate(45deg)" : "none",
                                                }}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="check-text" style={{
                                            opacity: statusKey === "ok" ? 1 : 0,
                                        }}>
                                        <span>
                                            You have successfully registered!
                                        </span>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="status-block">
                        <div className="status-register">
                            <div className="line-status"
                                 style={{
                                     height: status === "ok" && isCheck && statusKey === "ok" ? "100%" :
                                         status === "ok" ? "50%" : 0
                                 }}></div>

                        </div>
                        <div className="circle"></div>
                        <div className="circle"
                             style={{background: status === "ok" ? "limegreen" : "#979797"}}></div>
                        <div className="circle"
                             style={{background: statusKey === "ok" ? "limegreen" : "#979797"}}></div>
                    </div>
                </div>
                <div className="container-register-img">
                <img src={bg} className="register-img"/>
                </div>


            </div>
        </div>
    );
}


export default Register;

