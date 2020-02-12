import { ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OpenToast } from '../../components';
import { Button, TextField, Text, View, Avatar } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props)
    this.state = {
      username: undefined,
      password: undefined,
      see: false
    }
  }
  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then((res) => {
      if(!res){
        return
      }
      fn?fn():null
    })
  }



  render() {
    let { username, password, see } = this.state,{navigation} = this.props;
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
        onPress: () => {
          this.setState({
            see: !see
          })
        },
        style: { paddingTop: 8 },
      },
      secureTextEntry: !see,
      error: "用户名为空",
      enableErrors: false,
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
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Button marginT-32 size={"large"} backgroundColor={"#468fff"} onPress={()=>{
              this.setNewState("login",{
                username,
                password
              },()=>{
                navigation.navigate('Home')
              })
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
      </KeyboardAwareScrollView>

    </SafeAreaViewPlus>


  }
}

export default Login