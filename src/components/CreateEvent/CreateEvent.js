import React, { useRef, useState } from 'react'
import config from '../config.js'
import { useParams, Redirect } from 'react-router-dom';
import { createEmptyProgram, createEmptyContact } from '../../AuthContext.js'
import './CreateEvent.css'
import iconCancel from '../../img/cancel-icon.png'

export default function CreateEvent(props) {
    const dateRef = useRef();
    const nameRef = useRef();
    const [error, setError] = useState('');
    const user_identifier = sessionStorage.getItem('currentUser')
    const { userid } = useParams();
    async function handleSubmit(e) {
        e.preventDefault();
        const date = dateRef.current.value
        const name = nameRef.current.value
        try {
            setError('')
            const newEvent = {
                active: false,
                event_name: name,
                event_date: date,
                events_creator_id: JSON.parse(user_identifier),
                modified: new Date(),
            }
            const res = await fetch(`${config.API_ENDPOINT}/events/${JSON.parse(user_identifier)}`, {
                method: 'POST',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify(newEvent),
            })
            if (!res.ok) throw await res.json()
            const response = await res.json()
            createEmptyProgram(response.id);
            createEmptyContact(response.id);
            props.handleClose()
            props.handleCreateClose()
        } catch(e) {
            console.log(e)
            setError(e.error.message)            
        }
    }
    return (
        userid === JSON.parse(user_identifier) ?
        <div className='CreateEvent'>
            <form onSubmit={handleSubmit} className='forms formChangeTitle'>
                <button className='buttonCancel' onClick={props.handleCreateClose}><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                <fieldset className='admin-fieldset'>
                    <legend className='formTitle'>Create a Jubo</legend>
                    <div className='field eventDate'>
                        <label className='fieldTitle' htmlFor='jubo-title-input'>
                            Jubo Title
                        </label>
                        <input
                            className='fieldInput'
                            type='text' 
                            name='jubo-title-input'
                            placeholder='Jubo Title' 
                            aria-label='jubo-title-input'
                            aria-required='true'
                            ref={nameRef}
                        />
                    </div>
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
            <div className='overlayChangeTitle' onClick={props.handleCreateClose}/>
        </div> 
        : <Redirect to='/login' />
    )
}
