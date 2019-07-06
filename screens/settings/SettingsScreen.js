import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Switch,
  ImageBackground
} from 'react-native';
import { withNavigation } from 'react-navigation';
import SettingsItem from './SettingsItem';
import ProfileHeader from './ProfileHeader';
import LoginRegister from './loginregister/LoginRegister';
import { Container, Content, Footer, Header } from 'native-base';
import { connect } from 'react-redux';
import { setLoggedInUser } from '../../modules/auth';
import Api from '../../api/Api';

const { width, height } = Dimensions.get('screen');

class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleLogout = ()=>{
    this.props.setLoggedInUser(null);
    Api.token = null;
  }

  switchTo = (screen) => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  }

  getHeader = () => {
    if(this.props.loggedInUser ===null) 
      return (
          <Header style={{backgroundColor: "#2681ff",height:90}}>
              <LoginRegister/>
          </Header> 
      )
  }


  render() {
    const {loggedInUser} = this.props;
    return (
      <Container >
        { this.getHeader() }
        <Content>
           <SafeAreaView style={styles.container}>
              <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <ProfileHeader />
                    <View style={{marginTop:30}}>
                      <SettingsItem text={"Invite friends"}/>
                      <TouchableOpacity onPress={()=>this.switchTo('Feedback')} activeOpacity={1} >
                          <SettingsItem text={"Give Us Feedback"}/>
                      </TouchableOpacity> 
                      {
                              <TouchableOpacity onPress={()=>this.switchTo('Aboutus')} activeOpacity={1} >
                                    <SettingsItem text={"About Us"}/>
                              </TouchableOpacity>
                      }
                      {
                              <TouchableOpacity onPress={()=>this.switchTo('GetHelp')} activeOpacity={1} >
                                    <SettingsItem text={"Get Help"}/>
                              </TouchableOpacity>
                      }
                      {loggedInUser && loggedInUser.id>0?
                              <TouchableOpacity onPress={()=>this.switchTo('DriverSettings')} activeOpacity={1} >
                                  <SettingsItem text={"Driver Panel"}/>
                              </TouchableOpacity>:null
                      }
                      {loggedInUser && loggedInUser.id>0?
                              <TouchableOpacity onPress={()=>this.switchTo('GuideSettings')} activeOpacity={1} >
                                  <SettingsItem text={"Guide Panel"}/>
                              </TouchableOpacity>:null
                      }
                      {
                          loggedInUser && loggedInUser.id>0?
                              <TouchableOpacity onPress={()=>this.handleLogout()} activeOpacity={1} >
                                  <SettingsItem text={"Logout"}/>
                              </TouchableOpacity> :null
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
 
const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser
});

const moduleActions = {
  setLoggedInUser
}

export default connect(moduleState, moduleActions)(withNavigation(Settings));

const styles = StyleSheet.create({
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 36
  },
  profile: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width: width,
    paddingHorizontal: 14,
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 30,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 14,
  },
  group: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FF7657',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  active: {
    backgroundColor: '#FF7657',
  },
  activeText: {
    color: '#FFF'
  },
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
