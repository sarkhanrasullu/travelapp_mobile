import React, { Component } from 'react'
import { View, ListItem, CheckBox, Body, Text } from 'native-base';
import {StyleSheet} from 'react-native'

export default class CheckBoxList extends Component {

    state = {
        items:[],
    }

    handleOnPress = (item)=>{
        const {onChecked, component} = this.props;
        item.checked = !item.checked;
        component.setState({});
        if(onChecked) onChecked(item);
    }

    render() {
        const {items} = {...this.props};
        const listItems = items.map((item, index)=>{
            return (
                <ListItem style={styles.item} key={index} onPress={()=>this.handleOnPress(item)}>
                    <CheckBox checked={item.checked} onPress={()=>this.handleOnPress(item)} />
                    <Body>
                        <Text>{item.name}</Text>
                    </Body>
                </ListItem>
            )
        })
        return (
            <View style={styles.wrapper}>
                {listItems}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper :{
        marginTop:20,
        width:"100%"
    },  
    item:{
        width:"100%", 
        paddingLeft:0, 
        marginLeft:0
    },
})
