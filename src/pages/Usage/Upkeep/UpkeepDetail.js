import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown, Modal, SubmitForm, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, ActivityIndicator } from 'react-native';
import { colors, ConvertPinyin } from '../../../utils';


let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({

    item: {
        borderColor: "#f0f0f0",
        borderBottomWidth: 1,
        width: "100%",
        marginTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12
    },
    items: {
        borderColor: "#f0f0f0",
        borderBottomWidth: 0,
        width: "100%",
        marginTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12
    },
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
        borderRadius: 0
    },
})


@connect(({ index, loading }) => ({
    index,
    loading
}))
class UpkeepDetail extends Component {

    state = {
        visible: false
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

    resetData() {
        let { posturl, postdata, type } = this.props.route.params ? this.props.route.params : { posturl: "", postdata: "" };
        this.setNewState(posturl, postdata);
    }

    componentDidMount() {
        this.resetData()
    }


    render() {

        let { index, navigation,route, loading } = this.props, { visible } = this.state;
        let { posturl, postdata, type } = route.params ? route.params : { posturl: "", postdata: "" },
            { id, taskNo, equipmentName, equipmentNo, equipmentTypeName, maintainPlanTypeName, status, planStartMaintainDate, maintainHours, equipmentId,
                totalBudget, planMaintainUserId, planMaintainUserName, remark, detail, executiveUserName, startMaintainTime, endMaintainTime, tatolMaintainCost
            } = index[posturl] ? index[posturl] : {
                id: "", taskNo: "", equipmentName: "", equipmentNo: "", planMaintainUserId: "", equipmentTypeName: "", maintainPlanTypeName: "", status: "", planStartMaintainDate: "", maintainHours: "",
                totalBudget: "", planMaintainUserName: "", remark: "", detail: [], executiveUserName: "", startMaintainTime: "", endMaintainTime: "", tatolMaintainCost: "", equipmentId: ""
            }, getdisabled = () => {
                let bools = planMaintainUserId == index.userInfo.id;
                return !bools
            }




        let getColor = (item) => {
            let color = "#43c4cc"
            switch (item) {
                case 0:
                    color = "#ff5800";
                    break;
                case 1:
                    color = "#5477ff";
                    break;
                case 2:
                    color = "#cc0d01";
                    break;
                case 3:
                    color = "#43c4cc";
                    break;
                case 4:
                    color = "#54bbff";
                    break;
                case 5:
                    color = "#999999";
                    break;
            }
            return color
        }, statusName = { 0: "待执行", 2: "执行中", 3: "已执行", 4: "关闭" };


        return <SafeAreaViewPlus loading={loading.effects['index/' + posturl]}>
            <Header title={`维保详情`} navigation={navigation}>
            </Header>
            <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 12 }}>
                <Card borderRadius={8} style={{ width: "100%" }} enableShadow={false}>
                    <Rows name="工单号" values={taskNo} />
                    <Rows name="设备名称" values={equipmentName} />
                    <Rows name="设备编号" values={equipmentNo} />
                    <Rows name="设备类型" values={equipmentTypeName} />
                    <Rows name="维保类型" values={maintainPlanTypeName} />
                    <Rows name="任务状态:" rightRender={<View row center>
                        <Text subbody dark100 marginR-3 style={{ color: getColor(status) }}>{statusName[status]}</Text>
                        <Badge size='small' backgroundColor={getColor(status)}></Badge>
                    </View>} />
                    <Rows name="计划维保日期" values={planStartMaintainDate} />
                    <Rows name="计划维保用时" values={maintainHours ? `${maintainHours}h` : ""} />
                    <Rows name="计划维保费用" values={totalBudget ? `${totalBudget}元` : ""} />
                    <Rows name="负责人" values={planMaintainUserName} />
                    <Rows name="备注" values={remark} />
                    {
                        type == "mission" && status == 0 || type == "mission" && status == 2 ?
                            <View style={styles.items} height={46} row spread>
                                <Button marginR-4 size={"small"} disabled={getdisabled() || loading.effects['index/closeAppMaintain']} backgroundColor={colors.warnColor} label="关闭维保" onPress={() => {
                                    //startAppMaintain,finishAppMaintain,closeAppMaintain,updateAppMaintainUser,queryAppByEqId
                                    this.setNewState("closeAppMaintain", { id: id }, () => {
                                        navigation.navigate("Success", {
                                            btn: [{
                                                name: "返回维保任务",
                                                url: "UpkeepMission",
                                            }, {
                                                name: "跳转到我的维保",
                                                url: "Mine",
                                                params: {}
                                            }],
                                            description: `${equipmentName}已关闭维保！`
                                        })
                                    })
                                }}>
                                    {
                                        loading.effects['index/closeAppMaintain'] ?
                                            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                            : null
                                    }
                                </Button>
                                <Button marginR-4 size='small' disabled={getdisabled() || loading.effects['index/startAppMaintain'] || loading.effects['index/finishAppMaintain']} label={status == 0 ? "开始维保" : status == 2 ? "完成维保" : ""} onPress={() => {
                                    if (status == 0) {
                                        this.setNewState("startAppMaintain", { id: id }, () => {
                                            navigation.navigate("Success", {
                                                btn: [{
                                                    name: "返回维保任务",
                                                    url: "UpkeepMission",
                                                }, {
                                                    name: "跳转到我的维保",
                                                    url: "Mine",
                                                    params: {}
                                                }],
                                                description: `${equipmentName}已开始维保！`
                                            })
                                        })
                                    } else if (status == 2) {
                                        this.setNewState("finishAppMaintain", { id: id }, () => {
                                            navigation.navigate("Success", {
                                                btn: [{
                                                    name: "返回维保任务",
                                                    url: "UpkeepMission",
                                                }, {
                                                    name: "跳转到我的维保",
                                                    url: "Mine",
                                                    params: {}
                                                }],
                                                description: `${equipmentName}已完成维保！`
                                            })
                                        })
                                    }
                                }}>
                                    {
                                        loading.effects['index/startAppMaintain'] || loading.effects['index/finishAppMaintain'] ?
                                            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                            : null
                                    }
                                </Button>
                                <Button size='small' flex-1 label="修改负责人" disabled={loading.effects['index/queryAppByEqId']} backgroundColor={colors.successColor} onPress={() => {
                                    this.setNewState("queryAppByEqId", {
                                        "equipmentId": equipmentId,
                                        "chargeType": "1"
                                    }, () => {
                                        let submitdata = [{
                                            key: "userId",
                                            type: "select",
                                            require: true,
                                            value: "",
                                            placeholder: "请选择负责人",
                                            option: index.queryAppByEqId && index.queryAppByEqId.map((item) => {
                                                return {
                                                    dicName: item.userName,
                                                    dicKey: item.userId
                                                }
                                            })
                                        }]
                                        this.setNewState("submitdata", submitdata, () => {
                                            this.setState({
                                                visible: true
                                            })
                                        })
                                    })
                                }}>
                                    {
                                        loading.effects['index/queryAppByEqId'] ?
                                            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                            : null
                                    }

                                </Button>
                            </View> : null

                    }





                </Card>

                <Card marginV-12 padding-12 borderRadius={8} style={{ width: "100%" }} enableShadow={false}>
                    <View>
                        <View marginB-12>
                            <Text subheading >
                                维保明细
                            </Text>
                        </View>
                        <View>
                            {
                                detail && detail.length > 0 ?
                                    detail.map((item, i) => (
                                        <View marginB-12 style={{ borderRadius: 8, overflow: "hidden", borderColor: "#f9f9f9", borderWidth: 1 }}>
                                            <Rows name="项目" values={item.maintainItem} noborder={true} color={colors.primaryColor}></Rows>
                                            <View style={{ borderRadius: 0, overflow: "hidden", backgroundColor: "#F9F9F9" }}>
                                                <Rows name="费用" values={item.actualMaintainCost ? item.actualMaintainCost + "元" : ""} noborder={true}></Rows>
                                                <Rows name="维保内容" values={item.maintainContent} noborder={true}></Rows>
                                            </View>
                                        </View>
                                    )) : <Empty></Empty>
                            }

                        </View>
                    </View>

                </Card>
                <Card borderRadius={8} marginB-24 style={{ width: "100%" }} enableShadow={false}>
                    <Rows name="执行人" values={executiveUserName} />
                    <Rows name="维保开始时间" values={startMaintainTime} />
                    <Rows name="维保结束时间" values={endMaintainTime} />
                    <Rows name="实际维保费用" values={tatolMaintainCost ? `${tatolMaintainCost}元` : ""} noborder={true} />
                </Card>

                <Modal
                    visible={this.state.visible}
                    height={height * 0.8}
                    hide={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    title={"修改维保负责人"}
                >
                    <View paddingV-12>
                        <SubmitForm></SubmitForm>
                        <Button margin-12 label={"提交"} disabled={loading.effects['index/updateAppMaintainUser']} onPress={() => {
                            let _it = this;
                            function getVal(key) {
                                let one = {};
                                _it.props.index.submitdata.map((item) => {
                                    if (item.key == key) {
                                        one = item
                                    }
                                });
                                if (!one.type) {
                                    return
                                }
                                if (one.type.indexOf("select") == -1) {
                                    return one.value && one.value
                                } else {
                                    return one.value && one.value.id
                                }
                            }
                            this.setNewState("updateAppMaintainUser", {
                                id,
                                userId: getVal("userId")
                            }, () => {
                                OneToast("修改成功！");
                                this.setState({ visible: false });
                                this.resetData();

                            })
                        }}>
                            {
                                loading.effects['index/updateAppMaintainUser'] ?
                                    <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                    : null
                            }


                        </Button>

                    </View>
                </Modal>
            </ScrollView>


        </SafeAreaViewPlus>

    }
}



export default UpkeepDetail