import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import SettingsItem from './SettingsItem';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';

class DriverSettingsScreen extends React.Component {

  switchTo = (screen) => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  }

  render() {
    const {loggedInUser} = this.props;
    const driver = loggedInUser && loggedInUser.driverList && loggedInUser.driverList.length>0?loggedInUser.driverList[0]:null;
    return (
      <Container >
        <Content>
           <SafeAreaView style={styles.container}>
              <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <View style={{marginTop:30}}>
                       <TouchableOpacity onPress={()=>this.switchTo('DriverRegistration')} activeOpacity={1} >
                           <SettingsItem text={"Registration Form"}/>
                      </TouchableOpacity>
                      { driver && driver.id && !driver.isVerified? 
                          <React.Fragment>
                            <TouchableOpacity onPress={()=>this.switchTo('DriverWorkingDates')} activeOpacity={1} >
                                <SettingsItem text={"Work Schedule"}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.switchTo('Your Trips')} activeOpacity={1} >
                                <SettingsItem text={"Your Trips"}/>
                            </TouchableOpacity> 
                          </React.Fragment>:null
                      }
                    </View>
                </View>
              </ScrollView>
            </SafeAreaView>
        </Content>
      </Container>
     
    );
  }
}

const moduleState = state =>({
  loggedInUser: state.auth.loggedInUser
})

export default connect(moduleState)(withNavigation(DriverSettingsScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 30,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  }
});
