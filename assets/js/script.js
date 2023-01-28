let formEl = document.querySelector('#search-form')
let searchInput = document.querySelector('#search-input')
let btn = document.querySelector('#search-button')
let todayEl = document.querySelector('#today')
let todayCh;
let forecastEl = document.querySelector('#forecast')
let bodyEl = document.querySelector('body')


getData()
claerData();


function getData(){

    formEl.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.matches("button")) {
            let apiKey = "f3f271de41a3adb66feb29440379d419"
            let cityName;
            let lat;
            let lon;
            cityName = searchInput.value
            let iconURL = "https://openweathermap.org/img/w/"
            let searchUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
            // console.log(cityName)

            if (cityName.length != 0) {

                fetch(searchUrl)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    lat = data[0].lat
                    lon = data[0].lon
                    // console.log(lat, lon)

                    let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&limit=1`


                    return fetch(currentUrl)
                })
                .then(response => response.json())
                .then(currData => {
                    console.log(currData)

                    let persData = {
                            name: currData.name,
                            dateTime: moment.unix(currData.dt).format("DD/MM/YY HH:mm"),
                            icon: iconURL + currData.weather[0].icon,
                            temp: Math.round(currData.main.temp * 100)/100,
                            wind: currData.wind.speed,
                            humidity: currData.main.humidity
                    }

                    localStorage.setItem('persData', JSON.stringify(persData))

                    todayCh = document.createElement('div')
                    todayCh.innerHTML = `<div class="card today" style="color: #333; border: solid black 1px; padding: 8px">
                                            <h2>${persData.name} (${persData.dateTime})
                                                <span><img src="${persData.icon}.png"></span></h2>
                                            <p> Temp: ${persData.temp}ºC</p>
                                            <p>Wind: ${persData.wind}m/s</p>
                                            <p>Humidity: ${persData.humidity}%</p>
                                        </div>`
                    todayEl.appendChild(todayCh)
                })


                fetch(searchUrl)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    lat = data[0].lat
                    lon = data[0].lon
                    // console.log(lat, lon)

                    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`


                    return fetch(forecastUrl)
                })
                .then(response => response.json())
                .then(forecastData => {
                    // console.log(forecastData)

                    forecastEl.insertAdjacentHTML(
                        "afterbegin",

                        `<div class="col-lg-12 py-3">
                            <h2> 5-Day Forecast: </h2>
                        </div>`
                    )

                    const newArr = forecastData.list
                    // console.log("newArr: ",newArr)
                    const selArr = []
                    selArr.push(newArr[0], newArr[9], newArr[18], newArr[26], newArr[36])
                    // console.log("selArr: ",selArr)


                    selArr.map((item) => {
                        return forecastEl.insertAdjacentHTML(
                                    "beforeend",
                                    `<div class="card forecast" style="background-color: #7393B3; color: #fff">
                                        <h3> ${moment.unix(item.dt).format("DD/MM/YYYY")} </h3>
                                        <p> <img src="${iconURL + item.weather[0].icon}.png" /> </p>
                                        <p> Temp: ${Math.round(item.main.temp * 100)/100} ºC </p>
                                        <p>Wind: ${item.wind.speed}m/s</p>
                                        <p>Humidity: ${item.main.humidity}%</p>
                                    </div>`
                                    )
                    })

                })

            } else {
                cityName = ""
            }

        }
    })
}


function claerData() {

   localStorage.clear()
}














