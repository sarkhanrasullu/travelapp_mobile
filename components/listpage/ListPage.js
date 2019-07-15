import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import LoadingSpinner from '../../components/LoadingSpinner';
import InformPanel from '../../components/InformPanel';
import { List, Container, Header, Content, Footer } from 'native-base';
import { setLoading } from '../../modules/loading';
import { connect } from 'react-redux';

class ListPage extends React.Component {

  renderList() {
    if(this.props.isLoading){
      return <LoadingSpinner marginTop={this.props.spinnerMarginTop}/>
    }
    
    let { list } = this.props;
    if(list===null || list===undefined || list.length===0){
      return <InformPanel text={"No results found"} />
    }

    list = list.filter((l)=>l!=null && l.id!=null);

    const ComponentType = this.props.renderType;

    return <List>
            <FlatList
                style={{ overflow:'visible'}}
                data={list}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => <ComponentType item={item}/>}
              />
        </List>
  }

  result = null;

  componentWillMount(){
    this.result = this.renderResult();
  }

  render(){
    this.result = this.renderResult();
    return this.result;
  }

  renderResult() { 
        const {headerHeight} = this.props;
        return (
                <Container>
                    {
                        this.props.header?
                        <Header style={{backgroundColor: "#32a6ff", height:headerHeight, paddingLeft:0}}>
                            {this.props.header}
                        </Header>:null
                    }
                  <Content>
                    <SafeAreaView style={styles.container}>
                        {this.renderList()}
                    </SafeAreaView>
                  </Content>
                  {
                      this.props.footer?
                        <Footer style={{height:130}}> 
                            {this.props.footer}
                        </Footer>: null
                  }
            </Container>
        );
   
  }
}

const moduleActions = {
    setLoading
  }

const moduleState = state => {
    return {
      isLoading: state.loading.loading
    };
  }

export default connect(moduleState, moduleActions)(ListPage);

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    backgroundColor: '#fff',
  }
});
