import React from 'react';
import { Scan, Login,SearchForm,
    InfoDevice,InfoDeviceCan,InfoDeviceDetail,UserList,UserListDetail,DeviceUser,DeviceUserList,InfoSpare,
    InfoSpareDetail,DepartMent,DepartMentChild,UserMore,Success,
    
    
    ToRepair,Repaired,UpkeepPlan,UpkeepChild,RepairAction,DevicerRepair 




} from '../pages/index';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import Drawer from './Drawer'
import { Transition } from 'react-native-reanimated';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


let currentUser = {};
let getItem = async () => {
    currentUser = await AsyncStorage.getItem('@MyApp_user')
}

getItem();


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
                    headerShown: false
                }
            )
        },
        Scan: Scan,
        InfoDevice:InfoDevice,
        InfoDeviceCan:InfoDeviceCan,
        InfoDeviceDetail:InfoDeviceDetail,
        UserList:UserList,
        UserListDetail:UserListDetail,
        DeviceUser:DeviceUser,
        DeviceUserList:DeviceUserList,
        InfoSpare:InfoSpare,
        InfoSpareDetail:InfoSpareDetail,
        DepartMent:DepartMent,
        DepartMentChild:DepartMentChild,
        SearchForm:SearchForm,
        RepairAction:RepairAction,
        UpkeepPlan:UpkeepPlan,
        UpkeepChild:UpkeepChild,
        DevicerRepair:DevicerRepair,
        UserMore:UserMore,
        ToRepair:ToRepair,
        Repaired:Repaired
    },
    {
        initialRouteName: 'Home',
        headerMode: "screen",
        defaultNavigationOptions: {
            headerShown: false,
            headerTitleAlign: "center",
            ...TransitionPresets.SlideFromRightIOS,//ModalSlideFromBottomIOS
        }
    }
);

let Main = createAppContainer(AppNavigator);



const App = createAppContainer(
    createAnimatedSwitchNavigator(
        {
            Login: Login,
            Main: Main,
            Success:Success
        },
        {
            initialRouteName: currentUser.token?"Main":"Login",
            transition: (
                <Transition.Together>
                    <Transition.Out
                        type="slide-left"
                        durationMs={200}
                        interpolation="easeIn"
                    />
                    <Transition.In
                        type="slide-right"
                        durationMs={200}
                        interpolation="easeIn"
                    />
                </Transition.Together>
            ),
        }
    )
)




export default App

