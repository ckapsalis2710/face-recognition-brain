import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import avatarImage from './Avery_botttsNeutral.png';

class ProfileIcon extends React.Component {
	API_BASE_URL = process.env.REACT_APP_API_URL;

	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false
		}
	}

	toggle = () => {
		this.setState((prevState) => ({
			dropdownOpen: !prevState.dropdownOpen
		}))
	};

	signOutActions = async () => {
	    const token = window.sessionStorage.getItem('token');
	    if (token) {
	      try {
	      	// Request to delete relative entry from Redis
	        await fetch(`${this.API_BASE_URL}/signout`, {
	          method: 'POST',
	          headers: {
	            'Authorization': token
	          }
	        })
    		.then(resp => {
				if (resp.ok) { // Upon success, delete token in browser
					window.sessionStorage.removeItem('token');
					console.log('Token successfully deleted.');
				} else {
					console.log('Token failed to be deleted from Redis.');
				}
				this.props.onRouteChange('signout');
	    	}).catch(err => console.log(err))
	  		} catch (err) {
	  			// even in this case, delete browser token and signout
	  			window.sessionStorage.removeItem('token');
	  			this.props.onRouteChange('signout');
	        	console.error('Network error during signout: ', err);
	  		}
	    } else { // if there is no token don't do anything. Just signout
	    	this.props.onRouteChange('signout');
    		return;
	    }
  	}

	render() {
		return (
			<div className="pa4 tc">
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				  <DropdownToggle
				    data-toggle="dropdown"
				    tag="span">
				    <img
				      src={avatarImage}
				      className="br-100 ba h3 w3 dib" alt="avatar" />
				  </DropdownToggle>
				  <DropdownMenu className='b--transparent shadow-5' style={{marginLeft: '-6rem', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} >
				    <DropdownItem onClick={this.props.toggleModal}>
				      View Profile
				    </DropdownItem>
				    <DropdownItem onClick={this.signOutActions}>
				      Sign Out
				    </DropdownItem>
				  </DropdownMenu>
				</Dropdown>
			</div>
		)
	}
}

export default ProfileIcon;