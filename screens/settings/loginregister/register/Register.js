import React, { Component } from 'react'
import { View, Text, Container, Content } from 'native-base';
import { Dimensions } from 'react-native'
import { setLoggedInUser } from '../../../../modules/auth';
import { setLoading } from '../../../../modules/loading';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import UIButton from '../../../../components/ui/UIButton';
import LoadingSpinner from '../../../../components/LoadingSpinner'
import Api from '../../../../api/Api';
import DynamicForm from '../../../../components/dynamicform/DynamicForm';

const window = Dimensions.get("window");
const contentWidth = window.width*0.90;

class Register extends Component {
  state = {
    target:{},
    validation:{},
    validate:null
  }

    handleRegister = ()=>{
        if(this.state.validate()){
          Api.register(this);
        };
    }

    render() {
      if(this.props.loading){
        return (
          <LoadingSpinner/>
        )
      }
        return (
            <Container>
                <Content>
                    <View style={{width:contentWidth, alignSelf:"center",
                     alignItems:"center", marginTop:15}}>
                        <DynamicForm 
                              component={this} 
                              sections={
                                [
                                  {
                                    items:[
                                      {name:"name",label:"Name"},
                                      {name:"surname",label:"Surname"},
                                      {name:"nationalityId",label:"Nationality", type:"nationalitypicker"},
                                      {name:"phone",label:"Phone"},
                                      {name:"email",label:"Email"},
                                      {name:"password",label:"Password", secure:true},
                                    ]
                                  }
                                ]
                              }
                              /> 
                        <View style={{ alignItems:"center",justifyContent:"space-between",width:200, paddingTop:15, paddingBottom:15}}>
                            <Text style={{color:"red"}}>{this.props.errorMessage}</Text>
                            <UIButton onPress={()=>this.handleRegister()} text={"Register"}/>
                        </View>
                    </View>
                </Content>
            </Container>
            
        )
    }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  loading: state.loading.loading,
  errorMessage: state.loading.errorMessage,
});

const moduleActions = {
  setLoggedInUser,
  setLoading
}

export default connect(moduleState, moduleActions)(withNavigation(Register));