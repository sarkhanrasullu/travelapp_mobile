import React from 'react';
import TripList from './TripList'
import TabsWrapper from '../../components/tab/TabsWrapper';
import Api from '../../api/Api';
import { connect } from 'react-redux';
import { setTrips } from '../../modules/trips';
import { setLoading } from '../../modules/loading';
import { withNavigation } from 'react-navigation';

class TripsScreen extends React.Component {
    static navigationOptions = {
              // header: null,
              title: "Trips"
    };

    shouldComponentUpdate(){
      const { navigation } = this.props;
      const update = navigation.getParam("update");
      if(update){
        Api.loadTrips(this, 1);
      }
      return true;
    }


    componentDidMount() {
      Api.loadTrips(this, 1);
    }
    

   tabUpcoming = {
    title: "Upcoming",
    body: <TripList/>,
    onChange: ()=> Api.loadTrips(this, 1)
  }

   tabHistory = {
    title: "History",
    body: <TripList/>,
    onChange: ()=> Api.loadTrips(this, 2)
  }

  tabs = [this.tabUpcoming, this.tabHistory];

  render() {
    return (
      <TabsWrapper tabs={this.tabs}/>
    );
  }
}

const moduleActions = {
  setLoading,
  setTrips,
}

export default connect(null, moduleActions)(withNavigation(TripsScreen));
