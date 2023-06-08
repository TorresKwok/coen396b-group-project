const fetchAverageTemperature = async (lat, lon) => {
    fetch(`http://history.openweathermap.org/data/2.5/aggregated/year?lat=${lat}&lon=${lon}&appid=297bde95ba03dd2c1443c9797becc09b`)
        .then(res => {return res.json()})
}

export { fetchAverageTemperature }