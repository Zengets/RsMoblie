import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dimensions, ScrollView } from 'react-native';
import { colors, getItem, getItems } from '../../utils';

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
class Usage extends React.Component {

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

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }
  render() {
    const { index, navigation } = this.props, cardwidth = (width - 48) / 3;

    return <SafeAreaViewPlus>
      <Header
        title="应用"
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
      <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 12 }}>
        <AuthBase item={getItem("application", "repair", index.userAccount)}>
          <View>
            <View paddingL-8 marginB-s4 marginT-6 style={{ borderLeftWidth: 1, borderColor: colors.primaryColor, width: 48 }} height={12} center>
              <Text subheading style={{ color: colors.primaryColor }}>维修</Text>
            </View>
            <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>


              <CardItem pressfn={() => {
                this.jumpToUrl("Scan", { type: "repair" })
              }}
                getItems={
                  getItems("application", "repair", "equipRepair", index.userAccount)
                }
                Icon={<EntypoIcons name='tools' size={25} style={{ color: colors.primaryColor }}></EntypoIcons>}
                title={"报修设备"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("ToRepair")
              }}
                getItems={
                  getItems("application", "repair", "repairTask", index.userAccount)
                }
                Icon={<EntypoIcons name='clipboard' size={25} style={{ color: colors.primaryColor }}></EntypoIcons>}
                title={"维修任务"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("Repaired")
              }}
                getItems={
                  getItems("application", "repair", "repairHis", index.userAccount)
                }
                Icon={<MaterialIcons name='history' size={30} style={{ color: colors.primaryColor }}></MaterialIcons>}
                title={"维修历史"}
              >
              </CardItem>
            </View>
          </View>
          <View height={1} marginV-12 style={{ backgroundColor: colors.primaryColor, opacity: 0.2 }}></View>
        </AuthBase>

        <AuthBase item={getItem("application", "maintain", index.userAccount)}>
          <View>
            <View paddingL-8 marginB-s4 marginT-6 style={{ borderLeftWidth: 1, borderColor: colors.warnColor, width: 48 }} height={12} center>
              <Text subheading style={{ color: colors.warnColor }}>维保</Text>
            </View>
            <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>

              <CardItem pressfn={() => {
                this.jumpToUrl("UpkeepPlan")
              }}
                getItems={
                  getItems("application", "maintain", "maintainPlan", index.userAccount)
                }
                Icon={<MaterialCommunityIcons name='timer' size={30} style={{ color: colors.warnColor }}></MaterialCommunityIcons>}
                title={"维保计划"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("UpkeepMission")
              }}
                getItems={
                  getItems("application", "maintain", "maintainTask", index.userAccount)
                }
                Icon={<EntypoIcons name='clipboard' size={30} style={{ color: colors.warnColor }}></EntypoIcons>}
                title={"维保任务"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("UpkeepHistory")
              }}
                getItems={
                  getItems("application", "maintain", "maintainHis", index.userAccount)
                }
                Icon={<MaterialIcons name='history' size={30} style={{ color: colors.warnColor }}></MaterialIcons>}
                title={"维保历史"}
              >
              </CardItem>

            </View>
          </View>
          <View height={1} marginV-12 style={{ backgroundColor: colors.warnColor, opacity: 0.2 }}></View>
        </AuthBase>

        <AuthBase item={getItem("application", "check", index.userAccount)}>
          <View>
            <View paddingL-8 marginB-s4 marginT-6 style={{ borderLeftWidth: 1, borderColor: colors.secondaryColor, width: 48 }} height={12} center>
              <Text subheading style={{ color: colors.secondaryColor }}>点检</Text>
            </View>
            <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>

              <CardItem pressfn={() => {
                this.jumpToUrl("Scan", { type: "check" })
              }}
                getItems={
                  getItems("application", "check", "checkPlan", index.userAccount)
                }
                Icon={
                  <MaterialCommunityIcons name='database-check' size={30} style={{ color: colors.secondaryColor }}></MaterialCommunityIcons>
                }
                title={"点检设备"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("CheckHistory")
              }}
                getItems={
                  getItems("application", "check", "checkHis", index.userAccount)
                }
                Icon={
                  <MaterialIcons name='history' size={30} style={{ color: colors.secondaryColor }}></MaterialIcons>
                }
                title={"点检历史"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("CheckError")
              }}
                getItems={
                  getItems("application", "check", "checkException", index.userAccount)
                }
                Icon={
                  <MaterialIcons name='error' size={30} style={{ color: colors.secondaryColor }}></MaterialIcons>
                }
                title={"点检异常"}
              >
              </CardItem>

            </View>
          </View>
          <View height={1} marginV-12 style={{ backgroundColor: colors.secondaryColor, opacity: 0.2 }}></View>
        </AuthBase>

        <AuthBase item={getItem("application", "spare", index.userAccount)}>
          <View marginB-12>
            <View paddingL-8 marginB-s4 marginT-6 style={{ borderLeftWidth: 1, borderColor: colors.thirdColor, width: 48 }} height={12} center>
              <Text subheading style={{ color: colors.thirdColor }}>备件</Text>
            </View>
            <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareAskfor")
              }}
                getItems={
                  getItems("application", "spare", "applySpare", index.userAccount)
                }
                Icon={
                  <MaterialCommunityIcons name='basket-fill' size={30} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
                }
                title={"备件申请"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareRevert")
              }}
                getItems={
                  getItems("application", "spare", "spareRecoil", index.userAccount)
                }
                Icon={
                  <MaterialCommunityIcons name='basket-unfill' size={30} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
                }
                title={"备件回冲"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareReview")
              }}
                getItems={
                  getItems("application", "spare", "spareApproval", index.userAccount)
                }
                Icon={
                  <MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
                }
                title={"备件审批"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareLog")
              }}
                getItems={
                  getItems("application", "spare", "spareOutorWare", index.userAccount)
                }
                Icon={
                  <AntIcons name='filetext1' size={26} style={{ color: colors.thirdColor }}></AntIcons>
                }
                title={"出入库记录"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareOwner")
              }}
                getItems={
                  getItems("application", "spare", "sapreHold", index.userAccount)
                }
                Icon={
                  <FontAwesome5 name='user-cog' size={24} style={{ color: colors.thirdColor }}></FontAwesome5>
                }
                title={"持有总览"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareChangeMisson")
              }}
                getItems={
                  getItems("application", "spare", "spareReplaceTask", index.userAccount)
                }
                Icon={
                  <EntypoIcons name='retweet' size={30} style={{ color: colors.thirdColor }}></EntypoIcons>
                }
                title={"更换任务"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareChangeHistory")
              }}
                getItems={
                  getItems("application", "spare", "spareReplaceHis", index.userAccount)
                }
                Icon={
                  <FontAwesome5 name='history' size={24} style={{ color: colors.thirdColor }}></FontAwesome5>
                }
                title={"更换历史"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("SpareUsage")
              }}
                getItems={
                  getItems("application", "spare", "spareUseHis", index.userAccount)
                }
                Icon={
                  <MaterialIcons name='history' size={30} style={{ color: colors.thirdColor }}></MaterialIcons>
                }
                title={"使用历史"}
              >
              </CardItem>

            </View>

          </View>
          <View height={1} marginV-12 style={{ backgroundColor: colors.secondaryColor, opacity: 0.2 }}></View>
        </AuthBase>

        <AuthBase item={getItem("application", "assignment", index.userAccount)}>
          <View marginB-s4>
            <View paddingL-8 marginB-s4 marginT-6 style={{ borderLeftWidth: 1, borderColor: colors.textColor, width: 48 }} height={12} center>
              <Text subheading style={{ color: colors.textColor }}>任务</Text>
            </View>
            <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>
              <CardItem pressfn={() => {
                this.jumpToUrl("Publish")
              }}
                getItems={
                  getItems("application", "assignment", "assignmentApply", index.userAccount)
                }
                Icon={
                  <AntIcons name='edit' size={30} style={{ color: colors.textColor }}></AntIcons>
                }
                title={"发布任务"}
              >
              </CardItem>
            </View>
          </View>
          <View height={1} marginV-12 style={{ backgroundColor: "#999", opacity: 0.2 }}></View>
        </AuthBase>

        <AuthBase item={getItem("application", "assignment", index.userAccount)}>
          <View marginB-s4>
            <View paddingL-8 marginB-s4 marginT-6 style={{ borderLeftWidth: 1, borderColor: colors.textColor, width: 48 }} height={12} center>
              <Text subheading style={{ color: colors.textColor }}>通知</Text>
            </View>
            <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>
              <CardItem pressfn={() => {
                this.jumpToUrl("PublicBroad")
              }}
                getItems={
                  getItems("application", "assignment", "assignmentApply", index.userAccount)
                }
                Icon={
                  <AntIcons name='edit' size={30} style={{ color: colors.textColor }}></AntIcons>
                }
                title={"发布通知"}
              >
              </CardItem>

              <CardItem pressfn={() => {
                this.jumpToUrl("BroadList")
              }}
                getItems={
                  getItems("application", "assignment", "assignmentApply", index.userAccount)
                }
                Icon={
                  <AntIcons name='notification' size={30} style={{ color: colors.textColor }}></AntIcons>
                }
                title={"通知公告"}
              >
              </CardItem>

            </View>
          </View>
        </AuthBase>





      </ScrollView>





    </SafeAreaViewPlus>

  }
}

export default Usage