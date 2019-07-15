import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList
} from 'react-native';
import Trip from './Trip';
import LoadingSpinner from '../../components/LoadingSpinner';
import { List } from 'native-base';
import { connect } from 'react-redux';
import { setTrips } from '../../modules/trips';
import { setLoading } from '../../modules/loading';

class TripList extends React.Component {
  static navigationOptions = {
    header: null,
  };

  renderList() {
    const { trips } = this.props;

    return <List>
            <FlatList
                style={{ overflow:'visible'}}
                data={trips}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => <Trip trip={item}/>}
              />
        </List>
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.isLoading?  <LoadingSpinner/> : this.renderList() }
      </SafeAreaView>
    );
  }
}

const moduleState = state => ({
  trips: state.trips.list,
  isLoading: state.loading.loading
});

const moduleActions = {
  setLoading,
  setTrips,
}

export default connect(moduleState, moduleActions)(TripList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
