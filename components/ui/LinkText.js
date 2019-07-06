import React, { Component } from 'react'
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';

class LinkText extends Component {

    handleClick = ()=>{
        const {to, navigation} = this.props;
        if(to){
            navigation.navigate(to);
        }
    }
    render() {
        const {text} = this.props;
        return (
            <Text 
            onPress={this.handleClick}
            style={{color:"#1c7eff", fontWeight:"600", fontSize:14}}>{text}</Text>
        )
    }
}

export default withNavigation(LinkText);