import React, {useEffect, useState} from 'react';
import Input from "../../mini/Input";
import Button from "../../mini/Button";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {changePasswordUser, resendCode, setEmail, setStatusCode, setStatusForgot} from "../../../store/actions/login";
import {resendActivateUser} from "../../../store/actions/registration";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faStopwatch20} from "@fortawesome/free-solid-svg-icons";

const fields = [
    {
        id: 1,
        name: "key",
        label: "Enter 6 number code",
        validation: /^[a-z0-9]{6}$/,
        maxLength: 6,
        info: "Verification code is incorrect",
    },
    {
        id: 2,
        name: "password",
        label: "Create new password",
        validation: /^.{8,}$/,
        info: "Your password must be at least 8 characters long, or a mismatch.",
    },
    {
        id: 3,
        name: "repeatPassword",
        label: "Confirm new password",
        validation: "",
        info: "Password don't match.",
    },
]

const ModalNewPassword = ({isModalClose}) => {
    const dispatch = useDispatch()
    const [inputName, setInputName] = useState([]);
    const status = useSelector(state => state.login.statusNewPassword)
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [time, setTime] = useState(60);
    const [timeWidth, setTimeWidth] = useState(0);
    const email = useSelector(state => state.login.email)
    const [start, setStart] = useState(true);

    const [newPassword, setNewPassword] = useState({
        key: "",
        password: "",
        repeatPassword: "",
    })
    const {key, password, repeatPassword} = newPassword;
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })

    const {value, title} = userInfo


    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (key && password && repeatPassword && !inputName.length) {
            setIsChangePassword(true)

        } else {
            setIsChangePassword(false)

        }
    }, [newPassword, inputName.length]);

    useEffect(() => {
        if (start) {
            let timer = setInterval(() => {
                setTime((time) => {
                    if (time === 0) {
                        clearInterval(timer);
                        setStart(false);
                        return 0;
                    } else return time - 1;
                });

            }, 100);

            let timerWidth = setInterval(() => {
                setTimeWidth((time) => {
                    if (time === 100) {
                        clearInterval(timerWidth);
                        setStart(false);
                        return 100;
                    } else return time + 1;
                });

            }, 60);

        }


    }, [start]);


    const onChange = (event) => {

        let v = event.target.value
        let n = event.target.name
        // if (n === "key") {
        //     setNewPassword((prevState) => (
        //         {...prevState, [n]: v.replace(/[^0-9+]/g, '')}
        //     ))
        //     setUserInfo({value: v.replace(/[^0-9+]/g, ''), title: n,})
        // } else {
        //     setNewPassword((prevState) => (
        //         {...prevState, [event.target.name]: event.target.value}
        //     ))
        //     setUserInfo({value: v, title: n})
        setNewPassword((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
        setUserInfo({value: v, title: n})

        if (status === "error") dispatch(setStatusCode(""))
    }

    const test = () => {
        if (!isModalClose) {
            fields.forEach(({validation, name, id}) => {
                    if (title === name) {
                        let test = name !== "repeatPassword" ? validation.test(value) : null

                        if (test === false || !value.length ||
                            newPassword["repeatPassword"].length && newPassword["password"] !== newPassword["repeatPassword"]) {
                            setInputName((prevState) => (_.uniq([...prevState, title])))
                        } else if (title === "password" || title === "repeatPassword" && newPassword.repeatPassword === newPassword.password) {
                            const filter = inputName.filter(item => item !== "repeatPassword" && item !== "password");
                            setInputName(filter)

                        } else {
                            const filter = inputName.filter(item => item !== title)
                            setInputName(filter)
                        }


                    }

                }
            )
        }

    }
    const changePassword = (e) => {
        e.preventDefault();
        if (isChangePassword) {
            dispatch(changePasswordUser({newPassword: password, key}))
            // dispatch(setStatusCode(""))
            // dispatch(setStatusForgot(""))
            // dispatch(setEmail(""))
        }
    }
    return (
        <div className="container-form">

            <form onSubmit={changePassword}>
                <div className="timer-resend">
                    <div className="timer-loading" style={{
                        width: timeWidth,
                    }}>
                    </div>
                    {time === 0 ?
                        <div className="sms-code" onClick={() => {
                            setTimeWidth(0)
                            setTime(60)
                            setStart(true);
                            dispatch(resendCode({email}))
                        }}>
                            <span>SMS Code</span>
                        </div>
                        :
                        <div className="timer-block" style={{
                            color: time >= 35 ? "white" : "white"
                        }}>
                            <FontAwesomeIcon icon={faClock} className="clock"/>
                            <span className="span-timer">{time}</span>
                        </div>

                    }
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="login" style={{
                        width: index === 0 ? "200px" : "320px",
                    }}>
                        <div
                            style={{
                                height: "50px",
                            }}>
                            <Input
                                maxLength={field.maxLength}
                                name={field.name}
                                className="input"
                                {...field}
                                onBlur={test}
                                onChange={onChange}
                                value={newPassword[field.name]}
                                // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                id={field.id}
                                label={field.label}
                                classNameLabel={newPassword[field.name].length ? "active" : "label"}
                                status={status}
                                autoComplete="off"

                            />
                        </div>

                        <div className="validation-info">
                            {inputName.map(((item, index) => (
                                item === field.name ?
                                    <>
                                        <div className="test2"></div>
                                        <span>{!newPassword[item].length ? "Field Required" : field.info}</span>
                                    </> : null
                            )))}
                        </div>
                    </div>
                ))}
                <div className="form-button-block">
                    <Button status={status} text="CHANGE PASSWORD" type={isChangePassword ? "submit" : "button"}
                            className={isChangePassword && status !== "pending" ? "active-button"
                                : isChangePassword && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                </div>
            </form>
        </div>
    );
};

export default ModalNewPassword;
