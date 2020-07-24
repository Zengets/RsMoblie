import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Badge, Hint, Colors, ActionSheet } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, Rows } from '../../../components';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Animated } from 'react-native';
import { colors } from '../../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/infodevicedetail'],
}))
class InfoDeviceDetail extends React.Component {
    state = {
        swipeheight: new Animated.Value(60),
        visible: false,
        showHint: false,
        plus: true,
        showbtn: false,
        rotate: new Animated.Value(1),
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
        this.setNewState("infodevicedetail", {
            id: this.props.route.params.id
        })
    }


    render() {
        let { index, navigation, submitting } = this.props, { showHint, swipeheight, rotate, plus, showbtn } = this.state,
            { id, pictureUrl, equipmentName, equipmentNo, statusName, status, positionNo, equipmentTypeName, equipmentModel,
                groupName, departmentName, shopName, energyConsumption, equipmentWorth, purchaseDate, brand, parameters,
                qrCodeUrl } = index.infodevicedetail;
        let getColor = (status) => {
            let color = colors.primaryColor;
            switch (status) {
                case "0":
                    color = "#ffcb01";
                    break;
                case "1":
                    color = "#5477ff";
                    break;
                case "2":
                    color = "#cc0d01";
                    break;
                case "3":
                    color = "#43c4cc";
                    break;
                case "4":
                    color = "#54bbff";
                    break;
                case "5":
                    color = "#999999";
                    break;
                case "6":
                    color = colors.primaryColor;
                    break;
            }
            return color
        }, modalprops = {
            visible: this.state.visible,
            height: width + 138,
            hide: () => {
                this.setState({ visible: false })
            },
            title: `${equipmentName}的二维码`
        }, getoption = () => {
            return [
                {
                    label: '查看设备负责人', onPress: () => {
                        navigation.navigate("DeviceUser", { id: id })
                    }
                },
                // {
                //     label: '查看设备日志', onPress: () => {
                //         //navigation.navigate("DeviceUser", { id: id })
                //     }
                // },
                {
                    label: '取消', onPress: () => {
                        this.setState({ showHint: false })
                    }
                },
            ]
        }, cardwidth = (width - 12 * 6) / 5, rotatecha = rotate.interpolate({ // 旋转，使用插值函数做值映射
            inputRange: [0, 1],
            outputRange: ['-45deg', '0deg']
        }), getcurshow = (name) => {
            let curitem = index.infodeviceauth && index.infodeviceauth.filter((item, i) => { return item.key == name })[0];
            return curitem ? curitem.perm : null
        }, getlen = () => {
            let len = index.infodeviceauth && index.infodeviceauth.filter((item, i) => { return item.perm == true });
            return len.length
        }



        return <SafeAreaViewPlus topInset={false} topColor='transparent' loading={submitting}>
            <Modal {...modalprops}>
                <ImageBackground
                    style={{ width: width * 0.9, height: width * 0.9 }}
                    source={qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png")}
                >
                </ImageBackground>
                <Rows name="设备编号" values={equipmentNo} />
                <Rows name="设备位置号" values={positionNo} noborder={true} />
            </Modal>

            <ActionSheet
                useSafeArea={true}
                message='更多内容'
                useNativeIOS={true}
                containerStyle={{ borderRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}
                options={getoption()}
                visible={showHint}
                onDismiss={() => this.setState({ showHint: false })}
            />


            <View style={{ position: "relative" }}>
               

               
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
                    ref={ref => (this._list = ref)}
                    onScroll={({ nativeEvent: { contentOffset: { x, y } } }) => {
                        if (y > 200) {
                            if (showbtn) {
                            } else {
                                this.setState({
                                    showbtn: true
                                })
                            }
                        } else {
                            if (showbtn) {
                                this.setState({
                                    showbtn: false
                                })
                            } else {

                            }
                        }
                    }}
                >
                    <ImageBackground
                        style={{ width: width, height: width }}
                        source={{ uri: pictureUrl }}>
                        <View padding-15></View>
                        <View padding-44 flex bottom style={{ marginBottom: -99 }}>
                            <Card marginT-12 borderRadius={16} style={{ width: "100%" }} enableShadow={false}>
                                <Rows name="设备名称" values={equipmentName} />
                                <Rows name="设备编号" values={equipmentNo} />
                                <Rows name="设备位置号" values={positionNo} noborder={true} />
                            </Card>
                        </View>
                    </ImageBackground>

                    <View padding-12 marginT-45>
                        <View style={{ overflow: "hidden" }} row={false} spread left>
                            <Text subheading marginT-12>
                                设备详情
                            </Text>
                            <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                                <Rows name="设备类型" values={equipmentTypeName} />
                                <Rows name="设备型号" values={equipmentModel} />
                                <Rows name="设备状态" rightRender={<View row center>
                                    <Text subbody dark100 marginR-3 style={{ color: getColor(status) }}>{statusName}</Text>
                                    <Badge size='small' backgroundColor={getColor(status)}></Badge>
                                </View>} />
                                <Rows name="部门" values={departmentName} />
                                <Rows name="车间" values={shopName} />
                                <Rows name="分组" values={groupName} noborder={true} />
                            </Card>

                            <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                                <Rows name="能耗" values={energyConsumption} />
                                <Rows name="价值" values={equipmentWorth} />
                                <Rows name="购买日期" values={purchaseDate} />
                                <Rows name="品牌" values={brand} />
                                <Rows name="参数" values={parameters} noborder={true} />
                            </Card>
                            <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                                <Rows name="设备二维码" rightRender={<Card right padding-2 enableShadow={false} onPress={() => {
                                    this.setState({ visible: true })
                                }}>
                                    <Card.Image style={{ width: 60, height: 60, overflow: "hidden" }} imageSource={qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png")} />
                                </Card>} noborder={true} />
                            </Card>
                        </View>
                    </View>
                    <View height={plus?60:120}>
                    </View>
                </ScrollView>
                <Animated.View style={{ height: swipeheight, width: "100%", backgroundColor: "#fff", position: "absolute", bottom: 0, paddingLeft: 12, paddingRight: 12, borderColor: "#ddd", borderTopWidth: 1 }}>
                    <View row style={{ flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden", width: width }}>
                        {
                            getcurshow("repairApply") ?
                                <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false} onPress={() => {
                                    navigation.navigate("RepairAction", { title: "报修设备", type: "0", id: id }) //设备id
                                }}>
                                    <View height={22} center>
                                        <EntypoIcons name='tools' size={18} style={{ color: colors.textColor }}></EntypoIcons>
                                    </View>
                                    <Text style={{ fontSize: 12 }}>报修</Text>
                                </Card> : null
                        }
                        {
                            getcurshow("repairStart") || getcurshow("repairFinish") || getcurshow("repairAudit") ?
                                <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false} onPress={() => {
                                    navigation.navigate("RepairAction", { title: status == "0" ? "设备报修" : status == "1" ? "开始维修" : status == "2" ? "完成维修" : status == "3" ? "验证维修" : "", type: status, id: id })
                                }}>
                                    <View height={22} center>
                                        <FontAwesome5 name='toolbox' size={18} style={{ color: colors.textColor }}></FontAwesome5>
                                    </View>
                                    <Text style={{ fontSize: 12 }}>维修处理</Text>
                                </Card> : null
                        }

                        {
                            getcurshow("pointCheck") ?
                                <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false} onPress={()=>{
                                    navigation.navigate("CheckAction", { title: "点检设备", id: id }) //设备id
                                }}>
                                    <View height={22} center>
                                        <MaterialCommunityIcons name='database-check' size={24} style={{ color: colors.textColor }}></MaterialCommunityIcons>
                                    </View>
                                    <Text style={{ fontSize: 12 }}>点检</Text>
                                </Card> : null
                        }
                        {
                            getcurshow("spareReplace") ?
                                <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false}  onPress={()=>{
                                    navigation.navigate("SpareChangeMisson",{equipmentNo})
                                }}>
                                    <View height={22} center>
                                        <EntypoIcons name='retweet' size={22} style={{ color: colors.textColor }}></EntypoIcons>
                                    </View>
                                    <Text style={{ fontSize: 12 }}>更换备件</Text>
                                </Card> : null

                        }



                        {
                            getlen() < 6 ? null : <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false}
                                onPress={() => {
                                    if (plus) {
                                        this.setState({
                                            plus: false
                                        }, () => {
                                            Animated.timing(
                                                this.state.swipeheight,
                                                {
                                                    toValue: 120,
                                                    duration: 1000,
                                                }
                                            ).start()
                                            Animated.timing(
                                                this.state.rotate,
                                                {
                                                    toValue: 0,
                                                    duration: 1000,
                                                }
                                            ).start()
                                        })

                                    } else {
                                        this.setState({
                                            plus: true
                                        }, () => {
                                            Animated.timing(
                                                this.state.swipeheight,
                                                {
                                                    toValue: 60,
                                                    duration: 1000,
                                                }
                                            ).start()
                                            Animated.timing(
                                                this.state.rotate,
                                                {
                                                    toValue: 1,
                                                    duration: 1000,
                                                }
                                            ).start()
                                        })
                                    }

                                }}
                            >
                                <Animated.View height={22} center style={{ transform: [{ rotate: rotatecha }] }}>
                                    <AntdIcons name={'plus'} size={24} style={{ color: plus ? colors.textColor : colors.primaryColor }}>
                                    </AntdIcons>
                                </Animated.View>
                            </Card>

                        }

                        {
                            getcurshow("maintain") ?
                                <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false} onPress={()=>{
                                    navigation.navigate("UpkeepMission",{equipmentNo})
                                }}>
                                    <View height={22} center>
                                        <EntypoIcons name='clipboard' size={18} style={{ color: colors.textColor }}></EntypoIcons>
                                    </View>
                                    <Text style={{ fontSize: 12 }}>维保</Text>
                                </Card> : null

                        }

                        {
                            getcurshow("pointCheckException") ?
                                <Card width={cardwidth} height={48} marginV-6 marginR-12 center enableShadow={false} onPress={()=>{
                                    navigation.navigate("CheckError",{equipmentNo,status:"1"})
                                }}>
                                    <View height={22} center>
                                        <MaterialIcons name='error' size={20} style={{ color: colors.textColor }}></MaterialIcons>
                                    </View>
                                    <Text style={{ fontSize: 12 }}>点检异常</Text>
                                </Card> : null

                        }

                    </View>




                </Animated.View>
                
                {
                    !showbtn ? <View style={{ position: "absolute", top: 0, width: "100%", zIndex: 99999 }}>
                        <ImageBackground
                            style={{ width: width, height: 120 }}
                            source={require("../../../assets/jianban.png")}>
                        </ImageBackground>
                    </View> : null
                }
                <Header
                    style={{ position: "absolute", top: 34, width: "100%", zIndex: 99999 }}
                    backgroundColor="transparent"
                    navigation={navigation}
                    mode='light'
                    headerRight={() => (
                        <Card center containerStyle={{ backgroundColor: "transparent", height: "100%" }} enableShadow={false} onPress={() => this.setState({ showHint: !showHint })}>
                            <AntdIcons name="ellipsis1" size={22} style={{ color: "#fff" }} />
                        </Card>

                    )}
                >
                </Header>                    
            </View>



        </SafeAreaViewPlus>

    }
}

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
})


export default InfoDeviceDetail