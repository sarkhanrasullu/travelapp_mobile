import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import BookContainer from "../../components/BookContainer";
import InfoPage from "../../components/infopage/InfoPage";
import NavigationHeader from "../../components/navigationoptions/NavigationHeader";

class DriverInfo extends Component {

  static navigationOptions = ({navigation})=>NavigationHeader.navigationOptions(navigation);

  render() {
    const { navigation } = this.props;
    const driver = navigation.getParam("driver");
    const car = driver.carList[0];
    
    return (
      <InfoPage images={car.carMediafileList} info={driver.about}
            avatarThumbnail={driver.userId.thumbnail}
            avatarTitle={driver.userId.name+" "+driver.userId.surname}
            reviewAvg={driver.reviewAvg}
            reviewCount={driver.reviewCount}
            footer={<BookContainer pageIndex={0} entity={driver} type={"DRIVER"}/>}
            />
    );
  }
}

export default withNavigation(DriverInfo);
