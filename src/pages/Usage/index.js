import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { Dimensions } from 'react-native';
import { colors, getItem } from '../../utils';

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class Usage extends React.Component {

  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then((res) => {

      if (!res) {
        return
      }
      fn ? fn() : null
    })
  }

  componentDidMount() {
    //this.setNewState("test", null)
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }
  render() {
    const { index, navigation } = this.props

    return <SafeAreaViewPlus>
      <Header
        title="应用"
        headerLeft={ () => {
          return <AntIcons name={ 'menuunfold' } size={ 20 } style={ { color: "#666", paddingLeft: 20 } } onPress={ () => {
            navigation.openDrawer()
          } }></AntIcons>
        } }
        headerRight={ () => {
          return <Ionicons name={ 'ios-qr-scanner' } size={ 22 } onPress={ () => {
            this.jumpToUrl("Scan")
          } }></Ionicons>
        } }
      />
      <View padding-12 paddingB-0>
        <Text subheading marginB-s4 marginT-6 style={ { color: colors.primaryColor } }>维修</Text>
        <View row spread style={ { width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" } }>
          {/* <AuthBase>
            
          </AuthBase> */}
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("Scan", { type: "repair" })
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <EntypoIcons name='tools' size={ 33 } style={ { color: colors.primaryColor } }></EntypoIcons>
            </View>
            <Text subbody>报修设备</Text>
          </Card>


          <Card flex-1 center padding-12 margin-12 marginT-0 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("ToRepair")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <EntypoIcons name='clipboard' size={ 33 } style={ { color: colors.primaryColor } }></EntypoIcons>
            </View>
            <Text subbody>维修任务</Text>
          </Card>
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("Repaired")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <MaterialIcons name='history' size={ 33 } style={ { color: colors.primaryColor } }></MaterialIcons>
            </View>
            <Text subbody>维修历史</Text>
          </Card>
        </View>
      </View>
      <View padding-12 paddingV-0>
        <Text subheading marginB-s4 marginT-6 style={ { color: colors.warnColor } }>维保</Text>
        <View row spread style={ { width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" } }>
          {/* <AuthBase>
            
          </AuthBase> */}
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("UpkeepPlan")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <MaterialCommunityIcons name='timer' size={ 33 } style={ { color: colors.warnColor } }></MaterialCommunityIcons>
            </View>
            <Text subbody>维保计划</Text>
          </Card>
          <Card flex-1 center padding-12 margin-12 marginT-0 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("UpkeepMission")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <EntypoIcons name='clipboard' size={ 33 } style={ { color: colors.warnColor } }></EntypoIcons>
            </View>
            <Text subbody>维保任务</Text>
          </Card>
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("UpkeepHistory")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <MaterialIcons name='history' size={ 33 } style={ { color: colors.warnColor } }></MaterialIcons>
            </View>
            <Text subbody>维保历史</Text>
          </Card>
        </View>
      </View>

      <View padding-12 paddingV-0>
        <Text subheading marginB-s4 marginT-6 style={ { color: colors.secondaryColor } }>点检</Text>
        <View row spread style={ { width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" } }>
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("Scan", { type: "check" })
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <MaterialCommunityIcons name='database-check' size={ 33 } style={ { color: colors.secondaryColor } }></MaterialCommunityIcons>
            </View>
            <Text subbody>点检设备</Text>
          </Card>
          <Card flex-1 center padding-12 margin-12 marginT-0 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("CheckHistory")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <MaterialIcons name='history' size={ 33 } style={ { color: colors.secondaryColor } }></MaterialIcons>
            </View>
            <Text subbody>点检历史</Text>
          </Card>
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={ () => {
            this.jumpToUrl("CheckError")
          } }>
            <View center style={ { width: 48, height: 48 } }>
              <MaterialIcons name='error' size={ 33 } style={ { color: colors.secondaryColor } }></MaterialIcons>
            </View>
            <Text subbody>点检异常</Text>
          </Card>
        </View>
      </View>








    </SafeAreaViewPlus>

  }
}

export default Usage