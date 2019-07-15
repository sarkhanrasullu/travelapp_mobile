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
import Api from './../../../api/Api';
import LoadingSpinner from '../../../components/LoadingSpinner';

class DriverSettingsScreen extends React.Component {

  state = {
    target:{},
    loading: true
  }

  componentWillMount(){
    console.log('driver will mount');
    Api.loadDriver(this);
  }

  switchTo = (screen, params) => {
    const {navigation} = this.props;
    navigation.navigate(screen, params);
  }

  render() {
    if(this.state.loading){
      return <LoadingSpinner/>
    }
    const driver = this.state.target;
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
                      { driver && driver.isVerified? 
                          <React.Fragment>
                            <TouchableOpacity onPress={()=>this.switchTo('DriverWorkingDates')} activeOpacity={1} >
                                <SettingsItem text={"Work Schedule"}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.switchTo('TripsScreen', {mode:"driver"})} activeOpacity={1} >
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
