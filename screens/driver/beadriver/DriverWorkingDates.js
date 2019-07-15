import React, { Component } from "react";
import Api from '../../../api/Api';
import WorkingDates from "../../workingdates/WorkingDates";

class DriverWorkingDates extends Component {
  render() {
    return <WorkingDates 
    onLoad={(component)=>Api.loadDriver(component)}
    entityName={"driver"}
    onSubmit={(component)=>Api.handleDriverWorkSchedule(component)}/>
  }
}

export default DriverWorkingDates;

