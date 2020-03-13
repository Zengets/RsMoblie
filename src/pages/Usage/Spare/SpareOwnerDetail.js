import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton, Avatar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, TitleSearch, SpareOwnerDetailItem } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors, ConvertPinyin } from '../../../utils';
import { StyleSheet, ImageBackground, Animated } from 'react-native';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/spareownerdetail'],
}))
class SpareOwnerDetail extends React.Component {
    constructor(props) {
        super(props);
        let { id, userId } = props.navigation.state.params ? props.navigation.state.params : {};
        this.state = {
            isLoadMore: true,
            height: new Animated.Value(45),
            refreshing: true,
            postUrl: "spareownerdetail",
            search: true,
            showbtn: false,
            postData: {
                "pageIndex": "1",  //--------页码*
                "pageSize": "10",  //--------每页条数*
                "sparePartsId": id,
                "userId": userId
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
                            resData: [{ items: this.props.index.spareownerdetail.list }],
                            refreshing: false,
                            isLoadMore: false
                        })
                    } else {
                        this.setState({
                            resData: this.state.resData.concat([{ items: this.props.index.spareownerdetail.list }]),
                            isLoadMore: false
                        })
                    }
                })
            })
        })
    }

    componentDidMount() {
        this.onRefresh();
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
        if (!this.state.isLoadMore && this.props.index.spareownerdetail.hasNextPage) {
            this.setState({
                isLoadMore: true,
                postData: {
                    ...this.state.postData,
                    pageIndex: this.props.index.spareownerdetail.pageNum + 1
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
            { refreshing, search, postData, height, isLoadMore, showbtn } = this.state,
            { id, userId, userName,sparePartsName,sparePartsNo,sparePartsId } = navigation.state.params ? navigation.state.params : {};


        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? <SpareOwnerDetailItem item={ item } navigation={ this.props.navigation } type="history"></SpareOwnerDetailItem> : <View></View>
        }, avatarprops = {
            title: 'USER',
            label: userName ? ConvertPinyin(userName).substring(0, 1).toUpperCase() : "",
            labelColor: Colors.white,
            backgroundColor: colors.primaryColor,
            size: 20
        }

        return <SafeAreaViewPlus loading={ submitting && isLoadMore && refreshing }>
            <Header
                navigation={ navigation }
                title="备件使用记录"
            >
            </Header>
            <View padding-12 row center>
                <Card center enableShadow={ false } padding-12 flex-1 onPress={()=>{
                     navigation.navigate("UserListDetail", {
                        id: userId
                      })
                }}>
                    <View row center marginB-6>
                        <Avatar { ...avatarprops }></Avatar>
                        <Text body dark10 marginL-8>{ userName }</Text>
                    </View>
                    <View>
                        <Text>查看用户信息</Text>
                    </View>
                </Card>
                <Card center enableShadow={ false } padding-12 flex-1 marginL-12 onPress={()=>{
                     navigation.navigate("InfoSpareDetail", {
                        id: sparePartsId
                      })
                }}>
                    <View row center marginB-6>
                        <Text body dark10 marginL-8>{ sparePartsName }</Text>
                    </View>
                    <View>
                        <Text>查看备件信息</Text>
                    </View>
                </Card>

            </View>


            <View flex>
                <LargeList
                    onScroll={ ({ nativeEvent: { contentOffset: { x, y } } }) => {
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

                    } }
                    ref={ ref => (this._list = ref) }
                    onRefresh={ () => { this.onRefresh("0") } } //刷新操作
                    refreshHeader={ ChineseWithLastDateHeader }
                    showsVerticalScrollIndicator={ false }
                    style={ { padding: 0, marginTop: -3 } }
                    data={ this.state.resData }
                    renderIndexPath={ renderItem }//每行
                    heightForIndexPath={ () => 110 }
                    allLoaded={ !this.props.index.spareownerdetail.hasNextPage }
                    loadingFooter={ ChineseWithLastDateFooter }
                    onLoading={ this.pullUpLoading }
                />
            </View>
            {
                showbtn && <ActionButton
                    size={ 38 }
                    hideShadow={ true }
                    bgColor={ "transparent" }
                    buttonColor={ colors.primaryColor }
                    offsetX={ 10 }
                    onPress={ this.scrollToTop }
                    renderIcon={ () => <AntIcons name='up' style={ { color: Colors.white } } size={ 16 } /> }
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
export default SpareOwnerDetail