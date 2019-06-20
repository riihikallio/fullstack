import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const Weather = ({location}) => {
  const [ weather, setWeather ] = useState({
    current: {
      temp_c: '--', 
      condition: {icon: ''},
      wind_kph: '--',
      wind_dir: '--'
    }})
  useEffect(() => {axios
    .get('http://api.apixu.com/v1/current.json?key=6afd75493d7b4fcea55152643192006&q='+location) 
    .then(response => setWeather(response.data))
  }, [location])
  return (
    <div>
      <h3>Wheather in {location}</h3>
      <p>
        Temperature: {weather.current.temp_c}°C<br />
        <img src={weather.current.condition.icon} /><br />
        Wind: {weather.current.wind_kph} km/h ({weather.current.wind_dir})
      </p>
    </div>
  )
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {axios
    .get('https://restcountries.eu/rest/v2/all') 
    .then(response => setCountries(response.data))
  }, [])

  const result = () => {
    const list=countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    if (list.length > 10) {
      return <div>Too many matches, specify another filter {list.length}</div>
    }
    if (list.length > 1) {
      return (<div>
          {list.map(maa => 
            <div key={maa.alpha2Code}>
              {maa.name} 
              <button onClick={() => setFilter(maa.name)}>Show</button>
            </div>)}
        </div>
      )
    }
    if (list.length === 1) {
      return (
        <div>
          <h1>{list[0].name}</h1>
          <div>Capital: {list[0].capital}</div>
          <div>Population: {list[0].population}</div>
          <h3>Languages</h3>
          <ul>
            {list[0].languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
          </ul>
          <img src={list[0].flag} width="150" alt='flag' style={{border: '1px solid lightgray'}} />
          <Weather location={list[0].capital} />
        </div>
      )
    }
    return <div>No results</div>
  }
  
  const filterHandler = (event) => setFilter(event.target.value)

  return (
    <div>
      Find countries <input 
        value={filter}
        onChange={filterHandler}
      />
    {result()}
    </div>
  );
}

export default App;