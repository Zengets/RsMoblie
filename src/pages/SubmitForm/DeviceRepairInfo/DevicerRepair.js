import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, TabBar, AnimatedImage } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown } from '../../../components';
import { ScrollView } from 'react-native';
import { colors } from '../../../utils';

const styles = StyleSheet.create({
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

@connect(({ index }) => ({ index }))
class DevicerRepair extends Component {

    state = {
        selectedIndex: 0
    }

    scrollview = null;

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
        //getRepairDetail
    }


    render() {
        let { navigation, index: { res2, repairstep } } = this.props;
        let { applyRepairTime, faultClassifyName, faultTypeName, repairUserName, faultDesc, faultPicUrl, repairStartTime, repairEndTime, faultLevelName, faultReason, repairTypeName, repairContent,
            confirmTime, confirmResult, confirmDesc



        } = repairstep ? repairstep : {};



        let baoxiu = () => (
            <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        报修时间:
            </Text>
                    <Text body>
                        { applyRepairTime }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        故障分类:
            </Text>
                    <Text body>
                        { faultClassifyName }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        故障名称:
            </Text>
                    <Text body>
                        { faultTypeName }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        维修人:
            </Text>
                    <Text body>
                        { repairUserName }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        故障描述:
            </Text>
                    <Text body>
                        { faultDesc }
                    </Text>
                </View>
                <View left padding-12>
                    <Text subheading>
                        故障图片:
                    </Text>
                    <AnimatedImage
                        containerStyle={ { width: "100%", height: 200, borderRadius: 8, backgroundColor: "#f9f9f9", marginTop: 12 } }
                        style={ { resizeMode: 'contain', height: 200, width: "100%" } }
                        source={ faultPicUrl ? { uri: faultPicUrl } : require("../../../assets/404.png") }
                        loader={ <ActivityIndicator /> }
                    />
                </View>
            </Card>
        ), weixiu = () => (
            <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        开始维修时间:
                    </Text>
                    <Text body>
                        { repairStartTime }
                    </Text>
                </View>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        结束维修时间:
                    </Text>
                    <Text body>
                        { repairEndTime }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        故障等级:
                    </Text>
                    <Text body>
                        { faultLevelName }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        故障原因:
                    </Text>
                    <Text body>
                        { faultReason }
                    </Text>
                </View>

                <View row spread style={ styles.item }>
                    <Text subheading>
                        维修类型:
                    </Text>
                    <Text body>
                        { repairTypeName }
                    </Text>
                </View>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        维修内容:
                    </Text>
                    <Text body>
                        { repairContent }
                    </Text>
                </View>

                <View left padding-12>
                    <Text subheading>
                        消耗备件:
                    </Text>
                    <View>



                    </View>
                </View>
                {/* "taskNo": "RP20200107000006",--------------------------------任务单号
                    "equipmentId": "2020010728858334701",---------------------设备id
                    "equipmentNo": "ccc",--------------------------------------设备编号
                    "equipmentName": "74",------------------------------------设备名
                    "equipmentModel": "1",--------------------------------------设备型号
                    "applyRepairUserId": "2020010728152209873",-----------报修人id
                    "applyRepairUserName": "自动报修",---------------------报修人名
                    "applyRepairTime": "2020-01-07 16:30:00",---------------------报修时间
                    "faultType": "2020010327546081076",----------------------故障名id
                    "faultCode": "123",--------------------------------------------故障代码
                    "faultTypeName": "自动报修故障",------------------------------故障名称
                    "repairTypeName": null,------------------------------------维修类型名
                    "repairType": null,--------------------------------------维修类型id
                    "repairStartTime": null,---------------------------------------开始维修时间
                    "repairEndTime": null,------------------------------------------结束维修时间
                    "repairUserId": "2019071129337332471",------------------维修人id
                    "repairUserName": "小涛子",---------------------------维修人名
                    "statusName": "待维修",-------------------------------状态名
                    "status": 1,-------------------------------------------------状态key
                    "faultTime": "2020-01-07 16:27:15",-----------------------故障时间
                    "faultLevel": null,------------------------------故障级别key
                    "faultLevelName": null,--------------------------------故障级别名
                    "faultDesc": "自动报修",-------------------------------------故障描述
                    "faultPicUrl": null,---------------------------------------故障图
                    "faultReason": null,------------------------------------故障原因
                    "repairContent": null,-------------------------------------维修内容
                    "confirmUserId": null,---------------------------------验证人id
                    "confirmUserName": null,-------------------------------验证人名
                    "confirmIsPass": null,------------------------------------验证是否通过key
                    "confirmResult": null,----------------------------------验证结果
                    "confirmDesc": null,-------------------------------------验证描述
                    "confirmTime": null,-------------------------------------验证时间
                    "startTime": null,
                    "endTime": null,
                    "faultClassify": 1,-------------------------------------------故障类型key
                    "faultClassifyName": "维修故障",------------------------------故障类型名
                    "spare": null, */}
            </Card>
        ), yanzheng = () => (
            <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        验证时间:
                </Text>
                    <Text body>
                        { confirmTime }
                    </Text>
                </View>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        验证结果:
                    </Text>
                    <Text body>
                        { confirmResult }
                    </Text>
                </View>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        验证描述:
                    </Text>
                    <Text body>
                        { confirmDesc }
                    </Text>
                </View>



            </Card>
        )





        return <SafeAreaViewPlus>
            <Header title={ "维修记录" } navigation={ navigation }>
            </Header>
            <ScrollView ref={ (scrollview) => this.scrollview = scrollview }>
                <TabBar
                    selectedIndex={ this.state.selectedIndex }
                    onChangeIndex={ index => {
                        this.scrollview && this.scrollview.scrollTo({ x: 0, y: 0, animated: true }, 1)
                        this.setState({ selectedIndex: index })
                    } }
                    style={ styles.tabbar }
                    enableShadow={ false }
                    indicatorStyle={ { borderBottomWidth: 2, borderColor: colors.primaryColor } }>
                    <TabBar.Item
                        label={ `报修信息` }
                        labelStyle={ { textTransform: 'capitalize' } }
                        selectedLabelStyle={ {
                            color: colors.primaryColor
                        } }
                    />
                    <TabBar.Item selectedLabelColor={ colors.primaryColor }
                        label={ `维修信息` }
                        labelStyle={ { textTransform: 'capitalize' } }
                        selectedLabelStyle={ {
                            color: colors.primaryColor
                        } }
                    />
                    <TabBar.Item selectedLabelColor={ colors.primaryColor }
                        label={ `验证信息` }
                        labelStyle={ { textTransform: 'capitalize' } }
                        selectedLabelStyle={ {
                            color: colors.primaryColor
                        } }
                    />
                </TabBar>

                <View padding-12>
                    <Card marginB-12 paddingV-page paddingR-12 paddingL-12 flex-1 center enableShadow={ false } onPress={ () => {
                        navigation.navigate("InfoDeviceDetail", { id: res2.data.id })
                    } }>
                        <Text>
                            设备{ res2.data.equipmentName }详情
                            </Text>
                    </Card>
                    {
                        this.state.selectedIndex == 0 && baoxiu()
                    }
                    {
                        this.state.selectedIndex == 1 && weixiu()
                    }
                    {
                        this.state.selectedIndex == 2 && yanzheng()
                    }


                </View>














            </ScrollView>


        </SafeAreaViewPlus>
    }

}
export default DevicerRepair
