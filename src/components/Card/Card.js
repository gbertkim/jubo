import React, { useState, useEffect } from 'react'
import './Card.css'
import addressIcon from '../../img/address-icon.png'
import calendarIcon from '../../img/calendar-icon.png';
import arrowIcon from '../../img/arrow-icon.png';

const Card = (props) => {
    const date = new Date(props.date)
    const [toggle, setToggle] = useState(0)
    const timeConverter = (time) => {
        let [hours, minutes, ] = time.split(":")
        let amPm = hours>= 12 ? 'pm' : 'am'
        hours = (hours % 12) || 12;
        const converted = hours + ":" + minutes + amPm
        return converted
    }
    useEffect (() => {
        props.selected === props.cardid ? setToggle(1) : setToggle(0);
    },[props.selected, props.cardid])
    const handleCalendar = (e) => {
        const confirmBox = window.confirm('Do you want to add to calendar?')
        if (confirmBox === true) {
            return window.open(props.url , '_blank');
        }
    }
    const handleLocation = (e) => {
        const address = props.address.split(' ').join('+')
        const confirmBox = window.confirm('Redirect to google maps?')
        if (confirmBox === true) {
            return window.open('http://maps.google.com/?q=' + address, '_blank');
        }
    }
    return (
        <div  onClick={() => props.onClick(props.cardid)}
            className='cardContainer' 
            style={{ backgroundColor: props.color, color: 'black' }}>
            <div className='c front' style = {{ height: toggle ? '40vh' : '20vh' }}>
                <div className="frontContainer">
                    <div className='frontDate' >
                        <h2>{date.toLocaleDateString('default', {month: 'short', day: 'numeric'})}</h2>
                        <p className='blackCircle'>&#9679;</p>
                        <h3 className='cardTime'>{timeConverter(props.time)}</h3>
                    </div>                    
                    <h1 className='cardTitle'>{props.title}</h1>
                    <div className='cardDescription' style={{opacity: toggle ? '100' : '0'}}>
                        {props.description}
                    </div>
                    <button onClick={handleCalendar} href={props.url} className='addCalendar'>
                        <img src={calendarIcon} className='calendarIcon' alt='add to calendar icon' />
                    </button>
                    <button className='expandToggle' onClick={() => setToggle(1)}>
                        <img src={arrowIcon} className='expandIcon' alt='expand icon arrow down'
                            style={{transform: toggle ? 'rotate(-90deg)' : 'rotate(90deg)'}}
                        />
                    </button>
                    <button className='cardLocation' onClick={handleLocation}><img src={addressIcon} className='addressIcon' alt='address icon' />{props.location}</button>
                </div>
            </div>
        </div>
    )
}

export default Card
