import React from 'react'
import  './Program.css';

const Program = (props) => {
    return (
        <div className='Program'>
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
