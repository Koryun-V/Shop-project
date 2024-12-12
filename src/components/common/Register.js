import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {registrationUser} from "../../store/actions/registration";
import _ from "lodash"
import 'react-phone-input-2/lib/material.css'
import Input from "../mini/Input";
import Button from "../mini/Button";
import validator from "validator";

import "react-datepicker/dist/react-datepicker.css";

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
        validation: /^(?=.*\d).{8,}$/,
        info: "Your password must be at least 8 characters long or password does not match",
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
    const [isDate, setIsDate] = useState("")
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo

    const [inputName, setInputName] = useState([]);
    const [isRegister, setIsRegister] = useState(false)
    const [date, setDate] = useState("")
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
    const {email, firstName, lastName, password, repeatPassword} = user


    useEffect(() => {
        setIsDate("")
        setDate(`${user.day}-${user.month}-${user.year}`);
    }, [user.day, user.month, user.year]);

    useEffect(() => {
        if (user.day.length === 2 &&
            user.month.length === 2
            && user.year.length === 4) {
            validateDate(date)
        } else if (user.day > 29 && user.month === "02") {
            validateDate(date)
        }
    }, [date]);

    console.log(date)

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


    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && firstName && lastName && password && repeatPassword && date && !inputName.length) {
            setIsRegister(true)
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
                        const filter = inputName.filter(item => item !== "day" && item !== "month" && item !== "year");
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
            e.preventDefault();
            dispatch(registrationUser({email, firstName, lastName, password}))
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
                                        label={field.label}
                                        classNameLabel={user[field.name].length ? "active" : "label"}
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


                        <div className="register-button">
                            <Button text="CONTINUE" type={isRegister ? "submit" : "button"}
                                    className={isRegister ? "active-button" : "disabled"}>Text</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Register;

