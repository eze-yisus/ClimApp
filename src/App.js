import React, { useState } from 'react';
import Card from './components/Card.jsx';
import Cards from './components/Cards.jsx';
import SearchBar from './components/SearchBar.jsx';
import styles from './App.module.css';

const apikey = "4ae2636d8dfbdc3044bede63951a019b"

function App() {
  const [data, setData] = useState([]);

  function onSearch(ciudad) {
    if (data.length > 2) {
      alert("No puedes agregar más ciudades.");
    } else {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric`
      )
        .then(r => r.json())
        .then((recurso) => {
          if (recurso.main !== undefined) {
            const ciudad = {
              min: Math.round(recurso.main.temp_min),
              max: Math.round(recurso.main.temp_max),
              img: recurso.weather[0].icon,
              id: recurso.id,
              wind: recurso.wind.speed,
              temp: recurso.main.temp,
              name: recurso.name,
              weather: recurso.weather[0].main,
              clouds: recurso.clouds.all,
              latitud: recurso.coord.lat,
              longitud: recurso.coord.lon,
            };
            setData(oldCities => [...oldCities, ciudad]);
          } else {
            alert("Ciudad no encontrada");
          }
        });
    }
  }

  function handleOnClose(id) {
    setData(prevData => {
      return prevData.filter(city => city.id !== id)
    })
  }

  return (
    <div className={styles.app}>
      <div className={styles.bkg} />
      <div className={styles.container}>
        <div>
          <SearchBar
            onSearch={onSearch}
          />
        </div>
        <div className={styles.citiesContainer}>
          {data.length > 0 &&
            <Card
              primary
              max={data[data.length - 1].max}
              min={data[data.length - 1].min}
              name={data[data.length - 1].name}
              img={data[data.length - 1].img}
            />}
          <Cards
            cities={data}
            onClose={handleOnClose}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
