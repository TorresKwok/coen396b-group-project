import React, { useLayoutEffect, useState } from 'react'
import merged_data from "../data/new_file.json"
import WordCloud from '../components/wordCloud'
import './CactiSelectPage.css'

export default function CactiSelectPage() {
    //states
    const [orignalData, setOriginalData] = useState(merged_data)
    const [words, setWords] = useState([])
    const [elevation, setElevation] = useState('2000ft')
    const [state, setState] = useState('Arizona')
    const [temperature, setTemperature] = useState('35')
    const [cactiData, setCactiData] = useState([])


    //functions
    const handleElevationChange = (e) => {
        console.log(e)
        setElevation(e.target.value)
    }
    const handleStateChange = (e) => {
        console.log(e.target.value)
        setState(e.target.value)
    }
    const handleTemperatureChange = (e) => {
        console.log(e.target.value)
        setTemperature(e.target.value)
    }

    function filterData() {
        let tempData = orignalData
        let newData = tempData.filter(element => element.verbatimElevation >= elevation && element.stateProvince === state
            && element.averageTemperature >= temperature
        )
        setCactiData(newData)
        getWords(newData)
    }

    // this was for testing purposes
    //get all the different elevations out of the data
    let elevations = []
    merged_data.forEach(element => {
        if (!elevations.includes(element.verbatimElevation)) {
            elevations.push(element.verbatimElevation)
        }
    });
    console.log(elevations)

    function getWords(data) {
        let tempWords = []
        data.forEach(element => {
            if (element.order !== undefined && element.family !== undefined) {
                let order = element.order
                let family = element.family
                let orderFamily = order + ' ' + family
                let found = false
                tempWords.forEach(word => {
                    if (word.text === orderFamily) {
                        word.size += 1
                        found = true
                    }
                })
                if (!found) {
                    tempWords.push({ text: orderFamily, size: 1 })
                }
            }
        });
        console.log(tempWords)
        setWords(tempWords)
    }


    //need to extract order and family from the elements and add to an object that will have the count of each


    useLayoutEffect(() => {
        filterData()
    }, [elevation, state, temperature])


        return (
            <div className='container'>
                <h2>Select Cacti Preferences</h2>
                <div className='selectors'>
                    <select name='elevation' onChange={handleElevationChange}>
                        <option value='1000 ft'>Above 1000ft</option>
                        <option value='2000 ft'>Above 2000ft</option>
                        <option value='3000 ft'>Above 3000ft</option>
                        <option value='4000ft'>Above 4000ft</option>
                    </select>
                    <select name='state' onChange={handleStateChange}>
                        <option value='Arizona'>Arizona</option>
                        <option value='Califronia'>California</option>
                        <option value='Texas'>Texas</option>
                        <option value='Colorado'>Colorado</option>
                        <option value='New Mexico'>New Mexico</option>
                    </select>
                    <select name='temperature' onChange={handleTemperatureChange}>
                        <option value='35'>Above 35 F</option>
                        <option value='40'>Above 40 F</option>
                        <option value='50'>Above 50 F</option>
                        <option value='60'>Above 60 F</option>
                        <option value='70'>Above 70 F</option>
                    </select>
                </div>
                <div className='wordCloud'>
                    {words.length > 0 ? <WordCloud words={words} /> : null}
                </div>
                <div>
                    <h2>Top Cacti</h2>
                    {
                        cactiData.length > 0 ?
                            <div className='cactiList'>
                                {cactiData.slice(0,20).map((element, index) => {
                                    return (
                                        <div className='cactus' key={index}>
                                            <h3>{element.scientificName}</h3>
                                            <p>{element.verbatimElevation} ft</p>
                                            <p>{element.stateProvince}</p>
                                            <img src={element.thumbnailAccessURI} alt={element.scientificName} />
                                        </div>
                                    )
                                }
                                )}
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
