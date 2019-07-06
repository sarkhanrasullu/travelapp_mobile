import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { View, Text } from 'native-base';

export default class SettingsItem extends Component {
    render() {
        const {text} = this.props;
        return (
            <View style={styles.item}>
                <Text style={{ fontWeight: '500', }}>{text}</Text>
              </View>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth:1, 
        borderBottomColor:"#00000040"
    }
})
