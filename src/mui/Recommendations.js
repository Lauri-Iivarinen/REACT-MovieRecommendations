import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography,Box,CircularProgress } from '@mui/material'
import { Outlet } from 'react-router'
import DisplayRecommendations from './DisplayRecommendations'
import Host from '../cred/Host'

function Recommendations() {
    const [status, setStatus] = useState('waiting')
    const [id, setId] = useState(0)
    const host = Host()

    //find 3 of the users most rated movies
    const fetchTop3 = async () => {
        try {
            const response = await axios.get(host + 'topthree')
            const json = await response.data
            if (json.length === 0) {
                setId(0)
                setStatus('')
            }
            //pick one movie randomly from top 3
            const id = (json) => {
                let index = Math.round(Math.random() * (json.length - 1))
                setId(json[index].id)
            }
            id(json)
            setStatus('')
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchTop3()
        // eslint-disable-next-line
    })

    //actual recommendation displaying is done in DisplayRecommendations
    if (status.length === 0) {
        return (
            <Box>
                <DisplayRecommendations id={id}></DisplayRecommendations>
                <Outlet></Outlet>
            </Box>
        )
    } else {
        return (
            <Box sx={{fisplay: 'flex', justifyContent: 'center'}}>
                <CircularProgress></CircularProgress>
                <Typography>{status} {id}</Typography>
                <Outlet></Outlet>
            </Box>
        )
    }
    
}

export default Recommendations