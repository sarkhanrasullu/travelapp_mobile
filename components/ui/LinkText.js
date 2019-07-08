import React, { Component } from 'react'
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import {TouchableOpacity} from 'react-native'
class LinkText extends Component {

    handleClick = ()=>{
        const {onPress} = this.props;
        if(onPress){
            onPress();
            return;
        }
        const {to, navigation} = this.props;
        if(to){
            navigation.navigate(to);
        }
    }
    render() {
        const {text} = this.props;
        return (
            <TouchableOpacity 
                onPress={this.handleClick}
                activeOpacity={1}
            >
                <Text style={{color:"#1c7eff", fontWeight:"600", fontSize:14}}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(LinkText);