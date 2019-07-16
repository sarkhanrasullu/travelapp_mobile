import React, { Component } from 'react'
import { View, Text, Container, Content } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import UIButton from '../../../components/ui/UIButton';
import { withNavigation } from 'react-navigation';
import Settings from '../../../constants/Settings'
import FormTextArea from '../../../components/FormTextArea';
import LoadingSpinner from '../../../components/LoadingSpinner';

const window = Dimensions.get("window");
const contentWidth = window.width*0.80;

class Feedback extends Component {
     
  state = {
    isLoading: false,
    text: '',
    recieved: false
  }

  handleEmailChange = (val) => {
    this.setState({email:val});
  }

  handleTextChange = (val) => {
    this.setState({text:val});
  }

   handleSubmit = ()=>{ 
      this.setState({isLoading: true});
      
      const {text} = this.state;
      const data = {text: text};
      //console.log(this.state);
      //console.log(data);
       fetch(`${Settings.ip}/feedbacks`, {
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
        return (
            <Container>
                <Content>
                    <View style={{width:contentWidth, alignSelf:"center", alignItems:"center", marginTop:15}}>
                       {
                          this.state.recieved? <Text>We recieved your feedback. Thanks!</Text>: 
                          <View style={{width:contentWidth}}>
                            {/* <FormInput placeholder={"Contact Email"} onChange={this.handleEmailChange}/> */}
                            <FormTextArea name={"text"} component={this} placeholder={"Please type your feedback here..."} onChange={this.handleTextChange}/>
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


export default withNavigation(Feedback);

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
  