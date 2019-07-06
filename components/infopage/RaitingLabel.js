import React, { Component } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import {
    View,
    Text,
  } from "native-base";
import * as theme from "../../theme";

class RaitingLabel extends Component {

  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={theme.sizes.font}
          color={theme.colors[activeStar ? "active" : "gray"]}
          style={{ marginRight: 4 }}
        />
      );
    });
  };
 
  render() {
    const { reviewAvg, reviewCount } = this.props;
    <View
        style={[
        styles.row,
        { alignItems: "center", marginVertical: theme.sizes.margin / 2 }
        ]}
    >
    {this.renderRatings(reviewAvg)}
    <Text style={{ color: theme.colors.active,fontSize:15 }}>{reviewAvg}</Text>
    <Text style={{ marginLeft: 8, color: theme.colors.caption,fontSize:15 }}>
      ({reviewCount} reviews)
    </Text>
  </View>
  }
}


const styles = StyleSheet.create({
    row: {
      flexDirection: "row"
    }
  });

export default RaitingLabel;
