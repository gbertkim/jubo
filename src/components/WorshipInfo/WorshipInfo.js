import React from 'react'
import './WorshipInfo.css'
const WorhipsInfo = (props) => {
    console.log(props.worshipOrder)
    return (
        <div className='WorshipInfo' onClick={props.infoHandler}>
            <ul>
            { Object.entries(props.worshipOrder).map(([key, value], i) => {
                return  ( 
                    <div key={i} className='worshipInfoList'>
                        <h3 className="white infoTitle" key={key}>{key}: </h3>
                        <p className="white">{value}</p>
                    </div>
                )
            })}
            </ul>
        </div>
    )
}

export default WorhipsInfo
