import { ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OneToast } from '../../components';
import { Button, TextField, Text, View, Avatar } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({ index, loading }))
class LoginChild extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
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
      this.props.navigation.navigate('Main')
    })
  }

  componentWillReceiveProps(np) {
    if (this.props.reload !== np.reload && np.reload == "yes") {
      this.getItem()
    }
  }

  getItem = async () => {
    let currentUser = await AsyncStorage.getItem('@MyApp_user'), now = new Date().getTime();
    currentUser = JSON.parse(currentUser ? currentUser : "{}");
    console.log(currentUser)
    if (currentUser.token) {
      if (parseInt(currentUser.userTime) < parseInt(now)) {
        await AsyncStorage.clear();
        this.setNewState("settoken", 1);
        OneToast("您的登录已过期，请重新登录...");
        let { username, password } = this.props.index.userInfo;
        this.setState({
          username,
          password
        })
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
      let { username, password } = this.props.index.userInfo;
      this.setNewState("settoken", 1);
      OneToast("您的登录已过期，请重新登录...");
      this.setState({
        username,
        password: null
      })
    }
  }

  componentDidMount() {
    this.getItem();
  }



  render() {
    let { username, password, see } = this.state, { navigation, index: { token }, loading } = this.props;
    let textfieldprops = {
      floatingPlaceholder: true,
      floatOnFocus: true,
      underlineColor: "#999",
      floatingPlaceholderColor: {
        default: 'black',
        error: 'black',
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
        iconColor: "#666",
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
      source: require("../../assets/logo.png")
    }



    return <View>
      {
        token == 1 ?
          <View>
            <TextField {...user} style={{ color: "#000" }}></TextField>
            <View style={{ height: username == "" ? 0 : 19 }}></View>
            <TextField marginT-8 {...pwd} style={{ color: "#000" }}></TextField>
            <Button label="登录" disabled={loading.effects[`index/login`]} marginT-32 size={"large"} bg-primaryColor square onPress={() => {
              this.login()
            }}>
              {
                loading.effects[`index/login`] ?
                  <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                  : null
              }
            </Button>
          </View>
          : <View height={height}></View>
      }
    </View>

  }
}

export default LoginChild