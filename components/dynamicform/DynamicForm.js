import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import * as StateUtil from '../../api/StateUtil';
import FormInput from '../FormInput';
import FormSection from '../../components/FormSection';
import { setLoggedInUser } from "../../modules/auth";
import { setLoading } from "../../modules/loading";
import { connect } from "react-redux";

class DynamicForm extends Component {

  componentDidMount(){
    const {component} = this.props;
    component.state.validate = ()=> this.validate();
    component.setState(component.state);
  }

  validate(){
    const {component} = this.props;
    const {state} = component;
    const target = state.target;
    const validation = {};
  
    let result = true;
    
    const {sections} = this.props;
    sections.forEach((section)=>{
       const {items} = section;
       items.forEach((item)=>{
         if(!item.name) return;
         validation[item.name] = false;
         if(!item.optional){
           const data = StateUtil.getFromObj(target,item.name);
           if(!data || (data+"").trim().length===0){
             validation[item.name] = true;
             result = false;
           }
         }
       })
    })
    console.log(validation);
    state.validation = validation;
    component.setState(state);
    return result;
}

  render() {
      return (
            <View style={styles.section}>
                 {this.getFormItems()}
            </View>
    );
  }

  getFormItems = ()=>{
    let {sections} = this.props;
    const result = [];
    sections.forEach((section, index)=>{
      const sectionComponent = this.wrapBySection(section, index);
      result.push(sectionComponent);
    });

    return result;
  }

  wrapBySection = (section,index)=>{
    let {readOnly} = this.props;
    const validation = readOnly? {}:this.props.component.state.validation;
    const result = [];
    section.items.forEach((item, index)=>{
       result.push(<FormInput 
        secure={item.secure}
        customComponent={item.customComponent}
        component={this.props.component} type={item.type} 
        name={"target."+item.name} 
        label={item.label} 
        readOnly={readOnly} icon={item.icon} key={index} 
        error={validation[item.name]} 
        />);
    });
   return <FormSection title={section.title} key={index}>
        {result}
    </FormSection>
  }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  errorMessage: state.loading.errorMessage,
  successMessage: state.loading.successMessage,
  isLoading: state.loading.loading
});

const moduleActions = {
  setLoggedInUser,
  setLoading
};

export default connect(
  moduleState,
  moduleActions
)(DynamicForm);

const styles = StyleSheet.create({
  section: {
    width: "100%",
    backgroundColor: "#FFF",
    marginTop: 20
  }
});
