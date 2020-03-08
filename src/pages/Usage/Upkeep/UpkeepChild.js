import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
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
class Rows extends Component {
    render() {
        let { name, values } = this.props;

        return <View row top style={ styles.item }>
            <View>
                <Text subheading>
                    { name }:
            </Text>
            </View>
            <View flex-1 paddingL-6 style={ { overflow: "hidden" } } right>
                <Text body >
                    { values }
                </Text>
            </View>


        </View>

    }

}


@connect(({ index, loading }) => ({
    index,
    loading
}))
class UpkeepChild extends Component {

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
        let { posturl, postdata } = this.props.navigation.state.params ? this.props.navigation.state.params : { posturl: "", postdata: "" }
        this.setNewState(posturl, postdata);
    }


    render() {

        let { index, navigation, loading } = this.props;
        let { posturl, postdata } = navigation.state.params ? navigation.state.params : { posturl: "", postdata: "" },
            { taskNo, equipmentName, equipmentNo, equipmentTypeName, maintainPlanTypeName, status, planStartMaintainDate, maintainHours,
                totalBudget, planMaintainUserName, remark, detail,executiveUserName,startMaintainTime,endMaintainTime,tatolMaintainCost
            } = index[posturl] ? index[posturl] : {
                taskNo: "", equipmentName: "", equipmentNo: "", equipmentTypeName: "", maintainPlanTypeName: "", status: "", planStartMaintainDate: "", maintainHours: "",
                totalBudget: "", planMaintainUserName: "", remark: "", detail: [],executiveUserName: "",startMaintainTime: "",endMaintainTime: "",tatolMaintainCost: ""
            };




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


        return <SafeAreaViewPlus loading={ loading.effects['index/' + posturl] }>
            <Header title={ `维保详情` } navigation={ navigation }>
            </Header>
            <ScrollView style={ { padding: 12} }>
                <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="工单号" values={ taskNo } />
                    <Rows name="设备名称" values={ equipmentName } />
                    <Rows name="设备编号" values={ equipmentNo } />
                    <Rows name="设备类型" values={ equipmentTypeName } />
                    <Rows name="维保类型" values={ maintainPlanTypeName } />
                    <View row top style={ styles.item }>
                        <View>
                            <Text subheading>
                                任务状态:
                        </Text>
                        </View>
                        <View flex-1 paddingL-6 style={ { overflow: "hidden" } } right>
                            <View row center>
                                <Text subbody dark100 marginR-3 marginT-3 style={ { color: getColor(status) } }>{ statusName[status] }</Text>
                                <Badge size='small' backgroundColor={ getColor(status) }></Badge>
                            </View>
                        </View>
                    </View>
                    <Rows name="计划维保日期" values={ planStartMaintainDate } />
                    <Rows name="计划维保用时" values={ maintainHours ? `${maintainHours}h` : "" } />
                    <Rows name="计划维保费用" values={ totalBudget ? `${totalBudget}元` : "" } />
                    <Rows name="负责人" values={ planMaintainUserName } />
                    <Rows name="备注" values={ remark } />
                </Card>

                <Card marginV-12 padding-12 borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                    <View>
                        <View>
                            <Text subheading>
                                维保明细:
                            </Text>
                        </View>
                        <View>
                            {
                                detail && detail.length > 0 ?
                                    detail.map((item, i) => (
                                        <View style={ [i == detail.lenght - 1 ? styles.items : styles.item, {padding:8,backgroundColor:"#f0f0f0" }] }>
                                            <View row top>
                                                <View>
                                                    <Text subbody dark>
                                                        项目: { item.maintainItem  }
                                                    </Text>
                                                </View>
                                                <View flex-1 paddingL-6 style={ { overflow: "hidden" } } right>
                                                    <Text subbody>
                                                       费用:{ item.actualMaintainCost  }元
                                                    </Text>
                                                </View>
                                            </View>
                                            <View row top marginT-8>
                                                <View>
                                                    <Text subbody>
                                                    维保内容:
                                                </Text>
                                                </View>
                                                <View flex-1 paddingL-6 style={ { overflow: "hidden" } } right>
                                                    <Text subbody>
                                                        { item.maintainContent  }
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                    )) : <Empty></Empty>
                            }

                        </View>
                    </View>

                </Card>
                <Card borderRadius={ 8 } marginB-24 style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="执行人" values={ executiveUserName } />
                    <Rows name="维保开始时间" values={ startMaintainTime } />
                    <Rows name="维保结束时间" values={ endMaintainTime } />
                    <Rows name="实际维保费用" values={ tatolMaintainCost ? `${tatolMaintainCost}元` : "" } />
                </Card>
            </ScrollView>


        </SafeAreaViewPlus>

    }
}



export default UpkeepChild