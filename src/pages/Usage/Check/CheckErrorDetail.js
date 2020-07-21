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
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
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
class CheckErrorDetail extends Component {

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
        let { posturl, postdata } = this.props.route.params ? this.props.route.params : { posturl: "", postdata: "" };
        this.setNewState(posturl, postdata);
    }

    componentDidMount() {
        this.resetData()
    }


    render() {
        let { index, navigation,route, loading } = this.props, { visible } = this.state;
        let { posturl, postdata } = route.params ? route.params : { posturl: "", postdata: "" },
            {
                pointCheckTime, pointCheckUserName, equipmentName, positionNo, equipmentNo, pointCheckItem, normalReference, periodTypeName, exceptionRecord, status, equipmentId, id,
                equipmentPointCheckItemTaskId, pointCheckItemResultType, handleUserName, handleTime, handleTypeName, handleType, handleId
            } = index[posturl] ? index[posturl] : {
                pointCheckTime: "", pointCheckUserName: "", equipmentName: "", positionNo: "", equipmentNo: "", pointCheckItem: "", status: "", equipmentId: "", id: "", equipmentPointCheckItemTaskId: "",
                normalReference: "", periodTypeName: "", exceptionRecord: "", pointCheckItemResultType: "", handleUserName: "", handleTime: "", handleTypeName: "", handleType: "", handleId: ""
            }


        let getColor = (status) => {
            let color = "#43c4cc"
            switch (status) {
                case 2:
                    color = colors.secondaryColor;
                    break;
                case 1:
                    color = colors.errorColor;
                    break;
            }
            return color
        }, statusName = { 1: "待处理", 2: "已处理" },
            getColors = (pointCheckItemResultType) => {
                let color = "#43c4cc"
                switch (pointCheckItemResultType) {
                    case 0:
                        color = colors.successColor;
                        break;
                    case 1:
                        color = colors.errorColor;
                        break;
                }
                return color
            }, statusNames = { 0: "正常", 1: "异常" };


        return <SafeAreaViewPlus loading={ loading.effects['index/' + posturl] }>
            <Header title={ `点检历史详情` } navigation={ navigation }>
            </Header>
            <ScrollView  keyboardShouldPersistTaps="handled" style={ { padding: 12 } }>
                <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="设备名称" values={ equipmentName } />
                    <Rows name="设备编号" values={ equipmentNo } />
                    <Rows name="设备位置号" values={ positionNo } noborder={ true } />
                </Card>
                <Card borderRadius={ 8 } marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="点检人" values={ pointCheckUserName } />
                    <Rows name="点检时间" values={ pointCheckTime } noborder={ true } />
                </Card>

                <Card marginV-12 borderRadius={ 8 } style={ { width: "100%",marginBottom:status == 2?0:24 } } enableShadow={ false }>
                    <View row spread padding-12 style={ styles.item }>
                        <View>
                            <Text subbody dark10><Text style={ { color: getColors(pointCheckItemResultType) } }>| </Text>项目:{ pointCheckItem }</Text>
                        </View>
                        <View row center>
                            <Text subbody dark100 marginR-3 style={ { color: getColors(pointCheckItemResultType) } }>{ statusNames[pointCheckItemResultType] }</Text>
                            <Badge size='small' backgroundColor={ getColors(pointCheckItemResultType) }></Badge>
                        </View>
                    </View>
                    <Rows name="正常参考" values={ normalReference }  noborder={ true }></Rows>
                    <Rows name="周期类型" values={ periodTypeName }  noborder={ true }></Rows>
                    <Rows name="异常记录" values={ exceptionRecord }  noborder={ true }></Rows>
                    <View row padding-12>
                        {
                            status == 1 && <Button disabled={loading.effects[`index/checkRepair`]} flex-1 label="报修处理" backgroundColor={ colors.warnColor } onPress={ () => {
                                this.setNewState("checkRepair", { equipmentId: equipmentId }, () => {
                                    navigation.navigate("RepairAction", {
                                        title: "报修设备", type: "0", id: equipmentId, todo: {
                                            url: "CheckErrorDetail",
                                            params: {
                                                posturl,
                                                postdata
                                            },
                                            sendMessage: {
                                                posturl: "checkRepairAfter",
                                                postdata: {
                                                    id: id,
                                                    handleId: ""
                                                }
                                            }
                                        }
                                    })
                                })
                            } }>
                                {
                                    loading.effects[`index/checkRepair`] ?
                                        <ActivityIndicator color="white" style={ { paddingRight: 8 } } />
                                        : null
                                }
                            </Button>
                        }
                        {
                            status == 1 &&
                            <Button flex-1 label="忽略异常" marginH-8 outline
                                outlineColor={ "#999" } onPress={ () => {
                                    this.setNewState("checkIgnore", { id: id }, () => {
                                        this.resetData()
                                    })
                                } }>
                                {
                                    loading.effects[`index/checkIgnore`] ?
                                        <ActivityIndicator color="#999" style={ { paddingRight: 8 } } />
                                        : null
                                }
                            </Button>
                        }
                        <Button flex-1 label="历史详情" backgroundColor={ "#999" } onPress={ () => {
                            navigation.navigate("CheckHistoryDetail", {
                                posturl: "errortohis",
                                postdata: { equipmentPointCheckItemTaskId: equipmentPointCheckItemTaskId },
                            })
                        } }>
                        </Button>
                    </View>
                </Card>


                {
                    status == 2 &&
                    <Card borderRadius={ 8 } marginT-12  marginB-24 style={ { width: "100%" } } enableShadow={ false }>
                        <View row spread padding-12 style={ styles.item }>
                            <View>
                                <Text subbody dark10><Text style={ { color: getColor(status) } }>| </Text>状态：</Text>
                            </View>
                            <View row center>
                                <Text subbody dark100 marginR-3 style={ { color: getColor(status) } }>{ statusName[status] }</Text>
                                <Badge size='small' backgroundColor={ getColor(status) }></Badge>
                            </View>
                        </View>
                        <Rows name="处理人" values={ handleUserName } noborder={ true } />
                        <Rows name="处理时间" values={ handleTime } noborder={ true } />
                        <Rows name="处理方式" values={ handleTypeName } noborder={ true } />
                        <View row padding-12>
                        {
                            handleType == 1 && <Button flex-1 label="查看维修单" backgroundColor={ colors.secondaryColor }  onPress={ () => {
                                navigation.navigate("DevicerRepair",{id: handleId})
                            } }>
                            </Button>
                        }
                       
                    </View>
                    </Card>
                }

            </ScrollView>


        </SafeAreaViewPlus>

    }
}



export default CheckErrorDetail