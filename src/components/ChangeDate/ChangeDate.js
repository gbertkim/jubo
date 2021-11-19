import React, { useRef, useState } from 'react'
import config from '../config.js'
import { useParams, Redirect } from 'react-router-dom';
import iconCancel from '../../img/cancel-icon.png'

export default function ChangeDate(props) {
    const dateRef = useRef();
    const [error, setError] = useState('');
    const user_identifier = sessionStorage.getItem('currentUser')
    const { userid, eventid } = useParams();
    async function handleSubmit(e) {
        e.preventDefault();
        const event_name = props.eventName
        const event_date = dateRef.current.value
        try {
            setError('')
            const newTitle = {
                id: eventid,
                event_name: event_name,
                event_date: event_date
            }
            const res = await fetch(`${config.API_ENDPOINT}/events/${user_identifier}`, {
                method: 'PATCH',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(newTitle),
            })
            if (!res.ok) throw await res.json()
            props.handleClose()
        }catch(e){
            console.log(e.error)
            setError(e.error)
        }
    }
    return (
        userid === JSON.parse(user_identifier) ?
        <div className='ChangeTitle' >
            <form onSubmit={handleSubmit} className='forms formChangeTitle'>
                <button className='buttonCancel' onClick={props.handleRedateClose}><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                <fieldset className='admin-fieldset'>
                    <legend className='formTitle'>Change Date</legend>
                    <div className='field eventDate'>
                        <label className='fieldTitle' htmlFor='date-input'>
                            Date of Event
                        </label>
                        <input
                            className='fieldInput'
                            type='date' 
                            name='date-input'
                            min="2000-01-01"
                            max="3000-12-31"
                            placeholder='Event Date' 
                            aria-label='Event Date input'
                            aria-required='true'
                            ref={dateRef}
                        />
                    </div>
                    {error && <div className='errorNote'>{error}</div>}
                    <button type="submit" className="button checkUserButton">
                        Create
                    </button>
                </fieldset>
            </form>
            <div className='overlayChangeTitle' onClick={props.handleRedateClose}/>
        </div>
        : <Redirect to='/login' />
    )
}
