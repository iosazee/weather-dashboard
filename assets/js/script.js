let formEl = document.querySelector('#search-form')
let searchInput = document.querySelector('#search-input')
let btn = document.querySelector('#search-button')
let todayEl = document.querySelector('#today')
let todayCh;
let forecastEl = document.querySelector('#forecast')
let bodyEl = document.querySelector('body')
let historyEl = document.querySelector('#history')
let dataCtn = document.querySelector('#data-ctn')
let savedHx = JSON.parse(localStorage.getItem('history')) || []
let storedHx = JSON.parse(localStorage.getItem('history'))



getData()



function getData(){


    btn.addEventListener('click', (e) => {
        e.preventDefault()
        getHx()
        addHx()
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

                todayEl.innerHTML = ""
                getCurrWeather()
                forecastEl.innerHTML = ""
                getForecastWeather()

                historyEl.addEventListener('click', (e) => {

                    if(e.target && e.target.id == 'hxbtn'){

                        if (todayEl.hasChildNodes() && forecastEl.hasChildNodes()){

                            todayEl.innerHTML = null
                            forecastEl.innerHTML = null
                        } else {
                            getCurrWeather()
                            getForecastWeather()
                        }

                    }
                })

                function getCurrWeather(){
                    todayEl.innerHTML = ""
                    // $(todayEl).empty()

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

                            todayCh = document.createElement('div')
                            todayCh.innerHTML = `<div class="card today" style="color: #333; border: solid black 1px; padding: 8px">
                                            <h2>${currData.name} (${moment.unix(currData.dt).format("DD/MM/YY HH:mm")})
                                                <span><img src="${iconURL + currData.weather[0].icon}.png"></span></h2>
                                            <p> Temp: ${Math.round(currData.main.temp * 100)/100}ºC</p>
                                            <p>Wind: ${currData.wind.speed}m/s</p>
                                            <p>Humidity: ${currData.wind.speed}%</p>
                                        </div>`
                            todayEl.appendChild(todayCh)
                        })

                }

                function getForecastWeather(){
                    forecastEl.innerHTML = ""
                    // $(forecastEl).empty()
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
                }


                cityName = ""
            } else {
                alert('Please enter a city')
            }

        }
    })
    formEl.addEventListener('submit', (e) => {
        formEl.reset()
    })
}


function addHx () {
    if (!savedHx.includes(searchInput.value)){
        let cityName = searchInput.value
        savedHx.push(cityName)
        localStorage.setItem('history', JSON.stringify(savedHx))
    }


}

function getHx() {
   historyEl.childNodes = ""
    let storedHx = JSON.parse(localStorage.getItem('history'))
    console.log(storedHx)
        if (storedHx) {


            for (let i = 0; i < storedHx.length; i++) {

                let cityName = storedHx[i]
                console.log(cityName)
                let hxBtn = document.createElement('button')
                hxBtn.textContent = cityName
                hxBtn.classList.add("button")
                hxBtn.classList.add('mt-2')
                hxBtn.classList.add('btn-info')
                hxBtn.setAttribute('id', 'hxbtn')
                historyEl.appendChild(hxBtn)
            }


        }

}










