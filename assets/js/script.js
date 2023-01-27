let searchInput = document.querySelector('#search-input')
let btn = document.querySelector('#search-button')
let todayEl = document.querySelector('#today')
let forecastEl = document.querySelector('#forecast')



btn.addEventListener('click', (e) => {
    e.preventDefault()
    let apiKey = "f3f271de41a3adb66feb29440379d419"
    let cityName;
    let lat;
    let lon;
    cityName = searchInput.value
    let iconURL = "https://openweathermap.org/img/w/"
    let searchUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    console.log(cityName)

    if (cityName.length != 0) {

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                lat = data[0].lat
                lon = data[0].lon
                console.log(lat, lon)

                let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&limit=1`


                return fetch(currentUrl)
            })
            .then(response => response.json())
            .then(currData => {
                console.log(currData)
                todayEl.insertAdjacentHTML(
                    "afterbegin",

                    `<div class="card today" style="color: #333; border: solid black 1px; padding: 8px">
                    <h2>${
                        currData.name
                    } (${moment.unix(currData.dt).format("DD/MM/YYYY")}) <span><img src="${iconURL + currData.weather[0].icon}.png"></span></h2>
                    <p> Temp: ${Math.round(currData.main.temp)}ºC</p>
                    <p>Humidity: ${currData.main.humidity}%</p>
                    <p>Wind: ${currData.wind.speed}m/s</p>
                    </div>`
                )
            })

            fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                lat = data[0].lat
                lon = data[0].lon
                console.log(lat, lon)

                let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`


                return fetch(forecastUrl)
            })
            .then(response => response.json())
            .then(forecastData => {
                console.log(forecastData)

                forecastEl.insertAdjacentHTML(
                    "afterbegin",

                    `<div class="col-lg-12 py-3">
                        <h2> 5-Day Forecast: </h2>
                    </div>`
                )

                const newArr = forecastData.list
                console.log("newArr: ",newArr)
                newArr.map((item) => {
                    return forecastEl.insertAdjacentHTML(
                                "beforeend",
                                `<div class="card forecast" style="background-color: #7393B3; color: #fff">
                                    <h3> ${moment.unix(item.dt).format("DD/MM/YYYY")} </h3>
                                    <p> <img src="${iconURL + item.weather[0].icon}.png" /> </p>
                                    <p> Temp: ${Math.round(item.main.temp)} ºC </p>
                                    <p>Wind: ${item.wind.speed}m/s</p>
                                    <p>Humidity: ${item.main.humidity}%</p>

                                </div>`
                                )
                })
            })

    }
})



