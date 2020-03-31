import React from 'react';
import { connect } from 'react-redux';
import { View, TextField, TextArea, Text, Card, Button, Colors, AnimatedImage } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors } from '../../../utils';
import { ActivityIndicator, Animated, Dimensions } from 'react-native';
import { SafeAreaViewPlus, Header, OneToast, SubmitForm } from '../../../components';



const loop = (data) => {
    let newdata = data.map((item) => {
        return {
            id: item.key,
            parentId: item.parentKey,
            name: item.title,
            children: item.children ? loop(item.children) : []
        }
    });
    return newdata
};

let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({ index, loading }))
class RepairAction extends React.Component {

    state = {
        loaded: false
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
        let { index: { submitdata, uploadImg, res2, repairstep, userInfo }, navigation, loading } = this.props, { } = this.state,
            { title, type, id } = navigation.state.params ? navigation.state.params : { title: "", type: "", id: "" };

        this.setNewState("repairstep", { id: id }, () => {
            let res2 = this.props.index.res2, submitdatas = [];
            if (type == "0") {//报修
                submitdatas = [
                    {
                        key: "faultTypehide",
                        type: "select",
                        require: true,
                        value: "",
                        linked: {
                            key: "faultType",
                            posturl: "getChildren",
                            format: { dicKey: "id", dicName: "faultName" },
                            postkey: "id"
                        },
                        placeholder: "请选择故障分类",
                        option: res2.faultTypeList && res2.faultTypeList.map((item) => {
                            return {
                                dicName: item.faultName,
                                dicKey: item.id
                            }
                        })
                    }, {
                        key: "faultType",
                        type: "select",
                        require: true,
                        value: "",
                        placeholder: "请选择故障名称",
                        option: []
                    }, {
                        key: "repairUserId",
                        type: "select",
                        require: true,
                        value: "",
                        placeholder: "请选择维修工",
                        option: res2.workerList && res2.workerList.map((item) => {
                            return {
                                dicName: item.userName,
                                dicKey: item.id
                            }
                        })
                    }, {
                        key: "faultDesc",
                        type: "textarea",
                        require: false,
                        value: "",
                        placeholder: "请填写故障描述",

                    }, {
                        key: "faultPicUrl",
                        type: "image",
                        require: false,
                        value: "",
                        placeholder: "请上传故障图片",
                    }]

            } else if (type == "1") {//开始维修
            } else if (type == "2") {//完成维修
                submitdatas = [
                    {
                        key: "faultReason",
                        type: "input",
                        require: true,
                        value: "",
                        placeholder: "请填写故障原因",
                    },
                    {
                        key: "repairContent",
                        type: "input",
                        require: true,
                        value: "",
                        placeholder: "请填写维修内容",
                    },
                    {
                        key: "repairType",
                        type: "select",
                        require: true,
                        value: "",
                        placeholder: "请选择维修类型",
                        option: res2.repairTypeList && res2.repairTypeList
                    }, {
                        key: "faultLevel",
                        type: "select",
                        require: true,
                        value: "",
                        placeholder: "请选择故障等级",
                        option: res2.faultLevelList && res2.faultLevelList
                    }, {
                        key: "spare",
                        type: "multinput",
                        require: false,
                        value: [],
                        format: {
                            "id": "userSparePartsId",//备件id
                            "value": "consumeCount" //使用数量
                        },
                        subs: [{
                            name: "",
                            key: "sparePartsName",
                        }, {
                            name: "类型",
                            key: "sparePartsTypeName",
                        }, {
                            name: "库存",
                            key: "availableStock",
                            width:50,
                            right:true
                        }
                        ],

                        placeholder: "请选择消耗备件",
                        option: res2.spareList && res2.spareList.map((item, i) => {
                            return {
                                ...item,
                                dicName: item.sparePartsName,
                                dicKey: item.id
                            }

                        })
                    }
                ]
            } else if (type == "3") {//验证
                submitdatas = [
                    {
                        key: "confirmIsPass",
                        type: "select",
                        require: true,
                        value: "",
                        placeholder: "请选择验证结果",
                        option: [{
                            dicName: "通过",
                            dicKey: "1"
                        }, {
                            dicName: "不通过",
                            dicKey: "2"
                        }]
                    },
                    {
                        key: "confirmDesc",
                        type: "textarea",
                        require: false,
                        value: "",
                        placeholder: "请填写验证说明",
                    },
                ]
            }
            this.setNewState("submitdata", submitdatas, () => {
                this.setState({
                    loaded: true
                })
            })
        })
    }


    resetData = () => {
        let { index: { submitdata } } = this.props;
        let newsubmitdata = submitdata.map((item, i) => {
            item.value = item.type == "multinput" ? [] : undefined
            return item
        })
        this.setNewState("submitdata", newsubmitdata)
    }



    render() {
        let { index: { submitdata, res2, repairstep, userInfo }, navigation, loading } = this.props, { loaded } = this.state,
            { title, type, id, todo } = navigation.state.params ? navigation.state.params : {
                title: "", type: "", id: "", todo: {
                    url: "",
                    params: {
                        posturl: "",
                        postdata: ""
                    }
                }
            },
            getdisabled = () => {
                let bools = true;
                if (repairstep) {
                    if (type == "0") {
                        bools = true
                        return
                    }
                    if (repairstep.status == "1" || repairstep.status == "2") {
                        bools = repairstep.repairUserId == userInfo.id
                    }
                    if (repairstep.status == "3") {
                        bools = repairstep.confirmUserId == userInfo.id
                    }
                }
                return !bools
            }
        repairstep = repairstep ? repairstep : {};


        return <SafeAreaViewPlus
            loading={!loaded}
        >
            <Header title={title} navigation={navigation}
                headerRight={() => (submitdata.length > 0 ? <Card enableShadow={false} paddingV-12 onPress={this.resetData}>
                    <Text dark40>重置</Text>
                </Card> : null)}
            >
            </Header>

            <View row padding-12 paddingB-0 marginB-12>
                <Card paddingV-page paddingR-12 paddingL-12 flex-1 center enableShadow={false} onPress={() => {
                    navigation.navigate("InfoDeviceDetail", { id: res2.data && res2.data.id })
                }}>
                    <Text>
                        设备{repairstep.equipmentName}详情
                    </Text>
                </Card>

                {
                    res2.data && res2.data.repairId ? <View padding-6></View> : null
                }
                {
                    res2.data && res2.data.repairId ? <Card paddingV-page paddingR-12 paddingL-12 flex-1 center enableShadow={false} onPress={() => {
                        navigation.navigate("DevicerRepair")
                    }}>
                        <Text>
                            查看维修记录
                        </Text>
                    </Card> : null
                }
            </View>
            <SubmitForm></SubmitForm>

            <Button disabled={getdisabled() || loading.effects[`index/repairApply`] || loading.effects[`index/repairCheck`] || loading.effects[`index/repairFinish`] || loading.effects[`index/repairStart`]} onPress={() => {
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
                if (type == "0") {
                    let postData = {
                        "equipmentId": res2.data.id ? res2.data.id : null,//设备id，必填
                        "repairUserId": getVal("repairUserId"),//维修人id，必填
                        "faultType": getVal("faultType"),//故障名称id，必填
                        "faultDesc": getVal("faultDesc"),//故障描述，非必填
                        "faultPicUrl": getVal("faultPicUrl")//故障图片，非必填
                    }
                    this.setNewState("repairApply", postData, () => {
                        let { sendMessage, url, params } = todo ? todo : {};
                        let btn = [{
                            name: "返回报修",
                            url: "Scan",
                            params: { type: "repair" }
                        }, {
                            name: "跳转到我的报修",
                            url: "Mine",
                            params: {}
                        }]
                        if (url) {
                            btn.push({
                                name: "返回点检详情",
                                url: url,
                                params: params
                            })
                        }
                        if (sendMessage) {
                            sendMessage.postdata = {
                                ...sendMessage.postdata,
                                handleId: this.props.index.repairApply
                            };//设置维修单号
                        }
                        navigation.navigate("Success", {
                            btn,
                            description: `${res2.data.equipmentName}已报修成功`,
                            sendMessage: sendMessage  //成功回调操作
                        })
                    })
                } else if (type == "1") {
                    this.setNewState("repairStart", { id: repairstep.id ? repairstep.id : null }, () => {
                        navigation.navigate("Success", {
                            btn: [{
                                name: "返回维修单列表",
                                url: "ToRepair",
                            }, {
                                name: "跳转到我的维修单",
                                url: "Mine",
                                params: {}
                            }],
                            description: `${res2.data.equipmentName}已开始维修！`,
                        })
                    })
                } else if (type == "2") {
                    let postData = {
                        "id": repairstep.id ? repairstep.id : null,
                        "faultReason": getVal("faultReason"),//故障原因，必填
                        "repairContent": getVal("repairContent"),//维修内容，必填
                        "repairType": getVal("repairType"),//维修类型，必填
                        "faultLevel": getVal("faultLevel"),//故障等级，必填
                        "spare": getVal("spare") //消耗备件，非必填
                    }
                    this.setNewState("repairFinish", postData, () => {
                        _it.resetData()
                        navigation.navigate("Success", {
                            btn: [{
                                name: "返回维修单列表",
                                url: "ToRepair",
                            }, {
                                name: "跳转到我的维修单",
                                url: "Mine",
                                params: {}
                            }],
                            description: `${res2.data.equipmentName}已完成维修！`
                        })
                    })
                } else if (type == "3") {
                    let postData = {
                        "id": repairstep.id ? repairstep.id : null,
                        "confirmIsPass": getVal("confirmIsPass"),//故障原因，必填
                        "confirmDesc": getVal("confirmDesc"),//维修内容，必填
                    }

                    this.setNewState("repairCheck", postData, () => {
                        _it.resetData()
                        navigation.navigate("Success", {
                            btn: [{
                                name: "返回维修单列表",
                                url: "ToRepair",
                            }, {
                                name: "跳转到我的维修单",
                                url: "Mine",
                                params: {}
                            }],
                            description: `${res2.data.equipmentName}已完成验证！`
                        })
                    })
                }
            }} margin-12 backgroundColor={colors.primaryColor}>
                {
                    loading.effects[`index/repairApply`] || loading.effects[`index/repairCheck`] || loading.effects[`index/repairFinish`] || loading.effects[`index/repairStart`] ?
                        <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                        : null
                }

                <Text white marginV-4 body>{getdisabled() ? "您没有操作权限" : "确定"}</Text>
            </Button>




        </SafeAreaViewPlus>
    }
}

export default RepairAction