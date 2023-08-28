import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card';
import './Container.css';
import convertDateFormat from '../utils/convertDateFormat';

const Container = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get('https://gdscdev.vercel.app/api')
                setData(res.data.content.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
        
    },[])

    
    
  return (
    <>  
        <div className='container cards'>

        {data.map((event)=>{
            
            let [date, time] = event.date_time.split('T');
            date = convertDateFormat(date)

            return(
                
                <div key={event.id} className='holder'>
                    <Card event = {event} time={time} date={date}/>
                </div>
                
            )
        })}
        </div>
    </>
  )
}

export default Container