import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, Colors } from 'react-native-ui-lib';
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

let { height, width } = Dimensions.get('window'), cardwidth = (width - 48) / 3, roundwidth = (width - 125) / 4;
let styles = StyleSheet.create({
  mainitem: {
    width: width,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflow: "visible"
  },

})

class CardItem extends React.Component {

  render() {
    let { pressfn, label, title, Icon } = this.props;
    return <Card width={cardwidth} style={{ position: "relative" }} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
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
      <Text subbody>{title} {label}</Text>
    </Card>
  }


}



@connect(({ index, loading }) => ({ index, loading }))
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
    this.setNewState("minenum")
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }



  render() {
    const { index: { userInfo, minenum }, navigation, loading } = this.props;
    let { executeToDo, executeToAudit, executeFinish, assignmentToDo, assignmentToAudit, assignmentFinish,
      repairToDo, repairFinish, maintainToDoList, maintainFinishList, pointCheckExceptionToDo,pointCheckExceptionFinish, pointCheckFinish, spareApply, spareAudit, userSpare, spareReplaceToDo, spareReplaceFinish, allTaskToDo

    } = minenum ? minenum : { executeToDo: "", executeToAudit: "", executeFinish: "", assignmentToDo: "", assignmentToAudit: "", assignmentFinish: "", repairToDo: "", repairFinish: "", maintainToDoList: "", maintainFinishList: "", pointCheckExceptionToDo: "",
    pointCheckExceptionFinish:"",pointCheckFinish: "", spareApply: "", spareAudit: "", userSpare: "", spareReplaceToDo: "", spareReplaceFinish: "", allTaskToDo: "" }


    return <SafeAreaViewPlus loading={loading.effects['index/minenum']}>
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
      <Card row padding-12 margin-12 center enableShadow={false} onPress={() => {
        this.jumpToUrl("OverView")
      }}>
        <Text subheading style={{ color: Colors.dark20 }}>我的全部待办: </Text>
        <Text subheading style={{ color: colors.warnColor }}>{allTaskToDo}个  </Text>
        <AntIcons name="right" style={{ color: Colors.dark20 }}></AntIcons>
      </Card>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 12, paddingRight: 0 }}>
        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>任务通知 </Text>
            <EntypoIcons name='bell' size={16} style={{ color: Colors.dark20 }}></EntypoIcons>
          </View>

          <View row style={styles.mainitem}>
            {/* <AuthBase>
            
          </AuthBase> */}
            <CardItem pressfn={() => {
              this.jumpToUrl("NoticeTodo")
            }}
              label={executeToDo}
              Icon={<Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>}
              title={"未完成任务"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("NoticeToConfirm")
            }}
              label={executeToAudit}
              Icon={<FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>}
              title={"未审核"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("NoticeFinished")
            }}
              label={executeFinish}
              Icon={<AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>}
              title={"已完成"}
            ></CardItem>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View>
          <Card row enableShadow={false} paddingR-12 spread style={{ alignItems: "center", backgroundColor: "transparent" }} marginB-12 marginT-6
            onPress={() => {
              this.jumpToUrl("Publish")
            }}
          >
            <View row style={{ alignItems: "center" }}>
              <Text subheading style={{ color: Colors.dark20 }}>我的发布 </Text>
              <FontAwesome name='file' size={14} style={{ color: Colors.dark20 }}></FontAwesome>
            </View>
            <View row center paddingV-6>
              <AntIcons name='edit' size={16} style={{ color: colors.primaryColor }}></AntIcons>
              <Text style={{ color: colors.primaryColor }}> 发布</Text>
            </View>
          </Card>

          <View row style={styles.mainitem}>
            <CardItem pressfn={() => {
              this.jumpToUrl("PublishTodo")
            }}
              label={assignmentToDo}
              Icon={<Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>}
              title={"未完成任务"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("PublishToConfirm")
            }}
              label={assignmentToAudit}
              Icon={<FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>}
              title={"审核"}
            ></CardItem>
            <CardItem pressfn={() => {
              this.jumpToUrl("PublishFinished")
            }}
              label={assignmentFinish}
              Icon={<AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>}
              title={"已完成"}
            ></CardItem>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>

        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的维修 </Text>
            <FontAwesome5 name='tools' size={16} style={{ color: Colors.dark20 }}></FontAwesome5>
          </View>

          <View row style={styles.mainitem}>
            <CardItem pressfn={() => {
              this.jumpToUrl("ToRepair", { key: "currentUserId", value: userInfo.id, title: "我的维修(未完成)" })
            }}
              label={repairToDo}
              Icon={<Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>}
              title={"未完成维修"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("Repaired", { key: "isCurrentUser", value: 1, title: "我的维修(已完成)" })
            }}
              label={repairFinish}
              Icon={<AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>}
              title={"已完成"}
            ></CardItem>

          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的维保 </Text>
            <FontAwesome5 name='toolbox' size={16} style={{ color: Colors.dark20 }}></FontAwesome5>
          </View>
          <View row style={styles.mainitem}>
            <CardItem pressfn={() => {
              this.jumpToUrl("UpkeepMission", { key: "userId", value: userInfo.id, title: "我的维保(未完成)" })
            }}
              label={maintainToDoList}
              Icon={<Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>}
              title={"未完成维保"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("UpkeepHistory", { key: "userId", value: userInfo.id, title: "我的维保(已完成)" })
            }}
              label={maintainFinishList}
              Icon={<AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>}
              title={"已完成"}
            ></CardItem>

          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>

        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的点检 </Text>
            <MaterialCommunityIcons name='file-check' size={18} style={{ color: Colors.dark20 }}></MaterialCommunityIcons>
          </View>
          <View row style={styles.mainitem}>

            <CardItem pressfn={() => {
              this.jumpToUrl("CheckHistory", { key: "userId", value: userInfo.id, title: "我的点检(已完成)" })
            }}
              label={pointCheckFinish}
              Icon={<AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>}
              title={"已完成"}
            ></CardItem>
            <CardItem pressfn={() => {
              this.jumpToUrl("CheckError", { key: "userId", value: userInfo.id, title: "我的点检(异常待处理)",status:"1" })
            }}
              label={pointCheckExceptionToDo}
              Icon={<MaterialIcons name='error' size={33} style={{ color: colors.errorColor }}></MaterialIcons>}
              title={"异常待处理"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("CheckError", { key: "userId", value: userInfo.id, title: "我的点检(异常已处理)",status:"2" })
            }}
              label={pointCheckExceptionFinish}
              Icon={<MaterialCommunityIcons name='shield-check' size={33} style={{ color: colors.successColor }}></MaterialCommunityIcons>}
              title={"异常已处理"}
            ></CardItem>


          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View marginB-12>

          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>我的备件 </Text>
            <Ionicons name='ios-settings' size={18} style={{ color: Colors.dark20 }}></Ionicons>
          </View>
          <View row style={styles.mainitem}>
            <CardItem pressfn={() => {
              this.jumpToUrl("SpareReview", { key: "applyUserId", value: userInfo.id, title: "我的备件(申请记录)" })
            }}
              label={spareApply}
              Icon={<MaterialCommunityIcons name='file-move' size={33} style={{ color: "#999" }}></MaterialCommunityIcons>}
              title={"申请记录"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("SpareReview", { key: "currentUserAudit", value: 1, title: "我的备件(审批)" })
            }}
              label={spareAudit}
              Icon={<FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>}
              title={"审批"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("SpareMine")
            }}
              label={userSpare}
              Icon={<FontAwesome5 name='user-cog' size={25} style={{ color: "#999" }}></FontAwesome5>}
              title={"我的备件"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("SpareChangeMisson", { key: "planMaintainUserId", value: userInfo.id, title: "我的备件(更换任务)" })
            }}
              label={spareReplaceToDo}
              Icon={<EntypoIcons name='retweet' size={33} style={{ color: colors.primaryColor }}></EntypoIcons>}
              title={"更换任务"}
            ></CardItem>

            <CardItem pressfn={() => {
              this.jumpToUrl("SpareChangeHistory", { key: "planMaintainUserId", value: userInfo.id, title: "我的备件(更换历史)" })
            }}
              label={spareReplaceFinish}
              Icon={<FontAwesome5 name='history' size={26} style={{ color: "#999" }}></FontAwesome5>}
              title={"更换历史"}
            ></CardItem>




          </View>

        </View>

      </ScrollView>





    </SafeAreaViewPlus>

  }
}

export default Mine