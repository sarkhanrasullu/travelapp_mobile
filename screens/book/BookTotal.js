import React, { Component } from 'react'
import { View, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setLoading } from '../../modules/loading';
import { setTrip, resetTrip } from '../../modules/entities';
import { setLoggedInUser } from '../../modules/auth';
import { TouchableOpacity } from 'react-native'
import CommonUtil from '../../api/CommonUtil';
import Api from '../../api/Api';
import KeyValueLabel from '../../components/label/KeyValueLabel';

class BookTotal extends Component {
    state = {

    }
    getPrice = (entity)=>{
        return entity && entity.price1? entity.price1:0;
    }
     

    handleSuccess = ()=>{
      console.log('handle book success')  
      const { navigation } = this.props;
        navigation.navigate('BookSuccess');

    }

    handleSubmit = ()=>{
      const {component} = this.props;
      const trip = component.state.target;
      trip.driverId = {id:CommonUtil.cleanData(this.props.selectedDriver)};
      trip.guideId = {id:CommonUtil.cleanData(this.props.selectedGuide)};
      trip.placeId = {id:CommonUtil.cleanData(this.props.selectedDestination)};
      trip.pickupDate = CommonUtil.formatDateByDash(this.props.selectedDate);

      if(component.state.validate()){
        Api.addTrip(this, trip);
      }else{
        this.props.setLoading(true);
        setInterval(this.setLoadingFalse, 200);
      }
    }

    setLoadingFalse = ()=>{
      this.props.setLoading(false)
    }

    getSubmitButton = ()=>{
      const result = (
        <TouchableOpacity activeOpacity={0.8} 
                      style={styles.submitButton} >
                      <Button 
                        disabled={this.props.isLoading}
                        onPress={this.handleSubmit}>
                        <Text>CONFIRM</Text>
                      </Button> 
                  </TouchableOpacity>
      )

      return result;
    }

    render() {
        const {selectedDriver, selectedGuide, selectedDate, selectedDestination} = this.props;
        let total = 0;
        total += this.getPrice(selectedGuide);
        total += this.getPrice(selectedDriver);
        return (
            <View style={styles.container} >  
               <View style={{height:100, width:"100%"}}>
                    <KeyValueLabel text1="Date" text2={CommonUtil.formatDate(selectedDate)} />
                    {selectedDestination? <KeyValueLabel text1="Destination" text2={selectedDestination.name}/>:null}
                    {selectedDriver?      <KeyValueLabel text1="Driver" text2={this.getPrice(selectedDriver)+"$"}/>:null}
                    {selectedGuide?       <KeyValueLabel text1="Guide" text2={this.getPrice(selectedGuide)+"$"}/>: null}
                    <KeyValueLabel text1="Total" text2={total+"$"} />
               </View>
               <View style={styles.buttonWrapper}>
                  {this.getSubmitButton()}
               </View>
          </View>
        )
    }
}

const moduleState = state => ({
  selectedGuide: state.entities.selectedGuide,
  selectedDriver: state.entities.selectedDriver,
  selectedDestination: state.entities.selectedDestination,
  selectedDate: state.entities.selectedDate,
  isLoading: state.loading.loading,
  loggedInUser: state.auth.loggedInUser,
});

const moduleActions = {
  setLoading,
  setTrip,
  resetTrip,
  setLoggedInUser
}; 

export default connect(moduleState, moduleActions)(withNavigation(BookTotal));

const styles = StyleSheet.create({
  submitButton:{  width:100, height:50, justifyContent:"center"},
  buttonWrapper:{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},
  container:{
    borderTopWidth: 1,
    borderTopColor: "#32a6ff",
    width: "100%",
    backgroundColor: "#32a6ff",
    flexDirection:"row", 
    alignItems:"center",
    padding:10
  },
    priceItem: {
      flex: 1,
      flexDirection: "row",
      height:20,
      // paddingBottom: 5
    },
    priceItemText:{
        fontSize:13,
        height:20,
        width:50,
        color:"#FFF"
    },
    priceDateText:{
      fontSize:15,
      height:25,
      color:"#FFF"
  },

  });
  