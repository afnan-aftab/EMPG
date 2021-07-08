import {useEffect, useState} from 'react'
import axios from 'axios'

export default function GetData(size, pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [pas, setPas] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: 'https://api.instantwebtools.net/v1/passenger?page='+String(pageNumber)+'&size='+String(size)
        }).then(res => {
            setPas(prevPas => {
                return [...new Set([...prevPas,...res.data.data.map(x => {return {"_id":x._id, "name":x.name, "id":x.airline.id, "airName":x.airline.name, "country":x.airline.country, "logo":x.airline.logo}} )])]
            })
            setHasMore(res.data.data.length > 0)
            setLoading(false)
        }).catch(e => {
            setError(true)
            console.log(e)
        })
    }, [size, pageNumber])
    console.log(pas)
    return {loading, error, pas, hasMore}
}