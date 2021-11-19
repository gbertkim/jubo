import React, { useState, useEffect } from 'react'
import {Link, useParams, Redirect } from 'react-router-dom';
import './EventPage.css'
import config from '../config.js'
import arrowIcon from '../../img/arrow-icon.png'
import editIcon from '../../img/edit-icon.png'
import ChangeTitle from '../ChangeTitle/ChangeTitle'
import ChangeDate from '../ChangeDate/ChangeDate'
export default function EventPage() {
    const { userid } = useParams()
    const { eventid } = useParams()
    const [eventDate, setEventDate] = useState('')
    const [eventName, setEventName] = useState('')
    const currentUser = sessionStorage.getItem('currentUser')
    const [rename, setRename] = useState(0);
    const [redate, setRedate] = useState(0);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${config.API_ENDPOINT}/events/${userid}`)
                if (!res.ok) throw await res.json()
                const response = await res.json()
                const newEvent = response.filter(item => item.id === JSON.parse(eventid))
                setEventDate(new Date(newEvent[0].event_date).toLocaleDateString(undefined, {month: 'long', day:'numeric', year:'numeric'}))
                setEventName(newEvent[0].event_name)
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[ rename, redate, userid, eventid ])
    const handleRename = () => {
        setRename(1);
    } 
    const handleRenameClose = () => {
        setRename(0);
    }
    const handleRedate = () => {
        setRedate(1);
    } 
    const handleRedateClose = () => {
        setRedate(0);
    }
    const handleClose = () => {
        setRename(0);
        setRedate(0);
    }
    return (
        userid === JSON.parse(currentUser) ?
        <div className='EventPage'>
            <div className='nameDateContainer'>
                <p className='descriptor'>Jubo Title</p>
                <div className='displayRow'>
                    <h2 className='eventPageName'>{eventName}</h2>
                    <button className='editIconButton' onClick={handleRename}>
                        <img src={editIcon} alt='edit icon' className='editIcon'/>
                    </button>
                </div>
                <p className='descriptor'>Date of Event</p>
                <div className='displayRow'>
                    <h3 className='eventPageDate'>{eventDate}</h3>
                    <button className='editIconButton' onClick={handleRedate}>
                        <img src={editIcon} alt='edit icon' className='editIcon'/>
                    </button>
                </div>
            </div>
            <div className='eventContainer'>
                <li className='eventPageList'>
                    <Link className='eventLink' to={`/admin/${userid}/event/${eventid}/program`}>
                        <p>Program</p>
                        <img className='arrowIcon' src={arrowIcon} alt='right arrow icon' /> 
                    </Link>
                </li>
                <li className='eventPageList'>
                    <Link className='eventLink' to={`/admin/${userid}/event/${eventid}/announcements`}>
                        <p>Announcements</p>
                        <img className='arrowIcon' src={arrowIcon} alt='right arrow icon' /> 
                    </Link>
                </li>
                <li className='eventPageList ' id='lastEvent'>
                    <Link className='eventLink' to={`/admin/${userid}/event/${eventid}/contact`}>
                        <p>Contact</p>
                        <img className='arrowIcon' src={arrowIcon} alt='right arrow icon' /> 
                    </Link>
                </li>
            </div>
            {rename === 1 ? <ChangeTitle eventid={eventid} handleRenameClose={handleRenameClose} handleClose={handleClose} eventName={eventName} event_date={eventDate}/> : <></>}
            {redate === 1 ? <ChangeDate eventid={eventid} handleRedateClose={handleRedateClose} handleClose={handleClose} eventName={eventName}/> : <></>}
        </div> : <Redirect to='/login' />        
    )
}
