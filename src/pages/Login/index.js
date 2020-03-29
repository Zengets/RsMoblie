import { ImageBackground,Animated } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OneToast } from '../../components';
import { Button, TextField, Text, View, Avatar } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginChild from './LoginChild'
import FogotChild from './FogotChild'
import { colors } from '../../utils';

class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state={
    ispage:true,
  }




  render() {
    let { navigation } = this.props;
    let avatar = {
      title: 'Smaller size, Badge ("offline")',
      size: 100,
      source: require("../../assets/logo.png")
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
                  this.state.ispage?<LoginChild navigation={navigation}></LoginChild>: <FogotChild navigation={navigation} tologin={()=>{
                    this.setState({
                      ispage:true
                    })
                  }}></FogotChild>
                }  
                <View right marginT-12>
                  <Text style={{color:this.state.ispage?"#999":colors.primaryColor}} onPress={() => {
                    this.setState({
                      ispage:!this.state.ispage
                    })
                  }}>{
                    this.state.ispage?"忘记密码？":"立即登录"
                  }</Text>
                </View>
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