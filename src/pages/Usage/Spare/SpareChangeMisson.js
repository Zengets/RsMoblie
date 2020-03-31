import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, TitleSearch, SpareChangeMissionItem } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors } from '../../../utils';
import { StyleSheet, ImageBackground, Animated } from 'react-native';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/sparechangemission'],
}))
class SpareChangeMisson extends React.Component {
    constructor(props) {
        super(props);
        let { key, value,equipmentNo } = props.navigation.state.params ? props.navigation.state.params : { key: "", value: "",equipmentNo:"" }
        this.state = {
            isLoadMore: true,
            height: new Animated.Value(45),
            refreshing: true,
            postUrl: "sparechangemission",
            search: true,
            showbtn: false,
            postData: key ? {
                "pageIndex": "1",  //--------页码*
                "pageSize": "10",  //--------每页条数*
                "equipmentName": "",//设备名，筛选条件
                "equipmentNo": equipmentNo?equipmentNo:"",//设备编号，筛选条件
                "sparePartsName": "",//备件名，筛选条件
                "sparePartsNo": "",//备件料号，筛选条件
                "planMaintainUserName": "",//执行人名，筛选条件
                "taskNo": "",//工单号，筛选条件
                "status": "",  //--------任务状态
                [key]: value
            } : {
                    "pageIndex": "1",  //--------页码*
                    "pageSize": "10",  //--------每页条数*
                    "equipmentName": "",//设备名，筛选条件
                    "equipmentNo": equipmentNo?equipmentNo:"",//设备编号，筛选条件
                    "sparePartsName": "",//备件名，筛选条件
                    "sparePartsNo": "",//备件料号，筛选条件
                    "planMaintainUserName": "",//执行人名，筛选条件
                    "taskNo": "",//工单号，筛选条件
                    "status": ""
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
                            resData: [{ items: this.props.index.sparechangemission.list }],
                            refreshing: false,
                            isLoadMore: false
                        })
                    } else {
                        this.setState({
                            resData: this.state.resData.concat([{ items: this.props.index.sparechangemission.list }]),
                            isLoadMore: false
                        })
                    }
                })
            })
        })
    }

    resetData = (yuan) => {
        let { index: { done, formdata } } = yuan
        function getVal(key) {
            let one = {};
            formdata.map((item) => {
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
        if (done == "1" && formdata.length > 0) {
            this.setState({
                postData: {
                    ...this.state.postData,
                    "pageIndex": "1",  //--------页码*
                    "pageSize": "10",  //--------每页条数*
                    "equipmentName": getVal("equipmentName"),//设备名，筛选条件
                    "equipmentNo": getVal("equipmentNo"),//设备编号，筛选条件
                    "sparePartsName": getVal("sparePartsName"),//备件名，筛选条件
                    "sparePartsNo": getVal("sparePartsNo"),//备件料号，筛选条件
                    "planMaintainUserName": getVal("planMaintainUserName"),//执行人名，筛选条件
                    "taskNo": getVal("taskNo"),//工单号，筛选条件
                    "status": getVal("status")
                },
            }, () => {
                this.onRefresh()
            })
        } else {
            this.getData()
        }

    }

    UNSAFE_componentWillReceiveProps(np) {
        if (this.props.index.done !== np.index.done) {
            this.resetData(np);
        }
    }


    componentDidMount() {
        this.resetData(this.props)
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
        if (!this.state.isLoadMore && this.props.index.sparechangemission.hasNextPage) {
            this.setState({
                isLoadMore: true,
                postData: {
                    ...this.state.postData,
                    pageIndex: this.props.index.sparechangemission.pageNum + 1
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

    changeData = (key, value) => {
        let { index: { formdata } } = this.props;
        let newformdata = formdata.map((item, i) => {
            if (item.key == key) {
                item.value = value
            } else {
            }
            return item
        })
        this.setNewState("formdata", newformdata)
    }



    render() {
        let { index: { res, formdata }, navigation, submitting } = this.props,
            { refreshing, search, postData, height, isLoadMore, showbtn } = this.state;
        let { key, title } = navigation.state.params ? navigation.state.params : { key: "", title: null }

        let searchprops = {
            height,
            navigation,
            placeholder: "输入工单号查询...",
            value: postData.taskNo,
            onChangeText: (val, ifs) => {
                this.setState({
                    postData: {
                        ...postData,
                        taskNo: val
                    }
                }, () => {
                    this.changeData("taskNo", val)
                    if (ifs) {
                        this.onRefresh()
                    }
                })
            },
            onSubmitEditing: () => {
                this.onRefresh()
            },
            handleFormData: (fn) => {
                let formdatas = [{
                    key: "taskNo",
                    type: "input",
                    require: false,
                    value: postData.taskNo,
                    placeholder: "请输入工单号"
                }, {
                    key: "equipmentName",
                    type: "input",
                    require: false,
                    value: postData.equipmentName,
                    placeholder: "请输入设备名"
                }, {
                    key: "equipmentNo",
                    type: "input",
                    require: false,
                    value: postData.equipmentNo,
                    placeholder: "请输入设备编号"
                }, {
                    key: "sparePartsName",
                    type: "input",
                    require: false,
                    value: postData.sparePartsName,
                    placeholder: "请输入备件名"
                }, {
                    key: "sparePartsNo",
                    type: "input",
                    require: false,
                    value: postData.sparePartsNo,
                    placeholder: "请输入备件料号"
                }, {
                    key: "planMaintainUserName",
                    type: "input",
                    require: false,
                    hidden: key?true:false,
                    value: postData.planMaintainUserName,
                    placeholder: "请输入执行人"
                }, {
                    key: "status",
                    type: "select",
                    require: false,
                    value: postData.status,
                    placeholder: "请筛选状态",
                    option: [{
                        dicName: "未开始",
                        dicKey: "0"
                    }, {
                        dicName: "进行中",
                        dicKey: "1"
                    }
                    ]
                }
                ]


                this.setNewState("formdata", formdata.length > 0 ? formdata : formdatas, () => {
                    fn ? fn() : null
                })
            }

        }

        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? <SpareChangeMissionItem item={item} navigation={this.props.navigation}></SpareChangeMissionItem> : <View></View>
        }

        return <SafeAreaViewPlus loading={submitting && isLoadMore && refreshing}>
            <Header
                navigation={navigation}
                title={title ? title : "备件更换任务"}
                rightwidth={70}
                headerRight={() => <Card height={"100%"} enableShadow={false} row center onPress={() => {
                    let postData = JSON.parse(JSON.stringify(this.state.postData));
                    for (let i in postData) {
                        if (i == "pageIndex") {
                            postData[i] = 1
                        } else if (i == "pageSize") {
                            postData[i] = 10
                        } else if (i == key) {

                        } else {
                            postData[i] = ""
                        }
                    }
                    this.setState({
                        postData
                    }, () => {
                        this.onRefresh()
                    })
                    let { index: { formdata } } = this.props;
                    let newformdata = formdata.map((item, i) => {
                        item.value = null
                        if (item.type == 'datetimepicker') {
                            item.maximumDate = undefined
                            item.minimumDate = undefined
                            item.value = ""
                        }
                        return item
                    })
                    this.setNewState("formdata", newformdata)
                }}>
                    <AntIcons name="reload1" size={14} />
                    <Text marginL-4>重置</Text>
                </Card>}
            >
            </Header>
            <View flex >
                <View style={{ padding: search ? 12 : 0, paddingBottom: 0 }}>
                    <TitleSearch {...searchprops}></TitleSearch>
                </View>
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
                    heightForIndexPath={() => 128}
                    allLoaded={!this.props.index.sparechangemission.hasNextPage}
                    loadingFooter={ChineseWithLastDateFooter}
                    onLoading={this.pullUpLoading}
                />
            </View>
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
export default SpareChangeMisson