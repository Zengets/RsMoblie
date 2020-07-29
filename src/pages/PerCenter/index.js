import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert, FlatList } from 'react-native';
import { View, Text, Card, AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Avatar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Rows } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { AsyncStorage } from 'react-native'
import { colors, ConvertPinyin } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import RNPermissions from 'react-native-permissions';

let PartItem = (props) => (
  <View>
    <ListItem
      paddingL-20
      paddingR-20
      paddingT-0
      paddingB-0
      containerStyle={{ borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}
      activeBackgroundColor={Colors.dark60}
      activeOpacity={0.3}
      height={44}
      onPress={() => {
        props.pressfn()
      }}
    >
      <ListItem.Part right paddingR-5>
        {
          props.leftIcon ?
            props.leftIcon :
            null
        }
      </ListItem.Part>
      <ListItem.Part middle>
        <Text dark10>{props.title}</Text>
      </ListItem.Part>
      <ListItem.Part right>
        <Ionicons name={'ios-arrow-forward'} size={12}></Ionicons>
      </ListItem.Part>
    </ListItem>
  </View>
)


@connect(({ index }) => ({ index }))
class PerCenter extends React.Component {
  static navigationOptions = {
    title: 'PerCenter',
  };

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

  logout() {
    this.setNewState("logout", {}, async () => {
      await AsyncStorage.clear().then(()=>{
        this.props.navigation.navigate('Login')
      });
    })
  }




  render() {
    const { index: { userInfo }, navigation } = this.props;
    let avatarprops = {
      title: 'USER',
      label: userInfo.userName ? ConvertPinyin(userInfo.userName).substring(0, 1).toUpperCase() : "",
      labelColor: Colors.white,
      backgroundColor: colors.primaryColor,
      size: 40
    }

    return <SafeAreaViewPlus>
      <ScrollView>
        <View padding-page paddingT-0>
          <View row paddingV-card style={{alignItems:"center"}}>
            <Avatar {...avatarprops}></Avatar>
            <View paddingL-12>
              <Text subheading>{userInfo.userName}</Text>
            </View>
          </View>
          <Card padding-card marginB-s4 >
            <Rows padding={0} name="性别" values={userInfo.gender == 1 ? "男" : "女"}></Rows>
            <Rows padding={0} name="联系电话" values={userInfo.telephone}></Rows>
            <Rows padding={0} name="邮箱" values={userInfo.mailNo}></Rows>
            <Rows padding={0} name="职位" values={userInfo.jobTitle}></Rows>
            <Rows padding={0} name="工号" values={userInfo.jobNum}></Rows>
            <Rows padding={0} name="部门" values={userInfo.departmentName}></Rows>
            <Rows padding={0} name="车间" values={userInfo.shopName}></Rows>
            <Rows padding={0} name="分组" values={userInfo.shiftName} noborder={true}></Rows>
          </Card>
        </View>
        <PartItem
          pressfn={() => { 
            this.props.navigation.navigate("ChangePwd")
           }}
          leftIcon={<AntdIcons name={'unlock'} size={16} style={{ marginLeft: -2 }}></AntdIcons>}
          title="修改密码"
        ></PartItem>
        <PartItem
          pressfn={() => { RNPermissions.openSettings() }}
          leftIcon={<AntdIcons name={'setting'} size={16} style={{ marginLeft: -2 }}></AntdIcons>}
          title="权限管理"
        ></PartItem>
        <PartItem
          pressfn={() => this.logout()}
          leftIcon={<AntdIcons name={'logout'} size={12}></AntdIcons>}
          title="退出登录"
        ></PartItem>


      </ScrollView>
    </SafeAreaViewPlus>

  }
}

export default PerCenter