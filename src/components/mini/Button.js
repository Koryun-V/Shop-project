import React from 'react';

const Button = ({onClick,type,className,text,icon}) => {
    return (
            <button className={className} onClick={onClick} type={type}>{icon}{text}</button>
    );
};

export default Button;
