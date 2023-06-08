import React, { useLayoutEffect, useState } from 'react'
import merged_data from "../data/csvjson.json"
import WordCloud from '../components/wordCloud'
import './CactiSelectPage.css'

export default function CactiSelectPage() {
    //states
    const [words, setWords] = useState([])
    const [elevation, setElevation] = useState('2000 ft')
    const [state, setState] = useState('Arizona')
    const [temperature, setTemperature] = useState('35')
    const [cactiData, setCactiData] = useState([])


    function filterData() {
        let newData = merged_data.filter(element => element.verbatimElevation >= elevation && element.stateProvince === state
            // && element.averageTemp >= temperature
        )
        setCactiData(newData)
        getWords(newData)
    }

    //this was for testing purposes
    // //get all the different elevations out of the data
    // let elevations = []
    // merged_data.forEach(element => {
    //     if (!elevations.includes(element.verbatimElevation)) {
    //         elevations.push(element.verbatimElevation)
    //     }
    // });

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
                    <select name='elevation'>
                        <option value=''>Above 1000ft</option>
                        <option value=''>Above 2000ft</option>
                        <option value=''>Above 3000ft</option>
                        <option value=''>Above 4000ft</option>
                    </select>
                    <select name='state'>
                        <option value=''>Arizona</option>
                        <option value=''>California</option>
                        <option value=''>Texas</option>
                    </select>
                    <select name='temperature'>
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
