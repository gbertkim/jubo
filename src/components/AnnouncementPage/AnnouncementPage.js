import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import config from '../config.js'
import './AnnouncementPage.css'
import iconCancel from '../../img/cancel-icon.png'
import iconAdd from '../../img/add-icon.png'
import iconDots from '../../img/dots-icon.png'
import AnnouncementForm from '../AnnouncementForm/AnnouncementForm'
import CreateAnnouncement from '../CreateAnnouncement/CreateAnnouncement'

export default function AnnouncementPage() {
    const [ announcements, setAnnouncements ] = useState([]);
    const [selected, setSelected] = useState('')
    const { userid, eventid } = useParams();
    const [translateY, setTranslateY] = useState("translateY(100%)")
    const [translateX, setTranslateX] = useState("translateX(-100%)")
    const [opacity, setOpacity] = useState("0%")
    const currentUser = sessionStorage.getItem('currentUser')
    const [ editToggle, setEditToggle ] = useState(0);
    const [ createToggle, setCreateToggle ] = useState(0);
    const [ tab, setTab ] = useState(-1)
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${config.API_ENDPOINT}/announcements/${eventid}`)
                if (!res.ok) throw await res.json()
                const response = await res.json()
                dateSorter(response)
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[selected, eventid])
    const dateSorter = (array) => {
        array.sort((a,b) => {
            let aDate = new Date(a.date)
            let bDate = new Date(b.date)
            if (aDate < bDate)
                return 1
            if (aDate > bDate)
                return -1
            return 0
        });   
        setAnnouncements(array)
    }
    const handleSelect = (id) => {
        setSelected(id)
        setTranslateY("translateY(0)")
        setTranslateX("translateX(0)")
        setOpacity('100%')
        setTab(1)
    }
    const handleDelete = () => {
        const conf = window.confirm("Are you sure you want to delete the event?"); 
        if(conf === true){ 
            deleteFetch(selected)
            handleClose()
        }
    }
    const handleClose = () => {
        setTranslateX('translateX(-100%')
        setTranslateY('translateY(500%)')
        setOpacity("0%")
        setSelected('')
        setTab(-1)
    }
    const deleteFetch =  async (id) => {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/announcements/${eventid}/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (!res.ok) throw await res.json()
            setSelected('')
        } catch(e) {
            console.log(e)
        }
    }
    const editHandleOpen = () => {
        setEditToggle(1)
    }
    const editHandleClose = () => {
        setEditToggle(0)
    }
    const createHandleOpen = () => {
        setSelected('a')
        setCreateToggle(1)
    }
    const createHandleClose = () => {
        setCreateToggle(0)
    }
    return (
        userid === JSON.parse(currentUser) ?
        <div className='AnnouncementPage'>
            <div className='dashboardContainer'>
                <div className='titleContainer'>
                    <h2 className='pageTitle announcementTitle'>Announcements</h2>
                </div>
                <div className='dashboardWrapper'>
                    {announcements.map(announcement => {
                            return (
                                <div 
                                    className='eventList' 
                                    key={announcement.id} 
                                    style={{
                                        color: selected === announcement.id ? "white" : "", 
                                        backgroundColor: selected === announcement.id ? "lightgrey" : ""
                                    }
                                }>
                                    <div className='nameDate'>
                                        <h3>{announcement.title}</h3>
                                        <div className='eventDateSmall'>{new Date(announcement.date).toLocaleDateString(undefined, {month: 'long', day:'numeric', year:'numeric'})}</div>
                                    </div>
                                    <button onClick={() => handleSelect(announcement.id)} className='dotsButton'>
                                        <img className='iconDots' src={iconDots} alt='menu button' />
                                    </button>
                                </div>
                            )
                    })}
                </div>
                {editToggle === 1 ? <AnnouncementForm editHandleClose={ editHandleClose } handleClose={ handleClose } announcementid={ selected }/> : <></>}
                {createToggle === 1 ? <CreateAnnouncement createHandleClose={ createHandleClose } handleClose={ handleClose } /> : <></>}

                <button className='createButton' onClick={ createHandleOpen }><img className='iconAdd' src={iconAdd} alt='add' /></button> 
            </div>
            <div className='buttonWrapper' style={{ transform: translateY }}>
                <div className='buttonContainer'>
                    <button onClick={ handleClose } tabIndex={tab} className='cancelButton'>
                        <img className='iconCancel' src={iconCancel} alt='cancel' />
                    </button>
                    <button 
                        onClick={ editHandleOpen }
                        className='eventsButton'
                        tabIndex={tab}         
                    >
                        Edit
                    </button>
                    <button
                        onClick={ handleDelete }                     
                        className='eventsButton'
                        tabIndex={tab}         
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className='overlay' onClick={handleClose} style={{ transform: translateX, opacity: opacity }}></div>
        </div> : <Redirect to='/login' />
    )
}
