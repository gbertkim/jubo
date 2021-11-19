import React from 'react'
import './Connect.css'

const Connect = (props) => {
    return (
        <div className='Connect pageContainer'>
            <h2 className="titles">Connect</h2>
            <p className='connectDesc'>{props.contact.Connect}</p>
            <ul className='contactInfo'>
                <li className='connectList'>{props.contact.Address}</li>
                <li className='connectList'><a href={props.contact.Website}>{props.contact.Website}</a></li>
            </ul>
            <div className='staffContainer'>
                <h3 className='staffTitle'>Staff</h3>
                {
                    props.contact.People.map((person, i)  => {
                        return (
                            <ul key={i} className='staffList'>
                                <li className='staffName'>{person.name}, {person.title}</li>
                                <li className='staffEmail'>{person.email}</li>
                            </ul>   
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Connect
