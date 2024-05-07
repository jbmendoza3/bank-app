import React from 'react';
import './Button.css';

const Button = ({ onClick, children, icon }) => {
    return (
        <div className="button-container">
            <button onClick={onClick} className="button">
                {icon && <i className={icon}></i>}
                {children}
            </button>
        </div>
    );
}

export default Button;
