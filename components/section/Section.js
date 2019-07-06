import React, { Component } from "react";
import { View, Text} from "native-base";
import { StyleSheet } from "react-native";
export default class Section extends Component {
  render() {
    const { title, body } = this.props;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{title}</Text>
        <View style={styles.sectionBody}>{body}</View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    
    sectionBody: {
      padding: 10
    },
    section: {
      padding: 10,
      width: "100%",
      backgroundColor: "#FFF",
      marginTop: 20
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: "600"
    },
  });
  