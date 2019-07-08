import React, { Component } from 'react'
import {  Container, Content } from 'native-base';
import Api from '../../../../api/Api'
import { setLoggedInUser } from '../../../../modules/auth';
import { setLoading } from '../../../../modules/loading'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DynamicForm from '../../../../components/dynamicform/DynamicForm'
import LoadingSpinner from '../../../../components/LoadingSpinner';

class SendForgotKey extends Component {
 
    state = {
      target:{},
      validation:{},
      validate:null
    }

    handleSubmit = ()=>{
      if(this.state.validate()){
        Api.handleSendForgotKey(this);
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
                            handleSubmit={this.handleSubmit}
                            submitLabel={"Send Code"}
                            sections={
                             [
                              {
                                items: [
                                  {name:"email",label:"Email"},
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

export default connect(moduleState, moduleActions)(withNavigation(SendForgotKey));