import React, { Component } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import {
    View,
    Text,
  } from "native-base";


class RaitingLabel extends Component {

  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={14}
          color={activeStar ? '#007BFA' : "#DCE0E9"}
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
        { alignItems: "center", marginVertical: 36 / 2 }
        ]}
    >
    {this.renderRatings(reviewAvg)}
    <Text style={{ color: '#007BFA',fontSize:15 }}>{reviewAvg}</Text>
    <Text style={{ marginLeft: 8, color: '#BCCCD4',fontSize:15 }}>
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
