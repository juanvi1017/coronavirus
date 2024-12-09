import * as React from 'react';
import './style.css';


function Death({ data }) {
    let mortalidad = (100 * data[2].value) / data[1].value;
    return (
        <div className='container-hero'>
            <h3>Tasa de moratalidad: {mortalidad}%</h3>
        </div >
    )
}

export default Death;