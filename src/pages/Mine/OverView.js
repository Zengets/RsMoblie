import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, Colors } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Rows, OneToast, Header, AuthBase, NoticeTodoItem, RepairItem,UpkeepItem,CheckItem,SpareReviewItem,SpareChangeMissionItem } from '../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { Dimensions, ScrollView, Alert, StyleSheet } from 'react-native';
import { colors, getItem } from '../../utils';


@connect(({ index, loading }) => ({ index, loading }))
class OverView extends React.Component {

    state = {
        taskType: "1"
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
            this.setNewState("done", "0", () => {
                this.setNewState("overview", { taskType: getVal("taskType") })
            })
        } else {
            this.setNewState("overview", { taskType: this.state.taskType })
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


    render() {
        let { index: { overview, formdata }, navigation,loading } = this.props,
            option = [
                {
                    dicName: "全部",
                    dicKey: "1"
                },
                {
                    dicName: "我的发布(审核)",
                    dicKey: "2"
                },
                {
                    dicName: "任务通知(未完成)",
                    dicKey: "3"
                },
                {
                    dicName: "我的维修(未完成)",
                    dicKey: "4"
                },
                {
                    dicName: "我的维保(未完成)",
                    dicKey: "5"
                },
                {
                    dicName: "我的点检(异常处理)",
                    dicKey: "6"
                },
                {
                    dicName: "我的备件(审批)",
                    dicKey: "7"
                },
                {
                    dicName: "我的备件(更换任务)",
                    dicKey: "8"
                },
            ],
            renderItem = (item) => {
                // * 2：任务发布-审核
                // * 3：任务通知-待办
                // * 4：维修-待办
                // * 5：维保-待办
                // * 6：点检-异常处理
                // * 7：备件-审批
                // * 8：备件-更换任务

                let dicName = option.filter((it) => { return it.dicKey == item.taskType })[0].dicName
                if (item.taskType == "2") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <NoticeTodoItem item={item} navigation={this.props.navigation} type="history"></NoticeTodoItem>
                    </View>
                } else if (item.taskType == "3") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <NoticeTodoItem item={item} navigation={this.props.navigation} type="history"></NoticeTodoItem>
                    </View>
                } else if (item.taskType == "4") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <RepairItem pressfn={() => {
                            navigation.navigate("RepairAction", { title: "开始维修", type: item.status.toString(), id: item.equipmentId })
                        }} item={item} navigation={this.props.navigation}></RepairItem>
                    </View>
                }else if (item.taskType == "5") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <UpkeepItem item={item} navigation={this.props.navigation} type="mission"></UpkeepItem>
                    </View>
                }else if (item.taskType == "6") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <CheckItem item={item} navigation={this.props.navigation} type="error"></CheckItem>
                    </View>
                }else if (item.taskType == "7") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <SpareReviewItem item={item} navigation={this.props.navigation} ></SpareReviewItem>
                    </View>
                }else if (item.taskType == "8") {
                    return <View bg-white marginB-12>
                        <Rows name="类型" values={dicName}></Rows>
                        <SpareChangeMissionItem item={item} navigation={this.props.navigation}></SpareChangeMissionItem>
                    </View>
                }





            }

        return (
            <SafeAreaViewPlus loading={loading.effects['index/overview']}>
                <Header
                    navigation={navigation}
                    title="我的待办"
                    headerRight={() => <View>
                        <AntIcons name="filter" size={22} onPress={() => {
                            let formdatas = [{
                                key: "taskType",
                                type: "select",
                                require: false,
                                value: { name: "全部", id: "1" },
                                collspan: true,
                                placeholder: "请选择设备类型",
                                option: option
                            }]

                            this.setNewState("formdata", formdata.length > 0 ? formdata : formdatas, () => {
                                navigation.navigate("SearchForm")
                            })

                        }} />
                    </View>}
                />
                <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 12 }}>
                    {
                        overview && overview.length > 0 ?
                            overview.map((item, i) => {
                                return renderItem(item, i)
                            }) :
                            null
                    }


                </ScrollView>



            </SafeAreaViewPlus>
        )

    }


}


export default OverView