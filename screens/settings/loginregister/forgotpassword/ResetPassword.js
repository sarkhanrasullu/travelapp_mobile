import React, { Component } from 'react'
import {  Container, Content, Text } from 'native-base';
import Api from '../../../../api/Api'
import { setLoggedInUser } from '../../../../modules/auth';
import { setLoading } from '../../../../modules/loading'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DynamicForm from '../../../../components/dynamicform/DynamicForm'
import LoadingSpinner from '../../../../components/LoadingSpinner';

class VerifyEmail extends Component {
 
    state = {
      target:this.props.navigation.getParam("prevTarget"),
      validation:{},
      validate:null
    }

    handleSubmit = ()=>{
      if(this.state.validate()){
        Api.handleResetPassword(this);
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
                            header={<Text>Enter Your New Password. Successfully verified email belongs to you.</Text>}
                            handleSubmit={this.handleSubmit}
                            submitLabel={"Reset Password"}
                            sections={
                             [
                              {
                                items: [
                                  {name:"password",label:"New Password"},
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