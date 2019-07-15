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

class GuideSettingsScreen extends React.Component {

  state = {
    target:{},
    loading: true
  }

  componentWillMount(){
    console.log('guide will mount');
    Api.loadGuide(this);
  }

  switchTo = (screen, params) => {
    const {navigation} = this.props;
    navigation.navigate(screen, params);
  }

  render() {
    const guide = this.state.target;
    return (
      <Container >
        <Content>
           <SafeAreaView style={styles.container}>
              <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <View style={{marginTop:30}}>
                      <TouchableOpacity onPress={()=>this.switchTo('GuideRegistration')} activeOpacity={1} >
                           <SettingsItem text={"Registration Form"}/>
                      </TouchableOpacity>
                      { guide && guide.isVerified? 
                          <React.Fragment>
                            <TouchableOpacity onPress={()=>this.switchTo('GuideWorkingDates')} activeOpacity={1} >
                                <SettingsItem text={"Work Schedule"}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.switchTo('TripsScreen', {mode:"guide"})} activeOpacity={1} >
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

export default connect(moduleState)(withNavigation(GuideSettingsScreen));

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
