import React from 'react'
import './Card.css';
import convertDateFormat from '../utils/convertDateFormat';
import { FaCalendarAlt,FaClock,FaGlobe,FaMapMarkerAlt } from "react-icons/fa";
import { useState,useEffect } from 'react';


const Card = (props) => {
  const event = props.event;
  console.log(event)
  
  const [date,time] = [props.date,props.time]


  const [isMoreWords, setIsMoreWords] = useState(false);

  useEffect(() => {
    const wordCount = event.description.split(' ').length;
    setIsMoreWords(wordCount > 20);
  }, [event.description]);

  return (
    <div className={`card color${event.id % 3}`}>
      <div className='card_banner'>
        <img src={event.banner_image} />
      </div>
      
        <div className='card_title'>
          <h2>{event.title} </h2>
        </div>

        <div className='card_organisers'>
          <div className='card_orgicon'>
            <img className='card_icon' src={event.organiser_icon} />
          </div>
          <div className='card_orgname'><span>{event.organiser_name}</span></div>
        </div>

        <div className={`card_description ${isMoreWords ? 'small-on-hover' : ''}`}>
          <p>{event.description}</p>
        </div>

        <div className={`card_timing ${isMoreWords ? 'hide-on-hover' : ''}`}>
        <p><FaCalendarAlt/> {date} <FaClock/> {time} GMT</p>
      </div>
      
      <div className={`card_venue ${isMoreWords ? 'hide-on-hover' : ''}`}>
        <p><FaMapMarkerAlt/> {event.venue_name}<br></br>
        <FaGlobe/> {event.venue_city}, {event.venue_country}</p>
      </div>
      

    </div>
  )
}

export default Card