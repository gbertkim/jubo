import React from 'react'
import { Link } from 'react-router-dom'
import './TitleHeader.css'

export default function TitleHeader() {
    return (
        <div className='TitleHeader'> 
            <h1>
                <Link className='juboLogo' 
                    to={'/'}
                >
                    jubo
                </Link>
            </h1>
        </div>
    )
}
