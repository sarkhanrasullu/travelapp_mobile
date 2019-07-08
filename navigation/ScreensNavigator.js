import { createStackNavigator } from 'react-navigation';

import DestinationInfo from '../screens/destination/DestinationInfo';
import MainTabNavigator from './MainTabNavigator';
import DriverInfo from '../screens/driver/DriverInfo';
import GuideInfo from '../screens/guide/GuideInfo';
import BookSummary from '../screens/book/BookSummary';
import TripDetails from '../screens/trips/TripDetails';
import Login from '../screens/settings/loginregister/login/Login';
import Feedback from '../screens/settings/feedback/Feedback';
import GetHelp from '../screens/settings/help/GetHelp';
import Aboutus from '../screens/settings/about/Aboutus';
import Register from '../screens/settings/loginregister/register/Register';
import DriverSettingsScreen from '../screens/driver/settings/DriverSettingsScreen';
import DriverRegistration from '../screens/driver/beadriver/DriverRegistration';
import DriverWorkingDates from '../screens/driver/beadriver/DriverWorkingDates';
import GuideSettingsScreen from '../screens/guide/settings/GuideSettingsScreen';
import GuideWorkingDates from '../screens/guide/beaguide/GuideWorkingDates';
import GuideRegistration from '../screens/guide/beaguide/GuideRegistration';
import EditProfile from '../screens/settings/loginregister/EditProfile';
import HomeScreen from '../screens/homescreen/HomeScreen';
import PaymentWindow from '../screens/payment/PaymentWindow';
import BookResult from '../screens/book/BookResult';
import VerifyEmail from '../screens/settings/loginregister/forgotpassword/VerifyEmail';
import ResetPassword from '../screens/settings/loginregister/forgotpassword/ResetPassword';
import SendForgotKey from '../screens/settings/loginregister/forgotpassword/SendForgotKey';

export default createStackNavigator({

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      visible: false
    }
  },
  MainNavigator: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  DestinationInfo: DestinationInfo,
  DriverInfo: {
    screen: DriverInfo,
    navigationOptions:{
      title: "Driver Details"
    }
  },
  GuideInfo: {
    screen: GuideInfo,
    navigationOptions:{
      title: "Guide Details"
    }
  },
  BookSummary: {
    screen: BookSummary,
    navigationOptions:{
      title: "Contact Details"
    }
  },
  TripDetails: {
    screen: TripDetails,
    navigationOptions:{
      title: "Trip Details"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: {
      title: "Feedback"
    }
  },
  GetHelp: {
    screen: GetHelp,
    navigationOptions: {
      title: "Help"
    }
  },
  Aboutus: {
    screen: Aboutus,
    navigationOptions: {
      title: "About Us"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  DriverRegistration: {
    screen: DriverRegistration,
    navigationOptions: {
      title: "Driver Registration Form"
    }
  },
  DriverWorkingDates: {
    screen: DriverWorkingDates,
    navigationOptions: {
      title: "Work Schedule"
    }
  },
  GuideRegistration: {
    screen: GuideRegistration,
    navigationOptions: {
      title: "Guide Registration Form"
    }
  },
  GuideWorkingDates: {
    screen: GuideWorkingDates,
    navigationOptions: {
      title: "Work Schedule"
    }
  },
  DriverSettings: {
    screen: DriverSettingsScreen,
    navigationOptions: {
      title: "Driver Panel"
    }
  },
  GuideSettings: {
    screen: GuideSettingsScreen,
    navigationOptions: {
      title: "Guide Panel"
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: "Edit Profile"
    }
  },
  PaymentWindow: {
    screen: PaymentWindow,
    navigationOptions: {
      title: "Payment Window"
    }
  },
  BookSuccess: {
    screen: BookResult,
    navigationOptions: {
      title: "Trip Success"
    }
  },
  SendForgotKey: {
    screen: SendForgotKey,
    navigationOptions: {
      title: "Send Verification Code"
    }
  },
  VerifyEmail: {
    screen: VerifyEmail,
    navigationOptions: {
      title: "Verify Email"
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      title: "Reset Password"
    }
  }

  
});

