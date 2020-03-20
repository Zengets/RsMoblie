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
        "executeUserIdList": [2019071823690900342, 2019071732812649018, 2019071528531970467],//执行人id集合（必填）
        "sendUserIdList": [2019071823690900342, 2019071732812649018, 2019071528531970467],//抄送人id集合（非必填）
        "attachmentUrlList": [],//发布的附件地址集合（非必填）
        "remark": "获取10块生锈的铁片"//备注（非必填）

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
        let { index, navigation, loading } = this.props, {
            assignmentTitle, assignmentContent, attachmentUrlList, closeDate } = this.state,
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
            }



        return <SafeAreaViewPlus loading={loading.effects['index/noticetododetail']}>
            <Header title={`发布任务`} navigation={navigation}>
            </Header>

            <ScrollView keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
                style={{ padding: 12 }}
            >
                <View padding-12 style={{ backgroundColor: "#fff" }}>
                    <View marginB-page>
                        <TextField {...titleprops}></TextField>
                    </View>
                    <View marginB-page>
                        <Text style={{color:colors.primaryColor}}>* 任务内容</Text>
                        <View marginT-6  style={{ backgroundColor: "#f0f0f0", overflow: "hidden", borderRadius: 8 }} padding-8 paddingV-4>
                            <TextArea {...contentprops}></TextArea>
                        </View>
                    </View>
                    {/* <View marginB-page>
                        <Text dark10>任务类型</Text>
                        <View paddingV-8 row >
                           <Card padding-page style={{ backgroundColor: assignmentType=="1"?colors.primaryColor:"#f0f0f0" }} enableShadow={false} marginR-12 onPress={()=>{
                               this.setState({
                                assignmentType:"1"
                               })
                           }}>
                               <Text color={assignmentType=="1"?"#fff":"#000"}>任务</Text>
                           </Card>
                           <Card padding-page style={{ backgroundColor: assignmentType=="2"?colors.primaryColor:"#f0f0f0" }} enableShadow={false} onPress={()=>{
                               this.setState({
                                assignmentType:"2"
                               })
                           }}>
                               <Text color={assignmentType=="2"?"#fff":"#000"}>通知</Text>
                           </Card>
                        </View>
                    </View> */}
                    <DateTimePicker
                        locale='zh-CN'
                        title={<Text style={{color:colors.primaryColor}}>截止日期</Text>}
                        placeholder={'请选择'}
                        dateFormat={"YYYY-MM-DD"}
                        value={closeDate ? moment(closeDate).valueOf() : null}
                        mode={"date"}
                        minimumDate={moment().valueOf()}
                        onChange={(val) => {
                            this.setState({
                                closeDate:moment(val).format("YYYY-MM-DD")
                            })
                        }}
                    />

                    <Card paddingV-12 enableShadow={false} row spread style={{borderColor:"#ddd",borderBottomWidth:2,borderRadius:0,marginTop:-12}} marginB-page>
                        <Text style={{color:colors.primaryColor}}>选择执行人</Text>
                        <View row center>
                            <Text>张大鹏 </Text>
                            <AntIcons name='right' ></AntIcons>
                        </View>
                    </Card>


                    <SelectFiles navigation={navigation} getfiles={this.getfiles}></SelectFiles>

                </View>


            </ScrollView>




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