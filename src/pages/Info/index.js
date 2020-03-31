import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, AuthBase, Header } from '../../components';
import { getItem, getItems, colors } from '../../utils'
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
let { height, width } = Dimensions.get('window'), cardwidth = (width - 48) / 3;

class CardItem extends React.Component {
  render() {
    let { pressfn, title, Icon, getItems } = this.props;
    return <AuthBase item={getItems ? getItems : {}}>
      <Card width={cardwidth} style={{ position: "relative" }} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
        pressfn ? pressfn() : null
      }}>
        {
          false ? <Badge
            size={"small"}
            containerStyle={{ position: "absolute", right: -4, top: -4 }}
            backgroundColor={Colors.red30}
          /> : null
        }
        <View center style={{ width: 48, height: 48 }} paddingB-8>
          {Icon ? Icon : null}
        </View>
        <Text style={{ fontSize: 13 }} dark10>{title}</Text>
      </Card>
    </AuthBase>
  }


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

    return <SafeAreaViewPlus>
      <Header
        title="信息"
        headerLeft={() => {
          return <AntIcons name={'menuunfold'} size={20} style={{ color: "#666" }} onPress={() => {
            navigation.openDrawer()
          }}></AntIcons>
        }}
        headerRight={() => {
          return <Ionicons name={'ios-qr-scanner'} size={22} onPress={() => {
            navigation.navigate("Scan")
          }}></Ionicons>
        }}
      />
      <View padding-12>
        <Text heading marginB-s5 marginT-10><Text primaryColor>|</Text> 信息模块</Text>
        <Card height={100} marginB-s4 center padding-card enableShadow={false}>
          <Text body>用于展示平台基本信息</Text>
        </Card>
        <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>
          <CardItem pressfn={() => {
            this.jumpToUrl("InfoDevice")
          }}
            getItems={
              getItem("message", "equipmentList", index.userAccount)
            }
            Icon={<MaterialIcons name='devices' size={25} style={{ color: colors.primaryColor }}></MaterialIcons>}
            title={"设备列表"}
          >
          </CardItem>

          <CardItem pressfn={() => {
            this.jumpToUrl("UserList")
          }}
            getItems={
              getItem("message", "userList", index.userAccount)
            }
            Icon={<Feather name='users' size={25} style={{ color: colors.primaryColor }}></Feather>}
            title={"用户列表"}
          >
          </CardItem>

          <CardItem pressfn={() => {
            this.jumpToUrl("DeviceUserList")
          }}
            getItems={
              getItem("message", "equipuserList", index.userAccount)
            }
            Icon={<AntIcons name='user' size={25} style={{ color: colors.primaryColor }}></AntIcons>}
            title={"设备负责人"}
          >
          </CardItem>

          <CardItem pressfn={() => {
            this.jumpToUrl("InfoSpare")
          }}
            getItems={
              getItem("message", "spareList", index.userAccount)
            }
            Icon={<FontAwesome name='hdd-o' size={25} style={{ color: colors.primaryColor }}></FontAwesome>}
            title={"备件列表"}
          >
          </CardItem>

          <CardItem pressfn={() => {
            this.jumpToUrl("DepartMent")
          }}
            getItems={
              getItem("message", "deaprtmentList", index.userAccount)
            }
            Icon={<Feather name='codepen' size={25} style={{ color: colors.primaryColor }}></Feather>}
            title={"部门列表"}
          >
          </CardItem>

          <CardItem pressfn={() => {
            this.jumpToUrl("DepartMent", { posturl: "shopgrouplist", title: "车间分组", can: "0" });
          }}
            getItems={
              getItem("message", "shopList", index.userAccount)
            }
            Icon={<Feather name='box' size={25} style={{ color: colors.primaryColor }}></Feather>}
            title={"车间分组"}
          >
          </CardItem>

        </View>






      </View>
    </SafeAreaViewPlus >

  }
}

export default Info