import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { Info, Home, Usage, Knowledge, Mine } from '../pages/index';
import {colors} from '../utils'


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: colors.primaryColor,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '首页',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Info"
                component={Info}
                options={{
                    tabBarLabel: '信息',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-information-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Usage"
                component={Usage}
                options={{
                    tabBarLabel: '应用',
                    tabBarIcon: ({ color, size }) => (
                        <AntIcons name="appstore1" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Knowledge"
                component={Knowledge}
                options={{
                    tabBarLabel: '知识库',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="book" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mine"
                component={Mine}
                options={{
                    tabBarLabel: '我的',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function BottomTabs() {
    return (
        <MyTabs />
    );
}