import React, { Component } from "react";
import Api from '../../../api/Api';
import WorkingDates from "../../workingdates/WorkingDates";

class GuideWorkingDates extends Component {
  render() {
    return <WorkingDates 
    onLoad={(component)=>Api.loadGuide(component)}
    entityName={"guide"}
    onSubmit={(component)=>Api.handleGuideWorkSchedule(component)}/>
  }
}

export default GuideWorkingDates;

