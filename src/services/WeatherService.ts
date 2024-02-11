export const FetchWeather = (city: string) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    ).then((response) => {
        if (!response.ok) {            
            throw new Error(response.statusText || 'An error occurred while fetching the weather data.');
        }
        
        return response.json();
    }).then((data) => {
        return data.main;
    }).catch((error) => {                
        throw new Error(error);
    });
};