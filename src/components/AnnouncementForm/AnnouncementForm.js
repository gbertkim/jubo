import React, { useRef, useState, useEffect } from 'react'
import config from '../config.js'
import { useParams, Redirect } from 'react-router-dom';
import TextInput from '../TextInput/TextInput'
import DateInput from '../DateInput/DateInput'
import iconCancel from '../../img/cancel-icon.png'
import './AnnouncementForm.css'

export default function AnnouncementPage(props) {
    const date_ref = useRef();
    const time_ref = useRef();
    const title_ref = useRef();
    const location_ref = useRef();
    const address_ref = useRef();
    const description_ref = useRef();
    const url_ref = useRef();
    const currentUser = sessionStorage.getItem('currentUser')
    const { eventid, userid } = useParams()
    const announcementid = props.announcementid
    const [error, setError] = useState('');
    const [announcement, setAnnouncement] = useState({
        newAnnouncement: {
            announcement_events_id: '',
            date: '',
            time: '',
            title: '',
            location: '',
            address: '',
            description: '',
            url: '',
        }
    })
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${config.API_ENDPOINT}/announcements/${eventid}/${announcementid}`)
                if (!res.ok) throw await res.json()
                const response = await res.json()
                setAnnouncement(prevState => {
                    return {...prevState, newAnnouncement: response} 
                })
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[eventid, announcementid])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        const newDate = [year, month, day].join('-')
        return newDate;
    }

    async function handleEdit(e) {
        e.preventDefault();
        try {
            setError('')
            const newAnnouncement = {
                announcement_events_id: eventid,
                date: date_ref.current.value,
                time: time_ref.current.value,
                title: title_ref.current.value,
                location: location_ref.current.value,
                address: address_ref.current.value,
                description: description_ref.current.value,
                url: url_ref.current.value,
                modified: new Date(),
            }
            const res = await fetch(`${config.API_ENDPOINT}/announcements/${eventid}/${announcementid}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newAnnouncement),
            })
            if (!res.ok) throw await res.json()
            alert('Announcement Saved')
            props.editHandleClose()
            props.handleClose()
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }
    }

    if (announcement.newAnnouncement.date !== '') {
        return (
            userid === JSON.parse(currentUser) ?
            <div className="AnnouncementForm">
                <form onSubmit={handleEdit} className='announcementPageForm'>
                    <button className='buttonCancel' onClick={ props.editHandleClose }><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                    <div className='titleContainer'>
                        <legend className='pageTitle'>Announcement</legend>
                    </div>
                    <fieldset className='programFieldset'>
                        <TextInput 
                            inputTitle='Title' 
                            inputLabels='title-input' 
                            inputPlaceholder='Name of Event'
                            ref={title_ref}
                            value={announcement.newAnnouncement.title} 
                        />
                        <DateInput
                            inputTitle='Date'
                            inputLabels='date-input'
                            ref={date_ref}
                            value={formatDate(announcement.newAnnouncement.date)}
                        />
                        <div className='field'>
                            <label className='fieldTitle' htmlFor='time-input'>
                                Time
                            </label>
                            <input
                                type='time' 
                                name='time-input'
                                aria-label='date-input'
                                ref={time_ref}
                                defaultValue={announcement.newAnnouncement.time}
                            />
                        </div>
                        <TextInput 
                            inputTitle='Location' 
                            inputLabels='location-input' 
                            inputPlaceholder='Name of Location'
                            ref={location_ref}
                            value={announcement.newAnnouncement.location} 
                        />
                        <TextInput 
                            inputTitle='Address' 
                            inputLabels='address-input' 
                            inputPlaceholder='Address of Location'
                            ref={address_ref}
                            value={announcement.newAnnouncement.address} 
                        />
                        <TextInput 
                            inputTitle='Description' 
                            inputLabels='description-input' 
                            inputPlaceholder='Description of the Event'
                            ref={description_ref}
                            value={announcement.newAnnouncement.description} 
                        />
                        <TextInput 
                            inputTitle='Url' 
                            inputLabels='url-input' 
                            inputPlaceholder='Google Calendar URL'
                            ref={url_ref}
                            value={announcement.newAnnouncement.url} 
                        />
                        {error && <div className='errorNote'>{error}</div>}
                        <button type="submit" className="button programButton">
                            Save
                        </button>
                    </fieldset>
                </form>
                <div className='overlayChangeTitle' onClick={props.editHandleClose}/>
            </div> : <Redirect to='/login' />
        )
    } else {
        return (<></>)
    }
}
