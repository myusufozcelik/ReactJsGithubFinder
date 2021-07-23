import React from 'react'
import loading from './loading.gif';

export const Loading = () => {
    return (
        <React.Fragment>
            <img src= {`/${loading}`} alt="" style= {{width: '200px', display: 'block', margin: 'auto'}} />
        </React.Fragment>
    )
}
