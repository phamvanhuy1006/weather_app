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
    case 0:
        day_name = "Chủ nhật";
        break;
    case 1:
        day_name = "Thứ hai";
        break;
    case 2:
        day_name = "Thứ ba";
        break;
    case 3:
        day_name = "Thứ tư";
        break;
    case 4:
        day_name = "Thứ năm";
        break;
    case 5:
        day_name = "Thứ sau";
        break;
    case 6:
        day_name = "Thứ bảy";
    }

  // console.log(day)

  return (
    <ImageBackground source={require('./assets/dayImage.jpeg')} style={styles.container}>
      <Text style={styles.title}>{location}</Text>
      <Image style={styles.conditionIcon} source={ (conditionIcon != null) ? `https:${conditionIcon}` : '' } />
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
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: 20,
    paddingLeft: '20px',
    paddingRight: '20px',
  },

  title: {
    fontWeight: 'bold',
    fontSize: '30px',
    marginBottom: '40px',
    color: '#fff'

  },
  weather: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  temperature: {
    fontSize: '50px',
    justifyContent: 'start',
    width: '100%',
    flexDirection: 'column',
    color: '#fff'
  },

  condition: {
    textAlign: 'end',
    fontSize: '30px',
    width: '100%',
    alignItems: 'start',
    color: '#fff'
  },

  conditionIcon: {
    width: '200px',
    height: '200px',
  },

  degreeText: {
    fontSize: '20px',
    position: 'absolute',
    top: 10,
    color: '#fff'
  },
  
  forecast: {
    justifyContent: 'start',
    width: '100%',
  },

  colorWhite: {
    color: '#fff'
  }
});
