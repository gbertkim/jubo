import React, { useState  } from 'react'
import './AdminHeader.css'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useUpdateAuth  } from '../../AuthContext.js'
import iconLeft from '../../img/left-icon.png'

export default function AdminHeader() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const history = useHistory();
    const { eventid } = useParams()
    const { updateLogged, updateCurrentUser, updateJuboName } = useUpdateAuth();
    const currentUser = sessionStorage.getItem('currentUser')
    const userIdentifier = JSON.parse(currentUser)
    const [tab, setTab] = useState(-1)
    const toggleHamburger = () =>{
        !hamburgerOpen === true ? setTab(1) : setTab(-1)
        setHamburgerOpen(!hamburgerOpen)
    }
    const handleLogOut = (e) => {
        e.preventDefault();
        updateLogged(false);
        updateCurrentUser('');
        updateJuboName('');
        alert('You have logged out')
        history.push(`/login`)
    }
    let location = useLocation();
    return (
        <div className='AdminHeader'>
            {location.pathname === `/admin/${userIdentifier}` && <></>}
            {location.pathname === `/admin/${userIdentifier}/account` || location.pathname === `/admin/${userIdentifier}/event/${eventid}` ?
                <Link to={`/admin/${userIdentifier}`} className='goBackArrow'>
                    <img src={iconLeft} alt='go back arrrow' className='goBackIcon' />
                </Link>
            : <></>}
            {location.pathname === `/admin/${userIdentifier}/event/${eventid}/announcements` || 
            location.pathname === `/admin/${userIdentifier}/event/${eventid}/program` ||
            location.pathname === `/admin/${userIdentifier}/event/${eventid}/contact` ?
                <Link to={`/admin/${userIdentifier}/event/${eventid}`} className='goBackArrow'>
                    <img src={iconLeft} alt='go back arrrow' className='goBackIcon' />
                </Link>
            : <></>}
            <h1>
                <Link className='juboLogo' 
                    to={(location.pathname !== '/login' && location.pathname !== '/signup') ? `/admin/${userIdentifier}` : `/admin`}
                >
                    jubo
                </Link>
            </h1>
            {(location.pathname !== '/login' && location.pathname!== '/signup') ?             
                <button className='hamburger' onClick={toggleHamburger} aria-label='menu' aria-controls='navigation' >
                    <div className='burger burger1'
                        style={{ transform: hamburgerOpen ? 'rotate(45deg)' : 'rotate(0)', backgroundColor: hamburgerOpen ? 'white' : 'black' }}
                    />
                    <div className='burger burger2'
                        style={{ opacity: hamburgerOpen ? 0 : 1, backgroundColor: hamburgerOpen ? 'white' : 'black'   }}
                    />
                    <div className='burger burger3'
                        style={{ transform: hamburgerOpen ? 'rotate(-45deg)' : 'rotate(0)', backgroundColor: hamburgerOpen ? 'white' : 'black'  }}
                    />
                </button> : <></>
            }
            <nav className='navigationMenu'style={{ transform: hamburgerOpen ? 'translateX(0)' : 'translateX(100%)'}}>
                <ul className='navContainer'>
                        <li className='navList'>
                            <Link onClick={toggleHamburger} tabIndex={tab} to={`/admin/${userIdentifier}`} className='navLink' >
                                Dashboard
                            </Link>
                        </li>
                        <li className='navList'>
                            <Link onClick={toggleHamburger} tabIndex={tab} to={`/admin/${userIdentifier}/account`} className='navLink'>
                                Account
                            </Link>
                        </li>
                </ul>
                <li onClick={toggleHamburger} className='navList' id='logOutWrapper'><button tabIndex={tab} className='navLink logButton' onClick={handleLogOut}>Log Out</button></li> 
            </nav> 
        </div>
    )
}
