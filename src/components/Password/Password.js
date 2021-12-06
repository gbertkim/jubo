import React, { useRef, useState } from 'react'
import config from '../config.js'
import {useParams, Redirect } from 'react-router-dom';
import './Password.css'
import iconCancel from '../../img/cancel-icon.png'
export default function Password(props) {
    const { userid } = useParams();
    const userRef = useRef();
    const oldRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const [error, setError] = useState('');
    const currentUser = sessionStorage.getItem('currentUser')
    async function handleSubmit(e) {
        e.preventDefault();
        const user = userRef.current.value
        const pass = passwordRef.current.value
        const old = oldRef.current.value
        const user_identifier = JSON.parse(currentUser);
        if (user.length < 3 || user.length > 15) {
            return setError('Username must be between 3-15 characters')
        }
        if (pass !== confPasswordRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            const newAccount = {
                old_pass: old,
                user_identifier: user_identifier,
                user_name: user,
                user_pass: pass,
                modified: new Date()
              }
              const res = await fetch(`${config.API_ENDPOINT}/accounts`, {
                    method: 'PATCH',
                    headers: {
                      'content-type': 'application/json'
                    },
                    body: JSON.stringify(newAccount),
                })
                if (!res.ok) throw await res.json()
                alert('Password Successfuly Changed')
                props.passwordHandleClose()
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }      
    }
    return (
        userid === JSON.parse(currentUser) ?
        <div className="Password">
            <form className='forms formChangeTitle' onSubmit={handleSubmit}>
                <button className='buttonCancel' onClick={props.passwordHandleClose}><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                <fieldset className='admin-fieldset'>
                    <legend className='formTitle'>Change Password</legend>
                    <div className='field logUsernameInput'>
                        <label className='fieldTitle' htmlFor='Username-input'>
                            Username
                        </label>
                        <input
                            className='fieldInput'
                            type='text' 
                            name='Username-input'
                            aria-label='Username input'
                            aria-required='true'
                            ref={userRef}
                        />
                    </div>
                    <div className='field logPasswordInput'>
                        <label className='fieldTitle' htmlFor='old-password-input'>
                            Old Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            name='accountPasswordInput'
                            aria-label='Password input'
                            aria-required='true'
                            ref={oldRef}
                        />
                    </div>
                    <div className='field logPasswordInput'>
                        <label className='fieldTitle' htmlFor='new-password-input'>
                            New Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            name='new-password-input'
                            aria-label='New Password input'
                            aria-required='true'
                            ref={passwordRef}
                        />
                    </div>
                    <div className='field logPasswordInput'>
                        <label className='fieldTitle' htmlFor='check-password-input'>
                            Repeat Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            name='check-password-input'
                            aria-label='Check Password input'
                            aria-required='true'
                            ref={confPasswordRef}
                        />
                    </div>
                    {error && <div className='errorNote'>{error}</div>}
                    <button type="submit" className="button">
                        Submit
                    </button>
                    </fieldset>
                </form>
            <div className='overlayChangeTitle' onClick={props.passwordHandleClose}/>
            </div> : <Redirect to='/login' />        
    )
}
