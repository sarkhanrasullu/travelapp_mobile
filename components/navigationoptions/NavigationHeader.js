import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { View } from "native-base";
import { withNavigation } from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import BookContainer from "../../components/BookContainer";
import InfoPage from "../../components/infopage/InfoPage";

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 15,
    lineHeight: 15,
    color: '#BCCCD4'
  }
});
export default class NavigationHeader {
    static navigationOptions = (navigation) => {
        return {
          header: (
            <View style={[styles.flex, styles.row, styles.header]}>
              <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}
              >
                  <FontAwesome
                    name="chevron-left"
                    color={'#FFF'}
                    size={20}
                  />
              </TouchableOpacity>
            </View>
          ),
          headerTransparent: true
        };
      };
}

