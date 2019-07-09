import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import {Input,View, Text} from 'native-base'
import * as stateUtil from '../api/StateUtil'
import NationalityPicker from '../components/NationalityPicker';
import ModelPicker from '../components/modelpicker/ModelPicker';
import BrandPicker from '../components/brandpicker/BrandPicker';
import CarUtilityPicker from "../components/carutilititypicker/CarUtilityPicker";
import MyImagePicker from '../components/MyImagePicker';
import EducationPicker from './educationpicker/EducationPicker';
import GenderPicker from './genderpicker/GenderPicker';
import MapPicker from './mappicker/MapPicker';
export default class FormInput extends Component {
    state = {
        val: null
    }
    render() {
        const {unwrap,  label,icon, componentType} = this.props;
        
        const inputComponent = this.getInputComponent(componentType);
        
        const result = unwrap?inputComponent:
                <View style={[styles.sectionBodyItem]}>
                  {label || icon ?<View style={[styles.sectionBodyItemHeader]}>
                    {icon?icon:null}
                    {label?<Text>{label}</Text>:null}
                  </View>:null}
                  {inputComponent}
                </View>
        return result;        
    }


    getDefaultInputComponent = ()=>{
      const { placeholder, type, error, readOnly, secure } = this.props;
      let currentValue = stateUtil.get(this);
      currentValue = currentValue?currentValue+"":null;
      let result = <Input  
          secureTextEntry={secure}
          disabled={readOnly} 
          placeholderTextColor={error ?"red":"#666666"} 
          autoCapitalize={"none"} 
          autoCorrect={false} 
          placeholder={placeholder} 
          defaultValue={currentValue} 
          style={[styles.sectionInput, error ? styles.errorInput:null]} 
          onChangeText={(val)=>{
              let v = val;
              if(type==="number"){ v = v.replace(/[^0-9]/g, '') }
              stateUtil.handleFieldChange(this, v);
          }}
      />;

      return result;
    }
    getInputComponent = ()=>{
      const { type, error, readOnly, name, customComponent } = this.props;
      let currentValue = stateUtil.get(this);
      currentValue = currentValue?currentValue+"":null;

      let result = this.getDefaultInputComponent();

      const {component} = this.props;
      if(type==="nationalitypicker"){
        result = 
          <NationalityPicker readOnly={readOnly} error={error} component={component} name={name}/>
      }else if(type === "imagepicker"){
        result = <MyImagePicker readOnly={readOnly} error={error} component={component} name={name} square/>
      }else if(type === "brandpicker"){
        result = <BrandPicker readOnly={readOnly} error={error} component={component} name={name}/>
      }else if(type === "modelpicker"){
        result = <ModelPicker readOnly={readOnly} error={error} component={component} name={name} />
      }else if(type === "carutilitypicker"){
        result = <CarUtilityPicker readOnly={readOnly} error={error} component={component} name={name} />
      }else if(type === "educationpicker"){
        result = <EducationPicker readOnly={readOnly} error={error} component={component} name={name} />
      }else if(type === "genderpicker"){
        result = <GenderPicker readOnly={readOnly} error={error} component={component} name={name} />
      }else if(type === "mappicker"){
        result = <MapPicker readOnly={readOnly} error={error} component={component} name={name} />
      }else if(type === "custom"){
        result = customComponent;
      } 

      return result;
    }
    
}

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
    sectionInput: {
      width: "100%",
      borderWidth: 0.3,
      borderRadius: 2,
      height: 40,
      marginTop:10,
    }, 
    errorInput: {borderColor:"red", borderWidth:1}
    });
    
