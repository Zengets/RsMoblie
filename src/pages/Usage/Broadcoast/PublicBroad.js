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
class PublicBroad extends React.Component {

    state = {
        "announcementTitle": null,//通知公告标题（必填）
        "announcementContent": "",//通知公告内容（必填）
        "urlIds": [],//发布的附件地址集合（非必填）
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
            urlIds: val
        })
    }

    render() {
        let { index: { userlist, sendUserIdList, executeUserIdList }, navigation, loading } = this.props, {
            announcementTitle, announcementContent, urlIds, closeDate, remark } = this.state,
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
                enableErrors: announcementTitle == "",
                error: "通知公告标题为空",
                placeholder: "* 请填写通知公告标题",
                value: announcementTitle,
                onChangeText: (val) => {
                    this.setState({
                        announcementTitle: val
                    })
                }
            },
            contentprops = {
                title: "通知公告内容",
                placeholder: "请填写通知公告内容",
                value: announcementContent,
                onChangeText: (val) => {
                    this.setState({
                        announcementContent: val
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
            <Header title={`发布通知公告`} navigation={navigation}>
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
                    <Text style={{ color: colors.primaryColor }}>* 通知公告内容</Text>
                    <View marginT-6 style={{ backgroundColor: "#f0f0f0", overflow: "hidden", borderRadius: 8 }} padding-8 paddingV-4>
                        <TextArea {...contentprops}></TextArea>
                    </View>
                </View>
                <SelectFiles color={colors.primaryColor} navigation={navigation} getfiles={this.getfiles}></SelectFiles>
                <View marginB-12></View>
            </ScrollView>
            <View padding-12 paddingT-0>
                <Button label={"提交"} disabled={loading.effects[`index/publish`]} onPress={()=>{
                    this.setNewState("broadsave",{
                        "announcementTitle": announcementTitle,//通知公告标题（必填）
                        "announcementContent": announcementContent,//通知公告内容（必填）
                        "urlIds": urlIds,//发布的附件地址集合（非必填）
                    },()=>{
                        navigation.navigate("Success", {
                            btn: [{
                                name: "继续发布",
                                back: true,
                            },{
                                name: "通知公告列表",
                                url: "BroadList",
                            }
                        ],
                            description: `通知公告：${announcementTitle} 已发布！`
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


export default PublicBroad