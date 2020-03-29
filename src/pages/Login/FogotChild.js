import { ImageBackground, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaViewPlus, OneToast } from '../../components';
import { Button, TextField, Text, View, Avatar,Colors } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';

@connect(({ index, loading }) => ({ index, loading }))
class FogotChild extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      qrcode: null,
      see: false,
      id: null,
      count: 0,
      step: 1
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


  componentDidMount() {


  }

  onGetCaptcha = () => {
    let { count } = this.state;
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count < 1) {
        clearInterval(this.interval);
      }
    }, 1000);
  };


  render() {
    let { username, password, qrcode, see, count, id, step } = this.state, { index: { res }, loading,tologin } = this.props;
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
    }, qr = {
      ...textfieldprops,
      enableErrors: qrcode == "",
      error: "验证码为空",
      placeholder: '验证码',
      value: qrcode,
      onChangeText: (val) => {
        this.setState({
          qrcode: val
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
      placeholder: '新密码',
      value: password,
      onChangeText: (val) => {
        this.setState({
          password: val
        })
      }
    }


    return <View>
      {
        step == 1 ? <View>
          <TextField {...user} style={{ color: "#000" }}></TextField>
          <View row style={{ width: "100%" }} bottom marginT-page>
            <View flex-1>
              <TextField {...qr} style={{ color: "#000", flex: 1 }}></TextField>
            </View>
            <Button label={id ? count : "获取验证码"} disabled={count !== 0} marginH-8 marginR-0 width={100} height={30} onPress={() => {
              this.setNewState("getcode", {
                "accountName": username,
                "sendType": "1"
              }, () => {
                let { index: { res } } = this.props;
                this.setState({
                  id: res.id,
                  count: 60 * 5 - 1
                }, () => {
                  this.onGetCaptcha()
                })
              })
            }}>
              {
                loading.effects[`index/getcode`] ?
                  <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                  : null
              }

            </Button>
          </View>
        </View> : <View>
            <TextField {...pwd} style={{ color: "#000" }}></TextField>

          </View>
      }



      <Button label={step == 1?"下一步":"修改密码"} disabled={loading.effects[`index/reparePassword`]} marginT-32 size={"large"} bg-primaryColor square onPress={() => {
        if (step == 1) {
          this.setNewState("verycode", {
            id,
            code: qrcode
          }, () => {
            let { index: { verycode } } = this.props;
            if (verycode.result == "1") {
              this.setState({
                step: 2
              })
            } else {
              OneToast("验证码错误或已失效")
            }
          })
        } else {
          this.setNewState("reparePassword", {
            id,
            newPassword: password
          }, () => {
            OneToast("密码修改成功",Colors.green10,null,()=>{
              tologin? tologin():null
            })
          })
        }
      }}>
        {
          loading.effects[`index/reparePassword`] ?
            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
            : null
        }
      </Button>
    </View>

  }
}

export default FogotChild