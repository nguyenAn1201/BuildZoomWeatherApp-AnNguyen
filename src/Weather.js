import React from 'react';


const Weather = () => {
    const apiId = "284027b5cfc736b902b27754a7064f44";
    const [ zipcode, setZipCode ] = React.useState("02169"); //Default to my zipcode in Quincy
    const [ weather, setWeather ] = React.useState({description: "", main: ""})
    const [ searchHistory, setSearchHistory ] = React.useState([])


    const handleSubmit = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiId}`)
            .then((res) => {
                res.json()
                    .then((result) => {
                        setWeather({description: result.weather[0].description, main: result.weather[0].main})
                        console.log(typeof searchHistory)
                        console.log("Reuslt name: ", result.name)


                        const newHistory = searchHistory.push(result.name)

                        setSearchHistory(newHistory)
                        searchHistory.forEach((history) => {
                            console.log(history)}
                        )
                    })
                    .catch((error) => alert(`Error: ${error}`))

            })
            .catch((error) => {
                alert(`Failed to get weather for ${zipcode}. Error ${error}`)
            })
    }

    return <div>
        <form>
            <label>
                Zip code:
                <input type="text" name="zipCode" onChange={(e) => setZipCode(e.target.value)}/>
            </label>
            <button onClick={(e) => {
                e.preventDefault()
                handleSubmit()}} >
                Submit
            </button>
        </form>
        <div style={{border: "1px solid black", padding: "18px"}}>
            <h> The weather at {zipcode} is: </h>
            <p> Description: {weather.description}</p>
            <p> Main: {weather.main}</p>
        </div>
        <div style={{border: "1px solid black"}}>
            <h>Last searches</h>
                {searchHistory.map((history) => {
                    return <div>
                        <p>
                            {history}
                        </p>
                    </div>
                })}
        </div>
    </div>
}

export default Weather;