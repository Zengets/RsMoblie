import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton, Avatar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, SubmitForm, SpareReviewUserItem, Rows } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors, ConvertPinyin } from '../../../utils';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';

let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class SpareReviewDetail extends React.Component {
    constructor(props) {
        super(props);
        let { id, type } = props.navigation.state.params ? props.navigation.state.params : {};
        this.state = {
            isLoadMore: true,
            refreshing: true,
            postUrl: "sparereviewdetail",
            search: true,
            visible: false,
            showbtn: false,
            postData: {
                "pageIndex": "1",  //--------页码*
                "pageSize": "10",  //--------每页条数*
                id
            },
            resData: [{ items: [] }]
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
                return
            }
            fn ? fn() : null
        })
    }


    //获取数据
    getData() {
        this.setState({
            postData: {
                ...this.state.postData,
                pageIndex: this.state.refreshing ? 1 : this.state.postData.pageIndex
            }
        }, () => {
            let { postUrl, postData, refreshing } = this.state;
            this.setNewState(postUrl, postData, () => {
                this.setNewState("done", "0", () => {
                    this._list.endRefresh();//结束刷新状态
                    this._list.endLoading();
                    if (refreshing) {
                        this.setState({
                            resData: [{ items: this.props.index.sparereviewdetail.list }],
                            refreshing: false,
                            isLoadMore: false
                        })
                    } else {
                        this.setState({
                            resData: this.state.resData.concat([{ items: this.props.index.sparereviewdetail.list }]),
                            isLoadMore: false
                        })
                    }
                })
            })
        })
    }

    componentDidMount() {
        this.onRefresh();
    }

    //下拉刷新,更改状态，重新获取数据
    onRefresh(draw) {
        this.setState({
            refreshing: true,
            isLoadMore: draw ? false : true
        }, () => {
            this.getData();
        });
    }

    //上拉加载
    pullUpLoading = () => {
        if (!this.state.isLoadMore && this.props.index.sparereviewdetail.hasNextPage) {
            this.setState({
                isLoadMore: true,
                postData: {
                    ...this.state.postData,
                    pageIndex: this.props.index.sparereviewdetail.pageNum + 1
                }
            }, () => {
                this.getData()
            })
        }
    }

    //返回顶部
    scrollToTop = () => {
        this._list && this._list.scrollTo({ x: 0, y: 0 }).then().catch();
    }

    render() {
        let { index: { res, submitdata, userInfo }, navigation, loading } = this.props,
            { refreshing, search, postData, isLoadMore, showbtn, visible } = this.state,
            { applyUserName, applyTime, applyTypeName, remark, totalSparePartsValue, status, auditUserName, auditResultTypeName, auditOpinion, auditTime, taskNo, auditUserId } = res.data ? res.data : {},
            getColor = (item) => {
                let color = "#43c4cc"
                switch (item) {
                    case 0:
                        color = "#ff5800";
                        break;
                    case 1:
                        color = "#5477ff";
                        break;
                    case 2:
                        color = "#cc0d01";
                        break;
                    case 3:
                        color = "#43c4cc";
                        break;
                    case 4:
                        color = "#54bbff";
                        break;
                    case 5:
                        color = "#999999";
                        break;
                }
                return color
            }, statusName = { 0: "待审批", 1: "审批通过", 2: "审批未通过", 3: "撤回" }, disabled = userInfo.id !== auditUserId,
            { type } = navigation.state.params ? navigation.state.params : {};


        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? <SpareReviewUserItem item={item} navigation={this.props.navigation} type="history"></SpareReviewUserItem> : <View></View>
        }

        return <SafeAreaViewPlus loading={loading.effects['index/sparereviewdetail'] && isLoadMore && refreshing}>
            <Header
                navigation={navigation}
                title="备件审批"
                rightwidth={120}
                headerRight={() => (status == 0 ? null : <Card row center enableShadow={false} onPress={() => {
                    this.setState({
                        visible: true
                    })
                }}><AntIcons name='filetext1' size={13} style={{ color: colors.warnColor }}></AntIcons><Text subbody style={{ color: colors.warnColor }}> 审批信息</Text></Card>)}
            >
            </Header>

            <Modal
                visible={visible}
                height={height * 0.7}
                hide={() => {
                    this.setState({
                        visible: false
                    })
                }}
                title={status == 0 ? "审批" : "审批信息"}
            >
                {
                    status == 0 ? <View flex-1 row center paddingV-12>
                        <SubmitForm></SubmitForm>
                    </View> : <View row center padding-12>
                            <Card center enableShadow={false} flex-1 borderRadius={0}>
                                <Rows name="审批人" values={auditUserName}></Rows>
                                <Rows name="审批结果" values={auditResultTypeName}></Rows>
                                <Rows name="审批说明" values={auditOpinion}></Rows>
                                <Rows name="审批时间" values={auditTime}></Rows>
                                <Rows name="审批时间" values={auditTime}></Rows>
                            </Card>
                        </View>
                }
                {
                    status == 0 && <View padding-12 right>
                        <Button label="提交" disabled={loading.effects['index/spareaudit']} backgroundColor={colors.primaryColor}
                            onPress={() => {
                                function getVal(key) {
                                    let one = {};
                                    console.log()
                                    submitdata.map((item) => {
                                        if (item.key == key) {
                                            one = item
                                        }
                                    });
                                    if (!one.type) {
                                        return
                                    }
                                    if (one.type.indexOf("select") == -1) {
                                        return one.value && one.value
                                    } else {
                                        return one.value && one.value.id
                                    }
                                }
                                let postDatas = {
                                    id: postData.id,
                                    auditResultType: getVal("auditResultType"),//审批结果0通过   1不通过，必填
                                    auditOpinion: getVal("auditOpinion")//审批意见，通过时非必填
                                }
                                this.setNewState("spareaudit", postDatas, () => {
                                    navigation.navigate("Success", {
                                        btn: [{
                                            name: "返回审批列表",
                                            url: "SpareReview",
                                        }, {
                                            name: "跳转到我的审批",
                                            url: "Mine",
                                            params: {}
                                        }],
                                        description: `${taskNo}已完成审批！`,
                                    })

                                })

                            }}
                        >
                            {
                                loading.effects[`index/spareaudit`] ?
                                    <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                    : null
                            }
                        </Button>
                    </View>

                }

            </Modal>

            <View row center style={{ borderColor: "#f0f0f0", borderTopWidth: 1, marginBottom: 10 }}>
                <Card center enableShadow={false} flex-1 borderRadius={0}>
                    <Rows name={"工单:" + taskNo} rightRender={<View row center>
                        <Text subbody dark100 marginR-3 style={{ color: getColor(status) }}>{statusName[status]}</Text>
                        <Badge size='small' backgroundColor={getColor(status)}></Badge>
                    </View>}></Rows>
                    <Rows name="申请人" values={applyUserName}></Rows>
                    <Rows name="申请时间" values={applyTime}></Rows>
                    <Rows name="申请类型" values={applyTypeName}></Rows>
                    <Rows name="申请说明" values={remark}></Rows>
                    <Rows name="总价值" values={totalSparePartsValue ? totalSparePartsValue + "元" : ""}></Rows>
                </Card>
            </View>


            <View flex>
                <Text marginL-12 marginB-12 dark10>申请的备件列表</Text>
                <LargeList
                    onScroll={({ nativeEvent: { contentOffset: { x, y } } }) => {
                        if (y > 400) {
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
                    ref={ref => (this._list = ref)}
                    onRefresh={() => { this.onRefresh("0") }} //刷新操作
                    refreshHeader={ChineseWithLastDateHeader}
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 0, marginTop: -3 }}
                    data={this.state.resData}
                    renderIndexPath={renderItem}//每行
                    heightForIndexPath={() => 108}
                    allLoaded={!this.props.index.sparereviewdetail.hasNextPage}
                    loadingFooter={ChineseWithLastDateFooter}
                    onLoading={this.pullUpLoading}
                />
            </View>


            {
                status == 0 ? type != "applyUserId" ? <View row center padding-12><Button label={disabled ? "审批人:" + auditUserName : "审批"} disabled={disabled} flex-1 onPress={() => {
                    let submitdata = [
                        {
                            key: "auditResultType",
                            type: "select",
                            require: true,
                            value: "",
                            placeholder: "请选择审批状态",
                            option: [{
                                dicName: "审批通过",
                                dicKey: "0"
                            }, {
                                dicName: "审批不通过",
                                dicKey: "1"
                            }]
                        }, {
                            key: "auditOpinion",
                            type: "textarea",
                            require: false,
                            value: "",
                            placeholder: "请输入审批意见",
                        },

                    ]

                    this.setNewState("submitdata", submitdata, () => {
                        this.setState({
                            visible: true
                        })
                    })

                }}>

                </Button>
                </View> :
                    <View row center padding-12>
                        <Button label={"撤回"} disabled={loading.effects[`index/sparerecall`]} flex-1 onPress={() => {
                            this.setNewState("sparerecall",{id:postData.id},()=>{
                                navigation.navigate("Success", {
                                    btn: [{
                                        name: "返回我的备件(申请/回冲记录)",
                                        url: "SpareReview",
                                        params:{ key: "applyUserId", value: userInfo.id, title: "我的备件(申请/回冲记录)" }
                                    }],
                                    description: `工单：${taskNo}已撤回！`
                                })

                            })

                        }}>
                            {
                                loading.effects[`index/sparerecall`] ?
                                    <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                    : null
                            }
                        </Button>
                    </View> : null
            }



            {
                showbtn && <ActionButton
                    size={38}
                    hideShadow={true}
                    bgColor={"transparent"}
                    buttonColor={colors.primaryColor}
                    offsetX={10}
                    onPress={this.scrollToTop}
                    renderIcon={() => <AntIcons name='up' style={{ color: Colors.white }} size={16} />}
                />
            }


        </SafeAreaViewPlus>

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        paddingTop: 78,
        fontSize: 18,
        color: "#666"
    },
})
export default SpareReviewDetail