import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown, Modal, SubmitForm, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, ActivityIndicator } from 'react-native';
import { colors } from '../../../utils';


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
class CheckHistoryDetail extends Component {

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
        let { posturl, postdata } = this.props.navigation.state.params ? this.props.navigation.state.params : { posturl: "", postdata: "" };
        this.setNewState(posturl, postdata);
    }

    componentDidMount() {
        this.resetData()
    }


    render() {
        let { index, navigation, loading } = this.props, { visible } = this.state;
        let { posturl, postdata } = navigation.state.params ? navigation.state.params : { posturl: "", postdata: "" },
            {
                pointCheckItemDate, pointCheckUserName, taskNo, equipmentName, positionNo, equipmentNo, list
            } = index[posturl] ? index[posturl] : {
                pointCheckItemDate: "", pointCheckUserName: "", taskNo: "", equipmentName: "", positionNo: "", equipmentNo: "", list: []
            }



        let getColor = (item) => {
            let color = "#43c4cc"
            switch (item.pointCheckItemResultType) {
                case 0:
                    color = colors.successColor;
                    break;
                case 1:
                    color = colors.errorColor;
                    break;
            }
            return color
        }, statusName = { 0: "正常", 1: "异常" };


        return <SafeAreaViewPlus loading={ loading.effects['index/' + posturl] }>
            <Header title={ `点检历史详情` } navigation={ navigation }>
            </Header>
            <ScrollView  keyboardShouldPersistTaps="handled" style={ { padding: 12 } }>
                <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="工单号" values={ taskNo } />
                    <Rows name="设备名称" values={ equipmentName } />
                    <Rows name="设备编号" values={ equipmentNo } />
                    <Rows name="设备位置号" values={ positionNo } noborder={ true }/>
                </Card>
                <Card borderRadius={ 8 }  marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="点检人" values={ pointCheckUserName } />
                    <Rows name="点检时间" values={ pointCheckItemDate } noborder={ true }/>
                </Card>

                <Card marginV-12 padding-12 marginB-24 borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                    <View>
                        <View marginB-12>
                            <Text subheading>
                                点检项列表
                            </Text>
                        </View>
                        <View>
                            {
                                list && list.length > 0 ?
                                    list.map((item, i) => (
                                        <View marginB-12 style={ { borderRadius: 8, overflow: "hidden", borderColor: "#f9f9f9", borderWidth: 1 } }>
                                            <View row spread padding-12>
                                                <View>
                                                    <Text subbody dark10><Text style={ { color: getColor(item) } }>| </Text>项目:{ item.pointCheckItem }</Text>
                                                </View>
                                                <View row center>
                                                    <Text subbody dark100 marginR-3  style={ { color: getColor(item) } }>{ statusName[item.pointCheckItemResultType] }</Text>
                                                    <Badge size='small' backgroundColor={ getColor(item) }></Badge>
                                                </View>
                                            </View>
                                            <View style={ { borderRadius: 0, overflow: "hidden", backgroundColor: "#F9F9F9" } }>
                                                <Rows name="正常参考" values={ item.normalReference } noborder={ true }></Rows>
                                                <Rows name="周期类型" values={ item.periodTypeName } noborder={ true }></Rows>
                                                <Rows name="异常记录" values={ item.exceptionRecord } noborder={ true }></Rows>
                                            </View>
                                        </View>
                                    )) : <Empty></Empty>
                            }

                        </View>
                    </View>

                </Card>
            </ScrollView>


        </SafeAreaViewPlus>

    }
}



export default CheckHistoryDetail