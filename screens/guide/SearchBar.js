import React, { Component } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  Picker,
  Input,
  Item,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ModalCalendar from "../../components/ModalCalendar";
import { setGender, setGuides } from "../../modules/guides";
import {setDate, setDestination, resetGuideAndDriver} from '../../modules/entities';
import Api from '../../api/Api';
import CommonUtil from '../../api/CommonUtil';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DestinationPicker from "../../components/DestinationPicker";
import LanguagePicker from "../../components/LanguagePicker";
import { setLoading } from '../../modules/loading'

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
      Api.loadGuides(this);
    }
  }

  render() {
    const inputBg = "#7fc7ff";
    const {validation} = this.state;
    const { selectedGender, selectedDate } = this.props;
    //console.log('selectedGender='+selectedGender);
    //console.log(selectedGender);
    return (
      <View
        style={{
          justifyContent:"flex-end",
          flex:1,
          flexDirection:"column",
          marginLeft:0,
          left:0
        }}
      >
        <ModalCalendar
          isVisible={this.state.isCalendarVisible}
          onSelectBtnPress={this.hideCalendar}
        />
        <View style={{height:120,maxHeight:120,flex: 1,width:width, flexDirection: "column"}}>
            <View style={styles.flexRow}>
              <DestinationPicker 
              error={validation.place}
              onSelect={(dest)=>this.handleDestinationChange(dest)}/>
            </View>
            <View style={[styles.flexRow,{width:width}]}>
                <Item style={{ backgroundColor: inputBg, width:"34%", marginLeft:0  }} onPress={this.showCalendar}>
                            <FontAwesome
                              style={[{ marginLeft: 4},validation.date ? styles.errorInputText:null]}
                              size={12}
                              name="calendar" /> 
                            <Input
                              style={{ height: 30, paddingLeft: 3, fontSize:15}}
                              placeholder="date"
                              disabled
                              onTouchStart={this.showCalendar}
                              placeholderTextColor={validation.date?"red":"#000"}
                              defaultValue={CommonUtil.formatDate(selectedDate)} />
                </Item>
                <LanguagePicker/>
                <Item style={{ backgroundColor: inputBg, width:"32%" }}>
                  <MaterialCommunityIcons
                    style={{ marginLeft: 4 }}
                    size={15}
                    name="gender-male-female" />
                  <Picker
                    mode="dialog"
                    placeholderStyle={{color: "#000" }}
                    style={{ height: 30 }}
                    onValueChange={value => {
                      //console.log(value);
                      this.props.setGender(value);
                    }}
                    selectedValue={selectedGender}
                     >
                    <Picker.Item label="gender" value={null} />
                    <Picker.Item label="male" value="1" />
                    <Picker.Item label="female" value="2" />
                  </Picker>
                </Item>
            </View>
            <Button full primary style={{marginTop:5, marginBottom:5}} onPress={this.handleSubmit}> 
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
  selectedLanguage: state.guides.selectedLanguage,
  selectedGender: state.guides.selectedGender,
  selectedDriver: state.entities.selectedDriver,
  selectedGuide: state.entities.selectedGuide,
  destinations: state.destinations.list,
  languages: state.languages.list
});

const moduleActions = {
  setDate,
  setGender,
  setLoading,
  setGuides,
  setDestination,
  resetGuideAndDriver
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
