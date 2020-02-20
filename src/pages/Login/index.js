import { ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OpenToast } from '../../components';
import { Button, TextField, Text, View, Avatar } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';

@connect(({ index }) => ({ index }))
class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props)
    this.state = {
      username: "A888",
      password: "123456",
      see: false,
    }
  }
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

  login() {
    let { username, password } = this.state;
    this.setNewState("login", {
      "accountName": username,
      password
    }, () => {
      const { token, userTime } = this.props.index;
      const USER = {
        token,
        userTime,
        username,
        password
      }
      AsyncStorage.setItem("@MyApp_user", JSON.stringify(USER));
      this.props.navigation.navigate('Home')
    })
  }

  componentDidMount() {
    let getItem = async () => {
      let currentUser = await AsyncStorage.getItem('@MyApp_user'), now = new Date().getTime();
      currentUser = JSON.parse(currentUser ? currentUser : "{}");
      if (currentUser.token) {
        if (parseInt(currentUser.userTime) < parseInt(now)) {
          await AsyncStorage.clear();
          this.setNewState("settoken", 1);
          OpenToast("您的登录已过期，请重新登录...");
        } else {
          let { username, password } = currentUser;
          this.setNewState("settoken", currentUser.token);
          this.setState({
            username, 
            password
          }, () => {
            this.login()
          })
        }
      } else {
      }
    }

    getItem();



  }



  render() {
    let { username, password, see } = this.state, { navigation, index: { token } } = this.props;
    let textfieldprops = {
      floatingPlaceholder: true,
      floatOnFocus: true,
      underlineColor: "#999",
      floatingPlaceholderColor: {
        default: 'black',
        error: 'red',
        focus: 'black',
        disabled: 'grey'
      }
    }, user = {
      ...textfieldprops,
      enableErrors: username == "",
      error: "用户名为空",
      placeholder: '用户名',
      value: username,
      onChangeText: (val) => {
        this.setState({
          username: val
        })
      }
    }, pwd = {
      ...textfieldprops,
      rightButtonProps: {
        iconSource: see ? require("../../assets/nosee.png") : require("../../assets/see.png"),
        iconColor: colors.primaryColor,
        onPress: () => {
          this.setState({
            see: !see
          })
        },
        style: { paddingTop: 8 },
      },
      secureTextEntry: !see,
      error: "密码为空",
      enableErrors: password == "",
      placeholder: '密码',
      value: password,
      onChangeText: (val) => {
        this.setState({
          password: val
        })
      }
    }, avatar = {
      title: 'Smaller size, Badge ("offline")',
      size: 100,
      imageSource: require("../../assets/logo.png")
    }



    return <SafeAreaViewPlus style={{ backgroundColor: "#fff", flex: 1 }}>
      {
        token === 1 ?
          <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={{ height: 200 }} paddingT-32 paddingB-24>
              <View flex center>
                <Avatar {...avatar}></Avatar>
                <Text style={{ fontSize: 28 }}>欢迎使用</Text>
              </View>
            </View>
            <View flex-1>
              <View padding-44 paddingT-0>
                <TextField {...user} style={{ color: "#000" }}></TextField>
                <View style={{ height: username == "" ? 0 : 19 }}></View>
                <TextField marginT-8 {...pwd} style={{ color: "#000" }}></TextField>
                <Button marginT-32 size={"large"} bg-primaryColor square onPress={() => {
                  this.login()
                }}>
                  <View padding-6>
                    <Text style={{ color: "#fff", fontSize: 16 }}>登录</Text>
                  </View>
                </Button>
              </View>
            </View>
            <View style={{ height: 130 }}>
              <ImageBackground source={require('../../assets/login_0.png')} style={{ width: "100%", height: 130 }}></ImageBackground>
            </View>
          </KeyboardAwareScrollView> :
          <View flex center paddingB-88>
            <Avatar {...avatar}></Avatar>
            <Text style={{ fontSize: 28 }}>欢迎使用</Text>
          </View>
      }


    </SafeAreaViewPlus>


  }
}

export default Login