import React, { Component } from 'react';
import { RNCamera } from "react-native-camera"
import { SafeAreaViewPlus, OneToast, Header } from '../../components';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    Easing
} from 'react-native';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { colors,getQueryString } from '../../utils';
import { connect } from 'react-redux';


@connect(({ index,loading }) => ({ index,loading }))
class Scan extends Component {
    constructor(props) {
        super(props);
        let { type } = props.navigation.state.params ? props.navigation.state.params : { type: undefined };
        this.state = {
            moveAnim: new Animated.Value(-18),
            postUrl:type? 
                type=="repair"?"infodevice":"" 
                
                
                
                :"",
            postData:type? 
            type=="repair"?{
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
            }:{} 
            :{},
            
            
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
                return
            }
            fn ? fn() : null
        })
    }

    componentDidMount() {
        this.startAnimation();
        let { postUrl, postData } = this.state;
        this.setNewState(postUrl, postData)
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
        const { navigation } = this.props,{navigate} = navigation;
        const { data } = result;
        //navigate('Sale', {
        //    url: data
        //})
        let redirect_uri = decodeURI(getQueryString("redirect_uri",data))
        let id = redirect_uri.split("=")[1];
        let { type } = navigation.state.params ? navigation.state.params : { type: undefined };    
        if(type){

            alert(0)
        }else{
            alert(1)

        }


    };

    render() {
        let { navigation,index:{res,formdata},loading } = this.props,{postData,postUrl} =this.state;

        let headerRight = () => {
            let { type } = navigation.state.params ? navigation.state.params : { type: undefined };
            if (type) {
                return <AntdIcons name="filter" size={ 22 } style={ { color: colors.primaryColor } } onPress={ () => {
                    let formdatas = [{
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

                    this.setNewState("formdata", formdata.length > 0 ? formdata : formdatas, () => {
                        navigation.navigate("SearchForm",{backurl:"InfoDeviceCan"})
                    })


                } } />
            } else {
                return null
            }


        }


        return (<SafeAreaViewPlus loading={loading.effects[`index/${postUrl}`]}>
            <Header
                navigation={ navigation }
                title="扫描二维码"
                headerRight={ headerRight }


            ></Header>
            <View style={ styles.container }>
                <RNCamera
                    ref={ ref => {
                        this.camera = ref;
                    } }
                    style={ styles.preview }
                    type={ RNCamera.Constants.Type.back }
                    flashMode={ RNCamera.Constants.FlashMode.on }
                    onBarCodeRead={ this.onBarCodeRead }
                >
                    <View style={ styles.rectangleContainer }>
                        <ImageBackground style={ styles.rectangle } source={ require("../../assets/bordered.png") } resizeMode='contain' />
                        <Animated.View style={ [
                            styles.border,
                            { transform: [{ translateY: this.state.moveAnim }] }] } />
                        <Text style={ styles.rectangleText }>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        </SafeAreaViewPlus>

        );
    }
}

export default Scan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
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