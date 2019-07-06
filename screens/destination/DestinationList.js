import React from 'react';
import Destination from './Destination';
import ListPage from '../../components/listpage/ListPage';
import { connect } from 'react-redux';
import { setDestinations} from '../../modules/destinations';

class DestinationList extends React.Component {

  static navigationOptions = {
    title: "Places",
    header:null
  };

  render(){
    const { destinations } = this.props;
    return <ListPage list={destinations} renderType={Destination}/>
  }

}

const moduleState = state => ({
  destinations: state.destinations.list,
});

const moduleActions = {
  setDestinations
}

export default connect(moduleState, moduleActions)(DestinationList);