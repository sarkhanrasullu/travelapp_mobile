import React from 'react';
import Guide from './Guide';
import SearchBar from './SearchBar';
import ProgressNavigation from '../../components/progressnavigation/ProgressNavigation'
import ListPage from '../../components/listpage/ListPage'
import { connect } from 'react-redux';

class GuideList extends React.Component {

  static navigationOptions = {
    header: null
  };
  
  render(){
    const header = <SearchBar/>;
    const footer = <ProgressNavigation pageIndex={1}/>;
    const { guides } = this.props; 
    return <ListPage header={header} footer={footer} list={guides} renderType={Guide} headerHeight={150}/>
  }

}

const moduleState = state => {
  return {
    guides: state.guides.list,
  };
}

export default connect(moduleState)(GuideList);