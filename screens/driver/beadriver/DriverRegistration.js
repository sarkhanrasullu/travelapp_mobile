import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Container, Content } from "native-base";
import { setLoggedInUser } from "../../../modules/auth";
import { setLoading } from "../../../modules/loading";
import {setBrands, setModels} from '../../../modules/entities';
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import LoadingSpinner from "../../../components/LoadingSpinner";
import FormSection from "../../../components/FormSection";
import ProfileHeader from "../../settings/ProfileHeader";
import Api from "../../../api/Api";
import DynamicForm from "../../../components/dynamicform/DynamicForm";
import ReviewWarning from "../../../components/reviewwarning/ReviewWarning";
import SaveOrRegisterButton from "../../../components/saveorregisterbutton/SaveOrRegisterButton";
const window = Dimensions.get("window");
const contentWidth = window.width * 0.8;

class DriverRegistration extends Component {
  state = {
    target:{
      carList:[{
        modelId:{
          brandId:{}
        }
      }]
    },
    carUtilities: [],
    validation: {},
    validate: null
  }

  componentWillMount(){
    Api.loadBrands(this);
  }
  render() {
    if (this.props.isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <Container>
        <Content>
          <View style={styles.formWrapper}>
            <FormSection>
              <ReviewWarning target={this.state.target} />
              <ProfileHeader />
            </FormSection>
            <DynamicForm
              component={this}
              sections={[
                {
                    title: "About Your Prices",
                    items: [
                      { name: "price1", label: "Inside Baku" },
                      { name: "price2", label: "Absheron" },
                      { name: "price3", label: "Out of Absheron" }
                    ]
                },
                {
                    title: "Driver License",
                    items: [
                      {
                        name: "driverLicenseFront",
                        optional:true,
                        label: "Select Front",
                        type: "imagepicker"
                      },
                      {
                        name: "driverLicenseFront",
                        optional:true,
                        label: "Select Back",
                        type: "imagepicker"
                      }
                    ]
                },
                {
                    title: "About Your Car",
                    items: [
                      {
                        name: "carList.0.modelId.brandId.id",
                        label: "Brand",
                        type: "brandpicker",
                      },
                      {
                        name: "carList.0.modelId.id",
                        label: "Model",
                        type: "modelpicker",
                      },
                      {
                        name: "carList.0.productionYear",
                        label: "Production Year"
                      }
                    ]
                },
                {
                    title: "Car Utilities",
                    items: [
                      {
                        name: "carList.0.carCarUtilityList",
                        label: "",
                        type: "carutilitypicker",
                        optional: true,
                      }
                    ]
                }
              ]}
            />
            <SaveOrRegisterButton
              target={this.state.driver}
              onSubmit={() => Api.handleDriverRegister(this)}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const moduleState = state => ({
  loggedInUser: state.auth.loggedInUser,
  errorMessage: state.loading.errorMessage,
  successMessage: state.loading.successMessage,
  isLoading: state.loading.loading
});

const moduleActions = {
  setLoggedInUser,
  setLoading,
  setBrands,
    setModels,
};

export default connect(
  moduleState,
  moduleActions
)(withNavigation(DriverRegistration));

const styles = StyleSheet.create({
  warningWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  warningMessage: {
    color: "red"
  },
  formWrapper: {
    width: contentWidth,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 0
  },
  errorMessage: {
    color: "red"
  },
  successMessage: {
    color: "green"
  },
  registerButtonWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%"
  }
});
