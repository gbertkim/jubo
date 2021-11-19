import React, { useState, useContext } from 'react'
import config from './components/config.js'

const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function useUpdateAuth() {
    return useContext(AuthUpdateContext)
}
export function copyAnnouncements(id, array) {
    array.map(item => {
        const newAnnouncement = {
            announcement_events_id: id,
            date: item.date,
            time: item.time,
            title: item.title,
            location: item.location,
            address: item.address,
            description: item.description,
            url: item.url,
            modified: new Date(),
        }
        return fetch(`${config.API_ENDPOINT}/announcements/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAnnouncement),
            })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
        })
        .then(program => {
            console.log("success")
        })
        .catch(e => {
            console.log(e)
        })
    })
}
export function createEmptyProgram(id, object) {
    const newProgram = {
        program_events_id: id,
        call_desc: object ? object.call_desc : '',
        call_leader: object ? object.call_leader : '',
        call_passage: object ? object.call_passage : '',
        song_desc: object ? object.song_desc : '',
        song_leader: object ? object.song_leader : '',
        confession_desc: object ? object.confession_desc : '',
        confession_leader: object ? object.confession_leader : '',
        sermon_desc: object ? object.sermon_desc : '',
        sermon_series: object ? object.sermon_series : '',
        sermon_title: object ? object.sermon_title : '',
        sermon_speaker: object ? object.sermon_speaker : '',
        sermon_passage: object ? object.sermon_passage : '',
        offering_desc: object ? object.offering_desc : '',
        offering: object ? object.offering : '',
        benediction_desc: object ? object.benediction_desc : '',
        benediction_speaker: object ? object.benediction_speaker : '',
        modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/program`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(newProgram),
    })
    .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then(entry => {
        console.log("success")
    })
    .catch(e => {
        console.log(e)
    })
}

export function createEmptyContact(id, object) {
    const newContact = {
        contact_events_id: id,
        logo: object ? object.logo : '',
        church: object ? object.church : '',
        connect: object ? object.connect : '',
        address: object ? object.address : '',
        website: object ? object.website : '',
        pastor_name: object ? object.pastor_name : '',
        pastor_title: object ? object.pastor_title : '',
        pastor_email: object ? object.pastor_email : '',
        associate_name: object ? object.associate_name : '',
        associate_title: object ? object.associate_title : '',
        associate_email: object ? object.associate_email : '',
        modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/contact`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(newContact),
    })
    .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then(entry => {
        console.log("success")
    })
    .catch(e => {
        console.log(e)
    })
}

export function AuthProvider({ children }) {
    const [logged, setLogged] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const value = {
        currentUser, logged
    }
    function updateLogged(bool) {
        setLogged(bool)
        sessionStorage.setItem('logged', JSON.stringify(bool));
        console.log('success')
    }
    function updateCurrentUser(user) {
        setCurrentUser(user)
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        console.log('success')
    }
    function updateJuboName(jubo) {
        sessionStorage.setItem('jubo_name', JSON.stringify(jubo));
        console.log('success')
    }
    const updateValue = {
        updateLogged, updateCurrentUser, updateJuboName
    }

    return (
        <AuthContext.Provider value = { value }>
            <AuthUpdateContext.Provider value = { updateValue }>
            {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}
