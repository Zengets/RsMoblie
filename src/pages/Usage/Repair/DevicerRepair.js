import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, TabBar, AnimatedImage } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaViewPlus, Header, OneToast, SpareItem } from '../../../components';
import { ScrollView } from 'react-native';
import { colors } from '../../../utils';

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
    submitting: loading.effects['index/getRepairDetail'],

}))
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
        let id = this.props.navigation.state.params ? this.props.navigation.state.params.id : null;
        console.log(id)
        if (id) {
            this.setNewState("getRepairDetail", { id: id })
        }

    }


    render() {
        let { navigation, index: { repairstep, spareData }, submitting } = this.props;
        let { equipmentId,equipmentName,applyRepairTime, faultClassifyName, faultTypeName, repairUserName, faultDesc, faultPicUrl, repairStartTime, repairEndTime, faultLevelName, faultReason, repairTypeName, repairContent,
            confirmTime, confirmResult, confirmDesc
        } = repairstep ? repairstep : {};


        let baoxiu = () => (
            <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                <Rows name="报修时间" values={ applyRepairTime } />
                <Rows name="故障分类" values={ faultClassifyName } />
                <Rows name="故障名称" values={ faultTypeName } />
                <Rows name="维修人" values={ repairUserName } />
                <Rows name="故障描述" values={ faultDesc } />
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
                <Rows name="开始维修时间" values={ repairStartTime } />
                <Rows name="结束维修时间" values={ repairEndTime } />
                <Rows name="故障等级" values={ faultLevelName } />
                <Rows name="故障原因" values={ faultReason } />
                <Rows name="维修类型" values={ repairTypeName } />
                <Rows name="维修内容" values={ repairContent } />
                <View left padding-12>
                    <Text subheading>
                        消耗备件:
                    </Text>
                    <View style={ { width: "100%", backgroundColor: "#f0f0f0" } } flex-1 padding-12 marginT-10>
                        {
                            spareData.map((item, i) => {
                                return <SpareItem item={ item } navigation={ navigation } lastRender={ { name: "消耗数量", key: "consumeCount" } } />
                            })
                        }
                    </View>
                </View>
            </Card>
        ), yanzheng = () => (
            <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                <Rows name="验证时间" values={ confirmTime } />
                <Rows name="验证结果" values={ confirmResult } />
                <Rows name="验证描述" values={ confirmDesc } />

            </Card>
        )





        return <SafeAreaViewPlus loading={ submitting }>
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
                        navigation.navigate("InfoDeviceDetail", { id: equipmentId })
                    } }>
                        <Text>
                            设备{ equipmentName }详情
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
