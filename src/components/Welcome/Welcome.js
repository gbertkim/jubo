import React from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'
export default function Welcome() {
    return (
        <div className='Welcome icon'>
            <h1>Jubo</h1>
            <p>/ the digital church bulletin /</p>
            <h2>Save money, time, and trees!</h2>
            <Link className='signAccountLink' to='/signup'>Create</Link>
            <Link className='logAccountLink' to='/login'>Log In</Link>
        </div>
    )
}
