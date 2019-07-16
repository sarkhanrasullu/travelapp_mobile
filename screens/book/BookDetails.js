import React, { Component } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-ionicons";
import { connect } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CommonUtil from "../../api/CommonUtil";
import Label from '../../components/label/Label';
import DynamicForm from "../../components/dynamicform/DynamicForm";
import Section from "../../components/section/Section";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;

class BookDetails extends Component {
  state = {
    trip:this.props.readOnly? this.props.selectedTrip: this.props.trip,
    driver: this.props.readOnly? this.props.selectedTrip.driverId: this.props.selectedDriver,
    guide: this.props.readOnly? this.props.selectedTrip.guideId: this.props.selectedGuide,
    destination: this.props.readOnly? this.props.selectedTrip.placeId: this.props.selectedDestination,
    date: this.props.readOnly? this.props.selectedTrip.pickupDate:this.props.selectedDate,
    validation: this.props.readOnly? {}:this.props.validation,
    userId: this.props.trip && this.props.trip.userId?this.props.trip.userId:null,
  };

  footer = ()=>{
    return (
      null
    )
  }

  render() {
    return (
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
            backgroundColor: "#f2f2f2"
          }}
        >
          <View style={styles.bookingDetailsContainer}>
              {this.getCarInfo()}
              {this.getDriverInfo()}
              {this.getGuideInfo()}
              {this.getDestinationInfo()}
              {this.getDateInfo()}
          </View>
          {this.getRegistrationForm()}
        </ScrollView> 
  );
}
 

  getCarInfo=()=>{
    const {driver} = this.state;
    if(driver && driver.carList[0])
      return <Label 
            text={"Car: "+driver.carList[0].modelId.name} 
            icon={<FontAwesome name={"car"} size={15}/>}/>;
    return null;
  }

  getDriverInfo = ()=>{
    const {driver} = this.state;
    if(driver)
    return <Label 
            text={"Driver: "+driver.userId.name+" "+driver.userId.surname}
            icon={<MaterialCommunityIcons name={"steering"} size={20} style={styles.icon} />}/>
    return null;
  }

  getGuideInfo = ()=>{
    const {guide} = this.state;
    if(guide){
      return  <Label 
                    text={"Guide: "+guide.userId.name+" "+guide.userId.surname} 
                    icon={<MaterialCommunityIcons name={"account"} size={20} style={styles.icon} />}/>;
    }
    return null;
  }

  getDestinationInfo = ()=>{
    const {destination} = this.state;
    if(destination)
      return  <Label 
                  text={"Destination: "+destination.name}
                  icon={<MaterialIcons name={"place"} size={20} style={styles.icon} />}
                  />;
    return null;
  }

  getDateInfo = ()=>{
    return  <Label 
                  text={"Date: "+CommonUtil.formatDateByDash(this.state.date)}
                  icon={<FontAwesome size={15} name="calendar" />}/>;
  }

  getRegistrationForm = ()=>{
    const iconPlace = <Ionicons name={"ios-pin"} size={20} style={styles.icon} />
    const iconTime = <FontAwesome size={17} name="calendar" style={styles.icon}/>

    let items = [];

    if(!this.props.loggedInUser){
      items = items.concat(
       [{name:"userId.name",          label:"Name"},
        {name:"userId.surname",       label:"Surname"},
        {name:"userId.nationalityId", label:"Nationality", type:"nationalitypicker"},
        {name:"userId.phone",         label:"Phone"},
        {name:"userId.email",         label:"Email"},
        {name:"userId.password",      label:"Password", secure: true}]);
    }

    items = items.concat(
      {name:"pickupTime",label:"Pick-up Time", icon:iconTime},
      {name:"pickupCoords",label:"Pin Your Pick-up Place", icon:iconPlace, type:"mappicker"}
    )

    return (
        <Section body = {
                  <DynamicForm 
                  component={this.props.component} 
                  readOnly={this.props.readOnly} 
                  sections={[
                    {
                      items:items
                    }
                  ]}/>
              } /> 
        )
  }
}

const moduleState = state => ({
  selectedGuide: state.entities.selectedGuide,
  selectedDriver: state.entities.selectedDriver,
  selectedDate: state.entities.selectedDate,
  selectedDestination: state.entities.selectedDestination,
  loggedInUser: state.auth.loggedInUser,
});

export default connect(moduleState)(BookDetails);

const styles = StyleSheet.create({
  sectionBodyItemHeader: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 5,
    height:30,
    alignItems:"center"
  },
  sectionBodyItem: {
    paddingTop: 10
  },
  sectionBody: {
    padding: 10
  },
  sectionInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    height: 40
  },
  section: {
    padding: 10,
    width: "100%",
    backgroundColor: "#FFF",
    marginTop: 20
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600"
  },
  bookingDetailsContainer: {
    width: containerWidth,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignSelf: "center",
    padding: 20,
    marginTop: 10
  },
  icon: { width: 19, height:19, alignItems:"center",alignSelf:"center" },

});
