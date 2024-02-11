
type WeatherDetailProps = {
    weather: any
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({weather}) => {
    return (
        <div className="WeatherDetail">
            Temp: {weather.temp}°C
        </div>
    )
}

export default WeatherDetail;