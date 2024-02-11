import { render, screen } from "@testing-library/react";
import WeatherDetail from "../WeatherDetail";

test('check if the weather detail is rendered', () => {

    render(<WeatherDetail weather={{temp: 23}} />);

    expect(screen.getByText('Temp: 23°C')).toBeInTheDocument();
});