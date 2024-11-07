import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {registrationUser} from "../../../store/actions/registration";
import _ from "lodash"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import {ReactComponent as Close} from "../../../assets/icon/close-x.svg"

const fields = [
    {
        id: 1,
        name: "firstName",
        label: "First name",
        type: "text",
        validation: /^[a-zA-Z]*$/,
        info: "Use only Latin characters, no space, symbols, or numbers.",
        maxLength: "20",
    },
    {
        id: 2,
        name: "lastName",
        label: "Last name",
        type: "text",
        validation: /^[a-zA-Z]*$/,
        info: "Use only Latin characters, no space, symbols, or numbers.",
        maxLength: "30",
    },
    {
        id: 3,
        name: "day",
        label: "Day",
        type: "text",
        validation: /^[a-zA-Z]*$/,
        maxLength: "2",

    },
    {
        id: 4,
        name: "month",
        label: "Month",
        type: "text",
        validation: /^[a-zA-Z]*$/,
        maxLength: "2",

    },
    {
        id: 5,
        name: "year",
        label: "Year",
        type: "text",
        validation: /^[a-zA-Z]*$/,
        maxLength: "4",

    },
    {
        id: 6,
        name: "email",
        label: "E-mail",
        type: "text",
        validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        info: "Please enter correct e-mail.",
    },
    {
        id: 7,
        name: "password",
        label: "Password",
        type: "password",
        validation: /^(?=.*\d).{8,}$/,
        info: "Your password must be at least 8 characters long.",
    },
    //
    // {
    //     id: 5,
    //     name: "password",
    //     label: "Password",
    //     type: "password",
    //     validation: /^(?=.*\d).{8,}$/,
    //     info: "Your password must be at least 8 characters long.",
    // },
    //

]


function ModalRegister({open, onClose}) {
    const dispatch = useDispatch();
    // const status = useSelector(state => state.register.status)
    // const token = useSelector(state => state.register.token)


    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
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
    })
    const [phone, setPhone] = useState("");


    const {email, firstName, lastName, password} = user

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
            setInputName([])
            setUser({
                email: "",
                firstName: "",
                lastName: "",
                day: "",
                month: "",
                year: "",
                password: "",
            })
            setUserInfo({
                value: "",
                title: "",
            })

            setIsRegister(false)

        }
    }, [open]);



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
    }, [user,inputName.length]);

    const onChange = (event) => {
        setUserInfo({
            value: event.target.value,
            title: event.target.name,
        })

        setUser((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
    }

    // if (status === "error") dispatch(setStatus(""))


    const test = () => {
        fields.forEach(({validation, name, id}) => {
            if (title === name) {
                let test = validation.test(value)
                if (test === false || !value.length) {
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


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>REGISTER</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">

                    <div className="container-login">
                        <form onSubmit={register}>
                            {fields.map((field) => (
                                <div key={field.id} className="field-block">
                                    <div className="input-block">
                                        <div className="test"></div>
                                        <input
                                            maxLength={field.maxLength}
                                            onBlur={test}
                                            className="input"
                                            {...field}
                                            onChange={onChange}
                                            value={user[field.name]}
                                            type={field.type}
                                            id={field.id}
                                        />
                                        <div>
                                            <span
                                                className={user[field.name].length ? "active" : "label"}>{field.label}</span>
                                        </div>
                                        <div className="validation-info">
                                            {inputName.map(((item, index) => (
                                                item === field.name ?
                                                    <>
                                                        <div className="test2"></div>
                                                        <span>{!user[item].length ? "Field Required" : field.info}</span>
                                                    </> : null)))}
                                        </div>
                                    </div>

                                </div>
                            ))}

                            <div className="field-block">
                                <div className="input-block-number">
                                    <div className="test"></div>
                                    <PhoneInput
                                        id="phone"
                                        placeholder=""
                                        containerClass="number-container"
                                        searchClass="number-search"
                                        buttonClass="number-button"
                                        inputClass="number-input"
                                        country={'am'}
                                        value={phone}
                                        onChange={phone => setPhone(phone)}
                                    />
                                </div>
                            </div>


                            <button className={isRegister ? "register" : "disabled"}
                                    type={isRegister ? "submit" : "button"}>CONTINUE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.body
    );
}

ModalRegister.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalRegister;

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
