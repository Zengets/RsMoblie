import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaViewPlus, OneToast, Header, Modal, Confirm, ChatListItem } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors, } from '../../../utils';
import { StyleSheet, TouchableHighlight, Animated, Keyboard, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Card, Badge, Dialog, Colors, TextArea, Button, FloatingButton } from 'react-native-ui-lib';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';
import { ScrollView } from 'react-native';

let { height, width } = Dimensions.get('window');


@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/ChatqueryListByForumId'],
})) class ChatDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadMore: true,
            defv: false,
            cfv: false,
            scrollIndex: null,
            height: new Animated.Value(300),
            refreshing: true,
            postUrl: "ChatqueryListByForumId",
            search: true,
            showbtn: false,
            value: "",
            curitem: {},
            curitemdef: {id:null},
            simplemodle: false,
            kbs: false,
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

    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({
                kbs: true
            })
        });
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({
                kbs: false
            })
        });
    }

    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
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

    getChild(id) {
        this.setNewState("queryListByParentId", { parentId: id }, () => {
        })
    }


    render() {
        let { index: { res, formdata, queryListByParentId }, navigation, submitting } = this.props,
            { refreshing, value, simplemodle, kbs, isLoadMore, showbtn, curitem, curitemdef, defv, scrollIndex } = this.state;


        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? <ChatListItem
                reportItem={(key) => {
                    if (key) {
                        this.setState({
                            curitem: item,
                            scrollIndex: { section, row },
                        })
                        this.textarea && this.textarea.focus();
                        this._list && this._list.scrollToIndexPath({ section, row: row - 1 })
                        return
                    }
                    this.setState({
                        curitem: item,
                        curitemdef: item,
                        scrollIndex: { section, row },
                        defv: true
                    }, () => {
                        this.getChild(item.id)
                    })
                }}
                deleteItem={() => {
                    this.setState({
                        curitem: item,
                        scrollIndex: { section, row },
                        cfv: true
                    })
                }}
                item={item}
                navigation={this.props.navigation}
                type="history"></ChatListItem> : <View></View>
        }

        let renderRepeat = () => {
            return <View row padding-6 style={{ position: "absolute", bottom: 0, backgroundColor: "#f0f0f0", alignItems: "flex-end" }}>
                <View flex-1 style={{ backgroundColor: "#fff", height: kbs ? "auto" : 40, overflow: "hidden" }}>
                    {
                        defv ?
                            <TextArea
                                title="回复内容"
                                placeholder="回复内容"
                                value={value}
                                onChangeText={(val) => {
                                    this.setState({
                                        value: val
                                    })
                                }}
                                ref={input => {
                                    this.textareas = input
                                }}
                            ></TextArea> :
                            <TextArea
                                title="回复内容"
                                placeholder="回复内容"
                                value={value}
                                onChangeText={(val) => {
                                    this.setState({
                                        value: val
                                    })
                                }}
                                ref={input => {
                                    this.textarea = input
                                }}
                            ></TextArea>
                    }

                </View>
                <Button onPress={() => {
                    this.textarea && this.textarea.clear();
                    this.textareas && this.textareas.clear();
                    this.setState({value:null})
                    let postData = {
                        "equipmentForumId": this.props.route.params.id,//论坛id,回复论坛时必填
                        "comment": value,//评论内容，必填
                        "parentId": curitem.id,//评论id，回复评论时必填
                    }
                    this.setNewState("replysave", postData, () => {
                        OneToast("发布成功");
                        if (this.state.defv) {
                            this.getChild(curitem.id);
                            this._lists && this._lists.scrollTo({ x: 0, y: 1000, animated: true })
                        } else {
                            this.resetData();
                            this.onRefresh();
                            this.scrollToTop();
                        }
                    })
                }} label='回复' marginL-4 style={{ height: 40 }} borderRadius={0} size='medium' />
            </View>
        }

        let renderContent = () => {
            return <View flex-1>
                <ScrollView ref={ref => (this._lists = ref)} style={{ height: height * 0.9 }}>
                    <View style={{ borderBottomWidth: 6, borderBottomColor: "#f0f0f0" }}>
                        <ChatListItem
                            key={"36"}
                            reportItem={() => {
                                this.setState({
                                    curitem: curitemdef,
                                })
                            }}
                            deleteItem={() => {
                                this.setState({
                                    curitem: curitemdef,
                                    cfv: true
                                })
                            }}
                            item={curitemdef}
                            navigation={this.props.navigation}
                            type="history"></ChatListItem>
                    </View>
                    {
                        queryListByParentId && queryListByParentId.map((item, i) => {
                            return <ChatListItem
                                key={i}
                                reportItem={() => {
                                    this.setState({
                                        curitem: item,
                                    })
                                }}
                                deleteItem={() => {
                                    this.setState({
                                        curitem: item,
                                        cfv: true
                                    })
                                }}
                                item={item}
                                navigation={this.props.navigation}
                                type="history"></ChatListItem>
                        })

                    }

                </ScrollView>
                <View height={50}></View>
                {
                    renderRepeat()
                }
            </View>

        };


        return <SafeAreaViewPlus loading={submitting && isLoadMore && refreshing}>

            <Modal
                visible={this.state.defv}
                hide={() => {
                    this.setState({
                        defv: false
                    })
                }}
                title="回复列表"
                height={height * 0.9}
            >
                {renderContent()}
            </Modal>


            <Confirm
                successfn={() => {
                    this.setState({
                        cfv: false
                    }, () => {
                        this.setNewState("ChatdeleteById", { id: curitem.id }, () => {
                            OneToast("删除成功");
                            if (curitemdef.id == curitem.id) {
                                this.setState({
                                    defv: false
                                }, () => {
                                    this.onRefresh();
                                })
                            }
                            if (defv) {
                                this.getChild(curitemdef.id ? curitemdef.id : curitem.id);
                            } else {
                                this._list.scrollToIndexPath({
                                    ...scrollIndex,
                                    row:scrollIndex.row-2
                                });
                                this.onRefresh();
                            }
                        });
                    })
                }}
                visible={this.state.cfv}
                onDismiss={() => {
                    this.setState({
                        cfv: false
                    })
                }}
                title="是否删除该评论"
            ></Confirm>


            <Header
                navigation={navigation}
                title="设备论坛"
            >
            </Header>
            <View flex style={{ position: "relative" }}>
                <Animated.View style={{ backgroundColor: "#fff" }}>
                    <ScrollView>
                        <Card padding-12 borderRadius={0} style={{ boxShadow: "none" }} onPress={() => {
                            this.setState({
                                simplemodle: false
                            })
                        }}>
                            {
                                simplemodle ? <View paddingV-2 row style={{ alignItems: "center" }}>
                                    <View flex-1>
                                        <Text body dark10 numberOfLines={1}>{res.forum && res.forum.title}</Text>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => {
                                        this.setState({
                                            curitem: {},
                                        })
                                        this.scrollToTop();
                                        this.textarea && this.textarea.focus()
                                    }}>
                                        <View right row style={{ alignItems: "center" }}>
                                            <AntIcons name="message1" size={18}></AntIcons>
                                            <Text style={{ fontSize: 16 }} marginL-6>{res?.forum?.commentCount ? res.forum.commentCount : "回复"}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View> : <View>
                                        <Text body dark10 marginB-10>{res.forum && res.forum.title}</Text>
                                        <Text subbody dark40>{res.forum && res.forum.comment}</Text>
                                        <View paddingV-6 paddingT-0 marginT-18 style={{ borderTopColor: "#ddd", borderTopWidth: 1 }}>
                                            {
                                                res.forum && res.forum.attachmentUrlList.map((item, i) => {
                                                    return (<TouchableHighlight
                                                        key={i}
                                                        onPress={() => {
                                                            navigation.navigate("PreView", {
                                                                url: item,
                                                                type: item.split(".")[item.split(".").length - 1]
                                                            })
                                                        }}
                                                    >
                                                        <View row paddingV-10 style={{ alignItems: "center", borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
                                                            <View row flex-1 style={{ alignItems: "center" }}>
                                                                <AntIcons name="file1"></AntIcons>
                                                                <Text marginL-10>附件{i + 1}</Text></View>
                                                            <View right><AntIcons name="right"></AntIcons></View>

                                                        </View>
                                                    </TouchableHighlight>)
                                                })}
                                        </View>
                                        <TouchableWithoutFeedback onPress={() => {
                                            this.setState({
                                                curitem: {},
                                            })
                                            this.scrollToTop();
                                            this.textarea && this.textarea.focus()
                                        }}>
                                            <View right marginT-18 row style={{ alignItems: "center" }}>
                                                <AntIcons name="message1" size={18}></AntIcons>
                                                <Text style={{ fontSize: 16 }} marginL-6>{res?.forum?.commentCount ? res.forum.commentCount : "回复"}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                    </View>


                            }


                        </Card>


                    </ScrollView>
                </Animated.View>
                <View padding-12 paddingV-18>
                    <Text>回复列表</Text>
                </View>
                <LargeList
                    onScroll={({ nativeEvent: { contentOffset: { x, y } } }) => {
                        if (y > 100) {
                            this.setState({
                                simplemodle: true
                            })
                        } else {
                            this.setState({
                                simplemodle: false
                            })
                        }
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
                    allLoaded={this.props.index.ChatqueryListByForumId && !this.props.index.ChatqueryListByForumId.hasNextPage}
                    loadingFooter={ChineseWithLastDateFooter}
                    onLoading={this.pullUpLoading}
                />
                <View height={46}>

                </View>
                {
                    renderRepeat()
                }
            </View>
            {
                showbtn && <ActionButton
                    size={38}
                    hideShadow={true}
                    bgColor={"transparent"}
                    buttonColor={colors.primaryColor}
                    offsetX={10}
                    offsetY={120}
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