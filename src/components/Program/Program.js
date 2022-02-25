import React, { useState } from 'react'
import  './Program.css'
import information from '../../img/info-icon.png'
import WorshipInfo from '../WorshipInfo/WorshipInfo'
const Program = (props) => {
    const [info, setInfo] = useState(false);
    const infoHandler = () => {
        setInfo(!info)
    }
    return (
        <div className='Program'>
            {info === true ? <WorshipInfo worshipOrder={props.worshipOrder} infoHandler={infoHandler}/> : <></>}
            <button className='toolTip' onClick={infoHandler}><img src={information} alt='information icon' style={{filter : info===true ? "invert(100%)" : ""}}/></button> 
            <div>{info}</div>
            <h2>Worship Order</h2>
            <ul>
            { Object.entries(props.worshipDetails).map(([key, value], i) => {
                if (key === 'Offering') {
                    return  ( 
                        <li key={i}>
                            <h3>{key}</h3>
                            <a className="giveButton" target='_blank'  rel="noreferrer" href={value}>Give Offering</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={i}>
                            <h3>{key}</h3>
                            {Object.entries(value).map(([key, value], i)=> {
                                return(
                                    <div key={i} className='listWrapper'>
                                        <p className="bold" key={key}>{key}: </p>
                                        <p className="light">{value}</p>
                                    </div>
                                )})}
                        </li>
                    )
                }
            })}
            </ul>
        </div>
    )
}

export default Program
