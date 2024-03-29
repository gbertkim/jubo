import React, {useRef, useState, useEffect} from 'react';
import {useDrag} from 'react-use-gesture';
import {useSprings, animated} from 'react-spring';
import clamp from 'lodash-es/clamp'
import LogoPage from '../LogoPage/LogoPage';
import Program from '../Program/Program';
import Announcements from '../Announcements/Announcements';
import Connect from '../Connect/Connect';
import config from '../config.js'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
export default function Jubo() {
  const { jubo } = useParams();
  const [name, setName] = useState('');
  const [logoLink, setLink] = useState('');
  const [date, setDate] = useState('');
  const aWrapperRef = useRef('')
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [worshipOrder, setWorshipOrder] = useState({
    'Call to Worship': '',  
    'Worship in Song': '',
    'Confession of Faith(Apostle\'s Creed)': '',
    'Preaching of God\'s Word': '',
    'Offering': '',
    'Benediction': ''
  });
  const [worshipDetails, setWorshipDetails] = useState({
    'Call to Worship': {
        Speaker: '',
        Passage: ''
    },
    'Worship in Song': {
        Speaker: ''
    },
    'Confession of Faith(Apostle\'s Creed)': {
        Speaker: ''
    },
    'Preaching of God\'s Word': {
        Series: '',
        Title: '',
        Speaker: '',
        Passage: ''
    },
    'Offering': '',
    'Benediction': {
        Speaker: ''
    }
  });
  const [announcements, setAnnouncements] = useState([]);
  const [contact, setContact] = useState({
    Connect: '',
    Address: '',
    Website: '',
    People: []
  });
  useEffect(() => {
    async function fetchAllData() {
      try {
          setLoading(true)
          setError(false)
          const accountResponse = await fetch(`${config.API_ENDPOINT}/accounts/check/${jubo}`)
          const identifier = await accountResponse.json();
          console.log(identifier)
          const eventsResponse = await fetch(`${config.API_ENDPOINT}/events/${identifier.user_identifier}`)
          const events = await eventsResponse.json();
          const active = await events.find(obj => obj.active === true)
          const response1 = fetch(`${config.API_ENDPOINT}/program/${active.id}`)
          const response2 = fetch(`${config.API_ENDPOINT}/announcements/${active.id}`)
          const response3 = fetch(`${config.API_ENDPOINT}/contact/${active.id}`)
          const multipleFetch = await Promise.all([response1, response2, response3])
          const program = await multipleFetch[0].json();
          const announcements = await multipleFetch[1].json();
          const contact = await multipleFetch[2].json();
          setName(contact.church || '')
          setLink(contact.logo || '')
          setDate(active.event_date || '')
          setWorshipDetails({
              'Call to Worship': {
                  Speaker: program.call_leader || '',
                  Passage: program.call_passage || ''
              },
              'Worship in Song': {
                  Leader: program.song_leader || ''
              },
              'Confession of Faith(Apostle\'s Creed)': {
                  Speaker: program.confession_leader || ''
              },
              'Preaching of God\'s Word': {
                  Series: program.sermon_series || '',
                  Title: program.sermon_title || '',
                  Speaker: program.sermon_speaker || '',
                  Passage: program.sermon_passage || ''
              },
              'Offering': program.offering || '',
              'Benediction': {
                  Speaker: program.benediction_speaker || ''
              }
          })        
          setWorshipOrder({
              'Call to Worship': program.call_desc || '',  
              'Worship in Song': program.song_desc || '',
              'Confession of Faith(Apostle\'s Creed)': program.confession_desc || '',
              'Preaching of God\'s Word': program.sermon_desc || '',
              'Offering': program.offering || '',
              'Benediction': program.benediction_desc || ''
          })
          setAnnouncements(announcements || [''])
          setContact({
              Connect: contact.connect || '',
              Address: contact.address || '',
              Website: contact.website || '',
              People: [
                {
                  name: contact.pastor_name || '',
                  title: contact.pastor_title || '',
                  email: contact.pastor_email || ''
                },
                {
                  name: contact.associate_name || '',
                  title: contact.associate_title || '',
                  email: contact.associate_email || ''
                }
              ]
          })
          setLoading(false)
      } catch (e) {
          setError(true)
          console.log(e)
      }
    }
    fetchAllData();
  },[jubo])

  useEffect(() => {
      setPageWidth(aWrapperRef.current.offsetWidth)
  },[pageWidth])

  const pages = [
    <LogoPage name={name} logoLink={logoLink} date={date} />,
    <Program worshipOrder={worshipOrder} worshipDetails={worshipDetails}/>,
    <Announcements announcements={announcements}/>,
    <Connect contact={contact}/>
  ]
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, (i) => ({
    x: i * pageWidth,
    scale: .95,
    display: 'block'
  }))
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance > pageWidth/ 3)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set((i) => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * pageWidth + (active ? mx : 0)
      const scale = active ? .95 - distance / pageWidth / 2 : .95
      return { x, scale, display: 'block' }
    })
  }, 
  { axis: 'x' })

    return (
        <div id="boot">
          {
            props.map(({ x, display, scale }, i) => (
                <animated.div ref={aWrapperRef} className='pageContainer' {...bind()} key={i} style={{ display, x }}>
                    <animated.div className='pages' style={{ scale }} >
                        {
                          loading ? <Loading error={error}/> : 
                          pages[i]
                          // <Loading />
                        }
                    </animated.div>
                </animated.div>
            ))
          }
        </div>
    )
}
