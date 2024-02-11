import { useState } from "react";
import { FetchWeather } from "../services/WeatherService";

const useGetWeather = (city: string) => {
    const [weather, setWeather] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const getWeather = async () => {
        setLoading(true);
        try {
            const data = await FetchWeather(city)
            setWeather(data);
            setError(null);
            setLoading(false);
        } catch (error) {
            setWeather(null);
            setError(error);
            setLoading(false);
        }
    };

    return [weather, loading, error, getWeather];
}

export default useGetWeather;