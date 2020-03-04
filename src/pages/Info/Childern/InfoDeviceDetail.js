import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Badge, Hint, Colors, ActionSheet } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal } from '../../../components';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../../utils';
let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/infodevicedetail'],
    submittings: loading.effects['index/repairstep'],
}))
class InfoDeviceDetail extends React.Component {

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

    state = {
        visible: false,
        showHint: false
    }


    componentDidMount() {
        this.setNewState("infodevicedetail", {
            id: this.props.navigation.state.params.id
        })
    }


    render() {
        let { index, navigation, submitting,submittings } = this.props, { showHint } = this.state,
            { id, pictureUrl, equipmentName, equipmentNo, statusName, status, positionNo, equipmentTypeName, equipmentModel, groupName,
                departmentName, shopName, energyConsumption, equipmentWorth, purchaseDate, brand, parameters, qrCodeUrl } = index.infodevicedetail
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
            if (status == "0" || status == "1") {
                return [
                    {
                        label: '查看设备负责人', onPress: () => {
                            navigation.navigate("DeviceUser", { id: id })
                        }
                    },
                    {
                        label: '查看设备日志', onPress: () => {
                            //navigation.navigate("DeviceUser", { id: id })
                        }
                    },
                    {
                        label: '报修设备', onPress: () => {
                            this.setNewState("repairstep", { id:id }, () => {
                                let res2 = this.props.index.res2;
                                let submitdatas = [
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
                                        option: res2.faultTypeList&& res2.faultTypeList.map((item) => {
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
                                        require: false,
                                        value: "",
                                        placeholder: "请选择维修工",
                                        option: res2.workerList && res2.workerList.map((item) => {
                                            return {
                                                dicName: item.userName,
                                                dicKey: item.id
                                            }
                                        })
                                    },{
                                        key: "faultDesc",
                                        type: "textarea",
                                        require: false,
                                        value: "",
                                        placeholder: "请填写故障描述",
            
                                    },{
                                        key: "faultPicUrl",
                                        type: "image",
                                        require: false,
                                        value: "",
                                        placeholder: "请上传故障图片",
                                    }]
                                this.setNewState("submitdata", submitdatas, () => {
                                    navigation.navigate("SubmitForm", { title: "设备报修",type:"repair" })
                                })
                            })


                        }
                    },

                    {
                        label: '取消', onPress: () => {
                            this.setState({ showHint: false })
                        }
                    },
                ]
            } else {
                return [
                    {
                        label: '查看设备负责人', onPress: () => {
                            navigation.navigate("DeviceUser", { id: id })
                        }
                    },
                    {
                        label: '查看设备日志', onPress: () => {
                            //navigation.navigate("DeviceUser", { id: id })
                        }
                    },
                    {
                        label: '取消', onPress: () => {
                            this.setState({ showHint: false })
                        }
                    },
                ]
            }


        }



        return <SafeAreaViewPlus topInset={ false } backgroundColor="transparent" topColor='transparent' loading={ submitting||submittings }>
            <Modal { ...modalprops }>
                <ImageBackground
                    style={ { width: width * 0.9, height: width * 0.9 } }
                    source={ qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png") }
                >
                </ImageBackground>
                <View row spread style={ styles.item }>
                    <Text subheading>
                        设备编号：
                    </Text>
                    <Text body>
                        { equipmentNo }
                    </Text>
                </View>
                <View row spread style={ styles.items }>
                    <Text subheading>
                        设备位置号：
                    </Text>
                    <Text body>
                        { positionNo }
                    </Text>
                </View>
            </Modal>

            <ActionSheet
                useSafeArea={ true }
                message='更多内容'
                useNativeIOS={ true }
                containerStyle={ { borderRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, } }
                options={ getoption() }
                visible={ showHint }
                onDismiss={ () => this.setState({ showHint: false }) }
            />


            <View style={ { position: "relative" } }>
                <Header
                    style={ { position: "absolute", top: 34, width: "100%", zIndex: 99999 } }
                    backgroundColor="transparent"
                    navigation={ navigation }
                    headerRight={ () => (
                        <Card center containerStyle={ { backgroundColor: "transparent", height: "100%" } } enableShadow={ false } onPress={ () => this.setState({ showHint: !showHint }) }>
                            <AntdIcons name="ellipsis1" size={ 22 } style={ { color: "#000" } } />
                        </Card>

                    ) }
                >
                </Header>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    <ImageBackground
                        style={ { width: width, height: width } }
                        source={ require("../../../assets/404.png") }>
                        <View padding-15></View>
                        <View padding-44 flex bottom style={ { marginBottom: -99 } }>
                            <Card marginT-12 borderRadius={ 16 } style={ { width: "100%" } } enableShadow={ false }>
                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        设备名称：
                                    </Text>
                                    <Text body>
                                        { equipmentName }
                                    </Text>
                                </View>

                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        设备编号：
                                    </Text>
                                    <Text body>
                                        { equipmentNo }
                                    </Text>
                                </View>

                                <View row spread style={ styles.items }>
                                    <Text subheading>
                                        设备位置号：
                                    </Text>
                                    <Text body>
                                        { positionNo }
                                    </Text>
                                </View>
                            </Card>
                        </View>


                    </ImageBackground>

                    <View padding-12 marginT-45>
                        <View style={ { overflow: "hidden" } } row={ false } spread left>
                            <Text subheading marginT-12>
                                设备详情：
                            </Text>
                            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        设备类型：
                                    </Text>
                                    <Text body>
                                        { equipmentTypeName }
                                    </Text>
                                </View>

                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        设备型号：
                            </Text>
                                    <Text body>
                                        { equipmentModel }
                                    </Text>
                                </View>

                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        设备状态：
                            </Text>
                                    <View row center>
                                        <Text body dark100 marginR-3 marginT-3 style={ { color: getColor(status) } }>{ statusName }</Text>
                                        <Badge size='small' backgroundColor={ getColor(status) }></Badge>
                                    </View>
                                </View>

                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        部门：
                            </Text>
                                    <Text body>
                                        { departmentName }
                                    </Text>
                                </View>
                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        车间：
                            </Text>
                                    <Text body>
                                        { shopName }
                                    </Text>
                                </View>
                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        分组：
                            </Text>
                                    <Text body>
                                        { groupName }
                                    </Text>
                                </View>
                            </Card>

                            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        能耗：
                                    </Text>
                                    <Text body>
                                        { energyConsumption }
                                    </Text>
                                </View>

                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        价值：
                            </Text>
                                    <Text body>
                                        { equipmentWorth }
                                    </Text>
                                </View>
                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        购买日期：
                            </Text>
                                    <Text body>
                                        { purchaseDate }
                                    </Text>
                                </View>

                                <View row spread style={ styles.item }>
                                    <Text subheading>
                                        品牌：
                            </Text>
                                    <Text body>
                                        { brand }
                                    </Text>
                                </View>
                                <View row spread style={ styles.items }>
                                    <Text subheading>
                                        参数：
                            </Text>
                                    <Text body>
                                        { parameters }
                                    </Text>
                                </View>
                            </Card>
                            {/* <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                                <View row spread style={{ ...styles.items, alignItems: "flex-start" }}>
                                    <Text subheading>
                                        设备图片：
                            </Text>
                                    <Card.Image style={{ width: 60, height: 60, overflow: "hidden" }} imageSource={pictureUrl ? { uri: pictureUrl } : require("../../../assets/404.png")} />
                                </View>
                            </Card> */}
                            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                                <View row spread style={ { ...styles.items, alignItems: "flex-start" } }>
                                    <Text subheading>
                                        设备二维码：
                                    </Text>
                                    <Card right padding-2 enableShadow={ false } onPress={ () => {
                                        this.setState({ visible: true })
                                    } }>
                                        <Card.Image style={ { width: 60, height: 60, overflow: "hidden" } } imageSource={ qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png") } />
                                    </Card>
                                </View>
                            </Card>
                        </View>
                    </View>

                </ScrollView>


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