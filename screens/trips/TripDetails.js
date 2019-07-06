import React, { Component } from 'react'
import BookDetails from '../book/BookDetails';
import { withNavigation } from 'react-navigation';

class TripDetails extends Component {

  state = {
    target: {},
    validation:{},
    validate:null
  }

  componentWillMount(){
    const {navigation} = this.props;
    const trip = navigation.getParam("trip");
    this.setState({target:trip});
  }

  render() {
    const {navigation} = this.props;
    const trip = navigation.getParam("trip");
    return (
      <BookDetails component={this} selectedTrip={trip} readOnly={true}/> 
    )
  }
}

export default withNavigation(TripDetails);