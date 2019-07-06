import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/settings/SettingsScreen';
import HomeScreen from '../screens/homescreen/HomeScreen';
import DestinationList from '../screens/destination/DestinationList';
import TripsScreen from '../screens/trips/TripsScreen';
import GuideList from '../screens/guide/GuideList';
import DriverList from '../screens/driver/DriverList';

const SearchStack = createStackNavigator({
    Search: {
      screen: HomeScreen,
    }   
  }
);

SearchStack.navigationOptions = {
  header: null,
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='ios-home' />
  ),
  tabBarVisible: false
};
 
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

const TripsStack = createStackNavigator({
  TripList: TripsScreen,
});

TripsStack.navigationOptions = {
  tabBarLabel: 'Trips',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-list-box'}
    />
  ),
};

const DestinationsStack = createStackNavigator({
  DestinationList: DestinationList,
});

DestinationsStack.navigationOptions = {
  tabBarLabel: 'Places',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-pin'}
    />
  ),
};


const GuidesStack = createStackNavigator({
  GuideList: GuideList,
});

GuidesStack.navigationOptions = {
  tabBarLabel: 'Guides',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-body'}
    />
  ),
};

const DriversStack = createStackNavigator({
  DriverList: DriverList,
});

DriversStack.navigationOptions = {
  tabBarLabel: 'Drivers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-car'}
    />
  ),
};
 
export default createBottomTabNavigator({
  SearchStack, 
  DestinationsStack,
  DriversStack,
  GuidesStack,
  TripsStack,
  SettingsStack
});
