import React, { useRef, useState } from 'react'
import config from '../config.js'
import { useParams, Redirect } from 'react-router-dom';
import iconCancel from '../../img/cancel-icon.png'

import './ChangeTitle.css'
export default function ChangeTitle(props) {
    const nameRef = useRef();
    const [error, setError] = useState('');
    const user_identifier = sessionStorage.getItem('currentUser')
    const { userid } = useParams();
    const eventid = props.eventid;
    async function handleSubmit(e) {
        e.preventDefault();
        const event_name = nameRef.current.value
        const event_date = props.event_date
        if (event_name.length < 3) {
            return setError('Event name but be longer than 3 characters')
        }
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
                <button className='buttonCancel' onClick={props.handleRenameClose}><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                <fieldset className='admin-fieldset'>
                    <legend className='formTitle'>Change Title</legend>
                    <div className='field eventName'>
                        <label className='fieldTitle' htmlFor='event-name-input'>
                            Event Name
                        </label>
                        <input
                            className='fieldInput'
                            type='text' 
                            name='name-input'
                            placeholder='Event Name' 
                            aria-label='Event Name input'
                            aria-required='true'
                            ref={nameRef}
                            defaultValue={props.eventName}
                        />
                    </div>
                    {error && <div className='errorNote'>{error}</div>}
                    <button type="submit" className="button checkUserButton">
                        Create
                    </button>
                </fieldset>
            </form>
            <div className='overlayChangeTitle' onClick={props.handleRenameClose}/>
        </div>
        : <Redirect to='/login' />
    )
}
