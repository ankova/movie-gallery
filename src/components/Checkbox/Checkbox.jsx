import React, { Fragment } from 'react';

const Checkbox = (props) => {
    const {name, onChange} = props;

    return (
        <Fragment>
            
            <label>
                <input type="checkbox" value={name} onChange={onChange}/>
                {name} 
            </label>
        </Fragment>
    )
}

export default Checkbox;