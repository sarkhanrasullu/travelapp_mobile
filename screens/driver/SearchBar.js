import React, { Component } from "react";
import { StyleSheet, Dimensions, Alert} from "react-native";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  Input,
  Item,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ModalCalendar from "../../components/ModalCalendar";
import { setDrivers } from '../../modules/drivers';
import { setDate, resetGuideAndDriver } from "../../modules/entities";
import { setLoading } from '../../modules/loading'
import { setDestination } from "../../modules/entities";
import Api from '../../api/Api'
import CommonUtil from '../../api/CommonUtil';
import DestinationPicker from "../../components/DestinationPicker";
const { width } = Dimensions.get("window");
class SearchBar extends Component {
  state = {
    isCalendarVisible: false,
    validation:{}
  };

 

  handleDestinationChange_ = (dest)=>{
      if(dest){
        this.props.setDestination(dest);
        this.resetPlaceValidation(dest)
      }
  }

  handleDestinationChange = (dest)=>{
    if(dest === this.props.selectedDestination)return;
    if(dest){
      if(this.props.selectedDriver || this.props.selectedGuide){
          this.checkAndShow(this.handleDestinationChange_);
      }else{
        this.handleDestinationChange_(dest);
      }
    }
  }

  yesButton =(callback)=>{
    return {
      text:"Anyway reset",
      onPress:()=>{
        this.props.resetGuideAndDriver();
        callback();
      }
    }
  }

  cancelButton =(callback)=> { 
      return {
      text:"Cancel",
      onPress:()=>{if(callback) callback()}
    }
  }

  checkAndShow = (yesCallback, cancelCallback)=>{
    setTimeout(
      ()=>{
          //console.log('checkand show in')
          Alert.alert("Warning","Notice that your changes will reset your previous selected guide and driver",[
            this.yesButton(yesCallback), this.cancelButton(cancelCallback)
          ])
      },1000
    )
  }

  showCalendar = () => {
    this.setState({ isCalendarVisible: true });
  };

  setDate = (date)=>{
    if(date){
      const {validation} = {...this.state};
      validation.date = false;
      this.setState({ isCalendarVisible: false, validation:validation });
    }
    this.props.setDate(date);
  }


  hideCalendar = (date) => {
    this.setState({ isCalendarVisible: false});
    if(date && this.props.selectedDate &&
      this.props.selectedDate.getTime()===date.getTime()) return;
    if(this.props.selectedDriver || this.props.selectedGuide){
      this.checkAndShow(()=>this.setDate(date));
    }else{
      this.setDate(date);
    }
  };

  resetPlaceValidation = (dest)=>{
    if(dest){
      const{validation} ={...this.state}
      validation.place = false;
      this.setState({validation:validation});
    }
  }
 

  handleSubmit = ()=>{
    let result = true;
    const {validation} = {...this.state};
    if(!this.props.selectedDate){
      result = false;
      validation.date = true;
    }else{
      validation.date = false;
    }
    if(!this.props.selectedDestination){
      result = false;
      validation.place = true;
    }else{
      validation.place = false;
    }

    this.setState({validation:validation});
    
    if(result){
      Api.loadDrivers(this);
    }
  }

  render() {
    const inputBg = "#7fc7ff";
    const {validation} = this.state;
    const { selectedDate } = this.props;
    return (
      <View
        style={{
          justifyContent:"flex-end",
          flex:1,
          flexDirection:"column",
          marginLeft:0
        }} 
      > 
        <ModalCalendar
          isVisible={this.state.isCalendarVisible}
          onSelectBtnPress={this.hideCalendar}
        />
        <View style={{height:88,maxHeight:88,flex: 1,width:width, flexDirection: "column"}}>
          <View style={[styles.flexRow]}>
                  <DestinationPicker 
                  width="64%" 
                  error={validation.place}
                  onSelect={(dest)=>this.handleDestinationChange(dest)}/>
                  <Item 
                      style={
                        [
                          { backgroundColor: inputBg, width: "36%" },
                          validation.date ? styles.errorInput:null
                        ]
                      } 
                      onPress={this.showCalendar}
                  >
                    <FontAwesome 
                      style={[{ marginLeft: 4 },validation.date ? styles.errorInputText:null]}
                      size={12}
                      name="calendar"
                    />
                      <Input
                        style={{ height: 30, paddingLeft: 3, fontSize:15 }}
                        placeholder="date"
                        onTouchStart={this.showCalendar}
                        disabled
                        placeholderTextColor={validation.date ?"red":"#000"}
                        defaultValue={CommonUtil.formatDate(selectedDate)}
                      />
                  </Item>
          </View>
          <Button full primary style={{ width: "100%",marginBottom:5}}
            onPress={this.handleSubmit}>
            <Text>Search</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const moduleState = state => ({
  selectedDate: state.entities.selectedDate,
  selectedDestination: state.entities.selectedDestination,
  selectedDriver: state.entities.selectedDriver,
  selectedGuide: state.entities.selectedGuide,
  destinations: state.destinations.list
});

const moduleActions = {
  setDate,
  setDrivers,
  setLoading,
  resetGuideAndDriver,
  setDestination, 
}; 

export default connect(
  moduleState,
  moduleActions
)(SearchBar);

const styles = StyleSheet.create({
  errorInput: {borderColor:"red", borderWidth:1},
  errorInputText: {color:"red"},
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    width:"100%"
  }
});
