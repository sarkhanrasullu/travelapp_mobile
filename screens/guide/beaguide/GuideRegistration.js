import React, { Component } from "react";
import { StyleSheet, Dimensions} from "react-native";
import {
  View,
  Text,
  Container, 
  Content,
  Button, 
} from "native-base";
import ViewRow from '../../../components/grid/ViewRow';
import UIButton from "../../../components/ui/UIButton";
import { setLoggedInUser } from "../../../modules/auth";
import { setLoading } from "../../../modules/loading";
import { setLanguages } from '../../../modules/languages';
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ItemPicker from "../../../components/ItemPicker";
import FormSection from "../../../components/FormSection";
import ProfileHeader from "../../settings/ProfileHeader";
import Api from '../../../api/Api';
import DynamicForm from '../../../components/dynamicform/DynamicForm';
import ReviewWarning from "../../../components/reviewwarning/ReviewWarning";

const window = Dimensions.get("window");
const contentWidth = window.width * 0.8;

class GuideRegistration extends Component {
  state = {
      target:{ guideLanguageList:[], gender:null },
      validation:{},
      validate:null
  };

  componentDidMount(){
    Api.loadGuide(this);
    Api.loadLanguages(this);
  }

  findLanguage = (id) => {
    const {languages} = this.props;
    return languages.filter((language)=> language.id ===id )[0]
  }

  handleLanguageChange = (id) => {
    const state = {...this.state};
    const guide = state.target;
    const lang = this.findLanguage(id);
    guide.guideLanguageList.push({languageId: {id: lang.id, name: lang.name}})
    this.setState(state);
  }

  handleLanguageRemove =(index)=>{
    const state = {...this.state};
    const guide = state.target;
    guide.guideLanguageList.splice(index, 1);
    this.setState(state);
  }

  getSubmitButton = ()=>{
    const state = {...this.state};
    const guide = state.target;
    let text = "Register";
    if(guide && guide.id){
      text= "Save";
    }
    return (<View style={styles.registerButtonWrapper}>
                <Text style={styles.successMessage}>{this.props.successMessage}</Text>
                <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                <UIButton onPress={()=>Api.handleGuideRegister(this)} 
                text={text} />
            </View>)
  }

  getLanguages = ()=>{
    let languages = null;
    const guide = this.state.target;
    if(guide && guide.guideLanguageList){
        languages = guide.guideLanguageList.map((val, index)=>{
          return  (
                <ViewRow key={index} style={{backgroundColor:"#CCCCCC50",marginBottom:5,paddingLeft:10,paddingRight:10, height:50, justifyContent:"center", alignItems:"center"}}>
                  <Text>{val.languageId.name}</Text>
                  <Button small style={{backgroundColor:"red",alignSelf:"center"}} onPress={()=>this.handleLanguageRemove(index)}>
                    <Text>Remove</Text>
                  </Button>
                </ViewRow>
            
          )
        })
    }
    if(languages===null) return null;
    return (
        <View>
          {languages}
        </View>
    );
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingSpinner />;
    }
    const languagesComponent = 
                <React.Fragment>
                      {this.getLanguages()}
                      <ItemPicker 
                              items={this.props.languages} 
                              placeholder={"Add a language"}
                              onValueChange={(val)=> this.handleLanguageChange(val)} />
                </React.Fragment>
    return (
      <Container>
        <Content>
          <View style={styles.formWrapper} >
            <FormSection>
              <ReviewWarning target={this.state.target}/>
              <ProfileHeader/>
            </FormSection>
            <DynamicForm
              component={this}
              sections={[
                {
                  title:"About You",
                  items:[
                    {name:"age",label:"Age", type:"number"},
                    {name:"gender",label:"Gender", type:"genderpicker"},
                    {name:"educationLevel",label:"Education Level", type:"educationpicker"},
                    {name:"educationPlace",label:"Education Place"},
                    {name:"educationArea",label:"Education Area"},
                    {name:"jobArea",label:"Job Area"},
                  ]
                },
                {
                  title:"Languages You Know",
                  items:[
                    {customComponent:languagesComponent, type:"custom"},
                  ]
                },
                {
                  title:"About Your Prices",
                  items:[
                    {name:"price1",label:"Inside Baku", type:"number"},
                    {name:"price2",label:"Absheron", type:"number"},
                    {name:"price3",label:"Out Of Absheron", type:"number"},
                  ]
                }
              ]} /> 
            {this.getSubmitButton()}
          </View>
        </Content>
      </Container>
    );
  }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  isLoading: state.loading.loading,
  errorMessage: state.loading.errorMessage,
  successMessage: state.loading.successMessage,
  languages: state.languages.list
});

const moduleActions = {
  setLoggedInUser,
  setLoading,
  setLanguages
};

export default connect(
  moduleState,
  moduleActions
)(withNavigation(GuideRegistration));

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
