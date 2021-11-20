import React, { useRef, useState } from 'react'
import config from '../config.js'
import { useUpdateAuth } from '../../AuthContext.js'
import {Link, useHistory, Redirect } from 'react-router-dom';
import './SignUp.css'
import TitleHeader from '../TitleHeader/TitleHeader'
const SignUp = (props) => {
    const userRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const [error, setError] = useState('');
    const logged = sessionStorage.getItem('logged')
    const user_identifier = sessionStorage.getItem('currentUser')
    const { updateLogged, updateCurrentUser, updateJuboName } = useUpdateAuth();
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        const user = userRef.current.value
        const pass = passwordRef.current.value
        if (user.length < 3 || user.length > 15) {
            return setError('Username must be between 3-15 characters')
        }
        if (pass !== confPasswordRef.current.value) {
            return setError('Passwords do not match')
        }
        if (/^\S*$/.test(user) === false){
            return setError('User must have no spaces')
        }
        try {
            setError('')
            const newAccount = {
                user_name: user,
                user_pass: pass,
                user_identifier: [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
                modified: new Date(),
            }
            const res = await fetch(`${config.API_ENDPOINT}/accounts`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(newAccount),
            })
            if (!res.ok) throw await res.json();
            const response = await res.json() 
            await updateCurrentUser(response.user_identifier)
            await updateJuboName(response.user_name)
            await updateLogged(true)
            history.push(`/admin/${response.user_identifier}`)
        } catch(e) {
            console.log(e.error)
            setError(e.error)
        }
    }
    return (
        JSON.parse(logged) === true ? <Redirect to={`/admin/${JSON.parse(user_identifier)}`}/> : 
        <div className="SignUp">
            <TitleHeader />
            <form onSubmit={handleSubmit} className='forms'>
                <fieldset className='admin-fieldset'>
                    <legend className='formTitle'>Sign Up</legend>
                    <div className='field'>
                        <label className='fieldTitle' htmlFor='email-input'>
                            user/jubo name
                        </label>
                        <input
                            className='fieldInput'
                            type='text' 
                            name='email-input'
                            placeholder='no spaces'
                            aria-label='email-input'
                            aria-required='true'
                            ref={userRef}
                        />
                    </div>
                    <div className='field'>
                        <label className='fieldTitle' htmlFor='create-password-input'>
                            Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            name='accountPasswordInput'
                            aria-label='Password input'
                            aria-required='true'
                            ref={passwordRef}
                        />
                    </div>
                    <div className='field'>
                        <label className='fieldTitle' htmlFor='check-password-input'>
                            Repeat Password
                        </label>
                        <input
                            className='fieldInput'
                            type='password' 
                            name='accountPasswordInput'
                            aria-label='Password input'
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
            <Link className='createLink' to="/login">Already have an Account?</Link>
        </div>
    )
}
export default SignUp


