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

let { height, width } = Dimensions.get('window');

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
    //this.setNewState("test", null)
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }
  render() {
    const { index, navigation } = this.props, cardwidth = (width - 48) / 3;

    console.log(JSON.stringify(index.userAccount))

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
              <AuthBase item={getItems("application", "repair", "equipRepair", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("Scan", { type: "repair" })
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <EntypoIcons name='tools' size={33} style={{ color: colors.primaryColor }}></EntypoIcons>
                  </View>
                  <Text subbody>报修设备</Text>
                </Card>
              </AuthBase>

              <AuthBase item={getItems("application", "repair", "repairTask", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("ToRepair")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <EntypoIcons name='clipboard' size={33} style={{ color: colors.primaryColor }}></EntypoIcons>
                  </View>
                  <Text subbody>维修任务</Text>
                </Card>
              </AuthBase>
              <AuthBase item={getItems("application", "repair", "repairHis", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("Repaired")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialIcons name='history' size={33} style={{ color: colors.primaryColor }}></MaterialIcons>
                  </View>
                  <Text subbody>维修历史</Text>
                </Card>
              </AuthBase>
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
              <AuthBase item={getItems("application", "maintain", "maintainPlan", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("UpkeepPlan")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialCommunityIcons name='timer' size={33} style={{ color: colors.warnColor }}></MaterialCommunityIcons>
                  </View>
                  <Text subbody>维保计划</Text>
                </Card>
              </AuthBase>

              <AuthBase item={getItems("application", "maintain", "maintainTask", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("UpkeepMission")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <EntypoIcons name='clipboard' size={33} style={{ color: colors.warnColor }}></EntypoIcons>
                  </View>
                  <Text subbody>维保任务</Text>
                </Card>
              </AuthBase>
              <AuthBase item={getItems("application", "maintain", "maintainHis", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("UpkeepHistory")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialIcons name='history' size={33} style={{ color: colors.warnColor }}></MaterialIcons>
                  </View>
                  <Text subbody>维保历史</Text>
                </Card>
              </AuthBase>

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
              <AuthBase item={getItems("application", "check", "checkPlan", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("Scan", { type: "check" })
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialCommunityIcons name='database-check' size={33} style={{ color: colors.secondaryColor }}></MaterialCommunityIcons>
                  </View>
                  <Text subbody>点检设备</Text>
                </Card>
              </AuthBase>
              <AuthBase item={getItems("application", "check", "checkHis", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("CheckHistory")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialIcons name='history' size={33} style={{ color: colors.secondaryColor }}></MaterialIcons>
                  </View>
                  <Text subbody>点检历史</Text>
                </Card>
              </AuthBase>
              <AuthBase item={getItems("application", "check", "checkException", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("CheckError")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialIcons name='error' size={33} style={{ color: colors.secondaryColor }}></MaterialIcons>
                  </View>
                  <Text subbody>点检异常</Text>
                </Card>
              </AuthBase>
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
              <AuthBase item={getItems("application", "spare", "applySpare", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareAskfor")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialCommunityIcons name='basket-fill' size={33} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
                  </View>
                  <Text subbody>备件申请</Text>
                </Card>
              </AuthBase>


              <AuthBase item={getItems("application", "spare", "spareRecoil", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareRevert")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialCommunityIcons name='basket-unfill' size={33} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
                  </View>
                  <Text subbody>备件回冲</Text>
                </Card>
              </AuthBase>


              <AuthBase item={getItems("application", "spare", "spareApproval", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareReview")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: colors.thirdColor }}></MaterialCommunityIcons>
                  </View>
                  <Text subbody>备件审批</Text>
                </Card>
              </AuthBase>


              <AuthBase item={getItems("application", "spare", "spareOutorWare", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareLog")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <AntIcons name='filetext1' size={26} style={{ color: colors.thirdColor }}></AntIcons>
                  </View>
                  <Text subbody>出入库记录</Text>
                </Card>
              </AuthBase>


              <AuthBase item={getItems("application", "spare", "sapreHold", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareOwner")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <FontAwesome5 name='user-cog' size={25} style={{ color: colors.thirdColor }}></FontAwesome5>
                  </View>
                  <Text subbody>持有总览</Text>
                </Card>
              </AuthBase>

              <AuthBase item={getItems("application", "spare", "spareReplaceTask", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareChangeMisson")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <EntypoIcons name='retweet' size={33} style={{ color: colors.thirdColor }}></EntypoIcons>
                  </View>
                  <Text subbody>更换任务</Text>
                </Card>
              </AuthBase>

              <AuthBase item={getItems("application", "spare", "spareReplaceHis", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareChangeHistory")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <FontAwesome5 name='history' size={26} style={{ color: colors.thirdColor }}></FontAwesome5>
                  </View>
                  <Text subbody>更换历史</Text>
                </Card>
              </AuthBase>


              <AuthBase item={getItems("application", "spare", "spareUseHis", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("SpareUsage")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <MaterialIcons name='history' size={33} style={{ color: colors.thirdColor }}></MaterialIcons>
                  </View>
                  <Text subbody>使用历史</Text>
                </Card>
              </AuthBase>
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
              <AuthBase item={getItems("application", "assignment", "assignmentApply", index.userAccount)}>
                <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
                  this.jumpToUrl("Publish")
                }}>
                  <View center style={{ width: 48, height: 48 }}>
                    <AntIcons name='edit' size={33} style={{ color: colors.textColor }}></AntIcons>
                  </View>
                  <Text subbody>发布任务</Text>
                </Card>
              </AuthBase>

            </View>
          </View>
        </AuthBase>


      </ScrollView>





    </SafeAreaViewPlus>

  }
}

export default Usage