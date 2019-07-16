import React, { Component } from 'react'
import { View, Text, Container, Content, Footer } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native'
import LinkText from '../../../../components/ui/LinkText';
import Api from '../../../../api/Api'
import { setLoggedInUser } from '../../../../modules/auth';
import {setLoading} from '../../../../modules/loading'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DynamicForm from '../../../../components/dynamicform/DynamicForm'
import LoadingSpinner from '../../../../components/LoadingSpinner';
const window = Dimensions.get("window");
const contentWidth = window.width*0.80;
const footerHeight = 100;

class Login extends Component {
 
    state = {
      target:{},
      validation:{},
      validate:null
    }

    handleLogin = ()=>{
      if(this.state.validate()){
        Api.handleLogin(this);
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
                            handleSubmit={this.handleLogin}
                            submitLabel={"Login"}
                            header={<Text style={{fontWeight:"600", margin:10}}>Already have an account?</Text>}
                            footer={<LinkText text={"Forgot Password?"} to={"SendForgotKey"}/>}
                            sections={
                             [
                              {
                                items: [
                                  {name:"email",label:"Email"},
                                  {name:"password",label:"Password", secure:true}
                                ]
                              }
                             ] 
                            }/>
                </Content>
                <Footer style={{height:footerHeight, backgroundColor:"#CCC"}}>
                    <View style={{width:contentWidth, alignItems:"center", marginTop:10}}>
                        <Text style={{fontWeight:"600", margin:10, fontSize:13}}>Don't have an account yet?</Text>
                        <LinkText text={"Sign up"} to={"Register"}/>
                    </View>
                </Footer>
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

export default connect(moduleState, moduleActions)(withNavigation(Login));

const styles = StyleSheet.create({
  sectionInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    height: 40
  },
    welcomeCol: {
      paddingTop: 10
    },
    flex: {
      flex: 0
    },
    column: {
      flexDirection: "column"
    },
    row: {
      flexDirection: "row"
    },
    header: {
      // backgroundColor: 'transparent',
      paddingHorizontal: 36,
      paddingTop: 36,
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    back: {
      width: 16 * 3,
      height: 16 * 3,
      justifyContent: "center",
      alignItems: "flex-start"
    },
    contentHeader: {
      backgroundColor: "transparent",
      padding: 36,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: -36 / 2
    },
    avatar: {
      position: "absolute",
      top: -36,
      right: 36,
      width: 36 * 2,
      height: 36 * 2,
      borderRadius: 36
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.5,
      shadowRadius: 5
    },
    dotsContainer: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 36,
      right: 0,
      left: 0
    },
    dots: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 6,
      backgroundColor: '#DCE0E9'
    },
    title: {
      fontSize: 14 * 2,
      fontWeight: "bold"
    },
    description: {
      fontSize: 14 * 1.2,
      lineHeight: 14 * 2,
      color: '#BCCCD4'
    }
  });
  