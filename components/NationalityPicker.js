import React, { Component } from "react";
import { connect } from "react-redux";
import { Picker, Item,View, Text } from "native-base";
import {StyleSheet, Platform} from 'react-native'
import { setNationalities } from '../modules/nationalities';
import { setLoading } from '../modules/loading'
import Api from "../api/Api";
import * as stateUtil from '../api/StateUtil'

class NationalityPicker extends Component {
    state = {
        val: null
    }

    componentDidMount(){
      Api.loadNationalities(this, false, this.handleChange);
    }

    getNationalityById(id){
      const{nationalities} = this.props;
      const res = nationalities.filter((n)=>n.id===id);
      return res.length>0?res[0]:null;
    }

    handleChange = (value)=>{
      const { onSelect } = this.props;
      const l = this.getNationalityById(value);
      stateUtil.handleFieldChange(this,l);
      if(onSelect)
      onSelect(l);
    }

    render() { 
        const { nationalities, error, label, readOnly } = this.props;
        let currentValue = stateUtil.get(this);
        currentValue = currentValue?currentValue:null;

        const items = nationalities.map((nationality, index)=>{
            return <Picker.Item key={index} label={nationality.name} value={nationality.id} />;
        })
        const itemPicker= (
          <Item style={[{marginTop:10},Platform.OS==='android' && error ? styles.errorInput:null]}>
                  <Picker 
                                  mode="dialog"
                                  enabled={!readOnly}
                                  style={[styles.sectionInput, Platform.OS==='ios' && error ? styles.errorInput:null]}
                                  placeholder={currentValue ? currentValue.name : "select..."}
                                  onValueChange={value => this.handleChange(value)}
                                  selectedValue={currentValue?currentValue.id:null} >
                                  {items}
                    </Picker> 
            </Item>
        );

        const result = itemPicker
        return result;  
    }
}

const moduleState = state => ({
    nationalities: state.nationalities.list
  });
  
  const moduleActions = {
    setNationalities,
    setLoading
  }; 
  
  export default connect(
    moduleState,
    moduleActions
  )(NationalityPicker);

  const styles = StyleSheet.create({
    sectionInput: {
      margin:0,
      width: "102%",
      position:"relative",
      borderWidth: 0.3,
      borderRadius: 2,
      borderColor:"#000",
      height: 40
    }, 
    errorInput: {borderColor:"red", borderWidth:1},
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
  });
