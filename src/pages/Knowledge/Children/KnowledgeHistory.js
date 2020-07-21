import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, KnowledgeItem,Rows } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors, downloadFile } from '../../../utils';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';
let { height, width } = Dimensions.get('window');
@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/knowledgehistory'],
}))
class KnowledgeHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadMore: true,
            refreshing: true,
            postUrl: "knowledgehistory",
            visible: false,
            showbtn: false,
            postData: {
                "pageIndex": "1",  //--------页码*
                "pageSize": "10",  //--------每页条数*
                "equipmentKnowledgeBaseId": this.props.route.params.id
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
                            resData: [{ items: this.props.index.knowledgehistory.list }],
                            refreshing: false,
                            isLoadMore: false
                        })
                    } else {
                        this.setState({
                            resData: this.state.resData.concat([{ items: this.props.index.knowledgehistory.list }]),
                            isLoadMore: false
                        })
                    }
                })
            })
        })
    }

    componentDidMount() {
        this.onRefresh()
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
        if (!this.state.isLoadMore && this.props.index.knowledgehistory.hasNextPage) {
            this.setState({
                isLoadMore: true,
                postData: {
                    ...this.state.postData,
                    pageIndex: this.props.index.knowledgehistory.pageNum + 1
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
        let { index: { res, knowledgehisdetail }, navigation, submitting } = this.props,
            { refreshing, visible, postData, isLoadMore, showbtn } = this.state,
            {
                knowledgeBaseName, knowledgeBaseVersion, documentNo, knowledgeBaseDescribe, purposeTypeName,
                equipmentTypeName, updateUserName,updateTime,id,knowledgeBaseUrl
            } = knowledgehisdetail;


        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? <KnowledgeItem item={item} navigation={this.props.navigation} onpressfn={() => {
                this.setNewState("knowledgehisdetail", { id: item.id }, () => {
                    this.setState({ visible: true })
                })
            }}></KnowledgeItem> : <View></View>
        }

        return <SafeAreaViewPlus loading={submitting && isLoadMore && refreshing}>
            <Modal
                visible={visible}
                height={height * 0.7}
                hide={() => {
                    this.setState({
                        visible: false
                    })
                }}
                title={"详情"}
            > 
                <View flex-1 style={{ overflow: "hidden",backgroundColor:"#f0f0f0" }} paddingH-12>
                    <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                        <Rows name="上传人" values={updateUserName} />
                        <Rows name="上传时间" values={updateTime} />
                        <Rows name="文件名" values={knowledgeBaseName} />
                        <Rows name="版本号" values={knowledgeBaseVersion} />
                        <Rows name="文件编号" values={documentNo} />
                        <Rows name="用途类型" values={purposeTypeName} />
                        <Rows name="设备类型" values={equipmentTypeName} />
                        <Rows name="描述" values={knowledgeBaseDescribe} />
                        <View padding-12 row>
                            <Button flex-1 label="下载文件" onPress={()=>{
                                downloadFile(knowledgeBaseUrl)
                            }}></Button>
                        </View>
                    </Card>
                </View>
            </Modal>
            <Header
                navigation={navigation}
                title="知识库历史记录"
            >
            </Header>
            <View flex >
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
                    allLoaded={!this.props.index.knowledgehistory.hasNextPage}
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
export default KnowledgeHistory