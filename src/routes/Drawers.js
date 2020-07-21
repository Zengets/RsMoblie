import * as React from 'react';
import {
  ChangePwd, PerCenter, Scan, SearchForm, InfoDevice, InfoDeviceCan, InfoDeviceDetail, UserList,
  UserSelect, UserListDetail, DeviceUser, DeviceUserList, InfoSpare,
  InfoSpareDetail, DepartMent, DepartMentDetail, UserMore, Success, PreView,
  ToRepair, Repaired, UpkeepPlan, UpkeepDetail, RepairAction, DevicerRepair, UpkeepMission, UpkeepHistory, InfoDeviceChe, CheckAction, CheckHistory, CheckHistoryDetail, CheckError, CheckErrorDetail, SpareChangeHistory, SpareChangeHistoryDetail, SpareUsage, SpareUsageDetail,
  SpareAskfor, SpareRevert, SpareLog, SpareLogDetail, SpareOwner, SpareOwnerDetail, SpareChangeMisson, SpareChangeMissonDetail, SpareReview, SpareReviewDetail, Knowledgedetail, KnowledgeHistory, NoticeTodo, NoticeTodoDetail, NoticeToConfirm, NoticeFinished, Publish, PublishTodo, PublishTodoDetail, PublishToConfirm, PublishFinished, SpareMine, OverView
} from '../pages/index';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import BottomTabs from './BottomTabs'


function CustomDrawerContent({ progress, ...rest }) {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <PerCenter {...rest}></PerCenter>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="BottomTab" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTabs}
      />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }}
        name="ChangePwd"
        component={ChangePwd}
      />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="InfoDevice" component={InfoDevice} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="Success" component={Success} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="Scan" component={Scan} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="InfoDeviceCan" component={InfoDeviceCan} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="InfoDeviceDetail" component={InfoDeviceDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UserList" component={UserList} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UserSelect" component={UserSelect} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UserListDetail" component={UserListDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="DeviceUser" component={DeviceUser} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="DeviceUserList" component={DeviceUserList} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="InfoSpare" component={InfoSpare} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="InfoSpareDetail" component={InfoSpareDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="DepartMent" component={DepartMent} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="DepartMentDetail" component={DepartMentDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SearchForm" component={SearchForm} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="RepairAction" component={RepairAction} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UpkeepPlan" component={UpkeepPlan} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UpkeepDetail" component={UpkeepDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="DevicerRepair" component={DevicerRepair} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UserMore" component={UserMore} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="ToRepair" component={ToRepair} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="Repaired" component={Repaired} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UpkeepMission" component={UpkeepMission} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="UpkeepHistory" component={UpkeepHistory} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="InfoDeviceChe" component={InfoDeviceChe} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="CheckAction" component={CheckAction} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="CheckHistory" component={CheckHistory} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="CheckHistoryDetail" component={CheckHistoryDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="CheckError" component={CheckError} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="CheckErrorDetail" component={CheckErrorDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareAskfor" component={SpareAskfor} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareRevert" component={SpareRevert} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareLog" component={SpareLog} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareLogDetail" component={SpareLogDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareOwner" component={SpareOwner} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareOwnerDetail" component={SpareOwnerDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareChangeMisson" component={SpareChangeMisson} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareChangeMissonDetail" component={SpareChangeMissonDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareChangeHistory" component={SpareChangeHistory} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareChangeHistoryDetail" component={SpareChangeHistoryDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareUsage" component={SpareUsage} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareUsageDetail" component={SpareUsageDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareReview" component={SpareReview} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareReviewDetail" component={SpareReviewDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="Knowledgedetail" component={Knowledgedetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="KnowledgeHistory" component={KnowledgeHistory} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="NoticeTodo" component={NoticeTodo} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="NoticeTodoDetail" component={NoticeTodoDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="PreView" component={PreView} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="NoticeToConfirm" component={NoticeToConfirm} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="Publish" component={Publish} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="PublishTodo" component={PublishTodo} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="PublishTodoDetail" component={PublishTodoDetail} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="PublishToConfirm" component={PublishToConfirm} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="PublishFinished" component={PublishFinished} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="SpareMine" component={SpareMine} />
      <Drawer.Screen options={{
        unmountOnBlur: true
      }} name="OverView" component={OverView} />





    </Drawer.Navigator>
  );
}




export default function Drawers() {
  return (
    <MyDrawer />
  );
}
