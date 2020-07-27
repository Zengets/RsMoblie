import * as React from 'react';
import {
     Login
} from '../pages/index';
import Drawers from './Drawers'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 1,
        restSpeedThreshold: 1,
    },
};

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={Drawers} />
            {/* 
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                transitionSpec: {
                    open: config,
                    close: config,
                },
                }}
            /> */}
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <MyStack />
        </NavigationContainer>
    );
}

