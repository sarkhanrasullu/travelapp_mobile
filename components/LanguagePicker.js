import React, { Component } from "react";
import { connect } from "react-redux";
import { Picker, Item } from "native-base";
import { setLanguage } from "../modules/guides";
import { setLanguages } from '../modules/languages';
import { setLoading } from '../modules/loading'
import Ionicons from "react-native-ionicons";
import Api from "../api/Api";

class LanguagePicker extends Component {
  
    componentDidMount(){
      Api.loadLanguages(this, false);
    }

    getLanguageById(id){
      const{languages} = this.props;
      const res = languages.filter((lang)=>lang.id===id);
      return res.length>0?res[0]:null;
  }

    render() { 
        const inputBg = "#7fc7ff";
        const { languages, selectedLanguage } = this.props;
        const items =  languages.map((language, index)=>{
            return <Picker.Item key={index} label={language.name} value={language.id} />;
        })
        return (
          <Item style={{ backgroundColor: inputBg, width:"33%" }}>
                  <Ionicons style={{ marginLeft: 4 }} size={15} name="md-chatboxes" />
                  <Picker
                                  mode="dialog"
                                  placeholderStyle={{  color: "#000", marginLeft:0 }}
                                  style={{ height: 30 }}
                                  placeholder={selectedLanguage ? selectedLanguage.name : "Can speak..."}
                                  onValueChange={value => {
                                    const lang = this.getLanguageById(value);
                                    this.props.setLanguage(lang);
                                  }}
                                  selectedValue={selectedLanguage?selectedLanguage.id:null } >
                                  {items}
                    </Picker>
            </Item>
        )
    }
}

const moduleState = state => ({
    selectedDate: state.entities.selectedDate,
    selectedLanguage: state.guides.selectedLanguage,
    languages: state.languages.list
  });
  
  const moduleActions = {
    setLanguage, 
    setLanguages,
    setLoading
  }; 
  
  export default connect(
    moduleState,
    moduleActions
  )(LanguagePicker);
