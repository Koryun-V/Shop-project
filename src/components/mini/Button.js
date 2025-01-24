import React from 'react';
import {InfinitySpin, TailSpin} from "react-loader-spinner";

const Button = ({onClick, type, className, text, status}) => {
    return (
        <button disabled={status === "pending"} className={className} onClick={onClick}
                type={type}>{status === "pending" ?
            <TailSpin
                visible={true}
                height="40"
                width="40"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="0"
                wrapperStyle={{}}
                wrapperClass="loading"
            />
            : text} </button>


    )
        ;
};

export default Button;
