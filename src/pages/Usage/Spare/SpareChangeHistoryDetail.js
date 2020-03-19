import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class SpareChangeHistoryDetail extends React.Component {

    state = {
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
        this.setNewState("sparechangehistorydetail", {
            id: this.props.navigation.state.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }




    render() {
        let { index, navigation, loading } = this.props,
            { sparePartsName, sparePartsNo, sparePartsValue, taskNo, status, taskName, taskTypeName, equipmentName, equipmentNo,
                equipmentModel, equipmentTypeName, departmentName, planStartMaintainDate, planMaintainUserName, id
            } = index.sparechangehistorydetail;
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
        }, statusName = { 0: "未开始", 1: "进行中", 2: "已完成" };

        return <SafeAreaViewPlus loading={loading.effects['index/sparechangehistorydetail']}>
            <Header title={`备件更换历史详情`} navigation={navigation}>
            </Header>
            <ScrollView  keyboardShouldPersistTaps="handled"
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
                            <Rows name="执行人" values={planMaintainUserName} noborder={true} />

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


export default SpareChangeHistoryDetail