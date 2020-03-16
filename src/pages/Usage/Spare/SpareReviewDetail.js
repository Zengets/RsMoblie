import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class SpareReviewDetail extends React.Component {

    state = {
    }

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

    resetdata() {
        this.setNewState("spareusagedetail", {
            id: this.props.navigation.state.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }


    render() {
        let { index, navigation, loading } = this.props,
            { sparePartsName, sparePartsNo, sparePartsTypeName, taskNo, consumeTypeName, consumeCount, equipmentName, equipmentNo,
                equipmentModel, consumeUserName, consumeTime, id
            } = index.spareusagedetail;

        return <SafeAreaViewPlus loading={loading.effects['index/spareusagedetail']}>
            <Header title={`备件使用历史详情`} navigation={navigation}>
            </Header>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
            >
                <View padding-12 paddingT-0>
                    <View style={{ overflow: "hidden" }} row={false} spread left>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="备件名" values={sparePartsName} />
                            <Rows name="料号" values={sparePartsNo} />
                            <Rows name="型号规格" values={sparePartsTypeName} noborder={true} />
                        </Card>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="工单号" values={taskNo} />
                            <Rows name="使用类型" values={consumeTypeName} />
                            <Rows name="使用数量" values={consumeCount?`${consumeCount}个`:""} />
                            <Rows name="设备名" values={equipmentName} />
                            <Rows name="设备编号" values={equipmentNo} />
                            <Rows name="设备型号" values={equipmentModel} />
                            <Rows name="使用人" values={consumeUserName} />
                            <Rows name="使用时间" values={consumeTime} />

                        </Card>




                    </View>
                </View>

            </ScrollView>




        </SafeAreaViewPlus>

    }
}

const styles = StyleSheet.create({
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
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
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


export default SpareReviewDetail