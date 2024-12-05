import React from 'react';

const Button = ({onClick,type,className,text}) => {
    return (
            <button className={className} onClick={onClick} type={type}>{text}</button>
    );
};

export default Button;
