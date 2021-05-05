import { FC, useEffect, useState } from "react"
import { Weather, WeatherLocation } from "../model/Weather"
import { readForecast, readWeather } from "../services/WeatherService"
import { WeatherEntry } from "./WeatherEntry"

import styled from "styled-components"

interface WeatherSummaryProps {
  location: WeatherLocation | null
}

const StyledOl = styled.ol`
  overflow: auto;
`

const StyledLi = styled.li`
  border-right: 1px solid black;
  padding: 10px;
  list-style-type: none;
  display: inline-block;
  &:hover {
    background: lightgray;
  }
`

const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [forecast, setForecast] = useState<Weather[] | null>(null)

  useEffect(() => {
    ;(async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id),
          readForecast(location.id),
        ])
        setWeather(weather)
        setForecast(forecast)
      }
    })()
  }, [location])

  if (!location || !weather || !forecast) return null

  return (
    <div>
      <hr />
      <h2>{location.name}</h2>
      <WeatherEntry weather={weather} />

      <h2>Forecast</h2>
      <div>
        <StyledOl>
          {forecast.map((timePoint) => (
            <StyledLi key={timePoint.dt}>
              <WeatherEntry weather={timePoint} />
            </StyledLi>
          ))}
        </StyledOl>
      </div>
    </div>
  )
}

export default WeatherSummary
