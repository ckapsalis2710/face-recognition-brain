import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import ParticlesBg from 'particles-bg';
import './App.css';

// const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

// Logs to depict environment info
console.log('=== ENVIRONMENT INFO ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('=======================');

const initialState = {
  input: '',
  imageUrl: undefined,
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: ''
  }
}

class App extends Component {
  API_BASE_URL = process.env.REACT_APP_API_URL;
  
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${this.API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          fetch(`${this.API_BASE_URL}/profile/${data.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => response.json())
          .then(user => {
            if (user && user.email) {
              this.loadUser(user)
              this.onRouteChange('home');
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      age: data.age,
      pet: data.pet
    }})
  }

  calculateFaceLocation = (data) => {
    const bounding_box = data;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: bounding_box.left_col * width,
      topRow: bounding_box.top_row * height,
      rightCol: width - (bounding_box.right_col * width),
      bottomRow: height - (bounding_box.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState(prevState => ({
      boxes: [...prevState.boxes, box] 
    }));
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({boxes: [], imageUrl: this.state.input});
    const token = window.sessionStorage.getItem('token');
    
    fetch(`${this.API_BASE_URL}/imageurl`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if (typeof response !== 'string') { // Error returns from Clarifai API call as a string
          fetch(`${this.API_BASE_URL}/image`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(entries => {
            this.setState(Object.assign(this.state.user, { entries: entries}))
          })
          .catch(console.log);
        }
      return response;
    })
    .then(result => {
      if (typeof result !== 'string') { // Error returns from Clarifai API call as a string
        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            this.displayFaceBox(this.calculateFaceLocation(boundingBox));

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
            });
        });
      }
    })
    .catch(error => console.log('Error on regions: ', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {
    const { isSignedIn, imageUrl, route, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
        {isProfileOpen &&
          <Modal>
            <Profile 
              user={user} 
              isProfileOpen={isProfileOpen} 
              loadUser={this.loadUser}
              toggleModal={this.toggleModal}/>
          </Modal>
        }
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={this.state.boxes} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
      }
      </div>
    );
  }
}
  
export default App;
