import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/sparelogdetail'],
}))
class SpareLogDetail extends React.Component {

    state = {
        selectedIndex: 0
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

    componentDidMount() {
        this.setNewState("sparelogdetail", {
            id: this.props.navigation.state.params.id
        }, () => {
            console.log(this.props.index.sparelogdetail, "214564564564")
        })
    }

    render() {
        let { index, navigation, submitting } = this.props,
            { sparePartsName, sparePartsTypeName, sparePartsNo, sparePartsValue, recordNo, ioType, ioTypeName, batchCount, dealUserName, dealTime, remark, beforeStock, currentStock } = index.sparelogdetail;
        let getColor = (item) => {
            let color = "#43c4cc"
            switch (item) {
                case "0":
                    color = colors.primaryColor;
                    break;
                case "1":
                    color = colors.warnColor;
                    break;
            }
            return color
        }, statusName = { 0: "入库", 1: "出库" };

        return <SafeAreaViewPlus loading={ submitting }>
            <Header title={ `出入库详情` } navigation={ navigation }>
            </Header>
            <ScrollView  keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={ false }
                ref={ (scrollview) => this.scrollview = scrollview }
            >
                <View padding-12 paddingT-0>
                    <View style={ { overflow: "hidden" } } row={ false } spread left>
                        <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                            <Rows name="单号" values={ recordNo } />
                            <Rows name="备件名" values={ sparePartsName } />
                            <Rows name="料号" values={ sparePartsNo } />
                            <Rows name="型号规格" values={ sparePartsTypeName } />
                            <Rows name="备件价值" values={ sparePartsValue?sparePartsValue+"元":"" }  noborder={true}/>
                        </Card>
                        <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
                            <Rows name="出入库:" rightRender={ <View row center>
                                <Text subbody dark100 marginR-3 style={ { color: getColor(ioType) } }>{ ioTypeName }</Text>
                                <Badge size='small' backgroundColor={ getColor(ioType) }></Badge>
                            </View> } />
                            <Rows name={ ioType == "0" ? "入库数量" : ioType == "1" ? "出库数量" : "" } values={ batchCount } />
                            <Rows name="操作前库存" values={ beforeStock } />
                            <Rows name="操作后库存" values={ currentStock } />
                            <Rows name="处理人" values={ dealUserName } />
                            <Rows name="处理时间" values={ dealTime } />
                            <Rows name="备注" values={ remark } noborder={true}/>

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


export default SpareLogDetail