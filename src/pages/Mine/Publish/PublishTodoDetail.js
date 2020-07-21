import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar, TextArea } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, SelectFiles, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, downloadFile } from '../../../utils';
//http://view.xdocin.com/xdoc?_xdoc=
let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class PublishTodoDetail extends React.Component {

    state = {
        url: "",
        ismore: false
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
        this.setNewState("publishtododetail", {
            id: this.props.route.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }


    render() {
        let { index: { publishtododetail }, navigation, loading } = this.props, { ismore } = this.state,
            {
                assignmentTitle, assignmentContent, closeDate, statusName, publishUserName, publishTime,
                attachmentUrlList, remark, status, executeList, sendList
            } = publishtododetail ? publishtododetail : {}

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
        }, statustypeName = { 1: "执行人", 2: "抄送人" }, cardwidth = (width - 96) / 5

        return <SafeAreaViewPlus loading={loading.effects['index/publishtododetail']}>
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
                            <Rows name="状态" rightRender={<View row center>
                                <Text subbody dark100 marginR-3 style={{ color: getColor(status) }}>{statusName}</Text>
                                <Badge size='small' backgroundColor={getColor(status)}></Badge>
                            </View>} />
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

                        <Text body marginT-12>任务执行人:</Text>
                        <Card row marginT-6 style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }} padding-12 paddingB-0 enableShadow={false}>
                            {
                                executeList && executeList.length > 0 ?
                                    executeList.map((item, i) => {
                                        if (ismore) {
                                            return <Card paddingV-12 marginR-12 marginB-12 style={{ backgroundColor: item.status == 2 ? getColor(item.status) : "transparent", borderColor: getColor(item.status), borderWidth: 1 }} width={cardwidth} height={cardwidth} enableShadow={false} center onPress={() => {
                                                navigation.navigate("NoticeTodoDetail",item)
                                            }}>
                                                <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.executeUserName}</Text>
                                                <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.statusName}</Text>
                                            </Card>
                                        } else {
                                            if (i < 9) {
                                                return <Card paddingV-12 marginR-12 marginB-12 style={{ backgroundColor: item.status == 2 ? getColor(item.status) : "transparent", borderColor: getColor(item.status), borderWidth: 1 }} width={cardwidth} height={cardwidth} enableShadow={false} center onPress={() => {
                                                    navigation.navigate("NoticeTodoDetail",item)
                                                }}>
                                                    <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.executeUserName}</Text>
                                                    <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.statusName}</Text>
                                                </Card>
                                            }
                                        }

                                    }) : <Empty><View height={12}><Text></Text></View></Empty>
                            }
                            {
                                executeList&&executeList.length>10?
                                <Card height={cardwidth} paddingV-12 marginR-12 marginB-12 style={{ backgroundColor: !ismore ? colors.primaryColor : colors.textColor }} width={cardwidth} enableShadow={false} center onPress={() => {
                                    this.setState({
                                        ismore: !ismore
                                    })
                                }}>
                                    {
                                        ismore ? <AntdIcons name="swapleft" size={24} style={{ color: "#fff" }}></AntdIcons> : <AntdIcons name="swapright" size={24} style={{ color: "#fff" }}></AntdIcons>
                                    }
                                </Card>:null
                            }
                        </Card>


                        <Text body marginT-12>抄送人:</Text>
                        <Card row marginT-6 style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }} padding-12 paddingB-0 enableShadow={false}>
                            {
                                sendList && sendList.length > 0 ?
                                sendList.map((item, i) => {
                                        if (ismore) {
                                            return <Card paddingV-12 marginR-12 marginB-12 style={{ backgroundColor: item.status == 2 ? getColor(item.status) : "transparent", borderColor: getColor(item.status), borderWidth: 1 }} width={cardwidth} height={cardwidth} enableShadow={false} center>
                                                <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.executeUserName}</Text>
                                                <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.statusName}</Text>
                                            </Card>
                                        } else {
                                            if (i < 9) {
                                                return <Card paddingV-12 marginR-12 marginB-12 style={{ backgroundColor: item.status == 2 ? getColor(item.status) : "transparent", borderColor: getColor(item.status), borderWidth: 1 }} width={cardwidth} height={cardwidth} enableShadow={false} center>
                                                    <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.executeUserName}</Text>
                                                    <Text style={{ color: item.status == 2 ? "#fff" : getColor(item.status) }}>{item.statusName}</Text>
                                                </Card>
                                            }
                                        }

                                    }) : <Empty><View height={12}><Text></Text></View></Empty>
                            }
                            {
                                sendList&&sendList.length>10?
                                <Card height={cardwidth} paddingV-12 marginR-12 marginB-12 style={{ backgroundColor: !ismore ? colors.primaryColor : colors.textColor }} width={cardwidth} enableShadow={false} center onPress={() => {
                                    this.setState({
                                        ismore: !ismore
                                    })
                                }}>
                                    {
                                        ismore ? <AntdIcons name="swapleft" size={24} style={{ color: "#fff" }}></AntdIcons> : <AntdIcons name="swapright" size={24} style={{ color: "#fff" }}></AntdIcons>
                                    }
                                </Card>:null
                            }
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


export default PublishTodoDetail