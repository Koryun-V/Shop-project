import React, {useEffect, useState} from 'react';
import Input from "../../mini/Input";
import Button from "../../mini/Button";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {changePasswordUser} from "../../../store/actions/login";

const fields = [
    {
        id: 1,
        name: "key",
        label: "Enter 6 number code",
        validation: /^\d{6}$/,
        maxLength:6,
        info: "Verification code is incorrect",
    },
    {
        id: 2,
        name: "password",
        label: "Create new password",
        validation: /^(?=.*\d).{8,}$/,
        info: "Your password must be at least 8 characters long, or a mismatch",
    },
    {
        id: 3,
        name: "repeatPassword",
        label: "Confirm new password",
        validation:"",
        info: "Password don't match.",
    },
]

const ModalNewPassword = () => {
    const dispatch = useDispatch()
    const [inputName, setInputName] = useState([]);
    const status = useSelector(state => state.login.statusNewPassword)
    const [isChangePassword, setIsChangePassword] = useState(false)

    const [newPassword, setNewPassword] = useState({
        key: "",
        password: "",
        repeatPassword: "",
    })
    const {key,password, repeatPassword} = newPassword;
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


    const onChange = (event) => {

        let v = event.target.value
        let n = event.target.name
        if (n === "key") {
            setNewPassword((prevState) => (
                {...prevState, [n]: v.replace(/[^0-9+]/g, '')}
            ))
            setUserInfo({value: v.replace(/[^0-9+]/g, ''), title: n,})
        } else {
            setNewPassword((prevState) => (
                {...prevState, [event.target.name]: event.target.value}
            ))
            setUserInfo({value: v, title: n})
        }

        // if (status === "error") dispatch(setStatus(""))
    }

    const test = () => {
        fields.forEach(({validation, name, id}) => {
                if (title === name) {
                    let test = name !== "repeatPassword" ? validation.test(value) : null

                    if (test === false || !value.length ||
                        newPassword["repeatPassword"].length && newPassword["password"] !== newPassword["repeatPassword"]) {
                        setInputName((prevState) => (_.uniq([...prevState, title])))
                    } else {
                        const filter = inputName.filter(item => item !== title)
                        setInputName(filter)
                    }
                }
            }
        )
    }
    const changePassword = (e) => {
        e.preventDefault();
        if (isChangePassword) {
            dispatch(changePasswordUser({newPassword:password,key}))
        }
    }
    return (
        <div className="container-form">
            <form onSubmit={changePassword}>
                {fields.map((field) => (
                    <div key={field.id} className="login">
                        <div style={{
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
                            {status === "error" && field.name === "password" ?
                                <span>Wrong login or password.</span>
                                :

                                inputName.map(((item, index) => (
                                    item === field.name ?
                                        <>
                                            <div className="test2"></div>
                                            <span>{status === "error" ? "Wrong login or password." : !newPassword[item].length ? "Field Required" : field.info}</span>
                                        </> :
                                        status === "error" ?
                                            <span>Wrong login or password.</span>
                                            : null
                                )))}
                        </div>
                    </div>
                ))}
                <div className="form-button-block" style={{marginTop: 20}}>
                    <Button status={status} text="CHANGE PASSWORD" type={isChangePassword ? "submit" : "button"}
                            className={isChangePassword && status !== "pending" ? "active-button"
                                : isChangePassword && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                </div>
            </form>
        </div>
    );
};

export default ModalNewPassword;
