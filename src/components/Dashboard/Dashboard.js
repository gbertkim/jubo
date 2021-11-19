import React, { useEffect, useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import config from '../config.js'
import './Dashboard.css'
import iconCancel from '../../img/cancel-icon.png'
import iconAdd from '../../img/add-icon.png'
import iconGreen from '../../img/green-icon.png'
import CreateEvent from '../CreateEvent/CreateEvent'
import iconDots from '../../img/dots-icon.png'
import { createEmptyProgram, createEmptyContact, copyAnnouncements } from '../../AuthContext.js'
import ChangeTitle from '../ChangeTitle/ChangeTitle'

const Dashboard = () => {
    const { userid } = useParams();
    const [ events, setEvents] = useState([])
    const currentUser = sessionStorage.getItem('currentUser')
    const jubo_name = JSON.parse(sessionStorage.getItem('jubo_name'))
    const user_identifier = JSON.parse(currentUser);
    const [selected, setSelected] = useState('')
    const [entryActive, setEntryActive] = useState('')
    const [translateY, setTranslateY] = useState("translateY(100%)")
    const [translateX, setTranslateX] = useState("translateX(-100%)")
    const [opacity, setOpacity] = useState("0%")
    const [rename, setRename] = useState(0)
    const [create, setCreate] = useState(0)
    const [tab, setTab] = useState(-1)
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res =  await fetch(`${config.API_ENDPOINT}/events/${user_identifier}`)
                if (!res.ok) throw await res.json()
                const response = await res.json()
                eventSorter(response);
                response.forEach(event => {
                    event.active && setEntryActive(event.event_name)
                })
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[selected, user_identifier])

    const eventSorter = (array) => {
        array.sort((a,b) => {
            let aDate = new Date(a.event_date)
            let bDate = new Date(b.event_date)
            if (aDate < bDate) 
                return 1
            if (aDate > bDate) 
                return -1
            return 0
        });   
        setEvents(array)
    }

    const deleteFetch = async (id) => {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/events/${user_identifier}/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (!res.ok) throw await res.json()
            handleClose()
        } catch(e) {
            console.log(e)
        }
    }
    const handleSelect = (id, name, date) => {
        setSelected(id)
        const event_date = new Date(date).toLocaleDateString(undefined, {month: 'long', day:'numeric', year:'numeric'})
        setEventName(name)
        setEventDate(`${event_date}`)
        setTab(1);
        setTranslateY("translateY(0)")
        setTranslateX("translateX(0)")
        setOpacity('100%')
    }
    const handleActive = async () => {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/events/${user_identifier}/${selected}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (!res.ok) throw await res.json()
            alert('Event is live')
            setSelected('')
            setEventName('')
            setEventDate('')
            handleClose()
        } catch(e) {
            console.log(e)
        }
    }
    const handleDelete = () => {
        const conf = window.confirm("Are you sure you want to delete the event?"); 
        if(conf === true){ 
            deleteFetch(selected)
        } else {
            console.log('no')
        } 
    }
    async function handleCopy(){
        try {
            const responseEvent = await fetch(`${config.API_ENDPOINT}/events/${user_identifier}/${selected}`)
            if (!responseEvent.ok) throw await responseEvent.json()
            const oldEvent = await responseEvent.json()
            const copyEvent = await {
                event_date: oldEvent.event_date,
                events_creator_id: oldEvent.events_creator_id,
                active: false,
                event_name: oldEvent.event_name + '-copy',
                modified: new Date()
            }
            const response2 = await fetch(`${config.API_ENDPOINT}/events/${user_identifier}`, {
                method: 'POST',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify(copyEvent),
            })
            if (!response2.ok) throw await response2.json()
            const newEvent = await response2.json()
            const responseProgram = await fetch(`${config.API_ENDPOINT}/program/${oldEvent.id}`)
            if (!responseProgram.ok) throw await responseProgram.json()
            const program = await responseProgram.json()
            const responseContact = await fetch(`${config.API_ENDPOINT}/contact/${oldEvent.id}`)
            if (!responseContact.ok) throw await responseContact.json()
            const contact = await responseContact.json()
            const responseAnnouncements = await fetch(`${config.API_ENDPOINT}/announcements/${oldEvent.id}`)
            if (!responseAnnouncements.ok) throw await responseAnnouncements.json()
            const announcements = await responseAnnouncements.json()
            copyAnnouncements( newEvent.id, announcements );
            createEmptyProgram( newEvent.id, program );
            createEmptyContact( newEvent.id, contact );
            handleClose();
        } catch(e) {
            console.log(e)
        }
    }
    const handleClose = () => {
        setTranslateX('translateX(-100%')
        setTranslateY('translateY(100%)')
        setOpacity("0%")
        setSelected('')
        setEventName('')
        setEventDate('')
        setTab(-1)
    }
    const handleRenameOpen = () => {
        setRename(1);
    }
    const handleRenameClose = () => {
        setRename(0);
    }
    const handleCreateOpen = () => {
        setCreate(1);
        setSelected('a')
    }
    const handleCreateClose = () => {
        setCreate(0);
    }

    return (
        userid === JSON.parse(currentUser) ?
        <div className='Dashboard'>

            <div className='dashboardContainer'>
                <div className='titleContainer'>
                    <h2 className='pageTitle'>My Jubos</h2>
                    <Link className='juboName' target="_blank" to={`/jubo/${jubo_name}`}>http://www.jubo.com/jubo/{jubo_name}</Link>
                    <h3 className='isActiveDesc'><img className='iconGreen' src={iconGreen} alt='Green Circle Indicator'/>{entryActive}<p className='normalWeight'> is live</p></h3>
                </div>
                <div className='dashboardWrapper'>
                    {events.map((entry) => {
                        return (
                            <div 
                                className='eventList' 
                                key={entry.id} 
                                style={{
                                    color: selected === entry.id ? "white" : "", 
                                    backgroundColor: selected === entry.id ? "lightgrey" : ""
                                }
                            }>
                                <div className='nameDate'>
                                    <h3>{entry.event_name}</h3>
                                    <div className='eventDateSmall'>{new Date(entry.event_date).toLocaleDateString(undefined, {month: 'long', day:'numeric', year:'numeric'})}</div>
                                </div>
                                {entry.active === true ? <div className='isLive'>LIVE</div> : ''}
                                <button onClick={() => handleSelect(entry.id, entry.event_name, entry.event_date)} className='dotsButton'>
                                    <img className='iconDots' src={iconDots} alt='menu button' />
                                </button>
                            </div>
                        )
                    })}
                </div>
                {rename === 1 ? <ChangeTitle eventid={selected} handleRenameClose={handleRenameClose} handleClose={handleClose} eventName={eventName} event_date={eventDate}/> : <></>}
                {create === 1 ? <CreateEvent eventid={selected} handleCreateClose={handleCreateClose} handleClose={handleClose} /> : <></>}
                <button className='createButton' onClick={handleCreateOpen}><img className='iconAdd' src={iconAdd} alt='add' /></button>
            </div>
            <div className='buttonWrapper' style={{ transform: translateY}}>
                <div className='buttonContainer'>
                    <button onClick={handleClose} tabIndex={tab} className='cancelButton'>
                        <img className='iconCancel' src={iconCancel} alt='cancel' />
                    </button>
                    <button
                        className='eventsButton'
                        onClick={ handleActive }
                        tabIndex={tab}
                    >
                        <img className='iconGreen'src={iconGreen} alt='Green Circle Icon Indicator'/>Go Live
                    </button>
                    <Link 
                        onClick={ handleClose }
                        className='eventsButton'
                        to={`/admin/${userid}/event/${selected}`}
                        tabIndex={tab}
                    >   
                        Edit
                    </Link>
                    <button 
                        onClick={ handleRenameOpen }
                        className='eventsButton'
                        tabIndex={tab}
                    >   
                        Rename
                    </button>
                    <button
                        className='eventsButton'
                        onClick={ handleCopy }
                        tabIndex={tab}
                    >
                        Copy
                    </button>
                    <button 
                        className='eventsButton' 
                        onClick={ handleDelete }
                        tabIndex={tab}
                        id='deleteButton'
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className='overlay' onClick={ handleClose } style={{ transform: translateX, opacity: opacity }}></div>
        </div> : <Redirect to='/login' />
    )
}

export default Dashboard
