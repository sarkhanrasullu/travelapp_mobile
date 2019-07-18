import React, { Component } from 'react'
import { View, Text, Button, Footer } from 'native-base';
import {StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { select } from '../modules/entities';
import ProgressNavigation from '../components/progressnavigation/ProgressNavigation';
class BookContainer extends Component {

    getPrice = (entity)=>{
      const {selectedDestination} = this.props;
      return entity && entity.price1? entity.price1:0;
    }

    select = (entity, type)=>{
      this.props.select(entity, "SET_"+type);
      
      let screen = "GuideList";

      if(type==="GUIDE"){
        screen = "BookSummary";
      }
      this.props.navigation.navigate(screen);
    }
    render() {
       const {entity, type} = this.props;
        return (  
          <Footer style={styles.containerVertical}>
              <View style={styles.container}  >  
                <View style={styles.priceItem}>
                        <Text style={styles.priceItemText} >Price: </Text>
                        <Text style={styles.priceItemText} >{this.getPrice(entity)}$</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button style={styles.submitButton} onPress={()=>{
                        this.select(entity, type);
                      }
                    }>
                      <Text style={styles.submitButtonText}>SELECT</Text>
                    </Button> 
                </View>
              </View> 
              <ProgressNavigation pageIndex={this.props.pageIndex}/>
            </Footer>

        )
    }
}

const moduleState = state =>{
  return  ({
    selectedDriver: state.drivers.selectedDriver,
    selectedGuide: state.guides.selectedGuide
  });
}

const moduleActions = {
  select
}

export default connect(moduleState, moduleActions)(withNavigation(BookContainer));

const styles = StyleSheet.create({
    buttonWrapper:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    submitButtonText:{
      fontSize:15, 
      fontWeight:"600"
    },
    submitButton:{
        backgroundColor:"#ff8b0f",  
        width:100, 
        height:50, 
        justifyContent:"center"
    },
    priceItem: {
      flex: 1,
      flexDirection: "row",
      height:20,
      alignItems:"center"
    },
    priceItemText:{
        fontSize:20,
        color:"#FFF",
    },
    priceDateText:{
      fontSize:10,
      height:25,
      color:"#FFF"
    },
    container:{
      borderTopWidth: 1,
      borderTopColor: "#32a6ff",
      width: "100%",
      backgroundColor: "#32a6ff",
      flexDirection:"row", 
      alignItems:"center",
      padding:10,
    },
    containerVertical:{
      borderTopWidth: 1,
      height:200,
      borderTopColor: "#32a6ff",
      width: "100%",
      backgroundColor: "#32a6ff",
      flexDirection:"column", 
      alignItems:"center",
    }

  });
  