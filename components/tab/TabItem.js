import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class TabItem extends React.Component {
 
  render() {
    const {tab, activeTab, onPress} = this.props;
    return (
        <View
        style={[
            styles.tab,
            tab === activeTab ? styles.activeTab : null
        ]}
        >
            <Text
                style={[
                styles.tabTitle,
                tab === activeTab ? styles.activeTabTitle : null
                ]}
                onPress={() => onPress()}
            >
                {tab.title}
            </Text>
    </View>
    );
  }
}

export default TabItem;

const styles = StyleSheet.create({
    tab: {
        width:"50%",
        alignItems:"center",
        // paddingHorizontal: 14,
        marginHorizontal: 10,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
      },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    width:"100%",
    textAlign:"center",
  },
  activeTab: {
    borderBottomColor: '#32a6ff',
  },
  activeTabTitle: {
    color: '#32a6ff',
  },
});
