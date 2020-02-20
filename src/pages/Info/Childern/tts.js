import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    BackHandler,
    FlatList,
    RefreshControl,
} from 'react-native';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import actions from "../../action";
import BACheckeditem from '../BAItem/BACheckedItem';
import BAEmptyView from '../BAItem/BAEmptyView';
import BACheckedListHeaderComponent from '../BAItem/BACheckedListHeaderComponent';
import BAListFooterComponent from '../BAItem/BAListFooterComponent';
import { BADimensions } from '../../constant/BADimensions';
import { BAColors } from '../../constant/BAColors';
import BARequest from '../../service/BARequest';
import { BAGlobal } from '../../constant/BAGlobal';
import { BAApi } from '../../constant/BAApi';
import { BAStrings } from '../../constant/BAStrings';

/**
 * 已审核单列表界面
 */
class BACheckedListView extends PureComponent {
    static navigationOptions = ({ navigation, screenProps, navigationOptions }) => {
        return {
            title: '已审核单列表',
            headerStyle: {
                backgroundColor: navigationOptions.headerStyle.backgroundColor,
            },
            headerTintColor: navigationOptions.headerTintColor,
        };
    };

    constructor(props) {
        super(props);
        this.noMoreServerData = false; // 没有更多数据
        //当前页
        this.pageIndex = 0;
        this.state = {
            dataSource: [],
            isRefresh: false,
            isLoadMore: false,
            showFoot: 0,            // 控制foot  1：正在加载   2 ：无更多数据
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <BACheckedListHeaderComponent
                    onConfirm={(startDate, endDate) => {
                        this.startDate = startDate;
                        this.endDate = endDate;
                        this.onConfirm(startDate, endDate);
                    }}
                />
                <FlatList
                    ref={(FlatList) => this._FlatList = FlatList}
                    style={styles.FlatListStyle}
                    data={this.state.dataSource}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item) => item.dtPrepTime + item.id}  //指定唯一id作为每一项的key,不要使用index，会在列表更改时都改变，消耗性能
                    extraData={this.state}
                    flashScrollIndicators={true}
                    ListHeaderComponent={() => this._renderHeaderComponent()}
                    ListEmptyComponent={() => this._renderEmptyComponent()}
                    ListFooterComponent={() => this._renderFooterComponent()}
                    ItemSeparatorComponent={() => this._renderSeprator()}
                    getItemLayout={(data, index) => ({ length: BADimensions.ITEM_WAYBILL_ITEM_Height, offset: (BADimensions.ITEM_WAYBILL_ITEM_Height + 1) * index, index })} //用于避免动态测量内容尺寸的开销
                    initialNumToRender={2}
                    numColumns={1}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={() => this._pullTORefresh()}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onEndReached={({ distanceFromEnd }) => this._pullUpLoading(distanceFromEnd)}
                    onEndReachedThreshold={0.1}  //当前可视列表高度的十分之一,会触发onEndReached事件
                />
            </View>
        )
    }

    componentDidMount() {
        this.hardwareBackEventEmitter = BackHandler.addEventListener('hardwareBackPress', this._handleBack);
    }

    componentWillUnmount() {
        this.hardwareBackEventEmitter && this.hardwareBackEventEmitter.remove();
    }

    _handleBack = () => {
        this.props.navigation.goBack();
        return true;
    }

    //**************************************************************
    //**************************************************************
    //本地方法

    _renderItem(item) {
        return <BACheckeditem
            item={item}
        />
    }

    _renderSeprator() {
        return <View style={{ height: 1, backgroundColor: BAColors.boderColor }} />;
    }

    _renderHeaderComponent() {
        return null;
    }

    _renderEmptyComponent() {
        return <BAEmptyView />;
    }

    _renderFooterComponent() {
        return <BAListFooterComponent
            showFoot={this.state.showFoot}
        />
    }

    onConfirm(startDate, endDate) {
        console.log('====================================');
        console.log('YINDONG:startDate, endDate', startDate, endDate);
        console.log('====================================');
        if (startDate == '开始时间' || endDate == '结束时间') {
            Toast.show({
                text: BAStrings.noDate,
                buttonText: BAStrings.confirm,
                type: "success"
            });
            return;
        }
        this.setState({
            showFoot: 0,
        });
        this.pageIndex = 0;
        this._getDataFromCloud(startDate, endDate, this.pageIndex);
    }

    _pullTORefresh() {
        if (!this.state.isRefresh) {
            console.log('====================================');
            console.log('YINDONG:this.startDate', this.startDate, this.endDate);
            console.log('====================================');
            this.setState({
                isRefresh: true,
                showFoot: 0,
            });
            if (this.startDate == '开始时间' || this.endDate == '结束时间' || this.startDate == undefined || this.endDate == undefined) {
                setTimeout(() => {
                    this.setState({
                        isRefresh: false,
                    });
                }, 3000)
            } else {
                this.pageIndex = 0;
                this._getDataFromCloud(this.startDate, this.endDate, 0);
            }
        }
    }

    _pullUpLoading(distanceFromEnd) {
        console.log('====================================');
        console.log('YINDONG:进入上拉加载方法', this.state.showFoot);
        console.log('====================================');
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.dataSource.length > 0 && this.state.showFoot !== 2) {
            this.pageIndex++;
            console.log('====================================');
            console.log('YINDONG:distanceFromEnd', distanceFromEnd);
            console.log('====================================');
            if (distanceFromEnd < -50) {
                console.log('====================================');
                console.log('进入return ');
                console.log('====================================');
                // return;
            }
            console.log('====================================');
            console.log('YINDONG:上拉加载');
            console.log('====================================');

            this.setState({
                isLoadMore: true,
            }, () => {
                console.log('====================================');
                console.log('YINDONG:this.pageIndex', this.pageIndex);
                console.log('====================================');
                let originBody = JSON.stringify({
                    userid: BAGlobal.loginUserId,
                    size: 2,
                    pageIndex: this.pageIndex,
                    fDate: this.startDate,  //开始时间
                    tDate: this.endDate,  //结束时间
                    authStatue: '已通过',
                })
                BARequest.postRequest(BAGlobal.baseHost + BAApi.T_OrderListByUserid, originBody)
                    .then((responseJson) => {
                        console.log('====================================');
                        console.log('YINDONG:responseJson', responseJson);
                        console.log('====================================');
                        if (responseJson.length > 0) {
                            console.log('====================================');
                            console.log('YINDONG:this.state.dataSource', this.state.dataSource);
                            console.log('====================================');
                            this.setState({
                                isLoadMore: false,
                                showFoot: 1,
                                dataSource: this.state.dataSource.concat(responseJson),
                            })
                        } else {
                            this.noMoreServerData = true; // 没有更多数据
                            this.setState({
                                isLoadMore: false,
                                showFoot: 2,
                            })
                        }
                    })
                    .catch((error) => {
                        console.log('====================================');
                        console.log('YINDONG:T_OrderListByUserid--error', error);
                        console.log('====================================');
                    })
            })
        }
    }

    _scrollToBottom() {
        this._FlatList.scrollToEnd();  //跳转到底部
    }

    _scrollToTop() {
        this._FlatList.scrollToOffset({ animated: true, viewPosition: 0, index: 0 }); //跳转到顶部
    }

    _scrollToIndex(index) {
        this._FlatList.scrollToIndex({ animated: true, index: index })
    }


    _getDataFromCloud(startDate, endDate, pageIndex) {
        let originBody = JSON.stringify({
            userid: BAGlobal.loginUserId,
            size: 2,
            pageIndex: pageIndex,
            fDate: startDate,  //开始时间
            tDate: endDate,  //结束时间
            authStatue: '已通过',
        })
        BARequest.postRequest(BAGlobal.baseHost + BAApi.T_OrderListByUserid, originBody)
            .then((responseJson) => {
                console.log('====================================');
                console.log('YINDONG:responseJson', responseJson);
                console.log('====================================');
                this.setState({
                    dataSource: responseJson,
                    isRefresh: false,
                })
            })
            .catch((error) => {
                console.log('====================================');
                console.log('YINDONG:T_OrderListByUserid--error', error);
                console.log('====================================');
            })
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    FlatListStyle: {
        height: '100%'
    }
})

const mapStateToProps = state => ({
    theme: state.theme.theme
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(BACheckedListView);