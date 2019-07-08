import React, { Component } from 'react'
import { View, Text, Container, Content, Footer } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import * as theme from '../../../theme'
import FormInput from '../../../components/FormInput';
import UIButton from '../../../components/ui/UIButton';
import { withNavigation } from 'react-navigation';
import Settings from '../../../constants/Settings'
import FormTextArea from '../../../components/FormTextArea';
import LoadingSpinner from '../../../components/LoadingSpinner';

const window = Dimensions.get("window");
const contentWidth = window.width*0.80;

class GetHelp extends Component {
     
  state = {
    isLoading: false,
    email:'',
    text: '',
    recieved: false
  }

  handleSubmit = ()=>{ 
      this.setState({isLoading: true});
      const {text, email} = this.state;
      const data = {text: text, email: email};
      //console.log(this.state);
      //console.log(data);
      fetch(`${Settings.ip}/helps`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
          .then((responseJson) => {
              this.setState({isLoading: false, recieved:true});
          })
          .catch((error) => {
            this.setState({isLoading: false});
          });
    }

    render() {
      if(this.state.isLoading){
        return (
          <LoadingSpinner/>
        )
      }
      let body = null;
        return (
            <Container>
                <Content>
                    <View style={{width:contentWidth, alignSelf:"center", alignItems:"center", marginTop:15}}>
                       {
                          this.state.recieved? <Text>We recieved your request. As soon as possible we will contact you. Thanks!</Text>: 
                          <View style={{width:contentWidth}}>
                            <FormInput placeholder={"Contact Email"} component={this} name={"email"}/>
                            <FormTextArea  placeholder={"Please type your question here..."} component={this} name={"text"}/>
                            <View style={{alignSelf:"center",justifyContent:"space-between",width:200, paddingTop:15, paddingBottom:15}}>
                                <UIButton onPress={this.handleSubmit} text={"Send"}/>
                            </View>
                          </View>
                       }
                    </View>
                </Content>
            </Container>
            
        )
    }
}


export default withNavigation(GetHelp);

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
      paddingHorizontal: theme.sizes.padding,
      paddingTop: theme.sizes.padding,
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    back: {
      width: theme.sizes.base * 3,
      height: theme.sizes.base * 3,
      justifyContent: "center",
      alignItems: "flex-start"
    },
    content: {
      // backgroundColor: theme.colors.active,
      // borderTopLeftRadius: theme.sizes.border,
      // borderTopRightRadius: theme.sizes.border,
    },
    contentHeader: {
      backgroundColor: "transparent",
      padding: theme.sizes.padding,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: theme.sizes.radius,
      borderTopRightRadius: theme.sizes.radius,
      marginTop: -theme.sizes.padding / 2
    },
    avatar: {
      position: "absolute",
      top: -theme.sizes.margin,
      right: theme.sizes.margin,
      width: theme.sizes.padding * 2,
      height: theme.sizes.padding * 2,
      borderRadius: theme.sizes.padding
    },
    shadow: {
      shadowColor: theme.colors.black,
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
      backgroundColor: theme.colors.gray
    },
    title: {
      fontSize: theme.sizes.font * 2,
      fontWeight: "bold"
    },
    description: {
      fontSize: theme.sizes.font * 1.2,
      lineHeight: theme.sizes.font * 2,
      color: theme.colors.caption
    }
  });
  