import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import React from 'react';

export default function App() {

  const [location, setLocation] = React.useState()
  const [temperature, setTemperature] = React.useState()
  const [condition, setCondition] = React.useState()
  const [conditionIcon, setConditionIcon] = React.useState()
  const [maxTemp, setMaxTemp] = React.useState()
  const [minTemp, setMinTemp] = React.useState()
  const [date, setDate] = React.useState()
  const [showLoading, setShowLoading] = React.useState(true)
  const [tomorrowIcon, setTomorrowIcon] = React.useState()
  let timer1 = setTimeout(() => setShowLoading(true), 5000)

  React.useEffect(() => {
    axios.get('https://api.weatherapi.com/v1/forecast.json?key=17bc6b7b0ac14c7aa5361629221404&q=Hanoi&days=1&aqi=no&alerts=no')
    .then((response) => {
      return ([
        setDate(response.data.current.is_day),
        setLocation(response.data.location.name),
        setTemperature(response.data.current.temp_c),
        setCondition(response.data.current.condition.text),
        setConditionIcon(response.data.current.condition.icon),
        setMaxTemp(response.data.forecast.forecastday[0].day.maxtemp_c),
        setMinTemp(response.data.forecast.forecastday[0].day.mintemp_c),
      ])
    })
  }, [showLoading])
  
  var day_name = ''
  switch (date) {
    case 1:
        day_name = "Chủ nhật";
        break;
    case 2:
        day_name = "Thứ hai";
        break;
    case 3:
        day_name = "Thứ ba";
        break;
    case 4:
        day_name = "Thứ tư";
        break;
    case 5:
        day_name = "Thứ năm";
        break;
    case 6:
        day_name = "Thứ sau";
        break;
    case 0:
        day_name = "Thứ bảy";
    }

  console.log(`https:${conditionIcon}`)

  return (
    <ImageBackground source={require('./assets/day.jpg')} style={styles.container}>
      <Text style={styles.title}>{location}</Text>
      <Image style={styles.conditionIcon} source={{ uri: (conditionIcon) ? `https:${conditionIcon}` : `https://cdn.weatherapi.com/weather/64x64/day/122.png` }} />
      <View style={styles.weather}>
        <Text style={styles.temperature}>
          <Text>{temperature}</Text>
          <Text style={styles.degreeText}>°C</Text>
        </Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
      <View style={styles.forecast}>
        <Text style={styles.colorWhite}>{maxTemp}°C / {minTemp}°C {day_name}</Text>
      </View>
      <View style={styles.forecastTomorrow}>
        <Image style={styles.tomorrowIcon} source={{ uri: (conditionIcon) ? `https:${conditionIcon}` : `https://cdn.weatherapi.com/weather/64x64/day/122.png` }} />
      </View>
      {/* <StatusBar style="auto" /> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 40,
    color: '#fff'

  },
  weather: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  temperature: {
    fontSize: 50,
    justifyContent: 'flex-start',
    flex: 2,
    color: '#fff',
    position: 'relative',
  },

  condition: {
    fontSize: 30,
    textAlign: 'right',
    color: '#fff',
    flex: 2
  },

  conditionIcon: {
    width: 200,
    height: 200,
  },

  degreeText: {
    fontSize: 20,
    position: 'absolute',
    top: 0,
    // left: 0,
    color: '#fff'
  },
  
  forecast: {
    justifyContent: 'flex-start',
    width: '100%',
  },

  colorWhite: {
    color: '#fff'
  },

  forecastTomorrow: {

  }
});
