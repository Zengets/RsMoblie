import * as React from 'react';
import {
    Scan, Login, SearchForm,
    InfoDevice, InfoDeviceCan, InfoDeviceDetail, UserList,
    UserSelect, UserListDetail, DeviceUser, DeviceUserList, InfoSpare,
    InfoSpareDetail, DepartMent, DepartMentDetail, UserMore, Success, PreView,
    ToRepair, Repaired, UpkeepPlan, UpkeepDetail, RepairAction, DevicerRepair, UpkeepMission, UpkeepHistory, InfoDeviceChe, CheckAction, CheckHistory, CheckHistoryDetail, CheckError, CheckErrorDetail, SpareChangeHistory, SpareChangeHistoryDetail, SpareUsage, SpareUsageDetail,
    SpareAskfor, SpareRevert, SpareLog, SpareLogDetail, SpareOwner, SpareOwnerDetail, SpareChangeMisson, SpareChangeMissonDetail, SpareReview, SpareReviewDetail, Knowledgedetail, KnowledgeHistory, NoticeTodo, NoticeTodoDetail, NoticeToConfirm, NoticeFinished, Publish, PublishTodo, PublishTodoDetail, PublishToConfirm, PublishFinished, SpareMine, OverView
} from '../pages/index';
import Drawers from './Drawers'
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

