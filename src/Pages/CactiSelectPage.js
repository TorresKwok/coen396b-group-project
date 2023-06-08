import React from 'react'
import merged_data from "../data/csvjson.json"
import WordCloud from '../components/wordCloud'
import './CactiSelectPage.css'

export default function CactiSelectPage() {
    
    //get all the different elevations out of the data
    let elevations = []
    merged_data.forEach(element => {
        if (!elevations.includes(element.verbatimElevation)) {
            elevations.push(element.verbatimElevation)
        }
    });

    let newData = merged_data.filter(element => element.verbatimElevation >= '2000 ft' && element.stateProvince === 'Arizona')

    //need to extract order and family from the elements and add to an object that will have the count of each
    let words = []
    newData.forEach(element => {
        if (element.order !== undefined && element.family !== undefined) {
            let order = element.order
            let family = element.family
            let orderFamily = order + ' ' + family
            let found = false
            words.forEach(word => {
                if (word.text === orderFamily) {
                    word.size += 1
                    found = true
                }
            })
            if (!found) {
                words.push({text: orderFamily, size: 1})
            }
        }
    });
    console.log(words)

    return (
        <div className='container'>
            <h2>Select Cacti Preferences</h2>
            {words.length > 0 ? <WordCloud words={words} /> : null}
        </div>
    )
}
