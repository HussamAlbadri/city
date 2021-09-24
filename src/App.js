import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      Query: '',
      showLocation: false,
      errorHandling: false
    }
  }

  getLocFun = async (e) => {
        e.preventDefault();
        await this.setState({
          Query: e.target.City.value
        })
    
        try{    
        let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    
        let locResult = await axios.get(reqUrl);
      
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
    <ListGroup.Item> City: {this.state.Query}</ListGroup.Item>
    <ListGroup.Item> Latitude: {this.state.locationResult.lat}</ListGroup.Item>
    <ListGroup.Item> Longitude: {this.state.locationResult.lon}</ListGroup.Item>
  </ListGroup>
  </Card.Body>
  
       

      </Card>
      }
       
      </div>
    )
  }
}

export default App;