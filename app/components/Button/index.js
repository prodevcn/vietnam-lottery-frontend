import React from 'react';

const Button = props => {
    const onClick = () => {
        props.onClick();
    };
    const handleClick = () => {
        props.onClick ? props.onClick() : console.log('onClicked!');
    };
    return (
        <button type="button" className={props.selected ? "contained" : "outlined"} onClick={() => {handleClick()}}>
            {props.title}
        </button>
    );
};
export default Button;