import React, { useRef, useEffect, useState } from 'react'
import { useSpring, a } from '@react-spring/web'
import { useGesture } from 'react-use-gesture'
import Card from '../Card/Card'
import './Announcements.css'


const Announcements = (props) => {
    const announcements = props.announcements
    const [height, setHeight] = useState(0);
    const [selected, setSelected] = useState('');
    const aWrapperRef = useRef(null)
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
    const bind = useGesture({
            onDrag: (params) => set({ x: params.offset[0], y: params.offset[1]})
        },{
            drag: {
                axis: 'y', 
                bounds: {top: height * (announcements.length > 2 ? announcements.length - 2 : 0) * -1, bottom: 0}, 
                rubberband: true, 
                filterTaps: true
            },
        })
    useEffect(() => {
        setHeight(aWrapperRef.current.clientHeight/5)
    }, [])
    if (announcements.length !== 0) {
        announcements.sort((a,b) => {
            if (a.date < b.date)
                return -1
            if (a.date > b.date)
                return 1
            if (a.date === b.date) {
                if (a.time < b.time)
                    return -1
                if (a.time > b.time)
                    return 1
                return 0
            }
            return 0
        });
    }
    const colors = ['#86a1c2','#af99bd','#d991a0','#ff956b', '#f2b99b']
    const handleSelected = (id) => {
        id === selected ? setSelected('') : setSelected(id)
    }
    return (
    <div className="Announcements" ref={aWrapperRef} >
        <div className="headContainer">
            <h2 className="titles">Announcements</h2>
        </div>
        <a.div {...bind()} style={{ x, y }} className='AnnouncementsContainer' >
            {announcements.map((item, i) => {
                return(
                    <Card 
                        selected={selected}
                        onClick={handleSelected}
                        cardid = {i}
                        key={`card`+i}
                        date={item.date}
                        time={item.time}
                        image={item.image}
                        title={item.title}
                        location={item.location}
                        description={item.description}
                        address={item.address}
                        url={item.url}
                        color={colors[i%5]}
                    />
                )
            })}
        </a.div>
    </div>
    )
}

export default Announcements