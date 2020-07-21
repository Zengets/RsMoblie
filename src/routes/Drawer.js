import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { ChangePwd,PerCenter } from '../pages/index';
import { Dimensions } from 'react-native'
import BottomTab from './BottomTab'

let {height,width} =  Dimensions.get('window');

let RouteConfigs = {
    MainDrawer: {
        screen: BottomTab,
    },
    ChangePwd: {
        screen: ChangePwd,
    },
}



const Drawer = createDrawerNavigator(RouteConfigs, {
    drawerWidth:width*0.80,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName:'MainDrawer',//设置默认打开的页面
    contentOptions:{
        inactiveTintColor:'#4d3a34',//不被选中的颜色
        activeTintColor:'#ff7226',//改变选中之后的颜色
    },
    contentComponent:PerCenter,

});

export default createAppContainer(Drawer) 
