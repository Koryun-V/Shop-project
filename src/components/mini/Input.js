import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const Input = ({value, onChange, maxLength, onBlur, id, autoComplete, type, name, className, placeholder}) => {
    const [eye, setEye] = useState(faEyeSlash)


    return (
        <div className="input-block">
            <div className="test"></div>
            <input
                name={name}
                onBlur={onBlur}
                id={id}
                autoComplete={autoComplete}
                type={name === "password" && eye === faEyeSlash ? "password" : name === "repeatPassword" && eye === faEyeSlash ? "password" : "text"}
                maxLength={maxLength}
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            {name === "password"
                // && user[field.name].length
                ?
                <FontAwesomeIcon onClick={() => {
                    setEye(eye === faEye
                        ? faEyeSlash : faEye)
                    // inputRef.current.focus()

                }
                } icon={eye}
                    // style={{color: focus ? "#0098FF" : "black"}}
                                 className="eye"/> : null}
        </div>


    );
};

export default Input;
