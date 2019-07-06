import React, { Component } from 'react'
import { View, Text, Button } from 'native-base';
import {StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation';

class TripsReport extends Component {
    render() {
        return (
            <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#32a6ff",
              width: "100%",
              backgroundColor: "#32a6ff",
              flexDirection:"row", 
              alignItems:"center",
              padding:10
            }}
          > 
               <View style={{height:90, width:"100%"}}>
                    <View style={styles.priceItem}>
                      <Text style={styles.priceDateText}>01.05.2019 - 03.05.2019</Text>
                    </View>
                    <View style={styles.priceItem}>
                      <Text style={styles.priceItemText} >Driver: </Text>
                      <Text style={styles.priceItemText} >50$</Text>
                    </View>
                    <View style={styles.priceItem}>
                      <Text style={styles.priceItemText} >Guide: </Text>
                      <Text style={styles.priceItemText} >30$</Text>
                    </View>
                    <View style={styles.priceItem}>
                      <Text style={styles.priceItemText} >Total: </Text>
                      <Text style={styles.priceItemText} >80$</Text>
                    </View>
               </View>
               <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button style={{  width:90, height:40, justifyContent:"center"}} onPress={()=>{this.props.navigation.navigate('BookSummary')}}>
                  <Text style={{fontSize:13}}>PAY</Text>
                </Button> 
               </View>
          </View>
        )
    }
}

export default withNavigation(TripsReport)

const styles = StyleSheet.create({
    priceItem: {
      flex: 1,
      flexDirection: "row",
      height:10,
      // paddingBottom: 5
    },
    priceItemText:{
        fontSize:10,
        height:20,
        width:50,
        color:"#FFF"
    },
    priceDateText:{
      fontSize:10,
      height:20,
      color:"#FFF"
  },

  });
  