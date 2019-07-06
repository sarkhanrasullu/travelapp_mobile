import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Container, Content } from 'native-base';
import GuideRegistration from './GuideRegistration'
import GuideWorkingDates from './GuideWorkingDates';
const { width, height } = Dimensions.get('screen');

class GuideRegistrationTabs extends React.Component {
  static navigationOptions = {
            // header: null,
      title: ""
  };

  state = {
    filters:{
      type:'details'
    }
  }

  handleTab = (tabKey) => {
    this.setState({filters:{ type: tabKey }});
  }

  renderTabs() {
    const { filters } = this.state;

    return (
      <View style={styles.tabs}>
        <View
          style={[
            styles.tab,
            filters.type === 'details' ? styles.activeTab : null
          ]}
        >
          <Text
            style={[
              styles.tabTitle,
              filters.type === 'details' ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab('details')}
          >
            Details
          </Text>
        </View>
        <View
          style={[
            styles.tab,
            filters.type === 'workingdates' ? styles.activeTab : null
          ]}
        >
          <Text
            style={[
              styles.tabTitle,
              filters.type === 'workingdates' ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab('workingdates')}
          >
            Working Plan
          </Text>
        </View>
      </View>
    )
  }
 
  render() {
    const { filters } = this.state;
    const currentTab = filters.type === 'workingdates'?<GuideWorkingDates/>: <GuideRegistration/>;

    return (
      <Container>
          <Content>
            <SafeAreaView style={styles.container}>
              {this.renderTabs()}
              <ScrollView style={styles.container}>
                  {currentTab}
              </ScrollView>
            </SafeAreaView>
            
          </Content>
      </Container>
    );
  }
}

export default GuideRegistrationTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  rvMarker: {
    backgroundColor: '#FFBA5A',
  },
  tentMarker: {
    backgroundColor: '#FF7657',
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop:15
  },
  tab: {
    width:"50%",
    alignItems:"center",
    // paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    width:"100%",
    textAlign:"center",
  },
  activeTab: {
    borderBottomColor: '#32a6ff',
  },
  activeTabTitle: {
    color: '#32a6ff',
  },
  map: {
    flex: 1,
  },
  camping: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  campingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  campingImage: {
    width: width * 0.30,
    height: width * 0.25,
    borderRadius: 6,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)'
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB'
  }
});
