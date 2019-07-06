import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text} from "native-base";

class Label extends Component {
     
        render() {
            const {text, icon} = this.props;
            return this.getItem(text, icon);
        }

        getItem(text, icon){
            return (
                    <View style={styles.label}>
                    <View style={styles.icon} >
                        {icon}
                    </View>
                    <Text style={styles.text}>{text}</Text>
                    </View>
            )
        }
}

export default Label;

const styles = StyleSheet.create({
  label:{ flex: 1, flexDirection: "row", alignItems:"center" },
  icon: { width: 19, height:19, alignItems:"center",alignSelf:"center" },
  text: {
    height: 20,
    fontWeight: "300",
    fontSize: 12,
    paddingLeft: 5
  }
});
