import React, { useRef, useState, useEffect } from 'react'
import config from '../config.js'
import { useHistory, useParams, Link, Redirect } from 'react-router-dom';
import TextInput from '../TextInput/TextInput'
import iconCancel from '../../img/cancel-icon.png'
import './ContactForm.css'

export default function ContactForm() {
    const church_ref = useRef();
    const logo_ref = useRef();
    const connect_ref = useRef();
    const address_ref = useRef();
    const website_ref = useRef();
    const pastor_name_ref = useRef();
    const pastor_title_ref = useRef();
    const pastor_email_ref = useRef();
    const associate_name_ref = useRef();
    const associate_title_ref = useRef();
    const associate_email_ref = useRef();
    const currentUser = sessionStorage.getItem('currentUser')
    const history = useHistory();
    const { eventid, userid } = useParams()
    const [error, setError] = useState('');
    const [contact, setContact] = useState({
        newContact: {
            contact_events_id: '',
            church: '',
            logo: '',
            connect: '',
            address: '',
            website: '',
            pastor_name: '',
            pastor_title: '',
            pastor_email: '',
            associate_name: '',
            associate_title: '',
            associate_email: '',
        }
    })
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${config.API_ENDPOINT}/contact/${eventid}`)
                if (!res.ok) throw await res.json()
                const response = await res.json()
                setContact(prevState => {
                    return {...prevState, newContact: response}
                })
            } catch(e) {
                console.log(e)
            }
        } 
        fetchData()
    },[eventid])
    async function handleEdit(e) {
        e.preventDefault();
        setError('')
        const newContact = {
            contact_events_id: eventid,
            church: church_ref.current.value,
            logo: logo_ref.current.value,
            connect: connect_ref.current.value,
            address: address_ref.current.value,
            website: website_ref.current.value,
            pastor_name: pastor_name_ref.current.value,
            pastor_title: pastor_title_ref.current.value,
            pastor_email: pastor_email_ref.current.value,
            associate_name: associate_name_ref.current.value,
            associate_title: associate_title_ref.current.value,
            associate_email: associate_email_ref.current.value,
            modified: new Date(),
        }
        try {
            const res = await fetch(`${config.API_ENDPOINT}/contact`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newContact),
            })
            if (!res.ok) throw await res.json()
            alert('Contact Saved')
            history.push(`/admin/${userid}/event/${eventid}`)
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }
    }
    return (
        userid === JSON.parse(currentUser) ?
        <div className="ContactForm">
            <form className='programPageForm' onSubmit={handleEdit}>
                <Link className='buttonCancel' to={`/admin/${userid}/event/${eventid}`}><img className='iconCancel' src={iconCancel} alt='cancel' /></Link>
                <div className='titleContainer'>
                    <legend className='pageTitle'>Contact</legend>
                </div>
                <fieldset className='programFieldset'>
                    <TextInput
                        size='smallInput' 
                        inputTitle='Church Name' 
                        inputLabels='church-input' 
                        inputPlaceholder='Name'
                        ref={church_ref}
                        value={contact.newContact.church} 
                    />
                    <TextInput
                        size='smallInput'
                        inputTitle='Church Logo' 
                        inputLabels='logo-input' 
                        inputPlaceholder='Hyperlink to logo image'
                        ref={logo_ref}
                        value={contact.newContact.logo} 
                    />
                    <TextInput
                        size='bigInput' 
                        inputTitle='Connect' 
                        inputLabels='connect-input' 
                        inputPlaceholder='Church Mission Statement / Intro'
                        ref={connect_ref}
                        value={contact.newContact.connect} 
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Address' 
                        inputLabels='address-input' 
                        inputPlaceholder='Address'
                        ref={address_ref}
                        value={contact.newContact.address} 
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Website' 
                        inputLabels='website-input'
                        inputPlaceholder='Website Address'
                        ref={website_ref}
                        value={contact.newContact.website} 
                    />
                    <TextInput 
                        size='smallInput'
                        inputTitle='Pastor Name' 
                        inputLabels='pastor-name-input'
                        inputPlaceholder='Name'
                        ref={pastor_name_ref}
                        value={contact.newContact.pastor_name}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Pastor Title' 
                        inputLabels='pastor-title-input'
                        inputPlaceholder='Title'
                        ref={pastor_title_ref}
                        value={contact.newContact.pastor_title}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Pastor Email' 
                        inputLabels='pastor-email-input'
                        inputPlaceholder='Email Address'
                        ref={pastor_email_ref}
                        value={contact.newContact.pastor_email}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Associate Name' 
                        inputLabels='associate-name-input'
                        inputPlaceholder='Name'
                        ref={associate_name_ref}
                        value={contact.newContact.associate_name}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Associate Title' 
                        inputLabels='associate-title-input'
                        inputPlaceholder='Title'
                        ref={associate_title_ref}
                        value={contact.newContact.associate_title}
                    />
                   <TextInput 
                        size='smallInput'
                        inputTitle='Associate Email' 
                        inputLabels='associate-email-input'
                        inputPlaceholder='Email Address'
                        ref={associate_email_ref}
                        value={contact.newContact.associate_email}
                    />
                    {error && <div className='errorNote'>{error}</div>}
                    <button type="submit" className="button programButton">
                        Save
                    </button>
                </fieldset>
            </form>
        </div> : <Redirect to='/login' />
    )
}
