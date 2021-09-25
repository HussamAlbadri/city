import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Weather from './component/Weather';
import Movie from './component/Movie';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: [],
      searchForQuery: '',
      showLocation: false,
      errorHandling: false,
      weatherDataResult: [],
      MovieData: []
    }
  }

  getLocFun = async (event) => {
    event.preventDefault();
        await this.setState({
          searchForQuery: event.target.City.value
        })
    //`http://localhost:3005/getweatherApi?city=${this.state.searchForQuery}`;
  //  `${process.env.REACT_APP_SERVER_LINK}/getweatherApi?city=${this.state.searchForQuery}`;

        try{    
        let reqwUrl = `http://localhost:3005/getweatherApi?city=${this.state.searchForQuery}`;
    
        let aPIweatherData = await axios.get(reqwUrl);
      
        this.setState({
          weatherDataResult: aPIweatherData.data,
          showLocation: true,
          errorHandling:false
        })
      } catch{
        this.setState({
          errorHandling:true,
          showLocation: false
        })
      }
// Weather Data Section
      try{    
        let locationurl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchForQuery}&format=json`;
    
        let locResult = await axios.get(locationurl);
      
        console.log('asArray', locResult.data);
    
    
    
        this.setState({
          locationResult: locResult.data[0],
          showLocation: true,
          errorHandling:false
        })
      } catch{
        this.setState({
          errorHandling:true,
          showLocation: false
        })
      }
// Movie Data Section
try{
  let movieDataLink = `https://city-explorer-app404.herokuapp.com/movies?city=${this.state.searchForQuery}`;

  let dataApi = await axios.get(movieDataLink);

  this.setState({
    MovieData:dataApi.data,
    showLocation: true,
    errorHandling: false 
  })
} catch{
  this.setState({
    errorHandling: true,
    showLocation: false
  })
}
}


  render() {
    return (
      <div>
        <Form onSubmit={this.getLocFun}>
          <input type="text" name="City" />
          <input type="submit" value="getCityInfo" />
        </Form>

      {this.state.showLocation && 
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />
        
        <Card.Body>
    <Card.Title>City Explorer</Card.Title>

    {/* <Button variant="primary">Go somewhere</Button> */}

    <ListGroup variant="flush">
    <ListGroup.Item> City: {this.state.searchForQuery}</ListGroup.Item>
    <ListGroup.Item> Latitude: {this.state.locationResult.lat}</ListGroup.Item>
    <ListGroup.Item> Longitude: {this.state.locationResult.lon}</ListGroup.Item>

    {this.state.weatherDataResult.map(info => {
     return (
      <ListGroup.Item>
    <Weather  weatherDataResult={info} />
  </ListGroup.Item>
    )})} 
    {this.state.MovieData.map(info =>{
      return(
        <ListGroup.Item>
          <Movie MovieData={info} />
          </ListGroup.Item>
      )
    })}

  </ListGroup>
  </Card.Body>
  
      </Card>
      }
       
      </div>
    )
  }
}

export default App;