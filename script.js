const apiKey = ''; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

document.getElementById('getCurrentLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeather(location) {
    document.getElementById('weatherResult').innerHTML = '<p>Loading...</p>';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('weatherResult').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}

function fetchWeatherByCoords(lat, lon) {
    document.getElementById('weatherResult').innerHTML = '<p>Loading...</p>';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('weatherResult').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;

    const weatherHtml = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Conditions: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHtml;
}
