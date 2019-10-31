import React from 'react';
import { View } from 'react-native';
import { createSwitchNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { BottomNavigation, BottomNavigationTab, BottomNavigationProps, withStyles } from 'react-native-ui-kitten';
import { FontAwesome } from '@expo/vector-icons';

import SettingsScreen from '../screens/Settings';

import AuthLoadingScreen from '../screens/AuthLoading';
import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';

class BottomNavigationTabsComponent extends React.Component {
	state = {
		selectedIndex: 0,
	};

	onTabSelect = (selectedIndex) => {
		this.setState({ selectedIndex });
		const routeNames = ['Foo', 'Bar', 'Baz', 'Settings'];
		this.props.navigation.navigate(routeNames[selectedIndex]);
	};

	renderTabIconSettings = (style) => (
		<View>
			<FontAwesome name='line-chart' size={20} color={style.tintColor} />
		</View>
	)

	render () {
		const { indicatorStyle, themedStyle } = this.props

		return (
			<SafeAreaView>
				<BottomNavigation
					selectedIndex={this.state.selectedIndex}
					onSelect={this.onTabSelect}
					indicatorStyle={indicatorStyle}
					style={themedStyle.bottomNavigation}
				>
					<BottomNavigationTab title='Foo' icon={this.renderTabIconSettings} />
					<BottomNavigationTab title='Bar' icon={this.renderTabIconSettings} />
					<BottomNavigationTab title='Baz' icon={this.renderTabIconSettings} />
					<BottomNavigationTab title='Settings' icon={this.renderTabIconSettings} />
				</BottomNavigation>
			</SafeAreaView>
		);
	}
}

BottomNavigationTabs = withStyles(BottomNavigationTabsComponent, (theme) => ({
	bottomNavigation: {
		borderTopColor: theme['border-basic-color-2'],
		borderTopWidth: 1
	}
}));

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen,
}, {
	headerMode: 'none',
})

const TabNavigator = createBottomTabNavigator(
	{
		Settings: SettingsStack,
		Settings: SettingsStack,
		Settings: SettingsStack,
		Settings: SettingsStack,
	}, {
		initialRouteName: 'Settings',
		tabBarComponent: BottomNavigationTabs,
		tabBarOptions: {
			indicatorStyle: {
				height: 0		// remove indicator
			}
		}
	}
)

const AuthStack = createStackNavigator({
	Welcome: WelcomeScreen,
	Login: LoginScreen,
}, {
	headerMode: 'none',
})

const RootNavigator = createSwitchNavigator({
	Main: TabNavigator,
	AuthLoading: AuthLoadingScreen,
	Auth: AuthStack,
	Welcome: WelcomeScreen,
}, {
	initialRouteName: 'Welcome'
})

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer 