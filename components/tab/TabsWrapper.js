import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import { Container, Content, Footer } from 'native-base';
import TabItem from './TabItem';

class TabsWrapper extends React.Component {

  state = {
    activeTab:null
  }

  componentDidMount(){
      if(this.props.tabs && this.props.tabs[0])
        this.setState({activeTab: this.props.tabs[0]});
  }

  handleTabChange = (tab, tabIndex) => {
    this.setState({activeTab: tab});

    if(tab.onChange){
        tab.onChange(tab, tabIndex);
    }
  }

  renderTabs() {
    const {tabs } = this.props;
    const {activeTab} = this.state;
    const tabsComponent = tabs.map((tab,index)=>{
        return (
            <TabItem key={index} tab={tab} index={index} activeTab={activeTab} onPress={()=>this.handleTabChange(tab, index)}/>
        );
    })
    return (
      <View style={styles.tabs}>
            {tabsComponent}
      </View>
    )
  }
 
  render() {
    const {activeTab} = this.state;
    return (
      <Container>
          <Content>
            <SafeAreaView style={styles.container}>
              {this.renderTabs()}
              <ScrollView style={styles.container}>
                  {activeTab?activeTab.body:null}
              </ScrollView>
            </SafeAreaView>
          </Content>
          {
            activeTab && activeTab.footer? <Footer style={{height:100}}>
            {activeTab.footer}
            </Footer>:null
          }
          
      </Container>
    );
  }
}

export default TabsWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop:15
  },
});
