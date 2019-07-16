import React, { Component } from 'react'
import { View, Text, Container, Content, } from 'native-base';
import { StyleSheet, Dimensions} from 'react-native'
import { withNavigation } from 'react-navigation';

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const contentWidth = window.width*0.80;
const footerHeight = 100;

class Aboutus extends Component {
     
  state = {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }
  
    render() {
        return (
            <Container>
                <Content>
                    <View style={{width:contentWidth, alignSelf:"center", alignItems:"center", marginTop:15}}>
                       <Text>
                         {this.state.text}
                       </Text>
                    </View>
                </Content>
            </Container>
        )
    }
}


export default withNavigation(Aboutus);

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
  