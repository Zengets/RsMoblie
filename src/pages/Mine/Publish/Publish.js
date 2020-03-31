import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar, TextArea, TextField, DateTimePicker } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, SelectFiles, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';

import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, downloadFile } from '../../../utils';
import moment from 'moment';
let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class Publish extends React.Component {

    state = {
        "assignmentTitle": null,//任务标题（必填）
        "assignmentContent": "",//任务内容（必填）
        "closeDate": null,//截至日期（必填）
        "executeUserIdList": [],//执行人id集合（必填）
        "sendUserIdList": [],//抄送人id集合（非必填）
        "attachmentUrlList": [],//发布的附件地址集合（非必填）
        "remark": ""//备注（非必填）
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

    }

    getfiles = (val) => {
        this.setState({
            attachmentUrlList: val
        })
    }

    render() {
        let { index: { userlist, sendUserIdList, executeUserIdList }, navigation, loading } = this.props, {
            assignmentTitle, assignmentContent, attachmentUrlList, closeDate, remark } = this.state,
            textfieldprops = {
                floatingPlaceholder: true,
                floatOnFocus: true,
                underlineColor: "#ddd",
                floatingPlaceholderColor: {
                    default: colors.primaryColor,
                    error: colors.primaryColor,
                    focus: colors.primaryColor,
                    disabled: 'grey'
                },
            },
            titleprops = {
                ...textfieldprops,
                enableErrors: assignmentTitle == "",
                error: "任务标题为空",
                placeholder: "* 请填写任务标题",
                value: assignmentTitle,
                onChangeText: (val) => {
                    this.setState({
                        assignmentTitle: val
                    })
                }
            },
            contentprops = {
                title: "任务内容",
                placeholder: "请填写任务内容",
                value: assignmentContent,
                onChangeText: (val) => {
                    this.setState({
                        assignmentContent: val
                    })
                }
            }, remarkprops = {
                title: "备注",
                placeholder: "请填写备注",
                value: remark,
                onChangeText: (val) => {
                    this.setState({
                        remark: val
                    })
                }
            }



        return <SafeAreaViewPlus loading={loading.effects['index/noticetododetail']}>
            <Header title={`发布任务`} navigation={navigation}>
            </Header>

            <ScrollView keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
                style={{ padding: 12, margin: 12, backgroundColor: "#fff" }}
            >
                <View marginB-32>
                    <TextField {...titleprops}></TextField>
                </View>
                <View marginB-32>
                    <Text style={{ color: colors.primaryColor }}>* 任务内容</Text>
                    <View marginT-6 style={{ backgroundColor: "#f0f0f0", overflow: "hidden", borderRadius: 8 }} padding-8 paddingV-4>
                        <TextArea {...contentprops}></TextArea>
                    </View>
                </View>
                <View style={{ overflow: "hidden", height: 70 }}>
                    <DateTimePicker
                        locale='zh-CN'
                        title={<Text style={{ color: colors.primaryColor }}>* 截止日期</Text>}
                        placeholder={'请选择'}
                        dateFormat={"YYYY-MM-DD"}
                        value={closeDate ? moment(closeDate).valueOf() : null}
                        mode={"date"}
                        minimumDate={moment().valueOf()}
                        onChange={(val) => {
                            this.setState({
                                closeDate: moment(val).format("YYYY-MM-DD")
                            })
                        }}
                    />
                </View>
                <Card paddingV-12 enableShadow={false} row spread style={{ borderColor: "#ddd", borderBottomWidth: 1, borderRadius: 0, marginTop: 20 }} marginB-32 onPress={() => {
                    navigation.navigate("UserSelect", {
                        title: "选择执行人",
                        key: "executeUserIdList"
                    })
                }}>
                    <Text style={{ color: colors.primaryColor }}>* 选择执行人</Text>
                    <View row center>
                        <ScrollView horizontal={true}>
                            {
                                executeUserIdList ? executeUserIdList.map((it, i) => {
                                    let curitem = userlist.filter((its) => { return its.id == it })[0];
                                        curitem = curitem?curitem:{useName:""}
                                    if (curitem && i == 0) {
                                        return <Text>{curitem.userName} {executeUserIdList.length > 1 ? `等${executeUserIdList.length}人` : ""}</Text>
                                    }
                                }) : <Text>请选择 </Text>
                            }

                        </ScrollView>
                        <AntIcons name='right' ></AntIcons>
                    </View>
                </Card>
                <Card paddingV-12 enableShadow={false} row spread style={{ borderColor: "#ddd", borderBottomWidth: 1, borderRadius: 0, marginTop: 0 }} marginB-32 onPress={() => {
                    navigation.navigate("UserSelect", {
                        title: "选择抄送人",
                        key: "sendUserIdList"
                    })
                }}>
                    <Text style={{ color: colors.primaryColor }}>选择抄送人</Text>
                    <View row center>
                        <ScrollView horizontal={true}>
                            {
                                sendUserIdList ? sendUserIdList.map((it, i) => {
                                    let curitem = userlist.filter((its) => { return its.id == it })[0]
                                    if (curitem && i == 0) {
                                        return <Text>{curitem.userName} {sendUserIdList.length > 1 ? `等${sendUserIdList.length}人` : ""}</Text>
                                    }
                                }) : <Text>请选择 </Text>
                            }

                        </ScrollView>
                        <AntIcons name='right' ></AntIcons>
                    </View>
                </Card>
                <View marginB-32>
                    <Text style={{ color: colors.primaryColor }}>备注</Text>
                    <View marginT-6 style={{ backgroundColor: "#f0f0f0", overflow: "hidden", borderRadius: 8 }} padding-8 paddingV-4>
                        <TextArea {...remarkprops}></TextArea>
                    </View>
                </View>
                <SelectFiles color={colors.primaryColor} navigation={navigation} getfiles={this.getfiles}></SelectFiles>
                <View marginB-12></View>
            </ScrollView>
            <View padding-12 paddingT-0>
                <Button label={"提交"} disabled={loading.effects[`index/publish`]} onPress={()=>{
                    this.setNewState("publish",{
                        "assignmentTitle": assignmentTitle,//任务标题（必填）
                        "assignmentContent": assignmentContent,//任务内容（必填）
                        "closeDate": closeDate,//截至日期（必填）
                        "executeUserIdList": executeUserIdList,//执行人id集合（必填）
                        "sendUserIdList": sendUserIdList,//抄送人id集合（非必填）
                        "attachmentUrlList": attachmentUrlList,//发布的附件地址集合（非必填）
                        "remark": remark//备注（非必填）
                    },()=>{
                        navigation.navigate("Success", {
                            btn: [{
                                name: "返回个人中心",
                                url: "Mine",
                            },{
                                name: "查看我发布的任务",
                                url: "Mine",
                            }
                        ],
                            description: `任务：${assignmentTitle} 已发布！`
                        })
                    })


                }}>
                    {
                        loading.effects[`index/publish`] ?
                            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                            : null
                    }

                </Button>

            </View>




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

})


export default Publish