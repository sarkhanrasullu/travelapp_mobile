import React, { Component } from 'react'
import Modal from "react-native-modal";
import {Dimensions,StyleSheet} from 'react-native'
import { View, Button, Text } from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
const { width, height } = Dimensions.get("window");
export default class ModalCalendar extends Component {
  state = {
    date:null
  }

  onDateChange = (date, type)=>{
    this.setState({date: date.toDate()});
  }
  render() {
    const {isVisible, onSelectBtnPress} = this.props;
    return (
          <Modal  style={{
                width:width,
                alignSelf:"center",
                backgroundColor:"#FFF",
                borderWidth:1, 
                top:85, 
                position:"absolute"}} hasBackdrop isVisible={isVisible} >
                <View style={{flex:1}}>
                    <CalendarPicker onDateChange={this.onDateChange}/>
                    <Button 
                            style={styles.btnCalendar} 
                            onPress={()=>{onSelectBtnPress(this.state.date)}}>
                       <Text >SELECT DATE</Text>
                    </Button>
                </View>
         </Modal>
    )
  }
}

const styles = StyleSheet.create({
  btnCalendar: {
    width:"50%",
    alignSelf:"center",
    justifyContent:"center",
    bottom:20,
  },

});
