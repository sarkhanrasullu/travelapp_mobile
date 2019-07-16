import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text } from "native-base";
import RaitingLabel from "./RaitingLabel";

class InfoPanel extends Component {
  state = {
    readMore: false
  };

  render() {
    const {info, avatarThumbnail, avatarTitle, reviewAvg, reviewCount} = this.props;
    let description = info;
    let readMoreButton = null;

    if (!this.state.readMore && info && info.length > 180) {
      description = info.substring(0, 180);
      readMoreButton = (
        <Text style={{ color: '#007BFA',fontSize:15 }} onPress={() => { this.setState({ readMore: true }); }} >
          {" Read more"}
        </Text>
      );
    }

    return (
      <View style={[styles.flex]}>
        <View style={[styles.flex, styles.contentHeader]}>
          <Image style={[styles.avatar, styles.shadow]} source={{ uri: `data:image/jpg;base64,${avatarThumbnail}` }} />
          <Text style={styles.title}>{avatarTitle}</Text>
          <RaitingLabel reviewAvg={reviewAvg} reviewCount={reviewCount}/>
          <Text style={styles.description}>
            {description}
            {readMoreButton}
          </Text>
        </View>
      </View>
    );
  }
}

export default InfoPanel;


const styles = StyleSheet.create({
    flex: {
      flex: 0
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
    title: {
      fontSize: 20,
      fontWeight: "bold"
    },
    description: {
      fontSize: 15,
      lineHeight: 15,
      color: '#BCCCD4'
    }
  });
