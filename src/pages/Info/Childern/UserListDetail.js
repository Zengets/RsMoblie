import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, ActionSheet, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, DeviceItem, Empty,Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, ConvertPinyin } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
  index,
  submitting: loading.effects['index/userlistdetail'],
}))
class UserListDetail extends React.Component {

  state = {
    selectedIndex: 0,
    showHint: false
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
    this.setNewState("userlistdetail", {
      id: this.props.navigation.state.params.id
    })
  }

  linking(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        OneToast("您未安装邮箱APP,请安装后重试...")
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {

    let { index, navigation, submitting } = this.props, { showHint } = this.state,
      { userName, gender, jobNum, jobTitle, accountName, telephone, groupName, shiftName, mailNo, id,
        departmentName, shopName, parentName, academicCareer, university, major, check, maintain, verification, repair } = index.userlistdetail;
    check = check ? check : [];
    maintain = maintain ? maintain : [];
    verification = verification ? verification : [];
    repair = repair ? repair : [];

    let avatarprops = {
      title: 'Custom Background',
      label: userName ? ConvertPinyin(userName).substring(0, 1).toUpperCase() : "",
      labelColor: Colors.white,
      backgroundColor: "#ddd",
      size: 80
    }, arr = [check.length, maintain.length, verification.length, repair.length];

    return <SafeAreaViewPlus loading={submitting}>
      <Header title={`用户详情`} navigation={navigation}
        headerRight={() => (
          <Card center containerStyle={{ backgroundColor: "transparent", height: "100%" }} enableShadow={false} onPress={() => this.setState({ showHint: !showHint })}>
            <AntdIcons name="ellipsis1" size={22} style={{ color: "#000" }} />
          </Card>

        )}
      >
      </Header>
      <ActionSheet
        useSafeArea={true}
        useNativeIOS={true}
        containerStyle={{ borderRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}
        options={[
          {
            label: '查看负责的备件', onPress: () => {
              navigation.navigate("UserMore", { id: id,title:`${userName}负责的备件`,posturl:"getuserspare",key:"warnNoticeUserId" })
            }
          },
          {
            label: '查看设备日志', onPress: () => {
              //navigation.navigate("DeviceUser", { id: id })
            }
          },
          {
            label: '取消', onPress: () => {
              this.setState({ showHint: false })
            }
          },
        ]}
        visible={showHint}
        onDismiss={() => this.setState({ showHint: false })}
      />
      <ScrollView  keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ref={(scrollview) => this.scrollview = scrollview}
      >
        <View padding-12 paddingT-0>
          <View style={{ overflow: "hidden" }} row={false} spread left>
            <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
              <View style={styles.item}>
                <View center paddingT-page paddingB-12>
                  <Avatar {...avatarprops}></Avatar>
                  <Text heading marginT-12>
                    {userName}
                  </Text>
                  <Text body>
                    职位:
                    {jobTitle ? jobTitle : "未填写"}
                  </Text>
                </View>
                <View row center padding-page paddingT-0>
                  <Card center style={{ width: 48, height: 48, backgroundColor: telephone ? colors.primaryColor : "#ddd" }} borderRadius={500} enableShadow={false} onPress={() => {
                    if (!telephone) {
                      OneToast("该用户未填写手机号")
                      return
                    }
                    this.linking(`tel:${telephone}`)
                  }}>
                    <Ionicons name='md-call' size={20} style={{ color: "#fff" }}></Ionicons>
                  </Card>
                  <View style={{ width: 1, height: 22, backgroundColor: "#f0f0f0" }} marginL-40 marginR-40></View>
                  <Card center style={{ width: 48, height: 48, backgroundColor: mailNo ? colors.errorColor : "#ddd" }} borderRadius={500} enableShadow={false} onPress={() => {
                    if (!mailNo) {
                      OneToast("该用户未填写邮箱")
                      return
                    }
                    this.linking(`mailto:${mailNo}`)
                  }}>
                    <Ionicons name='md-mail' size={20} style={{ color: "#fff" }}></Ionicons>
                  </Card>
                </View>
              </View>
              <Rows name="性别" values= {gender == "1" ? "男" : "女"} />
              <Rows name="用户名" values={ accountName } />
              <Rows name="工号" values={ jobNum } />
              <Rows name="部门" values={ departmentName } />
              <Rows name="车间" values={ shopName } />
              <Rows name="分组" values={ groupName } />
              <Rows name="班次" values={ shiftName } />
              <Rows name="直属领导" values={ parentName } />
              <Rows name="学历" values={ academicCareer } />
              <Rows name="毕业院校" values={ university } />
              <Rows name="专业" values={ major } noborder={true}/>
            </Card>
            {
              check.length == 0 && maintain.length == 0 && verification.length == 0 && repair.length == 0 ?
                <Text marginV-12>
                  暂无负责的设备...
                </Text> :
                <View style={{ width: "100%" }}>
                  <Text marginV-12 body>所负责的设备</Text>
                  <TabBar
                    selectedIndex={this.state.selectedIndex}
                    onChangeIndex={index => {
                      this.scrollview.scrollTo({ x: 0, y: 720, animated: true }, 1)
                      this.setState({ selectedIndex: index })
                    }}
                    style={styles.tabbar}
                    enableShadow={false}
                    indicatorStyle={{ borderBottomWidth: 2, borderColor: colors.primaryColor }}>
                    <TabBar.Item
                      label={`维修(${repair.length})`}
                      labelStyle={{ textTransform: 'capitalize' }}
                      selectedLabelStyle={{
                        color: colors.primaryColor
                      }}
                    />
                    <TabBar.Item selectedLabelColor={colors.primaryColor}
                      label={`验证(${verification.length})`}
                      labelStyle={{ textTransform: 'capitalize' }}
                      selectedLabelStyle={{
                        color: colors.primaryColor
                      }}
                    />
                    <TabBar.Item selectedLabelColor={colors.primaryColor}
                      label={`点检(${check.length})`}
                      labelStyle={{ textTransform: 'capitalize' }}
                      selectedLabelStyle={{
                        color: colors.primaryColor
                      }}
                    />
                    <TabBar.Item selectedLabelColor={colors.primaryColor}
                      label={`保养(${maintain.length})`}
                      labelStyle={{ textTransform: 'capitalize' }}
                      selectedLabelStyle={{
                        color: colors.primaryColor
                      }}
                    />
                  </TabBar>
                  <View style={[styles.inter, { height: 77 * Math.max(...arr), minHeight: height }]} >

                    {
                      this.state.selectedIndex == 0 ? repair.length > 0 ? repair.map((item, i) => (
                        <DeviceItem key={i} navigation={this.props.navigation} item={item}></DeviceItem>
                      )) : <Empty /> : null
                    }
                    {
                      this.state.selectedIndex == 1 ? verification.length > 0 ? verification.map((item, i) => (
                        <DeviceItem key={i} navigation={this.props.navigation} item={item}></DeviceItem>
                      )) : <Empty /> : null
                    }
                    {
                      this.state.selectedIndex == 2 ? check.length > 0 ? check.map((item, i) => (
                        <DeviceItem key={i} navigation={this.props.navigation} item={item}></DeviceItem>
                      )) : <Empty /> : null
                    }
                    {
                      this.state.selectedIndex == 3 ? maintain.length > 0 ? maintain.map((item, i) => (
                        <DeviceItem key={i} navigation={this.props.navigation} item={item}></DeviceItem>
                      )) : <Empty /> : null
                    }

                  </View>
                </View>

            }




          </View>
        </View>

      </ScrollView>




    </SafeAreaViewPlus>

  }
}

const styles = StyleSheet.create({
  inter: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#ffffff",
    overflow: "hidden"
  },
  tabbar: {
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  item: {
    borderColor: "#f0f0f0",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
  items: {
    borderColor: "#f0f0f0",
    borderBottomWidth: 0,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
})


export default UserListDetail