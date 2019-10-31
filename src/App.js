import React, { Component } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

import ApplicationLoader from './ApplicationLoader'
import AppContainer from './Routes';

const images = [
  // require('./assets/images/bgWelcome.jpg'),
]

const fonts = {
  'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light': require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
};

const assets = {
  images: images,
  fonts: fonts
}

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if(route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export class App extends Component {
  render() {
    return (
      <ApplicationLoader assets={assets}>
        <ApplicationProvider
          mapping={mapping}
          theme={lightTheme}>
          <AppContainer 
            onNavigationStateChange={(prevState, currentState, action) => {
              const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);

              // if (prevScreen !== currentScreen) {
              //   Amplitude.logEvent(`${currentScreen}: Loaded`);
              // }
            }}
          />
        </ApplicationProvider>
      </ApplicationLoader>
    )
  }
}

export default App