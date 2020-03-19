import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Badge, Hint, Colors, ActionSheet } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, Rows } from '../../../components';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../../utils';
let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/infodevicedetail'],
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
        let { index, navigation, submitting } = this.props, { showHint } = this.state,
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
                            navigation.navigate("RepairAction", { title: "报修设备", type: "0", id: id }) //设备id
                        }
                    },
                    {
                        label: '点检设备', onPress: () => {
                            this.setNewState("checkdetail", { equipmentId: id }, () => {
                                navigation.navigate("CheckAction", { title: "点检设备", id: id }) //设备id
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
                        label: '点检设备', onPress: () => {
                            this.setNewState("checkdetail", { equipmentId: id }, () => {
                                navigation.navigate("CheckAction", { title: "点检设备", id: id }) //设备id
                            })
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



        return <SafeAreaViewPlus topInset={ false } backgroundColor="transparent" topColor='transparent' loading={ submitting }>
            <Modal { ...modalprops }>
                <ImageBackground
                    style={ { width: width * 0.9, height: width * 0.9 } }
                    source={ qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png") }
                >
                </ImageBackground>
                <Rows name="设备编号" values={ equipmentNo } />
                <Rows name="设备位置号" values={ positionNo } noborder={true}/>
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
                <ScrollView  keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={ false }>
                    <ImageBackground
                        style={ { width: width, height: width } }
                        source={ require("../../../assets/404.png") }>
                        <View padding-15></View>
                        <View padding-44 flex bottom style={ { marginBottom: -99 } }>
                            <Card marginT-12 borderRadius={ 16 } style={ { width: "100%" } } enableShadow={ false }>
                                <Rows name="设备名称" values={ equipmentName } />
                                <Rows name="设备编号" values={ equipmentNo } />
                                <Rows name="设备位置号" values={ positionNo } noborder={true}/>
                            </Card>
                        </View>
                    </ImageBackground>

                    <View padding-12 marginT-45>
                        <View style={ { overflow: "hidden" } } row={ false } spread left>
                            <Text subheading marginT-12>
                                设备详情
                            </Text>
                            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                                <Rows name="设备类型" values={ equipmentTypeName } />
                                <Rows name="设备型号" values={ equipmentModel } />
                                <Rows name="设备状态" rightRender={ <View row center>
                                    <Text subbody dark100 marginR-3 style={ { color: getColor(status) } }>{ statusName }</Text>
                                    <Badge size='small' backgroundColor={ getColor(status) }></Badge>
                                </View> } />
                                <Rows name="部门" values={ departmentName } />
                                <Rows name="车间" values={ shopName } />
                                <Rows name="分组" values={ groupName }  noborder={true}/>
                            </Card>

                            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                                <Rows name="能耗" values={ energyConsumption } />
                                <Rows name="价值" values={ equipmentWorth } />
                                <Rows name="购买日期" values={ purchaseDate } />
                                <Rows name="品牌" values={ brand } />
                                <Rows name="参数" values={ parameters }  noborder={true}/>
                            </Card>
                            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                                <Rows name="设备二维码" rightRender={<Card right padding-2 enableShadow={ false } onPress={ () => {
                                        this.setState({ visible: true })
                                    } }>
                                        <Card.Image style={ { width: 60, height: 60, overflow: "hidden" } } imageSource={ qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png") } />
                                    </Card>}  noborder={true}/>
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