import React, { useRef, useState } from 'react'
import './Login.css'
import config from '../config.js'
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useUpdateAuth } from '../../AuthContext.js'
import TitleHeader from '../TitleHeader/TitleHeader'
const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const history = useHistory();
    const user_identifier = sessionStorage.getItem('currentUser')
    const logged = sessionStorage.getItem('logged')
    const { updateLogged, updateCurrentUser, updateJuboName } = useUpdateAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        const user = userRef.current.value
        const pass = passwordRef.current.value
        if (user.length < 3 || user.length > 15) {
            return setError('Username must be between 3-15 characters')
        }
        if (pass.length < 3 || pass.length > 15) {
            return setError('Password must be between 3-15 characters')
        }
        try {
            setError('')
            const existingAccount = {
                user_name: user,
                user_pass: pass,
            }
            const res = await fetch(`${config.API_ENDPOINT}/accounts/check`, {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json'
                    },
                    body: JSON.stringify(existingAccount),
            })
            if (!res.ok) throw await res.json();
            const response = await res.json()
            await updateCurrentUser(response.user_identifier)
            await updateJuboName(response.user_name)
            await updateLogged(true)
            await history.push(`/admin/${response.user_identifier}`)
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }
    }
    return (
        JSON.parse(logged) === true ? <Redirect to={`/admin/${JSON.parse(user_identifier)}`}/> : 
        <div className="Admin">
            <TitleHeader />
            <form onSubmit={handleSubmit} className='forms'>
                <fieldset className='admin-fieldset'>
                    <legend className='formTitle'>Log in</legend>
                    <div className='field logUsernameInput'>
                        <label className='fieldTitle' htmlFor='account-name-input'>
                            Username
                        </label>
                        <input
                            className='fieldInput'
                            type='text' 
                            name='accountNameInput'
                            aria-label='Username input'
                            aria-required='true'
                            ref={userRef}
                            autoComplete="on"
                        />
                    </div>
                    <div className='field logPasswordInput'>
                        <label className='fieldTitle' htmlFor='account-password-input'>
                            Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            name='accountPasswordInput'
                            aria-label='Password input'
                            aria-required='true'
                            ref={passwordRef}
                            autoComplete="on"
                        />
                    </div>
                    {error && <div className='errorNote'>{error}</div>}
                    <button type="submit" className="button checkUserButton">
                        Log In
                    </button>
                </fieldset>
            </form>
            <Link className='createLink' to="/signup">Create an Account</Link>
        </div>
    )}

export default Login
