import { ImageBackground, Animated } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OneToast } from '../../components';
import { Button, ActionSheet, Text, View, Avatar, Badge } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginChild from './LoginChild'
import FogotChild from './FogotChild'
import { colors } from '../../utils';
import RNPermissions, { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import JPush from 'jpush-react-native';
import Octicons from 'react-native-vector-icons/Octicons';


class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    ispage: true,
    showCustom: false,
    checkshow: {
      camera: false,
      notice: false,
    }
  }



  resetCustom() {
    let { checkshow: { camera, notice } } = this.state;
    this.setState({
      showCustom: camera || notice
    })
  }

  docamera(fn) {
    check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          this.setState({
            checkshow: {
              ...this.state.checkshow,
              camera: true
            }
          })
          break;
        case RESULTS.DENIED:
          console.log('开始请求权限');
          if (fn) {
            fn()
          } else {
            this.setState({
              checkshow: {
                ...this.state.checkshow,
                camera: true
              }
            }, () => {
              this.resetCustom()
            })
          }
          break;
        case RESULTS.GRANTED:
          console.log('已通过');
          this.setState({
            checkshow: {
              ...this.state.checkshow,
              camera: false
            }
          }, () => {
            this.resetCustom()
          })
          break;
        case RESULTS.BLOCKED:
          console.log('没有请求权限');
          this.setState({
            checkshow: {
              ...this.state.checkshow,
              camera: true
            }
          }, () => {
            this.resetCustom()
          })
          break;
      }
    })
  }


  donotice(fn) {
    RNPermissions.requestNotifications().then(({ settings, status }) => {
      if (status == "granted") {
        this.setState({
          checkshow: {
            ...this.state.checkshow,
            notice: false
          }
        }, () => {
          this.resetCustom()
        })
      } else {
        if (fn) {
          fn()
        } else {
          this.setState({
            checkshow: {
              ...this.state.checkshow,
              notice: true
            }
          }, () => {
            this.resetCustom()
          })
        }

      }
    })
  }

  componentDidMount() {
    this.docamera();//相机权限
    this.donotice();//通知权限

    JPush.init();
    //连接状态
    this.connectListener = result => {
      console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
      console.log("notificationListener:" + JSON.stringify(result))
    };
    JPush.addNotificationListener(this.notificationListener);
    //本地通知回调
    this.localNotificationListener = result => {
      console.log("localNotificationListener:" + JSON.stringify(result))
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    //自定义消息回调
    this.customMessageListener = result => {
      console.log("customMessageListener:" + JSON.stringify(result))
    };
    JPush.addCustomMessagegListener(this.customMessageListener);
    //tag alias事件回调
    this.tagAliasListener = result => {
      console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(this.tagAliasListener);
    //手机号码事件回调
    this.mobileNumberListener = result => {
      console.log("mobileNumberListener:" + JSON.stringify(result))
    };
    JPush.addMobileNumberListener(this.mobileNumberListener);
  }



  render() {
    let { navigation } = this.props, { checkshow: { camera, notice },showCustom } = this.state;
    let avatar = {
      onPress:()=>{
        this.donotice();
        this.docamera();
      },
      backgroundColor:"#fff",
      title: 'Smaller size, Badge ("offline")',
      size: 100,
      source: require("../../assets/logo.png"),
      badgeProps: {
        icon: require("../../assets/lock.png"),
        size: 'small',
        borderWidth: 1.5,
        borderColor: "#fff",
        iconStyle: {backgroundColor:showCustom?colors.primaryColor:"#999" },
      },
    }


    return <SafeAreaViewPlus style={{ backgroundColor: "#fff", flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={{ height: 200 }} paddingT-32 paddingB-24>
          <View flex center>
            <Avatar {...avatar}></Avatar>
            <Text style={{ fontSize: 28 }}>欢迎使用</Text>
          </View>
        </View>
        <View flex-1>
          <View padding-44 paddingT-0>
            {
              this.state.ispage ? <LoginChild navigation={navigation}></LoginChild> : <FogotChild navigation={navigation} tologin={() => {
                this.setState({
                  ispage: true
                })
              }}></FogotChild>
            }
            <View row right marginT-12>
              <Text onPress={() => {
                JPush.addLocalNotification({
                  messageID: "123456789",
                  title: "title123",
                  content: "content123",
                  extras: { "key123": "value123" }
                })


              }}>
                本地推送
              </Text>
              <Text style={{ color: this.state.ispage ? "#999" : colors.primaryColor }} onPress={() => {
                this.setState({
                  ispage: !this.state.ispage
                })
              }}>{
                  this.state.ispage ? "忘记密码？" : "立即登录"
                }</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 130 }}>
          <ImageBackground source={require('../../assets/login_0.png')} style={{ width: "100%", height: 130 }}></ImageBackground>
        </View>
        <ActionSheet
          title='权限管理'
          message='Message of action sheet'
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          useNativeIOS={false}
          options={[
            camera && {
              label: '相机权限', onPress: () => {
                this.docamera(()=>{
                  request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(result => {
                  });
                })
              }
            },
            notice && { label: '通知权限', onPress: () => {
              this.donotice(()=>{RNPermissions.openSettings()})
            }},
          ].filter(item=>item.label)}
          visible={this.state.showCustom}
          onDismiss={() => this.setState({ showCustom: false })}
        />

      </KeyboardAwareScrollView>


    </SafeAreaViewPlus>


  }
}

export default Login