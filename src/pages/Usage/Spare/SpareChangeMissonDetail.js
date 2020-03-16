import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar,TextField } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class SpareChangeMissonDetail extends React.Component {

    state = {
        sparePartsNum:0
    }

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

    resetdata() {
        this.setNewState("sparechangemissiondetail", {
            id: this.props.navigation.state.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }




    render() {
        let { index, navigation, loading } = this.props,{sparePartsNum}=this.state,
            { sparePartsName, sparePartsNo, sparePartsValue, taskNo, status, taskName, taskTypeName, equipmentName, equipmentNo,
                equipmentModel, equipmentTypeName, departmentName, planStartMaintainDate, planMaintainUserName, id, planMaintainUserId
            } = index.sparechangemissiondetail.data ? index.sparechangemissiondetail.data : {}, { num } = index.sparechangemissiondetail;

        let getColor = (status) => {
            let color = "#43c4cc"
            switch (status) {
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
        }, statusName = { 0: "未开始", 1: "进行中", 2: "已完成" }, getdisabled = index.userInfo.id !== planMaintainUserId,
        inputprops = {
            floatingPlaceholder: true,
            floatOnFocus: true,
            underlineColor: "#999",
            enableErrors: sparePartsNum>num,
            error: "您没有足够的备件可以替换",
            floatingPlaceholderColor: {
              default: 'black',
              error: 'black',
              focus: 'black',
              disabled: 'grey'
            },
            placeholder: '请填写更换数量',
            value: sparePartsNum,
            onChangeText: (val) => {
              this.setState({
                sparePartsNum: val
              })
            }
        }



        return <SafeAreaViewPlus loading={loading.effects['index/sparechangemissiondetail']}>
            <Header title={`备件更换任务详情`} navigation={navigation}>
            </Header>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
            >
                <View padding-12 paddingT-0>
                    <View style={{ overflow: "hidden" }} row={false} spread left>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="备件名" values={sparePartsName} />
                            <Rows name="料号" values={sparePartsNo} />
                            <Rows name="备件价值" values={sparePartsValue ? sparePartsValue + "元" : ""} noborder={true} />
                        </Card>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="工单号" values={taskNo} />
                            <Rows name="任务名" values={taskName} />
                            <Rows name="任务类型" values={taskTypeName} />
                            <Rows name="任务状态:" rightRender={<View row center>
                                <Text subbody dark100 marginR-3 style={{ color: getColor(status) }}>{statusName[status]}</Text>
                                <Badge size='small' backgroundColor={getColor(status)}></Badge>
                            </View>} />
                            <Rows name="设备名" values={equipmentName} />
                            <Rows name="设备编号" values={equipmentNo} />
                            <Rows name="设备型号" values={equipmentModel} />
                            <Rows name="设备类型" values={equipmentTypeName} />
                            <Rows name="部门名" values={departmentName} />
                            <Rows name="计划执行日期" values={planStartMaintainDate} />
                            <Rows name="执行人" values={planMaintainUserName} />
                            <Rows name="拥有该备件数量" values={num} />
                            <View row center padding-12>
                                {
                                    status == 0 ?
                                        <Button label="开始更换任务" flex-1 backgroundColor={colors.primaryColor}
                                            disabled={loading.effects['index/sparechangestart'] || getdisabled}
                                            onPress={() => {
                                                this.setNewState("sparechangestart", { id: id }, () => {
                                                    OneToast("该任务已开始");
                                                    this.resetdata()
                                                })
                                            }}
                                        >
                                            {
                                                loading.effects[`index/sparechangestart`] ?
                                                    <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                                    : null
                                            }
                                        </Button> :
                                        <View>
                                            <TextField
                                               {...inputprops} 
                                               style={{width:"100%"}}
                                            ></TextField>
                                            <Button marginT-12 label="完成更换任务" flex-1 backgroundColor={colors.primaryColor}
                                                disabled={loading.effects['index/sparechangefinish']}
                                                onPress={() => {
                                                    this.setNewState("sparechangefinish", { 
                                                        "sparePartsNum":sparePartsNum,//备件数量，必填
                                                        "equipmentSparePartsReplaceId":id
                                                     }, () => {
                                                        OneToast("该任务已完成");
                                                        this.resetdata()
                                                    })
                                                }}>
                                                {
                                                    loading.effects[`index/sparechangefinish`] ?
                                                        <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                                        : null
                                                }
                                            </Button>
                                        </View>
                                }

                            </View>


                        </Card>




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


export default SpareChangeMissonDetail