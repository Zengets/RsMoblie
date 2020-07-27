import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar, TextArea } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, SelectFiles, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, downloadFile } from '../../../utils';
//http://view.xdocin.com/xdoc?_xdoc=
let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class NoticeTodoDetail extends React.Component {

    state = {
        url: "",
        content: "",
        files: [],
        auditStatus: ""
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
        this.setNewState("noticetododetail", {
            id: this.props.route.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }

    getfiles = (val) => {
        this.setState({
            files: val
        })
    }

    render() {
        let { index: { noticetododetail , userInfo }, navigation, loading } = this.props, { content, files, auditStatus } = this.state,
            {
                assignmentTitle, assignmentContent, closeDate, assignmentTypeName, statusName, publishUserName, publishTime,executeFinishTime,auditTime,attachmentUrlList, remark, status
            } = noticetododetail?.publish ? noticetododetail?.publish : {},
            {
                executeUserName,executeUserId, executeContent, executeUrlList, assignmentUserType, auditUserName, id
            } = noticetododetail?.myWork ? noticetododetail?.myWork : {},
            textareaprops = {
                title: "执行内容",
                placeholder: "请填写执行内容",
                value: content,
                onChangeText: (val) => {
                    this.setState({
                        content: val
                    })
                }
            }



        let getColor = (item) => {
            let color = "#43c4cc"
            switch (item) {
                case 0:
                    color = "#999";
                    break;
                case 1:
                    color = "#5477ff";
                    break;
                case 2:
                    color = "#cc0d01";
                    break;
                case 3:
                    color = colors.errorColor;
                    break;
                case 4:
                    color = "#54bbff";
                    break;
                case 5:
                    color = "#999999";
                    break;
            }
            return color
        }, statustypeName = { 1: "执行人", 2: "抄送人" }, ustatus = noticetododetail?.myWork ? noticetododetail?.myWork.status : "",
        disabled = userInfo.id !== executeUserId;

        return <SafeAreaViewPlus loading={loading.effects['index/noticetododetail']}>
            <Header title={`任务详情`} navigation={navigation}>
            </Header>

            <ScrollView keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
            >
                <View padding-12 paddingT-0>
                    <View style={{ overflow: "hidden" }} row={false} spread left>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="标题" values={assignmentTitle} />
                            <Rows name="内容" values={assignmentContent} />
                            <Rows name="截止日期" values={closeDate} />
                            <Rows name="类型" values={assignmentTypeName} />
                            <Rows name="发布人" values={publishUserName} />
                            <Rows name="发布时间" values={publishTime} />
                            <Rows name="备注" values={remark} />
                            <Rows name={`附件(${attachmentUrlList && attachmentUrlList.length}):`} rightRender={<View row >
                                {
                                    attachmentUrlList &&
                                    attachmentUrlList.map((it, i) => {
                                        return (
                                            <Card enableShadow={false}
                                                style={{ backgroundColor: colors.primaryColor }}
                                                paddingH-12 paddingV-6
                                                marginL-12
                                                onPress={() => {
                                                    navigation.navigate("PreView", {
                                                        url: it,
                                                        type: it.split(".")[it.split(".").length - 1]
                                                    })
                                                }}>
                                                <Text white>附件{i + 1}</Text>
                                            </Card>
                                        )
                                    })}

                            </View>} />
                        </Card>

                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows color={assignmentUserType == 1 ? colors.primaryColor : colors.warnColor} name={statustypeName[assignmentUserType]} values={executeUserName} />
                            <Rows name="状态" rightRender={<View row center>
                                <Text subbody dark100 marginR-3 style={{ color: getColor(ustatus) }}>{noticetododetail?.myWork && noticetododetail?.myWork.statusName}</Text>
                                <Badge size='small' backgroundColor={getColor(ustatus)}></Badge>
                            </View>} />
                            <Rows name="执行内容" values={executeContent} />
                            <Rows name={`附件(${executeUrlList && executeUrlList.length}):`} rightRender={<View row >
                                {
                                    executeUrlList &&
                                    executeUrlList.map((it, i) => {
                                        return (
                                            <Card enableShadow={false}
                                                style={{ backgroundColor: colors.primaryColor }}
                                                paddingH-12 paddingV-6
                                                marginL-12
                                                onPress={() => {
                                                    navigation.navigate("PreView", {
                                                        url: it,
                                                        type: it.split(".")[it.split(".").length - 1]
                                                    })
                                                }}>
                                                <Text white>附件{i + 1}</Text>
                                            </Card>
                                        )
                                    })}

                            </View>} />
                            <Rows name="完成时间" values={executeFinishTime} />
                            <Rows name="确认人" values={auditUserName} />
                            <Rows name="确认时间" values={auditTime} />
                            <View padding-12>
                                {
                                    ustatus == 0 && assignmentUserType == 1 ?
                                        <Button label={disabled?"您没有权限操作":"开始任务"}
                                            disabled={loading.effects[`index/noticetodostart`]||disabled }
                                            onPress={() => {
                                                this.setNewState("noticetodostart", { id: id }, () => {
                                                    this.resetdata();
                                                    OneToast("该任务已开始！")
                                                })
                                            }}>
                                            {
                                                loading.effects[`index/noticetodostart`] ?
                                                    <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                                    : null
                                            }
                                        </Button> :
                                        ustatus == 1 || ustatus == 3 ?
                                            <View>
                                                <Text marginB-12 subheading style={{ color: colors.warnColor }}>填写完成任务信息</Text>
                                                <Text dark10>执行内容</Text>
                                                <View marginT-6 marginB-12 style={{ backgroundColor: "#f0f0f0", overflow: "hidden", borderRadius: 8 }} padding-8 paddingV-4>
                                                    <TextArea {...textareaprops}></TextArea>
                                                </View>
                                                <SelectFiles navigation={navigation} getfiles={this.getfiles}></SelectFiles>
                                                <Button marginT-8 label={disabled?"您没有权限操作":"完成任务"}
                                                    disabled={loading.effects[`index/noticetodosubmit`]||disabled}
                                                    onPress={() => {
                                                        this.setNewState("noticetodosubmit", {
                                                            id: id,
                                                            executeUrlList: files,
                                                            executeContent: content
                                                        }, () => {
                                                            navigation.navigate("Success", {
                                                                btn: [{
                                                                    name: "返回未完成任务列表",
                                                                    url: "NoticeTodo",
                                                                }],
                                                                description: `任务：${assignmentTitle}已完成请等待审核！`
                                                            })
                                                        })
                                                    }}>
                                                    {
                                                        loading.effects[`index/noticetodosubmit`] ?
                                                            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                                            : null
                                                    }
                                                </Button>
                                            </View>
                                            :
                                            ustatus == 2?
                                            <View>
                                                <Text marginB-12 subheading style={{ color: colors.warnColor }}>验证该任务</Text>
                                                <View row marginB-12>
                                                    <Card enableShadow={false} padding-12 style={{ backgroundColor: auditStatus == 1 ? colors.primaryColor : "#999" }} onPress={() => {
                                                        this.setState({
                                                            auditStatus: 1
                                                        })
                                                    }}>
                                                        <Text white>通过</Text>
                                                    </Card>
                                                    <Card marginL-12 enableShadow={false} padding-12 style={{ backgroundColor: auditStatus == 2 ? colors.primaryColor : "#999" }} onPress={() => {
                                                        this.setState({
                                                            auditStatus: 2
                                                        })
                                                    }}>
                                                        <Text white>不通过</Text>
                                                    </Card>
                                                </View>
                                                <Button label="提交" 
                                                disabled={loading.effects[`index/publishaudit`]}
                                                    onPress={() => {
                                                        if(!auditStatus){
                                                            OneToast("请选择验证结果")
                                                            return
                                                        }
                                                        this.setNewState("publishaudit", {
                                                            id: id,
                                                            auditStatus:auditStatus
                                                        }, () => {
                                                            navigation.navigate("Success", {
                                                                btn: [{
                                                                    name: "返回个人中心",
                                                                    url: "Mine",
                                                                }],
                                                                description: `任务：${assignmentTitle}已完成审核！`
                                                            })
                                                        })
                                                    }}>
                                                    {
                                                        loading.effects[`index/noticetodosubmit`] ?
                                                            <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                                            : null
                                                    }
                                                </Button>
                                            </View>
                                            :null    

                                }


                            </View>
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


export default NoticeTodoDetail