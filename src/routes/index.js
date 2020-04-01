import React from 'react';
import { Scan, Login,SearchForm,
    InfoDevice,InfoDeviceCan,InfoDeviceDetail,UserList,UserSelect,UserListDetail,DeviceUser,DeviceUserList,InfoSpare,
    InfoSpareDetail,DepartMent,DepartMentDetail,UserMore,Success,PreView,ChangePwd,
    
    
    ToRepair,Repaired,UpkeepPlan,UpkeepDetail,RepairAction,DevicerRepair,UpkeepMission,UpkeepHistory, InfoDeviceChe,CheckAction,CheckHistory,CheckHistoryDetail,CheckError,CheckErrorDetail,SpareChangeHistory,SpareChangeHistoryDetail,SpareUsage,SpareUsageDetail,
    SpareAskfor,SpareRevert,SpareLog,SpareLogDetail,SpareOwner,SpareOwnerDetail,SpareChangeMisson,SpareChangeMissonDetail,SpareReview,SpareReviewDetail,Knowledgedetail,KnowledgeHistory,NoticeTodo,NoticeTodoDetail,NoticeToConfirm,NoticeFinished,Publish,PublishTodo,PublishTodoDetail,PublishToConfirm,PublishFinished,SpareMine,OverView

} from '../pages/index';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import Drawer from './Drawer'
import { Transition } from 'react-native-reanimated';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';



const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: gestureHandlerRootHOC(Drawer),
        },
        Scan: Scan,
        InfoDevice:InfoDevice,
        InfoDeviceCan:InfoDeviceCan,
        InfoDeviceDetail:InfoDeviceDetail,
        UserList:UserList,
        UserSelect:UserSelect,
        UserListDetail:UserListDetail,
        DeviceUser:DeviceUser,
        DeviceUserList:DeviceUserList,
        InfoSpare:InfoSpare,
        InfoSpareDetail:InfoSpareDetail,
        DepartMent:DepartMent,
        DepartMentDetail:DepartMentDetail,
        SearchForm:SearchForm,
        RepairAction:RepairAction,
        UpkeepPlan:UpkeepPlan,
        UpkeepDetail:UpkeepDetail,
        DevicerRepair:DevicerRepair,
        UserMore:UserMore,
        ToRepair:ToRepair,
        Repaired:Repaired,
        UpkeepMission,UpkeepMission,
        UpkeepHistory:UpkeepHistory,
        InfoDeviceChe:InfoDeviceChe,
        CheckAction,CheckAction,
        CheckHistory:CheckHistory,
        CheckHistoryDetail:CheckHistoryDetail,
        CheckError:CheckError,
        CheckErrorDetail:CheckErrorDetail,
        SpareAskfor:SpareAskfor,
        SpareRevert:SpareRevert,
        SpareLog:SpareLog,
        SpareLogDetail:SpareLogDetail,
        SpareOwner:SpareOwner,
        SpareOwnerDetail:SpareOwnerDetail,
        SpareChangeMisson:SpareChangeMisson,
        SpareChangeMissonDetail:SpareChangeMissonDetail,
        SpareChangeHistory:SpareChangeHistory,
        SpareChangeHistoryDetail:SpareChangeHistoryDetail,
        SpareUsage:SpareUsage,
        SpareUsageDetail:SpareUsageDetail,
        SpareReview:SpareReview,
        SpareReviewDetail:SpareReviewDetail,
        Knowledgedetail:Knowledgedetail,
        KnowledgeHistory:KnowledgeHistory,
        NoticeTodo:NoticeTodo,
        NoticeTodoDetail:NoticeTodoDetail,
        PreView:PreView,
        NoticeToConfirm:NoticeToConfirm,
        NoticeFinished:NoticeFinished,
        Publish:Publish,
        PublishTodo:PublishTodo,
        PublishTodoDetail:PublishTodoDetail,
        PublishToConfirm:PublishToConfirm,
        PublishFinished:PublishFinished,
        SpareMine:SpareMine,
        OverView:OverView,
        ChangePwd:ChangePwd
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
            initialRouteName: "Login",
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

