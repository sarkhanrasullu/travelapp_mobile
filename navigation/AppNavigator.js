import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ScreensNavigator from './ScreensNavigator';

export default createAppContainer(createSwitchNavigator({
  Screens: ScreensNavigator
}));