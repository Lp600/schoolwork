const weath = document.querySelector(".weath");
const ctyinp = document.querySelector(".ctyinp");
const disp = document.querySelector(".disp");
const apiKey = "6df7f199325d1704659d6bcba4a72a53";
weath.addEventListener("submit",async event => {
    event.preventDefault();
    const city = ctyinp.value;
    if(city){
        try{
            const data = await getweatherData(city);
            displayweatherinfo(data);
            }
        catch(error){
            console.error(error);
            displayError(error);
            }
    }else{
        displayError("Please enter a City ");
        }
});
    
    async function getweatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error("Couldn't fetch weather data");
    }
    
    return await response.json();
    }
    
    
    function displayweatherinfo(data){
        const {name: city,main:{temp,humidity}, weather:[{description, id}]}= data;
        disp.textContent = "";
        disp.style.display = "flex";
        
        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji =document.createElement("p");
        
        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity} %`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getweatherEmoji(id);
        cityDisplay.classList.add("ctynme");
        tempDisplay.classList.add("ctytemp");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");
        disp.appendChild(cityDisplay);
        disp.appendChild(tempDisplay);
        disp.appendChild(humidityDisplay);
        disp.appendChild(descDisplay);
        disp.appendChild(weatherEmoji);
    }
    
    function getweatherEmoji(weatherId){
        switch(true){
            case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
            case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
            case (weatherId >= 400 && weatherId < 300):
            return "⛈️";
        }
    }
    
    
    function displayError(message){
        const errDisp = document.createElement("p");
        errDisp.textContent = message;
        errDisp.classList.add("errdsp");
        disp.textContent = "";
        disp.style.display = "flex";
        disp.appendChild(errDisp);
    }
