import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Outlet } from 'react-router'
import DisplayRecommendations from './DisplayRecommendations'

function Recommendations() {
    const [status, setStatus] = useState('waiting')
    const [id, setId] = useState(0)
    const local = 'http://localhost:8080/'

    //find 3 of the users most rated movies
    const fetchTop3 = async () => {
        try {
            const response = await axios.get(local + 'topthree')
            const json = await response.data
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
            <Box>
                <Typography>{status} {id}</Typography>
                <Outlet></Outlet>
            </Box>
        )
    }
    
}

export default Recommendations