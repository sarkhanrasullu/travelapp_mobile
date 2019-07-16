import React, { Component } from "react";
import { connect } from "react-redux";
import { Picker, Item } from "native-base";
import { setDestination } from "../modules/entities";
import { setDestinations } from '../modules/destinations';
import { setLoading } from '../modules/loading';
import { StyleSheet } from 'react-native';
import Ionicons from "react-native-ionicons";
import Api from "../api/Api";

class DestinationPicker extends Component {

    componentDidMount() {
        Api.loadDestinations(this, false);
    }

    getDestinationById(id){
        const{destinations} = this.props;
        const res= destinations.filter((destination)=>destination.id===id);
        return res.length>0?res[0]:null;
    }

    render() {
        const inputBg = "#7fc7ff";
        const {onSelect, destinations, selectedDestination, width, error } = this.props;
        const items =  destinations.map((place, index)=>{
          return <Picker.Item key={index} label={place.name} value={place.id} />;
        })
        return (
            <Item style={
              [ 
                { backgroundColor: inputBg,marginLeft:0, width: width?width:"100%" },
                , error ? styles.errorInput:null]}
                picker={false}>
                <Ionicons style={[{ marginLeft: 4 },error ? styles.errorInputText:null]} size={15} name="ios-pin" />
                    <Picker
                            
                            mode="dialog"
                            placeholderStyle={
                              [{  color: "#000", paddingLeft:3 }, error? styles.errorInputText:null]}
                            style={[{ height: 30 } ]}
                            textStyle={error? styles.errorInputText:null}
                            placeholder={selectedDestination ? selectedDestination.name : "Where are you going?"}
                            onValueChange={id => {
                              const dest = this.getDestinationById(id);
                              if(onSelect) onSelect(dest);
                            }}
                            selectedValue={selectedDestination?selectedDestination.id:null}
                        >
                            {items}
                    </Picker>
                </Item>
        )
    }
}


const styles = StyleSheet.create({
  errorInput: {borderColor:"red", borderWidth:1},
  errorInputText: {color:"red"}
});
  

const moduleState = state => ({
    selectedDate: state.entities.selectedDate,
    selectedDestination: state.entities.selectedDestination,
    destinations: state.destinations.list
  });
  
  const moduleActions = {
    setDestination, 
    setDestinations,
    setLoading
  }; 
  
  export default connect(
    moduleState,
    moduleActions
  )(DestinationPicker);
