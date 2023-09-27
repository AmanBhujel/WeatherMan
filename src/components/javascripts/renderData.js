import React, { useEffect, useState } from 'react';
import '../styles/renderData.css';
import LocationComponent from './getLocation';
import { useDataContext } from '../contexts/context';
import Loading from './Loading';
import { BsSearch } from "react-icons/bs";
import { toast } from 'react-toastify';

const apiKey = process.env.REACT_APP_API_KEY;

const RenderData = () => {
  const [query, setQuery] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const { weatherData, setWeatherData, latitude, longitude } = useDataContext();

  //formatting date
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', options);
  };

  //fetch weather by query
  const fetchWeatherByQuery = () => {
    if (query) {
      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return
          }
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error)

          throw error;
        });
    }
    return;
  };

  //handle query submit
  const handleQuerySubmit = () => {
    fetchWeatherByQuery();
    setQuery('');
  };

  //fetch weather by lat and lon
  const fetchWeatherByCoords = () => {
    return fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => {
        throw error;
      });
  };
  //formatting time
  const updateTime = () => {
    if (weatherData && weatherData.location && weatherData.location.localtime) {
      const currentTime = new Date(weatherData.location.localtime);
      const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setDisplayTime(formattedTime);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherByCoords();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    updateTime();
  }, [weatherData]);

  return (
    <>
      <LocationComponent />
      <main>
        <section className='weatherDisplaySection'>
          <h1>WeatherMan</h1>
          {weatherData && weatherData.location && weatherData.current ? (
            <div className='weatherDisplaySectionContents'>
              <div className='weatherDisplaySectionLeft'>
                <p className='weatherDisplaySectionDate'> {formatDate(weatherData.location.localtime)}</p>
                <p className='weatherDisplaySectionTime'>{displayTime}</p>
                <div className='weatherDisplaySectionLeftContent'> {weatherData.current.condition ? (
                  <>
                    <img className='weatherDisplaySectionIcon' src={weatherData.current.condition.icon} alt="Weather Icon" />
                    <p className='weatherDisplaySectionCondition'>({weatherData.current.condition.text})</p>
                  </>
                ) : (
                  <p>Loading weather conditions...</p>
                )}
                  <p className='weatherDisplaySectionLocation'>{weatherData.location.name} ,{weatherData.location.country}</p>
                  <p className='weatherDisplaySectionContinent'>{weatherData.location.tz_id.split('/')[0]}</p></div>
              </div>
              <div className='weatherDisplaySectionRight'>
                <div className='weatherDisplaySectionSearch'>
                  <input value={query} type='text' placeholder='Search by City...' onChange={(e) => setQuery(e.target.value)} />
                  <button onClick={handleQuerySubmit}><BsSearch /></button>
                </div>
                <p className='weatherDisplaySectionRightHeading'>More Info:</p>
                <div className='weatherDisplaySectionRightGrid'>
                  <p>Location: {weatherData.location.name}</p>
                  <p>Country: {weatherData.location.country}</p>
                  <p>Temperature : {weatherData.current.temp_c}°C </p>
                  <p>Humidity: {weatherData.current.humidity}%</p>
                  <p>Lat: {weatherData.location.lat}</p>
                  <p>Lon: {weatherData.location.lon}</p>
                  <p>Continent: {weatherData.location.tz_id.split('/')[0]}</p>
                  <p>Date: {formatDate(weatherData.location.localtime).split(',')[0]}</p>
                </div>
              </div>
            </div>
          ) : (
            <div><Loading /></div>
          )}
        </section>
      </main>
    </>
  );
};

export default RenderData;
