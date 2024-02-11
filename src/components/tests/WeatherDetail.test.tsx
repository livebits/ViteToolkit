import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import WeatherDetail from "../WeatherDetail";

test('check if the weather detail is rendered with different temperature', () => {
    render(<WeatherDetail weather={{temp: 30}} />);
    expect(screen.getByText('Temp: 30°C')).toBeInTheDocument;
});

test('check if the weather detail is not rendered with incorrect temperature', () => {
    render(<WeatherDetail weather={{temp: 30}} />);
    expect(screen.queryByText('Temp: 25°C')).toBeNull();
});

test('check if the WeatherDetail component has the correct class', () => {
    render(<WeatherDetail weather={{temp: 30}} />);
    const element = screen.getByText('Temp: 30°C');
    expect(element).toHaveClass('WeatherDetail');
});