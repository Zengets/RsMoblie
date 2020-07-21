/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import { SafeAreaViewPlus, OneToast, Header } from '../../components';
import { colors, getQueryString } from '../../utils';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar, View, Text, Card, AnimatedImage, ThemeManager, BorderRadiuses, Badge } from 'react-native-ui-lib';
import {
    TouchableWithoutFeedback,
} from 'react-native';

@connect(({ index, loading }) => ({ index, loading }))
class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ""
        }
    }
    //设置新状态
    setNewState(type, values, fn) {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/' + type,
            payload: values
        }).then((res) => {
            if (!res) {
                this.setState({
                    error: true
                })
                return
            }
            fn ? fn() : null
        })
    }

    renderTitleBar = () => <Header
        backgroundColor="transparent"
        mode='light'
        navigation={this.props.navigation}
        title="扫描二维码"
    ></Header>

    renderMenu = () => <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 60 }}>
        <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    type: ""
                })
            }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialIcons name='devices' size={25} style={{ color: this.state.type == "" ? colors.primaryColor : "#fff" }}></MaterialIcons>
                <Text style={{ color: this.state.type == "" ? colors.primaryColor : "#fff" }}>设备</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    type: "repair"
                })
            }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 60, marginRight: 60 }}>
                <Entypo name='tools' size={25} style={{ color: this.state.type == "repair" ? colors.primaryColor : "#fff" }}></Entypo>
                <Text style={{ color: this.state.type == "repair" ? colors.primaryColor : "#fff" }}>报修</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    type: "check"
                })
            }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name='database-check' size={25} style={{ color: this.state.type == "check" ? colors.primaryColor : "#fff" }}></MaterialCommunityIcons>
                <Text style={{ color: this.state.type == "check" ? colors.primaryColor : "#fff" }}>点检</Text>
            </View>
        </TouchableWithoutFeedback>



    </View>

    barcodeReceived = (result) => {
        const { navigation: { navigate } } = this.props, { type } = this.state;
        const { data } = result;
        let redirect_uri = decodeURI(getQueryString("redirect_uri", data))
        let id = redirect_uri.split("=")[1];
        if (type == "repair") {
            this.setNewState("checkRepairById", { id: id }, () => {
                navigate("RepairAction", { title: "报修设备", type: "0", id: id })
            })
        } else if (type == "check") {
            this.setNewState("checkdetail", { equipmentId: id }, () => {
                navigate("CheckAction", { title: "点检设备", id: id }) //设备id
            })
        } else {
            this.setNewState("checkById", { id: id }, () => {
                navigate("InfoDeviceDetail", {
                    id: id
                })
            })
        }
    };

    render() {
        let { navigation, index: { formdata }, loading } = this.props, { type } = this.state;

        return (
            <SafeAreaViewPlus topColor='rgba(0,0,0,0.5)' style={{ flex: 1 }}>
                <QRScannerView
                    onScanResult={this.barcodeReceived}
                    renderHeaderView={this.renderTitleBar}
                    cornerStyle={{
                        height: 32,
                        width: 32,
                        borderWidth: 6,
                        borderColor: '#ffffff'
                    }}
                    renderFooterView={this.renderMenu}
                    scanBarAnimateReverse={true} />
            </SafeAreaViewPlus>
        )
    }
}

export default Scan