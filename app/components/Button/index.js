import React from 'react';

const Button = props => {
    
    const onClick = () => {
        props.onClick();
    };

    const checkType = (value) => {
        switch(value) {
            case 'transparent':
                return 'btn__transparent';
            case 'outlined':
                return 'btn__outlined';
            case 'selected':
                return 'btn__selected';
            case 'disabled':
                return 'btn__disabled';
            case 'success':
                return 'btn__success';
            default:
                return 'btn__contained'; 
        }
    };

    const checkFulfill = (value) => {
        if(value) return ' btn__full'
        return '';
    }
    
    const handleClick = () => {
        props.onClick ? props.onClick() : console.log('onClicked!');
    };
    
    return (
        <div className={checkType(props.type) + checkFulfill(props.full)} style={props.innerStyle} onClick={() => {handleClick()}}>
            <p className="btn_title">{props.icon}{props.title}</p>
        </div>
    );
};
export default Button;