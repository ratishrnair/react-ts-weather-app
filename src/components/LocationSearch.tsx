import { FC, useRef, useState } from "react"

interface LocationSearchProp {
  onSearch: (search: string) => void
  loading: boolean
}

const LocationSearch: FC<LocationSearchProp> = ({ onSearch, loading }) => {
  const [locationSearch, setLocationSearch] = useState<string>("")
  const disableSearch = locationSearch === ""

  const locationSearchEl = useRef<HTMLInputElement>(null)

  const addLocation = () => {
    onSearch(locationSearch)
    setLocationSearch("")
    locationSearchEl.current && locationSearchEl.current.focus()
  }

  return (
    <div>
      <label>
        Add Location
        <input
          className="ml-1 mr-1"
          type="text"
          value={locationSearch}
          ref={locationSearchEl}
          onChange={(e) => setLocationSearch(e.target.value)}
        />
      </label>

      <button
        className="btn btn-primary"
        onClick={addLocation}
        disabled={disableSearch || loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </>
        ) : (
          <>Search</>
        )}
      </button>
    </div>
  )
}

export default LocationSearch
