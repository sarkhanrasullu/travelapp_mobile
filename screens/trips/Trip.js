import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
const { width, height } = Dimensions.get('screen');

class Trip extends React.Component {
 
  render() {
        const { trip, navigation } = this.props;

        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('TripDetails', { trip: trip })}>
            <View style={styles.trip}>
            <ImageBackground
              style={styles.tripImage}
              imageStyle={styles.tripImage}
              source={{ uri: trip.placeId.placeMediafileList[0].mediafile }}
            />

            <View style={styles.tripDetails}>
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.tripInfo}>
                <Text style={{ marginLeft: 4, fontWeight: 'bold'}}>To:</Text>
                <Text style={{ marginLeft: 4}}>{trip.placeId.name}</Text>
                </View>
              </View>
              {
               trip.driverId? <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.tripInfo}>
                <Text style={{ marginLeft: 4, fontWeight: 'bold'}}>Driver:</Text>
                <Text style={{ marginLeft: 4}}>{trip.driverId.userId.name+" "+trip.driverId.userId.surname}</Text>
                </View>
              </View> : null
              }
              {
                trip.guideId?
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.tripInfo}>
                <Text style={{ marginLeft: 4, fontWeight: 'bold'}}>Guide:</Text>
                  <Text style={{ marginLeft: 4}}>{trip.guideId.userId.name+" "+trip.guideId.userId.surname}</Text>
                </View>
              </View>:null
              }
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.tripInfo}>
                <Text style={{ marginLeft: 4, fontWeight: 'bold'}}>Date:</Text>
                  <Text style={{ marginLeft: 4}}>{trip.pickupDate+" "+trip.pickupTime}</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.tripInfo}>
                <Text style={{ marginLeft: 4, fontWeight: 'bold'}}>Location:</Text>
                  <Text style={{ marginLeft: 4}}>{trip.pickupCoords}</Text>
                </View>
              </View>
            </View>
            {/* <View style={{ flex: 0.2, justifyContent: 'center' }}>
              <SimpleLineIcons name="options-vertical" color="#A5A5A5" size={24} />
            </View> */}
          </View>
          </TouchableOpacity>
        )
  }
}

export default withNavigation(Trip);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  rvMarker: {
    backgroundColor: '#FFBA5A',
  },
  tentMarker: {
    backgroundColor: '#FF7657',
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  activeTab: {
    borderBottomColor: '#FF7657',
  },
  activeTabTitle: {
    color: '#FF7657',
  },
  map: {
    flex: 1,
  },
  trip: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  tripDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  tripImage: {
    width: width * 0.30,
    height: width * 0.25,
    borderRadius: 6,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)'
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB'
  }
});
