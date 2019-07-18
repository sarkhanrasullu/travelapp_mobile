import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {select} from '../../modules/entities';
import ViewRow from '../grid/ViewRow';
import ProgressNavigationItem from './ProgressNavigationItem';
import images from './../../assets/icons/base64images';

class ProgressNavigation extends Component {

    state = {
        pages:['DriverList','GuideList','BookSummary']
    }
    handleSkipOrReset = ()=>{
        
        const {navigation, selectedGuide, selectedDriver} = this.props;
        let{pageIndex} = this.props;

        if(pageIndex===0 && selectedDriver){
            this.props.select(null, "SET_DRIVER");
        }else if(pageIndex===1 && selectedGuide){
            this.props.select(null, "SET_GUIDE");
        }else{
            navigation.navigate(this.state.pages[++pageIndex]);
        }
    }

    switchTo = (scene)=>{
        const {navigation} = this.props;
        navigation.navigate(scene);
    }

    result = null;

    componentWillMount(){
        this.result = this.renderResult();
    }

    handleContactInfo = ()=>{
        const {selectedDriver, selectedGuide} = this.props;
         if(selectedDriver|| selectedGuide)
            this.switchTo('BookSummary')
         else 
            alert("Please choose driver or guide");
    } 

    render(){
        this.result = this.renderResult();
        return this.result;
    }

    renderResult() {
        // 
        const {selectedDriver, selectedGuide, pageIndex} = this.props;
        const selectedDriverText = selectedDriver? selectedDriver.userId.name+" "+selectedDriver.userId.surname:"SELECT DRIVER";
        const selectedDriverImage = selectedDriver? `data:image/jpg;base64,${selectedDriver.userId.thumbnail}`: images.select_person;
        const selectedDriverSubmitText = selectedDriver?"RESET":"SKIP";
        const selectedDriverSubmitColor = selectedDriver?"red":"#ff8b0f";

        const selectedGuideImage = selectedGuide? `data:image/jpg;base64,${selectedGuide.userId.thumbnail}`: images.select_person;
        const selectedGuideText = selectedGuide? selectedGuide.userId.name+" "+selectedGuide.userId.surname:"SELECT GUIDE";
        const selectedGuideSubmitText = selectedGuide?"RESET":"SKIP";
        const selectedGuideSubmitColor = selectedGuide?"red":"#ff8b0f";
        
        return (
            <ViewRow style={{backgroundColor:"#efe9e3"}} width={"100%"}>
                <ProgressNavigationItem 
                        submit={pageIndex===0}
                        selected={pageIndex==0} 
                        image={selectedDriverImage} 
                        text={selectedDriverText}
                        submitText={selectedDriverSubmitText}
                        submitColor={selectedDriverSubmitColor}
                        onSubmitPress={()=>this.handleSkipOrReset()}
                        onImagePress={()=>this.switchTo('DriverList')}
                        />
                <ProgressNavigationItem 
                            submit={ (selectedDriver ||selectedGuide)  &&pageIndex===1} 
                            selected={pageIndex==1}
                            submitColor={selectedGuideSubmitColor}
                            image={selectedGuideImage} 
                            text={selectedGuideText}
                            submitText={selectedGuideSubmitText}
                            onSubmitPress={()=>this.handleSkipOrReset()}
                            onImagePress={()=>this.switchTo('GuideList')}
                            />
                <ProgressNavigationItem  
                    text={"CONTACT INFO"}
                     square={true} 
                     image={images.contact_info}
                     onImagePress={()=>this.handleContactInfo()}
                     />
            </ViewRow>
        )
    }
}

const moduleActions = {
    select
}

const moduleState = state =>{
    return  ({
        selectedDriver: state.entities.selectedDriver,
        selectedGuide: state.entities.selectedGuide
    });
  }

  export default connect(moduleState, moduleActions)(withNavigation(ProgressNavigation))

const styles = StyleSheet.create({
    item: {
        justifyContent:"center",
        width:100
    },
    submitButtonText:{
        fontSize:15, 
        fontWeight:"600",
        color:"white"
      },
      submitButton:{
          backgroundColor:"#ff8b0f",  
          width:80, 
          height:40, 
          marginTop:10,
          justifyContent:"center",
          alignSelf:"center"
      },
})
