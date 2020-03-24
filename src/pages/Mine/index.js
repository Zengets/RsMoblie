import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Colors } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dimensions, ScrollView, Alert, StyleSheet } from 'react-native';
import { colors, getItem } from '../../utils';

let { height, width } = Dimensions.get('window');
let styles = StyleSheet.create({
  mainitem: { width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" },

})


@connect(({ index }) => ({ index }))
class Mine extends React.Component {

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
    //this.setNewState("test", null)
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }
  render() {
    const { index: { userInfo }, navigation } = this.props, cardwidth = (width - 48) / 3, roundwidth = (width - 125) / 4;

    return <SafeAreaViewPlus>
      <Header
        title="我的"
        headerLeft={() => {
          return <AntIcons name={'menuunfold'} size={20} style={{ color: "#666" }} onPress={() => {
            navigation.openDrawer()
          }}></AntIcons>
        }}
        headerRight={() => {
          return <Ionicons name={'ios-qr-scanner'} size={22} onPress={() => {
            this.jumpToUrl("Scan")
          }}></Ionicons>
        }}
      />
      <Card row padding-12 margin-12 center enableShadow={false}>
        <Text subheading style={{ color: Colors.dark20 }}>我的全部待办:</Text>
        <Text subheading style={{ color: colors.warnColor }}>10个  </Text>
        <AntIcons name="right" style={{ color: Colors.dark20 }}></AntIcons>
      </Card>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 12 }}>
        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>任务通知 </Text>
            <EntypoIcons name='bell' size={16} style={{ color: Colors.dark20 }}></EntypoIcons>
          </View>

          <View row style={styles.mainitem}>
            {/* <AuthBase>
            
          </AuthBase> */}
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeTodo")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>
              </View>
              <Text subbody>未完成任务</Text>
            </Card>


            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeToConfirm")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>
              </View>
              <Text subbody>未审核</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeFinished")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View>
          <Card row enableShadow={false} spread style={{ alignItems: "center", backgroundColor: "transparent" }} marginB-12 marginT-6
            onPress={() => {
              this.jumpToUrl("Publish")
            }}
          >
            <View row style={{ alignItems: "center" }}>
              <Text subheading style={{ color: Colors.dark20 }}>我的发布 </Text>
              <FontAwesome name='file' size={14} style={{ color: Colors.dark20 }}></FontAwesome>
            </View>
            <View row center padding-6 style={{ backgroundColor: Colors.green10, borderRadius: 4 }}>
              <AntIcons name='edit' size={16} style={{ color: Colors.white }}></AntIcons>
              <Text white> 发布</Text>
            </View>
          </Card>


          <View row style={styles.mainitem}>
            {/* <AuthBase>
            
          </AuthBase> */}
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("PublishTodo")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>
              </View>
              <Text subbody>未完成任务</Text>
            </Card>


            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("PublishToConfirm")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>
              </View>
              <Text subbody>审核</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("PublishFinished")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>

        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的维修 </Text>
            <FontAwesome5 name='tools' size={16} style={{ color: Colors.dark20 }}></FontAwesome5>
          </View>

          <View row style={styles.mainitem}>
            {/* <AuthBase>
            
          </AuthBase> */}


            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("ToRepair", { key: "currentUserId", value: userInfo.id, title: "我的维修(未完成)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>
              </View>
              <Text subbody>未完成维修</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("Repaired", { key: "isCurrentUser", value: 1, title: "我的维修(已完成)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的维保 </Text>
            <FontAwesome5 name='toolbox' size={16} style={{ color: Colors.dark20 }}></FontAwesome5>
          </View>
          <View row style={styles.mainitem}>
            {/* <AuthBase>
            
          </AuthBase> */}
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("UpkeepMission", { key: "userId", value: userInfo.id, title: "我的维保(未完成)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>
              </View>
              <Text subbody>未完成维保</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("UpkeepHistory", { key: "userId", value: userInfo.id, title: "我的维保(已完成)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>

        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的点检 </Text>
            <MaterialCommunityIcons name='file-check' size={18} style={{ color: Colors.dark20 }}></MaterialCommunityIcons>
          </View>
          <View row style={styles.mainitem}>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("CheckHistory", { key: "userId", value: userInfo.id, title: "我的点检(已完成)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("CheckError", { key: "userId", value: userInfo.id, title: "我的点检(异常处理)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <MaterialIcons name='error' size={33} style={{ color: colors.errorColor }}></MaterialIcons>
              </View>
              <Text subbody>异常处理</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View marginB-12>

          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的备件 </Text>
            <Ionicons name='ios-settings' size={18} style={{ color: Colors.dark20 }}></Ionicons>
          </View>
          <View row style={styles.mainitem}>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("SpareReview", { key: "applyUserId", value: userInfo.id, title: "我的备件(申请/回冲记录)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <MaterialCommunityIcons name='file-move' size={33} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
              </View>
              <Text subbody>申请/回冲记录</Text>
            </Card>

            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("SpareReview", { key: "currentUserAudit", value: 1, title: "我的备件(审批)" })
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <MaterialCommunityIcons name='file-move' size={33} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
              </View>
              <Text subbody>审批</Text>
            </Card>

            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("SpareLog")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='filetext1' size={26} style={{ color: colors.thirdColor }}></AntIcons>
              </View>
              <Text subbody>出入库记录</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("SpareOwner")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <FontAwesome5 name='user-cog' size={25} style={{ color: colors.thirdColor }}></FontAwesome5>
              </View>
              <Text subbody>持有总览</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("SpareChangeMisson")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <EntypoIcons name='retweet' size={33} style={{ color: colors.thirdColor }}></EntypoIcons>
              </View>
              <Text subbody>更换任务</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("SpareChangeHistory")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <FontAwesome5 name='history' size={26} style={{ color: colors.thirdColor }}></FontAwesome5>
              </View>
              <Text subbody>更换历史</Text>
            </Card>



          </View>

        </View>

      </ScrollView>





    </SafeAreaViewPlus>

  }
}

export default Mine