import React from 'react';
import SearchBar from './SearchBar';
import ProgressNavigation from '../../components/progressnavigation/ProgressNavigation';
import ListPage from '../../components/listpage/ListPage';
import { connect } from 'react-redux';
import Driver from './Driver';

class DriverList extends React.Component {

  static navigationOptions = {
    header: null
  };

  render() {
    const header = <SearchBar/>;
    const footer = <ProgressNavigation pageIndex={0}/>;
    const {drivers} = this.props;
    let data = [];
    if(drivers) data = drivers.filter((driver)=>driver.carList[0]!=undefined);
    return <ListPage 
      spinnerMarginTop={"35%"}
      header={header} 
      footer={footer} 
      list={data} 
      renderType={Driver} 
      headerHeight={113}/>
  }

}

const moduleState = state =>{
  return  ({
    drivers: state.drivers.list,
    isLoading: state.loading.loading
  });
}

export default connect(moduleState)(DriverList);