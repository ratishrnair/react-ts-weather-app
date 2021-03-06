import { FC } from "react"
import { WeatherLocation } from "../model/Weather"

interface LocationTableProps {
  locations: WeatherLocation[]
  current: WeatherLocation | null
  onSelect: (location: WeatherLocation) => void
}

const LocationTable: FC<LocationTableProps> = ({
  locations,
  current,
  onSelect,
}) => {
  return (
    <div>
      <h2>Locations</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr
              key={location.id}
              className={location.id === current?.id ? "table-primary" : ""}
              onClick={() => onSelect(location)}
            >
              <td>{location.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LocationTable
