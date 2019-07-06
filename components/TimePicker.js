// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Picker, Item } from "native-base";
// import {StyleSheet} from 'react-native'
// import Api from "../api/Api";
// import { setTimeSlots } from '../modules/entities';
// import * as stateUtil from '../api/StateUtil'

// class TimePicker extends Component {
//     state = {
//         val: null
//     }

//     componentDidMount(){
//       Api.loadTimeSlots(this);
//     }

//     getItemById(id){
//       const{timeSlots} = this.props;
//       const res = timeSlots.filter((n)=>n.id===id);
//       return res.length>0?res[0]:null;
//     }

//     handleChange = (id)=>{
//       const { onSelect } = this.props;
//       const l = this.getItemById(id);
//       stateUtil.handleFieldChange(this,l.name);
//       if(onSelect)
//       onSelect(l);
//     }

//     render() { 
//         const { timeSlots, error, readOnly } = this.props;
//         let currentValue = stateUtil.get(this);
//         currentValue = currentValue?currentValue:null;

//         const items = timeSlots.map((item, index)=>{
//             return <Picker.Item key={index} label={item.name} value={item.id} />;
//         })
//         return (
//           <Item style={{marginTop:10}}>
//                   <Picker
//                                   mode="dialog"
//                                   enabled={!readOnly}
//                                   style={[styles.sectionInput, error ? styles.errorInput:null]}
//                                   placeholder={currentValue ? currentValue.name : "select..."}
//                                   onValueChange={id => this.handleChange(id)}
//                                   selectedValue={currentValue?currentValue.id:null} >
//                                   {items}
//                     </Picker> 
//             </Item>
//         )
//     }
// }

// const moduleState = state => ({
//     timeSlots: state.entities.timeSlots
//   });
  
//   const moduleActions = {
//     setTimeSlots,
//     setLoading
//   }; 
  
//   export default connect(
//     moduleState,
//     moduleActions
//   )(TimePicker);

//   const styles = StyleSheet.create({
//     sectionInput: {
//       margin:0,
//       width: "102%",
//       borderWidth: 0.3,
//       borderRadius: 2,
//       borderColor:"#000",
//       height: 40
//     }, 
//     errorInput: {borderColor:"red", borderWidth:1}
//   });
