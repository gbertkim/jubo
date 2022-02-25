import React, { useState, useEffect } from 'react'
import './Loading.css'

const Loading = (props) => {
    console.log(props.error)
    return (
        <div className='Loading'>
            {
            props.error ? 
                <div className='loadingWrapper'>
                    <h2>CANNOT FIND JUBO</h2>
                </div> : 
                <div className='loadingWrapper'>
                    <div className="lds-dual-ring"></div>
                    <h2>LOADING</h2>
                </div>  
            }
        </div>
    )
}

export default Loading
