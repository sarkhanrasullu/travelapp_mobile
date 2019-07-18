import React, { Component } from 'react'
import ThumbnailText from '../../../components/ThumbnailText';
import { View } from 'native-base';
import ViewRow from '../../../components/grid/ViewRow';
import {Dimensions} from 'react-native'
import UIButton from '../../../components/ui/UIButton';
import { withNavigation } from 'react-navigation';
import images from '../../../assets/icons/base64images';
let win = Dimensions.get("window");
const width = win.width;
const height = win.height;
const containerWidth = width*0.82;

class WelcomeNavigation extends Component {
    render() {
        const {navigation}  = this.props;
        return (
            <View style={{alignSelf:"center",height:500, width:containerWidth, justifyContent:"space-between"}}>
                <ViewRow >
                    <ThumbnailText fontSize={10} width={80} height={80} text={"1. Choose region"} 
                    base64
                    images={[images.image1]} />
                    <ThumbnailText fontSize={10} width={80} height={80} text={"2. Choose dates"}
                     images={[images.image2]}  />
                </ViewRow>
                <ViewRow >
                    <ThumbnailText fontSize={10} width={80} height={80} text={"3. Choose vehicle"} 
                    images={[images.image3]}  />
                    <ThumbnailText fontSize={10} width={80} height={80} text={"4. Choose guide"} 
                    images={[images.image4]}  />
                </ViewRow>
                <ViewRow>
                     <ThumbnailText fontSize={10} width={80} height={80} text={"5. Invoice"} 
                    images={[images.image6]}  />
                    <ThumbnailText fontSize={10} width={80} height={80} text={"6. Pay by cash"} 
                    images={[images.image5]}  />
                </ViewRow>
                        
                <UIButton onPress={() => {
                        navigation.navigate('DestinationList')
                    }}
                    text="EXPLORE" style={{marginTop:40, marginBottom:40}}></UIButton>
            </View>
        )
    }
}

export default withNavigation(WelcomeNavigation)
