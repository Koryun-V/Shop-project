import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {registrationUser} from "../../store/actions/registration";
import _ from "lodash"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Input from "../mini/Input";
import Button from "../mini/Button";

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
        validation: /^[0-9]{2}$/,
        maxLength: "2",

    },
    {
        id: 4,
        name: "month",
        label: "Month",
        validation: /^[0-9]{2}$/,
        maxLength: "2",
    },
    {
        id: 5,
        name: "year",
        label: "Year",
        validation: /^[0-9]{4}$/,
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
        validation: /^(?=.*\d).{8,}$/,
        info: "Your password must be at least 8 characters long.",
    },
    {
        id: 8,
        name: "repeatPassword",
        label: "Repeat password",
        validation: "",
        info: "Password don't match.",
    },
]


const Register = () => {
    const dispatch = useDispatch();
    // const status = useSelector(state => state.register.status)
    // const token = useSelector(state => state.register.token)
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const [eye, setEye] = useState(faEyeSlash)
    const inputRef = useRef(null)
    const {value, title} = userInfo

    const [inputName, setInputName] = useState([]);
    const [isRegister, setIsRegister] = useState(false)

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        day: "",
        month: "",
        year: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [phone, setPhone] = useState("");


    const {email, firstName, lastName, password} = user


    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && firstName && lastName && password && phone && !inputName.length) {
            setIsRegister(true)
        } else {
            setIsRegister(false)
        }
    }, [user, inputName.length, phone]);


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
        console.log(user)
    }
    console.log(phone.length)
    // if (status === "error") dispatch(setStatus(""))


    const test = () => {
        fields.forEach(({validation, name, id}) => {
            if (title === name) {
                let test = name !== "repeatPassword" ? validation.test(value) : null
                if (test === false || !value.length || title === "repeatPassword" && user["password"] !== user["repeatPassword"]) {
                    setInputName((prevState) => (_.uniq([...prevState, title])))
                } else {
                    const filter = inputName.filter(item => item !== title)
                    setInputName(filter)
                }
            }
        })
    }

    const register = (e) => {
        if (isRegister) {
            e.preventDefault();
            dispatch(registrationUser({email, firstName, lastName, password, phone}))
            setIsRegister(true)
        }
    }


    return (
        <div className="section">
            <div className="container">
                <div className="container-login">
                    <form onSubmit={register}>
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
                                    /></div>


                                <span className={user[field.name].length ? "active" : "label"}>{field.label}</span>

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


                        <div className="register-button">
                            <Button text="CONTINUE"  type={isRegister ? "submit" : "button"} className={isRegister ? "active-button" : "disabled"}>Text</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Register;

// {item === field.name && user[item].length ?
//     <>
//         <span className="validation-info">{field.validationInfo}</span>
//         <div className="test2" ></div>
//     </>
//     :
//     item === field.name && !user[item].length ?
//         <>
//             <span className="validation-info">Field Required</span>
//             <div className="test2" style={{
//                 borderBottom:item !== field.name ? "3px solid green" : "3px solid red",
//             }}></div>
//         </> :
//         null
// }
