import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Badge } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../../utils';
let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
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


    componentDidMount() {
        this.setNewState("infodevicedetail", {
            id: this.props.navigation.state.params.id
        })
    }


    render() {
        const { index, navigation } = this.props,
            { pictureUrl, equipmentName, equipmentNo, statusName, status, positionNo, equipmentTypeName, equipmentModel, groupName,
                departmentName, shopName, energyConsumption, equipmentWorth, purchaseDate, brand, parameters, qrCodeUrl } = index.infodevicedetail
        let getColor = (status) => {
            let color = colors.primaryColor;
            switch (status) {
                case "0":
                    color = "orange";
                    break;
                case "1":
                    color = "lightblue";
                    break;
                case "2":
                    color = "red";
                    break;
                case "3":
                    color = "bule";
                    break;
                case "4":
                    color = "grey";
                    break;
                case "5":
                    color = "green";
                    break;
                case "6":
                    color = colors.primaryColor;
                    break;
            }
            return color
        }
        return <SafeAreaViewPlus>
            <Header title={`${navigation.state.params.name}`} navigation={navigation}>
            </Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View padding-12 paddingT-0>
                    <View style={{ overflow: "hidden" }} row={false} spread left>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <View row spread style={styles.item}>
                                <Text subheading>
                                    设备名称：
                            </Text>
                                <Text body>
                                    {equipmentName}
                                </Text>
                            </View>

                            <View row spread style={styles.item}>
                                <Text subheading>
                                    设备编号：
                                </Text>
                                <Text subheading>
                                    {equipmentNo}
                                </Text>
                            </View>

                            <View row spread style={styles.items}>
                                <Text subheading>
                                    设备位置号：
                                </Text>
                                <Text body>
                                    {positionNo}
                                </Text>
                            </View>
                        </Card>

                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <View row spread style={styles.item}>
                                <Text subheading>
                                    设备类型：
                            </Text>
                                <Text body>
                                    {equipmentTypeName}
                                </Text>
                            </View>

                            <View row spread style={styles.item}>
                                <Text subheading>
                                    设备型号：
                            </Text>
                                <Text body>
                                    {equipmentModel}
                                </Text>
                            </View>

                            <View row spread style={styles.item}>
                                <Text subheading>
                                    设备状态：
                            </Text>
                                <View row center>
                                    <Text body dark100 marginR-3 marginT-3 style={{ color: getColor(status) }}>{statusName}</Text>
                                    <Badge size='small' backgroundColor={getColor(status)}></Badge>
                                </View>
                            </View>

                            <View row spread style={styles.item}>
                                <Text subheading>
                                    部门：
                            </Text>
                                <Text body>
                                    {departmentName}
                                </Text>
                            </View>
                            <View row spread style={styles.item}>
                                <Text subheading>
                                    车间：
                            </Text>
                                <Text body>
                                    {shopName}
                                </Text>
                            </View>
                            <View row spread style={styles.item}>
                                <Text subheading>
                                    分组：
                            </Text>
                                <Text body>
                                    {groupName}
                                </Text>
                            </View>
                        </Card>

                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <View row spread style={styles.item}>
                                <Text subheading>
                                    能耗：
                            </Text>
                                <Text body>
                                    {energyConsumption}
                                </Text>
                            </View>

                            <View row spread style={styles.item}>
                                <Text subheading>
                                    价值：
                            </Text>
                                <Text body>
                                    {equipmentWorth}
                                </Text>
                            </View>
                            <View row spread style={styles.item}>
                                <Text subheading>
                                    购买日期：
                            </Text>
                                <Text body>
                                    {purchaseDate}
                                </Text>
                            </View>

                            <View row spread style={styles.item}>
                                <Text subheading>
                                    品牌：
                            </Text>
                                <Text body>
                                    {brand}
                                </Text>
                            </View>
                            <View row spread style={styles.items}>
                                <Text subheading>
                                    参数：
                            </Text>
                                <Text body>
                                    {parameters}
                                </Text>
                            </View>
                        </Card>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <View row spread style={{ ...styles.items, alignItems: "flex-start" }}>
                                <Text subheading>
                                    设备图片：
                            </Text>
                                <Card.Image style={{ width: 60, height: 60, overflow: "hidden" }} imageSource={pictureUrl ? { uri: pictureUrl } : require("../../../assets/404.png")} />
                            </View>
                        </Card>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <View row spread style={{ ...styles.items, alignItems: "flex-start" }}>
                                <Text subheading>
                                    设备二维码：
                            </Text>
                                <Card.Image style={{ width: 60, height: 60, overflow: "hidden" }} imageSource={qrCodeUrl ? { uri: qrCodeUrl } : require("../../../assets/404.png")} />
                            </View>
                        </Card>
                    </View>
                </View>

            </ScrollView>




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