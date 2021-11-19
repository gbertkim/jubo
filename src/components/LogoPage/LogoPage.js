import React from 'react';
import './LogoPage.css';
import rightIcon from '../../img/right-icon.png';

const LogoPage = (props) => {
    return (
        <div className='LogoPage icon pageContainer'>
            <p className='tag'>Welcome To</p>
            <h1 className='name'>{props.name}</h1>
            <img className='logo' src={`${props.logoLink}`} alt={props.name + ' logo'}/>
            <div className='date'>{new Date(props.date).toLocaleDateString(undefined, {month: 'long', day:'numeric', year:'numeric'})}</div>
            <img className='rightArrow' src={rightIcon} alt='arrow icon pointing -45 degrees'/>
        </div>
    )
}
export default LogoPage
