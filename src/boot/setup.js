import * as Expo from "expo";
import React, { Component } from "react";
import { StatusBar } from 'react-native'; 
import { Provider } from "react-redux";
import App from "../App";
import configureStore from "./configureStore";
import appJson from '../../app.json';

// import * as Amplitude from 'expo-analytics-amplitude';

// import { AMPLITUDE_API_KEY } from 'react-native-dotenv';

// require('node-libs-react-native/globals');


export default class Setup extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })),
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async componentWillMount() {
    this.setState({ isReady: true });
  }

  componentDidMount() {
    // // Amplitude
    // Amplitude.initialize(AMPLITUDE_API_KEY);
    // Amplitude.logEvent('App booted');
    // Amplitude.setUserProperties({appVersion: appJson.expo.version})

    // Set iOS status bar font color to black, making it visible in app
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    if (!this.state.isReady || this.state.isLoading) {
      return <Expo.AppLoading />;
    }

    return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
    );
  }
}