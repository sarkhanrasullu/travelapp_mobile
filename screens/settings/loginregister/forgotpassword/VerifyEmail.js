import React, { Component } from 'react'
import {  Container, Content, Text } from 'native-base';
import Api from '../../../../api/Api'
import { setLoggedInUser } from '../../../../modules/auth';
import { setLoading } from '../../../../modules/loading'
import LinkText from '../../../../components/ui/LinkText';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DynamicForm from '../../../../components/dynamicform/DynamicForm'
import LoadingSpinner from '../../../../components/LoadingSpinner';

class VerifyEmail extends Component {
 
    state = {
      target:this.props.navigation.getParam("prevComponent").state.target,
      validation:{},
      validate:null
    }
 

    handleSubmit = ()=>{
      if(this.state.validate()){
        Api.handleVerifyEmail(this);
      }
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
                        <DynamicForm
                            component={this}
                            header={<Text>Please check your email. We have sent you 4 digit verification code that email belongs to you.</Text>}
                            footer={
                            <LinkText 
                                text={"Didn't get key? Resend code"}
                                onPress={()=>Api.handleSendForgotKey(this.props.navigation.getParam("prevComponent"))} />
                          }
                            handleSubmit={this.handleSubmit}
                            submitLabel={"Verify Email"}
                            sections={
                             [
                              {
                                items: [
                                  {name:"forgotKey",label:"Verification Code"},
                                ]
                              }
                             ] 
                            }/>
                </Content>
            </Container>
            
        )
    }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  loading: state.loading.loading,
  errorMessage: state.loading.errorMessage
});

const moduleActions = {
  setLoggedInUser,
  setLoading
}

export default connect(moduleState, moduleActions)(withNavigation(VerifyEmail));