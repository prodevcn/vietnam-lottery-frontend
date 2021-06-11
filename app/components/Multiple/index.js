import {useState} from 'react';
const Multiple = props => {
    const [value, setValue] = useState();
    
    return (
        <>
            <input value={value} onChange={(text) => {console.log(text)}} />
        </>
    );

};

export default ButtonInput;