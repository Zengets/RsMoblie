import React from 'react';
import { connect } from 'react-redux';
import { View, TextField, TextArea, Text, Card, Button, Colors, AnimatedImage } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors } from '../../../utils';
import { ActivityIndicator, Animated, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaViewPlus, Header, OneToast, SubmitForm, Rows, Empty } from '../../../components';
const styles = StyleSheet.create({
    item: {
        width: "100%",
        marginTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
    }
})

const loop = (data) => {
    let newdata = data.map((item) => {
        return {
            id: item.key,
            parentId: item.parentKey,
            name: item.title,
            children: item.children ? loop(item.children) : []
        }
    });
    return newdata
};

let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({ index, loading }))
class CheckAction extends React.Component {

    state = {
        item: []
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
        let { navigation } = this.props,
        { id } = navigation.state.params ? navigation.state.params : { id: "" };
        this.setNewState("checkdetail", { equipmentId: id }, () => {
            let { index: { checkdetail } } = this.props, { item, equipmentName, positionNo, equipmentNo, serialNo } = checkdetail ? checkdetail : {};
            this.setState({
                item: item,
            })
        })
    }

    //清空提交
    resetData = () => {
        this.setState({
            item: this.state.item.map((it)=>{
                it.pointCheckItemResultType = ""
                it.exceptionRecord = ''
                return it
            })
        })
    }



    render() {
        let { index: { checkdetail, userInfo }, navigation, loading } = this.props, { item } = this.state,
            { title, id } = navigation.state.params ? navigation.state.params : { title: "", id: "" },
            { equipmentName, positionNo, equipmentNo, serialNo } = checkdetail ? checkdetail : {},
            getdisabled = () => {
                let bools = true;
                return !bools
            }


        return <SafeAreaViewPlus
            loading={ loading.effects[`index/checkdetail`] }
        >
            <Header title={ title } navigation={ navigation }
                headerRight={ () => (<Card enableShadow={ false } paddingV-12 onPress={ this.resetData }>
                    <Text dark40>重置</Text>
                </Card>) }
            >
            </Header>
            <ScrollView style={ { padding: 12 } }>
                <Card borderRadius={ 8 } style={ { width: "100%" } } enableShadow={ false }>
                    <Rows name="工单号" values={ serialNo } />
                    <Rows name="设备名称" values={ equipmentName } />
                    <Rows name="设备编号" values={ equipmentNo } />
                    <Rows name="设备位置号" values={ positionNo } />
                </Card>
                <Card borderRadius={ 8 } marginV-12 marginB-24 padding-6 paddingB-0 style={ { width: "100%" } } enableShadow={ false }>
                    {
                        item && item.length > 0 ?
                            item.map((it, i) => {
                                let { pointCheckItem, normalReference, periodTypeName, pointCheckItemResultType, exceptionRecord, id } = it ? it : {}

                                return (
                                    <View marginB-12 style={ { borderRadius: 8, overflow: "hidden", borderColor: "#f9f9f9", borderWidth: 1 } }>
                                        <Rows name="点检项目" values={ pointCheckItem } noborder={ true } color={ colors.primaryColor }></Rows>
                                        <View style={ { borderRadius: 0, overflow: "hidden", backgroundColor: "#F9F9F9" } }>
                                            <Rows name="周期类型" values={ periodTypeName } noborder={ true }></Rows>
                                            <Rows name="正常参考" values={ normalReference } noborder={ true }></Rows>
                                            <View row spread style={ styles.item }>
                                                <View width={ 60 }>
                                                    <Text>是否异常:</Text>
                                                </View>
                                                <View flex-1 row right>
                                                    <Card width={ 60 } enableShadow={ false } style={ { backgroundColor: pointCheckItemResultType == "0" ? colors.primaryColor : "#a0a0a0" } } center padding-6 marginR-12 onPress={ () => {
                                                        let newitem = this.state.item.map((ko, j) => {
                                                            if (ko.id == id) {
                                                                ko.pointCheckItemResultType = "0"
                                                            }
                                                            return ko
                                                        })
                                                        this.setState({
                                                            item: newitem
                                                        })
                                                    } }>
                                                        <Text white>正常</Text>
                                                    </Card>
                                                    <Card width={ 60 } enableShadow={ false } style={ { backgroundColor: pointCheckItemResultType == "1" ? colors.primaryColor : "#a0a0a0" } } center padding-6 onPress={ () => {
                                                        let newitem = this.state.item.map((ko, j) => {
                                                            if (ko.id == id) {
                                                                ko.pointCheckItemResultType = "1"
                                                            }
                                                            return ko
                                                        })
                                                        this.setState({
                                                            item: newitem
                                                        })
                                                    } }>
                                                        <Text white>异常</Text>
                                                    </Card>
                                                </View>
                                            </View>
                                            {
                                                pointCheckItemResultType == "1" && <View row spread style={ styles.item }>
                                                    <View width={ 60 }>
                                                        <Text>异常记录:</Text>
                                                    </View>
                                                    <View flex-1 row right marginL-12>
                                                        <TextField
                                                            style={ { width: "100%", marginTop: -4 } }
                                                            placeholder={ "填写异常记录" }
                                                            value={ exceptionRecord }
                                                            onChangeText={ (value) => {
                                                                let newitem = this.state.item.map((ko, j) => {
                                                                    if (ko.id == id) {
                                                                        ko.exceptionRecord = value
                                                                    }
                                                                    return ko
                                                                })
                                                                this.setState({
                                                                    item: newitem
                                                                })
                                                            } }
                                                        />
                                                    </View>
                                                </View>
                                            }


                                        </View>


                                    </View>

                                )


                            })
                            :
                            <Empty />
                    }

                    <Button disabled={ getdisabled()||loading.effects[`index/checkaction`] } onPress={ () => {
                        let {item} = this.state,ifs=false,
                        postData = item.map((it,i)=>{
                            if(it.pointCheckItemResultType=="0"){
                                it.exceptionRecord = ""
                            }else if(it.pointCheckItemResultType=="1" && !it.exceptionRecord){
                                ifs = true
                            }
                            return {
                                pointCheckItemResultType:it.pointCheckItemResultType,
                                exceptionRecord:it.exceptionRecord,
                                equipmentPointCheckItemRelId:it.id,
                                serialNo:serialNo
                            }
                        })
                        if(ifs){
                            OneToast("点检异常需要填写异常记录...")
                            return
                        }
                        this.setNewState("checkaction", postData, () => {
                            navigation.navigate("Success", {
                                btn: [{
                                    name: "返回点检扫码",
                                    url: "Scan",
                                    params: {
                                        type: "check"
                                    }
                                }, {
                                    name: "跳转到我的点检",
                                    url: "Mine",
                                    params: {}
                                }],
                                description: `${equipmentName}已完成点检！`
                            })
                        })

                    } } marginV-12 backgroundColor={ colors.primaryColor }>
                        {
                            loading.effects[`index/checkaction`] ?
                                <ActivityIndicator color="white" style={ { paddingRight: 8 } } />
                                : null
                        }
                        <Text white marginV-4 body>{ getdisabled() ? "您没有操作权限" : "提交" }</Text>
                    </Button>



                </Card>



            </ScrollView>



        </SafeAreaViewPlus>
    }
}

export default CheckAction