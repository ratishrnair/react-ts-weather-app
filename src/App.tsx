import React, { useState } from "react"
import LocationSearch from "./components/LocationSearch"
import LocationTable from "./components/LocationTable"
import WeatherSummary from "./components/WeatherSummary"

import { WeatherLocation } from "./model/Weather"
import { searchLocation } from "./services/WeatherService"

function App() {
  const [locations, setLocations] = useState<WeatherLocation[]>([])
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [loading, setLoading] = useState(false)
  const [
    currentLocation,
    setCurrentLocation,
  ] = useState<WeatherLocation | null>(null)

  const resetAlerts = () => {
    setError("")
    setWarning("")
  }

  const addLocation = async (term: string) => {
    resetAlerts()
    setLoading(true)
    const location = await searchLocation(term)

    if (!location) {
      setError(`No location found called '${term}'`)
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`)
    } else {
      setLocations([location, ...locations])
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Weather App</h1>
      <LocationSearch onSearch={addLocation} loading={loading} />
      {error ? <div className={`alert alert-danger`}>{error}</div> : null}
      {warning ? <div className={`alert alert-warning`}>{warning}</div> : null}
      <LocationTable
        locations={locations}
        current={currentLocation}
        onSelect={(location) => setCurrentLocation(location)}
      />
      <WeatherSummary location={currentLocation} />
    </div>
  )
}

export default App
