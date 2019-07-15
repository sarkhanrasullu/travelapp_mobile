import React, { Component } from "react";
import { StyleSheet, Dimensions} from "react-native";
import {
  View,
  Text,
  Container, 
  Content,
} from "native-base";
import UIButton from "../../components/ui/UIButton";
import { setLoggedInUser } from "../../modules/auth";
import { setLoading } from "../../modules/loading";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import LoadingSpinner from "../../components/LoadingSpinner";
import FormSection from "../../components/FormSection";
import CalendarPicker from 'react-native-calendar-picker';
const window = Dimensions.get("window");
const contentWidth = window.width * 0.8;

class WorkingDates extends Component {
  state = {
      isLoading: false,
      // busyDays:[],
      driver:{busyDays:[]},
      guide:{busyDays:[]},
      customDatesStyles:[]
  };

  componentWillMount(){
      const {onLoad} = this.props;
      onLoad(this);
  }
 
  getSubmitButton = ()=>{
    const {onSubmit} = this.props;
    return (<View style={styles.registerButtonWrapper}>
                <Text style={styles.successMessage}>{this.props.successMessage}</Text>
                <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                <UIButton onPress={()=>onSubmit(this)} 
                text={"Save"} />
            </View>)
  }

  generateCustomDatesStyles = ()=>{
      const state= this.state;
      const busyDays = state[this.props.entityName].busyDays;
      const customDatesStyles = busyDays.map((busyDay, index)=> {
        return { date: new Date(busyDay), style: {backgroundColor: 'red'}}
      });
      return customDatesStyles;
  }

  onDateChange = (date) => {
    const _selectedDay = date.toString();
    const state = this.state;
    let index = state[this.props.entityName].busyDays.indexOf(_selectedDay);
    if(index>-1){
      state[this.props.entityName].busyDays.splice(index, 1);
    }else{
      state[this.props.entityName].busyDays.push(_selectedDay);
    }
    this.setState(state);
    this.forceUpdate();
}

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <Container>
        <Content>
          <View style={styles.formWrapper} >
            <FormSection>
                <Text style={{alignSelf:"center", fontWeight:"600", marginTop:15 }}>
                  Tell us which days you will not be able to work.</Text>
                <CalendarPicker 
                      selectedDayColor="red"  
                      onDateChange={this.onDateChange}
                      customDatesStyles={this.generateCustomDatesStyles()}
                />
            </FormSection>
            {this.getSubmitButton()}
          </View>
        </Content>
      </Container>
    );
  }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  errorMessage: state.loading.errorMessage,
  successMessage: state.loading.successMessage,
});

const moduleActions = {
  setLoggedInUser,
  setLoading
};

export default connect(
  moduleState,
  moduleActions
)(withNavigation(WorkingDates));

const styles = StyleSheet.create({
  warningWrapper:{
    alignItems: "center",
    justifyContent: "space-between",
    width:"100%"
  },
  warningMessage : {
    color: "red"
  },
  formWrapper: {
    width: contentWidth,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 0,
  },
  
  errorMessage : {
    color: "red"
  },
  successMessage:{
    color:"green"
  },
  registerButtonWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 15,
    width:"100%"
  }
});
