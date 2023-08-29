import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card';
import './Container.css';
import convertDateFormat from '../utils/convertDateFormat';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import jsDateFormat from '../utils/jsDateFormat';
import { Skeleton } from '@mui/material';


const Container = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Fetching data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://gdscdev.vercel.app/api')
                setData(res.data.content.data);
                setFilteredData(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()

    }, [])

    // Toggle handling for All , Upcoming and Past events
    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        if (alignment === 'upcoming') {
            setFilteredData(data.filter(event => {
                let date1 = new Date(jsDateFormat(event.date_time.split('T')[0]));
                let today = new Date(new Date().toLocaleDateString());

                return date1 >= today;
            }))
        } else if (alignment === 'past') {
            setFilteredData(data.filter(event => {
                let date1 = new Date(jsDateFormat(event.date_time.split('T')[0]));
                let today = new Date(new Date().toLocaleDateString());

                return date1 < today;
            }))
        } else {
            setFilteredData(data)
        }
    })
    

    return (
        <>
            <ToggleButtonGroup
                color="standard"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"

                className='toggle'
            >
                <ToggleButton value="all" >All</ToggleButton>
                <ToggleButton value="upcoming" >upcoming</ToggleButton>
                <ToggleButton value="past" >past</ToggleButton>
            </ToggleButtonGroup>

            
            {
                data.length!=0 ? 
                (<div className='container cards'>
                {filteredData.map((event) => {

                    let [date, time] = event.date_time.split('T');
                    date = convertDateFormat(date)

                    return (

                        <div key={event.id} className='holder'>
                            <Card event={event} time={time} date={date} />
                        </div>

                    )
                })}
            </div>) : (<Skeleton animation='wave' height={500} />)}

        </>
    )
}

export default Container