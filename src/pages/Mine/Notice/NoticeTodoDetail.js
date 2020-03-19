import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, downloadFile } from '../../../utils';

let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class NoticeTodoDetail extends React.Component {

    state = {
        url: ""
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
            id: this.props.navigation.state.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }


    render() {
        let { index: { noticetododetail }, navigation, loading } = this.props,
            {
                assignmentTitle, assignmentContent, closeDate, assignmentTypeName, statusName, publishUserName, publishTime,
                attachmentUrlList, remark, status
            } = noticetododetail.publish ? noticetododetail.publish : {},
            {
                executeUserName, executeContent, executeUrlList, assignmentUserType, auditUserName, id
            } = noticetododetail.myWork ? noticetododetail.myWork : {}



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
        }, statustypeName = { 1: "执行人", 2: "抄送人" }, ustatus =noticetododetail.myWork? noticetododetail.myWork.status:""

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
                            <Rows name="负责人" values={executeUserName} />
                            <Rows name="状态" rightRender={<View row center>
                                <Text subbody dark100 marginR-3 style={{ color: getColor(ustatus) }}>{noticetododetail.myWork&&noticetododetail.myWork.statusName}</Text>
                                <Badge size='small' backgroundColor={getColor(ustatus)}></Badge>
                            </View>} />
                            <Rows name="负责人类型" values={statustypeName[assignmentUserType]} />
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
                            <Rows name="确认人" values={auditUserName} />
                            <View padding-12>
                                {
                                    ustatus == 0 && assignmentUserType == 1 ?
                                        <Button label="开始任务"
                                        disabled={loading.effects[`index/noticetodostart`]}
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
                                            <Button label="完成任务"></Button> : null
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