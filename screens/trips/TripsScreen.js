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
      const mode = navigation.getParam("mode");
      if(update){
        let type = 1;
        if(mode==="employee"){
          type = 3;
        }
        Api.loadTrips(this, type);
      }
      return true;
    }


    getMode = ()=>{
      const { navigation } = this.props;
      const mode = navigation.getParam("mode");
      return mode;
    }

    getTypeForUpcoming = ()=>{
      const { navigation } = this.props;
      let type = 1;
      const mode = navigation.getParam("mode");
      if(mode==="driver"){
        type = 3;
      }else if(mode==="guide"){
        type = 5;
      }
      return type;
    }

    getTypeForHistory = ()=>{
      const { navigation } = this.props;
      let type = 2;
      const mode = navigation.getParam("mode");
      if(mode==="driver"){
        type = 4;
      }else if(mode==="guide"){
        type = 6;
      }
      return type;
    }

    componentDidMount() {
      let type = this.getTypeForUpcoming();
      Api.loadTrips(this, type);
    }
    

   tabUpcoming = {
    title: "Upcoming",
    body: <TripList/>,
    onChange: ()=> Api.loadTrips(this, this.getTypeForUpcoming())
  }

   tabHistory = {
    title: "History",
    body: <TripList/>,
    onChange: ()=> Api.loadTrips(this, this.getTypeForHistory())
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
