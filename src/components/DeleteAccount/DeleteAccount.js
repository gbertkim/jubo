import React, { useRef, useState } from 'react'
import config from '../config.js'
import {useHistory, useParams, Redirect } from 'react-router-dom';
import './DeleteAccount.css';
import iconCancel from '../../img/cancel-icon.png'
import { useUpdateAuth  } from '../../AuthContext.js'

export default function DeleteAccount(props) {
    const { userid } = useParams();
    const userRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const history = useHistory();
    const currentUser = sessionStorage.getItem('currentUser')
    const { updateLogged, updateCurrentUser, updateJuboName } = useUpdateAuth();
    const handleLogOut = () => {
        updateLogged(false);
        updateJuboName('');
        updateCurrentUser('');
        alert('Account successfuly deleted.')
        history.push(`/login`)
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const user = userRef.current.value
        const pass = passwordRef.current.value
        const user_identifier = JSON.parse(currentUser);
        if (user.length < 3 || user.length > 15) {
            return setError('Username must be between 3-15 characters')
        }
        try {
            setError('')
            const newAccount = {
                user_identifier: user_identifier,
                user_name: user,
                user_pass: pass,
            }
            const res = await fetch(`${config.API_ENDPOINT}/accounts`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newAccount),
            })
            if (!res.ok) throw await res.json()
            props.deleteHandleClose();
            handleLogOut();
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }
    }
    return(
        userid === JSON.parse(currentUser) ?
        <div className="DeleteAccount">
            <form className='forms formChangeTitle' onSubmit={handleSubmit}>
                <button className='buttonCancel' onClick={props.deleteHandleClose}><img className='iconCancel' src={iconCancel} alt='cancel' /></button>
                <fieldset className='admin-fieldset'>                
                    <legend className='formTitle'>Delete Account</legend>
                    <div className='field logUsernameInput'>
                        <label className='fieldTitle' htmlFor='account-name-input'>
                            Username
                        </label>
                        <input
                            className='fieldInput'
                            type='text' 
                            id='account-name-input' 
                            name='accountNameInput'
                            aria-label='Username input'
                            aria-required='true'
                            ref={userRef}
                        />
                    </div>
                    <div className='field logPasswordInput'>
                        <label className='fieldTitle' htmlFor='new-password-input'>
                            Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            id='account-password-input' 
                            name='accountPasswordInput'
                            aria-label='Password input'
                            aria-required='true'
                            ref={passwordRef}
                        />
                    </div>
                    {error && <div className='errorNote'>{error}</div>}
                    <button type="submit" className="button checkUserButton">
                        Submit
                    </button>
                </fieldset>
            </form>
            <div className='overlayChangeTitle' onClick={props.deleteHandleClose}/>
        </div> : <Redirect to='/login' />)
}
