import { ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OpenToast } from '../../components';
import { Button, TextField, Text, View,Avatar } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props){
    super(props)
    this.state={
      username:undefined,
      password:undefined,
      see:false
    }
  }




  render() {
    let {username,password,see} = this.state;
    let textfieldprops = {
      floatingPlaceholder: true,
      floatOnFocus: true,
      floatingPlaceholderColor:{
        default: 'black', 
        error: 'red', 
        focus: 'black', 
        disabled: 'grey'
      }
    }, user = {
      ...textfieldprops,
      enableErrors:username=="",
      error:"用户名为空",
      underlineColor: "#FFF",
      placeholder: '用户名',
      value:username,
      onChangeText:(val)=>{
        this.setState({
          username:val
        })
      }
    }, pwd = {
      ...textfieldprops,
      rightButtonProps:{
        iconSource:see?require("../../assets/nosee.png"):require("../../assets/see.png"),
        onPress:()=>{
          this.setState({
            see:!see
          })
        },
        style:{paddingTop:8},
      },
      secureTextEntry:!see,
      error:"用户名为空",
      enableErrors:false,
      underlineColor: "#FFF",
      placeholder: '密码',
      value:password,
      onChangeText:(val)=>{
        this.setState({
          password:val
        })
      }
    },avatar= {
      title: 'Smaller size, Badge ("offline")',
      size: 100,
      imageSource: require("../../assets/logo.png")
    }


    return <SafeAreaViewPlus style={{ backgroundColor: "#fff" }}>
      <LinearGradient colors={["#FFFFFF",'#b7d3ff', "#448fff"]} style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{padding:24}}>
          <View paddingT-64 paddingB-64 style={{flexDirection:"row",alignItems:"center"}}>
            <Avatar {...avatar}></Avatar>
            <Text marginL-24 style={{fontSize:28}}>欢迎使用</Text>
          </View>
          
          <TextField {...user} style={{color:"#000"}}></TextField>
          <View style={{height:username==""?0:19}}></View>
          <TextField marginT-8 {...pwd} style={{color:"#000"}}></TextField>
          <Button marginT-32 size={"large"} backgroundColor={"#468fff"}>
            <View padding-6>
              <Text style={{ color: "#fff",fontSize:16 }}>登录</Text>
            </View>
          </Button>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </SafeAreaViewPlus>


  }
}

export default Login