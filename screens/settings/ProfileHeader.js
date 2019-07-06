import React, { Component } from 'react'
import {StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
class ProfileHeader extends Component {

    switchTo = (screen) => {
      const {navigation} = this.props;
      navigation.navigate(screen);
    }

    componentDidMount(){
      this.props.navigation.addListener('willFocus', (payload) => this.forceUpdate())
    }

    render() {
      const {loggedInUser} = this.props;
      if(loggedInUser===null){return null}
      return (
          <TouchableOpacity onPress={()=>this.switchTo('EditProfile')} activeOpacity={1} >
            <View style={{flex:1, flexDirection:"row"}}>
                    <View style={styles.profile}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "center"
                        }}
                      >
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                            {loggedInUser.name+" "+loggedInUser.surname}
                            </Text>
                            <Text style={{ fontSize: 15, top:10 }}>
                                Edit profile
                            </Text>
                      </View>
                    </View>
                    <ImageBackground
                      style={styles.profileImage}
                      imageStyle={styles.profileImage}
                      source={{ uri: `data:image/jpg;base64,${loggedInUser.thumbnail}`}}
                    />
              </View>
          </TouchableOpacity>
        )
    }
}


const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser
});

export default connect(moduleState)(withNavigation(ProfileHeader));



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
    }
})
