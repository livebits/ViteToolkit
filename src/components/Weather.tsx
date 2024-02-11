import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import WeatherDetail from "./WeatherDetail"
import '../styles/Weather.css'
import { debounce } from "lodash";
import useGetWeather from "../hooks/useGetWeather"
import { SearchCity } from "../services/NinjaService";
import { City } from "../types/City";

const Weather = () => {
    const [city, setCity] = useState<string>('')
    const [cities, setCities] = useState<City[]>([])
    const [weather, loading, error, getWeather] = useGetWeather(city)

    const debouncedSearchCity = debounce((city: string) => {
        SearchCity(city).then((response) => {
            setCities(response)
        }).catch((error) => {
            console.log(error)
        });
    }, 1000);

    useEffect(() => {
        debouncedSearchCity(city)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city])

    return (
        <>
            <div className="weather">
                <SearchBar city={city} setCity={setCity} />
                <button onClick={() => getWeather()} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Weather'}
                </button>
            </div>
            {weather && <WeatherDetail weather={weather} />}
            {error && <div className="error">{error.message}</div>}
            {cities.length > 0 && (
                <div className="cities">
                    <p>Found cities</p>
                    <ul>
                        {cities.map(city =>
                            <li key={city.latitude}>{city.name}</li>
                        )}
                    </ul>

                </div>
            )}
        </>
    )

}

export default Weather;