import React, { useRef, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import config from '../config.js'
import TextInput from '../TextInput/TextInput'
import iconCancel from '../../img/cancel-icon.png'

export default function CreateAnnouncement(props) {
    const { eventid, userid } = useParams();
    const date_ref = useRef();
    const time_ref = useRef();
    const title_ref = useRef();
    const location_ref = useRef();
    const address_ref = useRef();
    const description_ref = useRef();
    const url_ref = useRef();
    const [error, setError] = useState('');
    const currentUser = sessionStorage.getItem('currentUser')
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
            const res = await fetch(`${config.API_ENDPOINT}/announcements/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newAnnouncement),
            })
            if (!res.ok) throw await res.json()
            alert('Announcement Created')
            props.createHandleClose()
            props.handleClose()            
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }
    }
    return (
        userid === JSON.parse(currentUser) ?
        <div className="AnnouncementForm">
            {error && <div>{error}</div>}
            <form onSubmit={handleEdit} className='announcementPageForm'>
                <button className='buttonCancel' onClick={ props.createHandleClose }><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                <div className='titleContainer'>
                    <legend className='pageTitle'>Announcement</legend>
                </div>
                <fieldset className='programFieldset'>
                    <TextInput 
                        inputTitle='Title' 
                        inputLabels='title-input' 
                        inputPlaceholder='Name of Event'
                        ref={title_ref}
                    />
                    <div className='field'>
                        <label className='fieldTitle' htmlFor='date-input'>
                            Date
                        </label>
                        <input
                            type='date' 
                            name='date-input'
                            min="2000-01-01"
                            max="3000-12-31"
                            aria-label='date-input'
                            aria-required='true'
                            ref={date_ref}
                        />
                    </div>
                    <div className='field'>
                        <label className='fieldTitle' htmlFor='time-input'>
                            Time
                        </label>
                        <input
                            type='time' 
                            name='time-input'
                            aria-label='date-input'
                            ref={time_ref}
                        />
                    </div>
                    <TextInput 
                        inputTitle='Location' 
                        inputLabels='location-input' 
                        inputPlaceholder='Name of Location'
                        ref={location_ref}
                    />
                    <TextInput 
                        inputTitle='Address' 
                        inputLabels='address-input' 
                        inputPlaceholder='Address of Location'
                        ref={address_ref}
                    />
                    <TextInput 
                        inputTitle='Description' 
                        inputLabels='description-input' 
                        inputPlaceholder='Description of the Event'
                        ref={description_ref}
                    />
                    <TextInput 
                        inputTitle='Url' 
                        inputLabels='url-input' 
                        inputPlaceholder='Google Calendar URL'
                        ref={url_ref}
                    />
                    <button type="submit" className="button programButton">
                        Save
                    </button>
                </fieldset>
            </form>
            <div className='overlayChangeTitle' onClick={props.createHandleClose}/>
        </div> : <Redirect to='/login' />
    )
}
