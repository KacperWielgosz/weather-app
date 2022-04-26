import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';


const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCityChange = useCallback(cityName => {
    setShowLoader(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2d3e8d0ac8d85755a76075b4d5848ebb&units=metric`)
     .then(res => {
       if(res.status === 200) {
         return res.json()
           .then(data => {
             setWeatherData({
               city: data.name,
               temp: data.main.temp,
               icon: data.weather[0].icon,
               description: data.weather[0].main
             })
             setShowLoader(false)
           });
       } else {
         setShowError(true)
       }
    });
    setShowError(false);
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange}/>
      { (weatherData && !showError) && <WeatherSummary {...weatherData} /> }
      { (showLoader && !showError) && <Loader /> }
      { showError && <ErrorBox>Invalid city name</ErrorBox>}
    </section>
  )
};

export default WeatherBox;
