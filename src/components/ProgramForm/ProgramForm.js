import React, { useRef, useState, useEffect } from 'react'
import config from '../config.js'
import {Link, useHistory, useParams, Redirect } from 'react-router-dom';
import iconCancel from '../../img/cancel-icon.png'
import TextInput from '../TextInput/TextInput'
import './ProgramForm.css'

export default function ProgramForm() {
    const call_desc_ref = useRef();
    const call_leader_ref = useRef();
    const call_passage_ref = useRef();
    const song_desc_ref = useRef();
    const song_leader_ref = useRef();
    const confession_desc_ref = useRef();
    const confession_leader_ref = useRef();
    const sermon_desc_ref = useRef();
    const sermon_series_ref = useRef();
    const sermon_title_ref = useRef();
    const sermon_speaker_ref = useRef();
    const sermon_passage_ref = useRef();
    const offering_desc_ref = useRef();
    const offering_ref = useRef();
    const benediction_desc_ref = useRef();
    const benediction_speaker_ref = useRef();
    const history = useHistory();
    const { eventid, userid } = useParams()
    const currentUser = sessionStorage.getItem('currentUser')
    const [error, setError] = useState('');
    const [program, setProgram] = useState({
        newProgram: {
            call_desc: '',
            call_leader: '',
            call_passage: '',
            song_desc: '',
            song_leader: '',
            confession_desc: '',
            confession_leader: '',
            sermon_desc: '',
            sermon_series: '',
            sermon_title: '',
            sermon_speaker: '',
            sermon_passage: '',
            offering_desc: '',
            offering: '',
            benediction_desc: '',
            benediction_speaker: ''
        }
    })
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${config.API_ENDPOINT}/program/${eventid}`)
                if (!res.ok) throw await res.json()
                const response = await res.json()
                setProgram(prevState => {
                    return {...prevState, newProgram: response}
                })
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[eventid])

    async function handleEdit(e) {
        e.preventDefault();
        try {
            setError('')
            const newProgram = {
                program_events_id: eventid,
                call_desc: call_desc_ref.current.value,
                call_leader: call_leader_ref.current.value,
                call_passage: call_passage_ref.current.value,
                song_desc: song_desc_ref.current.value,
                song_leader: song_leader_ref.current.value,
                confession_desc: confession_desc_ref.current.value,
                confession_leader: confession_leader_ref.current.value,
                sermon_desc: sermon_desc_ref.current.value,
                sermon_series: sermon_series_ref.current.value,
                sermon_title: sermon_title_ref.current.value,
                sermon_speaker: sermon_speaker_ref.current.value,
                sermon_passage: sermon_passage_ref.current.value ,
                offering_desc: offering_desc_ref.current.value,
                offering: offering_ref.current.value,
                benediction_desc: benediction_desc_ref.current.value,
                benediction_speaker: benediction_speaker_ref.current.value,
                modified: new Date(),
            }
            const res = await fetch(`${config.API_ENDPOINT}/program`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newProgram),
            })
            if (!res.ok) throw await res.json()
            alert('Program Saved')
            history.push(`/admin/${userid}/event/${eventid}`)
        } catch(e) {
            console.log(e)
            setError(e.error.message)
        }
    }
    return (
        userid === JSON.parse(currentUser) ?
        <div className="ProgramForm">
            <form className='programPageForm' onSubmit={handleEdit}>
                <Link className='buttonCancel' to={`/admin/${userid}/event/${eventid}`}><img className='iconCancel' src={iconCancel} alt='cancel' /></Link>
                <div className='titleContainer'>
                    <legend className='pageTitle'>Program</legend>
                </div>
                <fieldset className='programFieldset'>

                    <TextInput
                        size='bigInput'
                        inputTitle='Call To Worship' 
                        inputLabels='call-desc-input' 
                        inputPlaceholder='Description'
                        ref={call_desc_ref}
                        value={program.newProgram.call_desc} 
                    />
                    <TextInput
                        size='smallInput'
                        inputTitle='Call to Worship Leader' 
                        inputLabels='call-leader-input'
                        inputPlaceholder='Leader Name'  
                        ref={call_leader_ref}
                        value={program.newProgram.call_leader} 
                    />
                    <TextInput
                        size='smallInput'
                        inputTitle='Call to Worship Passage' 
                        inputLabels='call-passage-input'
                        inputPlaceholder='Passage'
                        ref={call_passage_ref}
                        value={program.newProgram.call_passage} 
                    />
                    <TextInput
                        size='bigInput'
                        inputTitle='Worship in Song Description' 
                        inputLabels='song-desc-input'
                        inputPlaceholder='Description' 
                        ref={song_desc_ref}
                        value={program.newProgram.song_desc} 
                    />
                    <TextInput
                        size='smallInput'
                        inputTitle='Worship in Song Leader' 
                        inputLabels='song-leader-input'
                        inputPlaceholder='Leader'
                        ref={song_leader_ref}
                        value={program.newProgram.song_leader} 
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Confession of Faith Description' 
                        inputLabels='confession-desc-input'
                        inputPlaceholder='Description'
                        ref={confession_desc_ref}
                        value={program.newProgram.confession_desc}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Confession of Faith Leader' 
                        inputLabels='confession-leader-input'
                        inputPlaceholder='Leader'
                        ref={confession_leader_ref}
                        value={program.newProgram.confession_leader}
                    />
                    <TextInput
                        size='bigInput' 
                        inputTitle='Sermon Description' 
                        inputLabels='sermon-desc-input'
                        inputPlaceholder='Description'
                        ref={sermon_desc_ref}
                        value={program.newProgram.sermon_desc}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Series Title' 
                        inputLabels='series-input'
                        inputPlaceholder='Title' 
                        ref={sermon_series_ref}
                        value={program.newProgram.sermon_series}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Sermon Title' 
                        inputLabels='sermon-title-input'
                        inputPlaceholder='Title' 
                        ref={sermon_title_ref}
                        value={program.newProgram.sermon_title}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Sermon Speaker' 
                        inputLabels='sermon-speaker-input'
                        inputPlaceholder='Speaker' 
                        ref={sermon_speaker_ref}
                        value={program.newProgram.sermon_speaker}
                    /> 
                    <TextInput
                        size='smallInput' 
                        inputTitle='Sermon Passage' 
                        inputLabels='sermon-passage-input'
                        inputPlaceholder='Passage' 
                        ref={sermon_passage_ref}
                        value={program.newProgram.sermon_passage}
                    />
                    <TextInput
                        size='bigInput' 
                        inputTitle='Offering Description' 
                        inputLabels='offering-input'
                        inputPlaceholder='Hyperlink'
                        ref={offering_ref}
                        value={program.newProgram.offering_desc}
                    />
                    <TextInput
                        size='smallInput' 
                        inputTitle='Hyperlink to Offering' 
                        inputLabels='offering-desc-input'
                        inputPlaceholder='Description' 
                        ref={offering_desc_ref}
                        value={program.newProgram.offering}
                    />
                    <TextInput
                        size='bigInput' 
                        inputTitle='Benediction Description' 
                        inputLabels='benediction-desc-input'
                        inputPlaceholder='Description'
                        ref={benediction_desc_ref}
                        value={program.newProgram.benediction_desc}
                    />
                    <TextInput
                        size='smallInput'
                        inputTitle='Benediction Leader' 
                        inputLabels='benediction-speaker-input'
                        inputPlaceholder='Leader Name'
                        ref={benediction_speaker_ref}
                        value={program.newProgram.benediction_speaker}
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
