import React from 'react';
import { Scan, Login } from '../pages/index';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Drawer from './Drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}


const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: gestureHandlerRootHOC(Drawer),
            navigationOptions: ({ navigation }) => (
                {
                    headerShown:false
                }
            )
        },
        Scan:Scan,
        Login: Login
    },
    {
        initialRouteName: 'Login',
        headerMode: "screen",
        defaultNavigationOptions: {
            headerShown: false,
            headerTitleAlign: "center",
            ...TransitionPresets.SlideFromRightIOS,//ModalSlideFromBottomIOS
        }
    }
);

const MyAppRouter = {
    ...AppNavigator,
    getStateForAction(action, state) {
        if (
            state &&
            action.type === NavigationActions.BACK &&
            getCurrentRouteName(state) == "Login"
        ) {
            // Returning null from getStateForAction means that the action
            // has been handled/blocked, but there is not a new state
            return null;
        }
        return AppNavigator.getStateForAction(action, state);
    },
};



const App = createAppContainer(AppNavigator);

export default App

