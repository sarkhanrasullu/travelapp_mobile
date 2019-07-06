import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { View } from "native-base";
import { withNavigation } from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../../theme";
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
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2
  },
  avatar: {
    position: "absolute",
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding
  },
  shadow: {
    shadowColor: theme.colors.black,
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
    backgroundColor: theme.colors.gray
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 15,
    lineHeight: 15,
    color: theme.colors.caption
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
                    color={theme.colors.white}
                    size={20}
                  />
              </TouchableOpacity>
            </View>
          ),
          headerTransparent: true
        };
      };
}

