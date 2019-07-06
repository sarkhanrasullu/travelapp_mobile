import React, { Component } from 'react'
import { View, Text, Container, Content } from 'native-base';
import { StyleSheet, Dimensions} from 'react-native'
import UIButton from '../../../components/ui/UIButton';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LoadingSpinner from '../../../components/LoadingSpinner'
import Api from '../../../api/Api';
import { setLoading } from "../../../modules/loading";
import { setLoggedInUser } from "../../../modules/auth";
import DynamicForm from '../../../components/dynamicform/DynamicForm';
const window = Dimensions.get("window");
const contentWidth = window.width*0.90;

class EditProfile extends Component {
     state = {
        target:{},
        validation:{},
        validate:null
     }

  getSubmitButton = ()=>{
    return (
            <View style={styles.submitButtonWrapper}>
                <Text style={styles.successMessage}>{this.props.successMessage}</Text>
                <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                <UIButton onPress={()=>Api.handleSaveUser(this)} 
                text={"Save"} />
            </View>
    )
  }

  componentDidMount(){
    this.setState({target: this.props.loggedInUser});
  }

    render() {
      if(this.props.isLoading){
        return (
          <LoadingSpinner/>
        )
      }
        return (
            <Container>
                <Content>
                    <View 
                      style={{
                          width:contentWidth, 
                          alignSelf:"center",
                          alignItems:"center", 
                          marginTop:15
                      }}>
                        <DynamicForm
                            component={this}
                            sections={
                             [
                              {
                                items: [
                                  {name:"thumbnail",label:"Photo", type:"imagepicker", optional:true},
                                  {name:"name",label:"Name"},
                                  {name:"surname",label:"Surname"},
                                  {name:"nationalityId",label:"Nationality", type:"nationalitypicker"},
                                  {name:"phone",label:"Phone"},
                                  {name:"email",label:"Email"},
                                  {name:"password",label:"Password", optional:true, secure:true},
                                ]
                              }
                             ] 
                            }/>
                        {this.getSubmitButton()}
                    </View>
                </Content>
            </Container>
            
        )
    }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  isLoading: state.loading.loading,
  errorMessage: state.loading.errorMessage,
  successMessage: state.loading.successMessage,
});

const moduleActions = {
  setLoading,
  setLoggedInUser
};

export default connect(moduleState, moduleActions)(withNavigation(EditProfile));

const styles = StyleSheet.create({
  errorMessage : {
    color: "red"
  },
  successMessage:{
    color:"green"
  },
  submitButtonWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 15,
    width:"100%"
  },
  formWrapper: {
    width: contentWidth,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 0,
  },
  
  });
  