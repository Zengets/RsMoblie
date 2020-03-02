import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, AuthBase, Header } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';

function getItem(mainname, name, data) {
  let curitem = {}, thisitem = {};
  data.map((item, i) => {
    if (item.name == mainname) {
      curitem = item
    }
  })
  if (curitem.routes) {
    curitem.routes.map((item) => {
      if (item.name == name) {
        thisitem = item
      }
    })
  }

  return thisitem
}


@connect(({ index }) => ({ index }))
class Info extends React.Component {

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
    this.setNewState("test", null)
  }
  componentWillUnmount() {
    // 在页面消失的时候，取消监听
    this.setNewState("formdata", [])
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }

  render() {
    const { index, navigation } = this.props;
    console.log(getItem("message", "equipment",index.userAccount))




    return <SafeAreaViewPlus>
       <Header
        title="信息"
        headerLeft={() => {
          return <AntIcons name={'menuunfold'} size={20} style={{ color: "#666", paddingLeft: 20 }} onPress={() => {
            navigation.openDrawer()
          }}></AntIcons>
        }}
        headerRight={() => {
          return <Ionicons name={'ios-qr-scanner'} size={22} onPress={() => {
            navigation.navigate("Scan")
          }}></Ionicons>
        }}
      />
      <View flex padding-page>
        <Text heading marginB-s4>Info</Text>
        <Card height={ 100 } center padding-card marginB-s4>
          <Text body>This is an Info card { index.count }</Text>
        </Card>
        <AuthBase item={ getItem("message", "equipment",index.userAccount) }>
          <Button label="设备列表" body bg-primaryColor square onPress={ () => {
            this.jumpToUrl("InfoDevice")
          } }></Button>
        </AuthBase>

        <AuthBase item={ getItem("message", "user",index.userAccount) }>
          <Button label="用户列表" marginT-24 body bg-primaryColor square onPress={ () => {
            this.jumpToUrl("UserList");
          } }></Button>
        </AuthBase>

        <AuthBase item={ getItem("message", "equipuser",index.userAccount) }>
          <Button label="设备负责人" marginT-24 body bg-primaryColor square onPress={ () => {
            this.jumpToUrl("DeviceUserList");
          } }></Button>
        </AuthBase>

        <AuthBase item={ getItem("message", "spare",index.userAccount) }>
          <Button label="备件列表" marginT-24 body bg-primaryColor square onPress={ () => {
            this.jumpToUrl("InfoSpare");
          } }></Button>
        </AuthBase>

        <AuthBase item={ getItem("message", "deaprtment",index.userAccount) }>
          <Button label="部门列表" marginT-24 body bg-primaryColor square onPress={ () => {
            this.jumpToUrl("DepartMent");
          } }></Button>
        </AuthBase>

        <AuthBase item={ getItem("message", "shop",index.userAccount) }>
          <Button label="车间分组" marginT-24 body bg-primaryColor square onPress={ () => {
            this.jumpToUrl("DepartMent", { posturl: "shopgrouplist", title: "车间分组", can: "0" });
          } }></Button>
        </AuthBase>

      </View>
    </SafeAreaViewPlus>

  }
}

export default Info