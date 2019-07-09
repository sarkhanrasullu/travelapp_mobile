import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation';
import {
    View, Text, Button
  } from "native-base";
class BookResult extends Component {

    static navigationOptions = {
      header: null
    };

    handleSubmit = ()=>{
        const {navigation} = this.props;
        navigation.navigate('TripList', {update:true});
    }
    render() {
        const text = this.props.text?this.props.text:"You have successfully booked your trip";
        return (
                    <View style={{width:"80%",alignSelf:"center",height:100}}>
                        <View style={{width:"80%",alignSelf:"center",height:100,marginTop:"30%" }}>
                            <Text style={{textAlign:"center"}}>{text}</Text>
                                <TouchableOpacity activeOpacity={0.8} style={styles.submitButton} >
                                  <Button disabled={this.props.isLoading} onPress={this.handleSubmit}>
                                    <Text>GO TO TRIP LIST</Text>
                                  </Button> 
                                </TouchableOpacity>
                          </View>
                    </View>
        )
    }
}

const styles = StyleSheet.create({
    submitButton:{
      width:165,
      height:50, 
      marginTop:30,
      justifyContent:"center", 
      alignSelf:"center"
    }
});

export default withNavigation(BookResult);
