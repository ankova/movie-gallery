import React, { useState } from 'react';

import './Rating.css';


const Rating = (props) => {
    const {onChange} = props;
    const [value, setValue] = useState(3);
    
    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value)
    }

    return (
        <div className="Raiting">
            <label htmlFor="rating">Sort by rating {value}</label>
            <input type="range" id="rating" name="cowbell" 
                min="0" max="10" defaultValue="3" step="0.5" onChange={handleChange}/>
        </div>
    )
}

export default Rating;