import React, { Component } from 'react';
import { RNCamera } from "react-native-camera"
import { SafeAreaViewPlus, OneToast, Header } from '../../components';
import {
    Animated,
    StyleSheet,
    Image,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    Easing
} from 'react-native';
import {
    Text,
    View,
    Button
} from 'react-native-ui-lib';

import AntdIcons from 'react-native-vector-icons/AntDesign';
import { colors, getQueryString } from '../../utils';
import { connect } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({ index, loading }))
class Scan extends Component {
    constructor(props) {
        super(props);
        let { type } = props.route.params ? props.route.params : { type: undefined };
        this.state = {
            moveAnim: new Animated.Value(-18),
            focus: true,
            postUrl: "infodevice",
            error: false,
            postData: {
                "pageIndex": 1,
                "pageSize": 10,
                "equipmentName": "",//设备名，筛选条件
                "equipmentNo": "",//设备编号，筛选条件
                "positionNo": "",//位置号，筛选条件
                "equipmentTypeId": "",//设备类型id，筛选条件
                "equipmentModel": "",//型号，筛选条件
                "shopId": "",//车间id，筛选条件
                "departmentId": "",//部门id，筛选条件
                "status": ""//状态，筛选条件
            },
        };
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

    componentDidMount() {
        this.startAnimation();
        this._didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({
                    focus: true,
                })
            }
        );
    }


    componentWillUnmount() {
        // 在页面消失的时候，取消监听
        this._didBlurSubscription && this._didBlurSubscription.remove();
    }


    startAnimation = () => {
        this.state.moveAnim.setValue(-18);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -168,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    //  识别二维码
    onBarCodeRead = (result) => {
        const { navigation } = this.props, { navigate } = navigation;
        const { data } = result;
        let redirect_uri = decodeURI(getQueryString("redirect_uri", data))
        let id = redirect_uri.split("=")[1];
        let { type } = route.params ? route.params : { type: undefined };
        if (type) {
            if (type == "repair") {
                this.setState({
                    focus: false,
                }, () => {
                    this.setNewState("checkRepairById", { id: id }, () => {
                        navigation.navigate("RepairAction", { title: "报修设备", type: "0", id: id })
                    })
                })
            } else {
                this.setState({
                    focus: false,
                }, () => {
                    this.setNewState("checkdetail", { equipmentId: id }, () => {
                        navigation.navigate("CheckAction", { title: "点检设备", id: id }) //设备id
                    })
                })

            }


        } else {
            this.setState({
                focus: false,
            }, () => {
                this.setNewState("checkById", { id: id }, () => {
                    navigation.navigate("InfoDeviceDetail", {
                        id: id
                    })
                })
            })
        }
    };



    render() {
        let { navigation, index: { formdata }, loading } = this.props, { postData, postUrl, focus, error } = this.state;

        let headerRight = () => {
            let { type } = route.params ? route.params : { type: undefined };
            if (type !== "check") {
                return <AntdIcons name="filter" size={22} style={{ color: colors.primaryColor }} onPress={() => {
                    let { postUrl, postData } = this.state;
                    this.setNewState(postUrl, postData, () => {
                        let res=this.props.index.res;
                        let formdatas = type == "repair" ? [{
                            key: "equipmentName",
                            type: "input",
                            require: false,
                            value: "",
                            hidden: false,
                            placeholder: "请输入设备名称"
                        }, {
                            key: "equipmentNo",
                            type: "input",
                            require: false,
                            value: "",
                            placeholder: "请输入设备编号"

                        }, {
                            key: "positionNo",
                            type: "input",
                            require: false,
                            value: "",
                            placeholder: "请输入设备位置号"
                        }] : [{
                            key: "equipmentName",
                            type: "input",
                            require: false,
                            value: "",
                            hidden: false,
                            placeholder: "请输入设备名称"
                        }, {
                            key: "equipmentNo",
                            type: "input",
                            require: false,
                            value: "",
                            placeholder: "请输入设备编号"

                        }, {
                            key: "positionNo",
                            type: "input",
                            require: false,
                            value: "",
                            placeholder: "请输入设备位置号"
                        }, {
                            key: "equipmentModel",
                            type: "input",
                            require: false,
                            value: "",
                            placeholder: "请输入设备型号"
                        }, {
                            key: "equipmentTypeId",
                            type: "treeselect",
                            require: false,
                            value: "",
                            placeholder: "请选择设备类型",
                            option: res.equipmentTypeTreeList
                        }, {
                            key: "departmentId",
                            type: "treeselect",
                            require: false,
                            value: "",
                            placeholder: "请选择部门",
                            option: res.departmentTreeList
                        }, {
                            key: "shopId",
                            type: "select",
                            require: false,
                            value: "",
                            placeholder: "请选择车间",
                            option: res.shopList && res.shopList.map((item) => {
                                return {
                                    dicName: item.shopName,
                                    dicKey: item.id
                                }
                            })
                        }]
                        this.setNewState("formdata", formdatas, () => {
                            navigation.navigate("SearchForm", {
                                backurl: type == "repair" ? "InfoDeviceCan" :
                                    type == "check" ? "InfoDeviceChe" : "InfoDevice"
                            })
                        })
                    })



                }} />
            } else {
                return null
            }


        }

        if (focus) {
            return <SafeAreaViewPlus loading={loading.effects[`index/${postUrl}`]}>
                <Header
                    navigation={navigation}
                    title="扫描二维码"
                    headerRight={headerRight}
                ></Header>
                <View flex-1 style={{ backgroundColor: "#F0F0F0" }}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        onCameraReady={()=>{
                        }}
                        autoFocus={RNCamera.Constants.AutoFocus.off}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        onBarCodeRead={this.onBarCodeRead}
                        focusDepth={1}
                        zoom={0.1}
                    >
                        <View style={styles.rectangleContainer}>
                            <ImageBackground style={styles.rectangle} source={require("../../assets/bordered.png")} resizeMode='contain' />
                            <Animated.View style={[
                                styles.border,
                                { transform: [{ translateY: this.state.moveAnim }] }]} />
                            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                        </View>
                    </RNCamera>
                </View>
            </SafeAreaViewPlus>

        } else {
            return error ? <SafeAreaViewPlus loading={loading.effects[`index/${postUrl}`]}>
                <Header
                    navigation={navigation}
                    title="扫描二维码"
                    headerRight={headerRight}
                ></Header>
                <View flex-1 center>
                    <Button size={"large"} style={{ width: width * 0.4, height: width * 0.4 }} onPress={() => {
                        this.setState({
                            focus: true
                        })
                    }} label={"重新扫描"}></Button>
                </View>
            </SafeAreaViewPlus> : <></>
        }


    }
}

export default gestureHandlerRootHOC(Scan);

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 166,
        alignSelf: "center",
        height: 2,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
    }
});