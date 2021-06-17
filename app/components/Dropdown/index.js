import React, {useState, useEffect} from 'react';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Checked from '@material-ui/icons/Check';
const Dropdown = props => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.value);
    const onClickProcess = (val) => {
        setValue(val);
        props.onChange(val);
        setTimeout(() => {
            setOpen(false);
        }, 300)
    };

    return(
        <div>
            <div className="date_area" onClick={() => {setOpen(prevState => {return !prevState})}}>
                <h5 className="date_text">{value}</h5>
                <ArrowDropDown className="icon" />
            </div>
            {
                open && (
                    <div className="box_area">
                        {props.data.map((item, index) => (
                            <div className="dropdown__item" key={`DROPDOWN_ITEM_${index}`} onClick={() => {onClickProcess(item)}}>
                                <p className="date_text">{item}</p>
                                {
                                    value === item && <Checked className="icon" />
                                }
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Dropdown;