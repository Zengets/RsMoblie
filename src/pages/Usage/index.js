import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header,AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import { colors,getItem } from '../../utils';

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
      <View flex padding-12>
        <Text subheading marginB-s4 marginT-6 style={{color:colors.primaryColor}}>维修</Text>
        <View row spread style={{ width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden"}}>
          {/* <AuthBase>
            
          </AuthBase> */}

          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } onPress={()=>{
             this.jumpToUrl("Scan",{type:["repair"]})
          }}>
            <View center style={ { width: 48, height: 48 } }>
              <EntypoIcons name='tools' size={ 33 }  style={{color:colors.primaryColor}}></EntypoIcons>
            </View>
            <Text subbody>设备报修</Text>
          </Card>


          <Card flex-1 center padding-12 margin-12 marginT-0 enableShadow={ false } >
            <View center style={ { width: 48, height: 48 } }>
              <EntypoIcons name='clipboard' size={ 33 }  style={{color:colors.primaryColor}}></EntypoIcons>
            </View>
            <Text subbody>维修任务</Text>
          </Card>
          <Card flex-1 center padding-12 marginB-12 enableShadow={ false } >
            <View center style={ { width: 48, height: 48 } }>
              <MaterialIcons name='history' size={ 33 }  style={{color:colors.primaryColor}}></MaterialIcons>
            </View>
            <Text subbody>维修历史</Text>
          </Card>
        </View>


      </View>
    </SafeAreaViewPlus>

  }
}

export default Usage