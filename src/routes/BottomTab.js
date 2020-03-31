import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Info, Home, Usage, Knowledge,Mine } from '../pages/index';
import { createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils'
import React from 'react';

let RouteConfigs = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: "首页",
            tabBarIcon: ({ tintColor, focused }) => {
                return <MaterialCommunityIcons
                    name={focused ? "home" : "home-outline"}
                    style={{ color: tintColor }}
                    size={24}
                ></MaterialCommunityIcons>
            }
        }
    },
    Info: {
        screen: Info,
        navigationOptions: {
            tabBarLabel: "信息",
            tabBarIcon: ({ tintColor, focused }) => {
                return <Ionicons
                    name={focused ? "md-information-circle" : "md-information-circle-outline"}
                    style={{ color: tintColor }}
                    size={24}
                ></Ionicons>
            }
        }
    },
    Usage: {
        screen: Usage,
        navigationOptions: {
            tabBarLabel: "应用",
            tabBarIcon: ({ tintColor, focused }) => {
                return <AntIcons
                    name={focused ? "appstore1" : "appstore-o"}
                    style={{ color: tintColor }}
                    size={22}
                ></AntIcons>
            }
        }
    },
    Knowledge: {
        screen: Knowledge,
        navigationOptions: {
            tabBarLabel: "知识库",
            tabBarIcon: ({ tintColor, focused }) => {
                return <MaterialCommunityIcons
                    name={focused ? "book" : "book-outline"}
                    style={{ color: tintColor }}
                    size={22}
                ></MaterialCommunityIcons>
            }
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => {
                return <MaterialCommunityIcons
                    name={focused ? "account-circle" : "account-circle-outline"}
                    style={{ color: tintColor }}
                    size={22}
                ></MaterialCommunityIcons>
            }
        }
    },
}


const BottomTab = createBottomTabNavigator(RouteConfigs, {
    initialRouteName:'Home',
    tabBarPosition: 'bottom',
    tabBarOptions:{
        activeTintColor:colors.primaryColor
    },
});

export default createAppContainer(BottomTab) 