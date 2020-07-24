import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, TitleSearch, ChatListItem } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors } from '../../../utils';
import { StyleSheet, ImageBackground, Animated } from 'react-native';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';
import { ScrollView } from 'react-native';

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/ChatqueryListByForumId'],
})) class ChatDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadMore: true,
            height: new Animated.Value(45),
            refreshing: true,
            postUrl: "ChatqueryListByForumId",
            search: true,
            showbtn: false,
            postData: {
                "pageIndex": "1",  //--------页码*
                "pageSize": "10",  //--------每页条数*
                "equipmentForumId": props.route.params.id,//标题
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
                            resData: [{ items: this.props.index.ChatqueryListByForumId.list }],
                            refreshing: false,
                            isLoadMore: false
                        })
                    } else {
                        this.setState({
                            resData: this.state.resData.concat([{ items: this.props.index.ChatqueryListByForumId.list }]),
                            isLoadMore: false
                        })
                    }
                })
            })
        })
    }

    resetData = (yuan) => {
        this.getData()
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
        if (!this.state.isLoadMore && this.props.index.ChatqueryListByForumId.hasNextPage) {
            this.setState({
                isLoadMore: true,
                postData: {
                    ...this.state.postData,
                    pageIndex: this.props.index.ChatqueryListByForumId.pageNum + 1
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
        let { index: { res, formdata }, navigation, submitting } = this.props,
            { refreshing, search, postData, height, isLoadMore, showbtn } = this.state;


        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? <ChatListItem item={item} navigation={this.props.navigation} type="history"></ChatListItem> : <View></View>
        }

        return <SafeAreaViewPlus loading={submitting && isLoadMore && refreshing}>
            <Header
                navigation={navigation}
                title="设备论坛"
                rightwidth={70}
                headerRight={() => <Card height={"100%"} enableShadow={false} row center onPress={() => {
                    let postData = JSON.parse(JSON.stringify(this.state.postData));
                    for (let i in postData) {
                        if (i == "pageIndex") {
                            postData[i] = 1
                        } else if (i == "pageSize") {
                            postData[i] = 10
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
                <Animated.View style={{ height: height, padding: 12, backgroundColor: "#fff" }}>
                    <ScrollView>
                        <View>
                            <Text body dark10>{res.forum&&res.forum.title}</Text>
                                

                        </View>
                    </ScrollView>
                </Animated.View>
                <View padding-12>
                    <Text>回复列表</Text>
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
                    heightForIndexPath={() => 120}
                    allLoaded={!this.props.index.ChatqueryListByForumId.hasNextPage}
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
export default ChatDetail