import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, TitleSearch,DeviceItem } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors } from '../../../utils';
import { FlatList, StyleSheet, ImageBackground, Animated } from 'react-native';
import ActionButton from 'react-native-action-button';

@connect(({ index }) => ({ index }))
class InfoDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadMore: false,
            height: new Animated.Value(45),
            refreshing: true,
            postUrl: "infodevice",
            search: true,
            showbtn: false,
            postData: {
                "pageIndex": 1,
                "pageSize": 10,
                "equipmentName": "",//设备名，筛选条件
                "equipmentNo": "",//设备编号，筛选条件
                "positionNo": "",//位置号，筛选条件
                "equipmentTypeId": "",//设备类型id，筛选条件
                "equipmentModel": "",//型号，筛选条件
                "shopId": "",//车间id，筛选条件
                "departmentId": "",//部门id，筛选条件
                "status": ""//状态，筛选条件
            },
            resData: [
            ]
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
            console.log(postData)

            this.setNewState(postUrl, postData, () => {
                if (refreshing) {
                    this.setState({
                        resData: this.props.index.infodevice.list,
                        refreshing: false,
                        isLoadMore: false
                    })
                } else {
                    this.setState({
                        resData: this.state.resData.concat(this.props.index.infodevice.list),
                        isLoadMore: false
                    })
                }
            })
        })

    }


    componentDidMount() {
        this.getData()
    }
    //动态改变搜索
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextState.search !== this.state.search) {
            Animated.timing(
                this.state.height,
                {
                    toValue: nextState.search ? 45 : 0,
                    duration: 200,
                }
            ).start();
        }
    }

    //下拉刷新,更改状态，重新获取数据
    onRefresh() {
        this.setState({
            refreshing: true,
            resData: []
        }, () => {
            this.getData();
        });
    }

    pullUpLoading(distanceFromEnd) {
        if (!this.state.isLoadMore && this.props.index.infodevice.hasNextPage) {
            this.setState({
                isLoadMore: true,
                postData: {
                    ...this.state.postData,
                    pageIndex: this.props.index.infodevice.pageNum + 1
                }
            }, () => {
                this.getData()
            })
        }
    }

    //返回顶部
    scrollToTop = () => {
        this._FlatList.scrollToOffset({ animated: true, viewPosition: 0, index: 0 }); //跳转到顶部
    }


    render() {
        let { index, navigation } = this.props,
            { refreshing, search, postData, height, isLoadMore, showbtn } = this.state;

        let getColor = (item) => {
            let color = colors.primaryColor;
            switch (item.status) {
                case "0":
                    color = "orange";
                    break;
                case "1":
                    color = "lightblue";
                    break;
                case "2":
                    color = "red";
                    break;
                case "3":
                    color = "bule";
                    break;
                case "4":
                    color = "grey";
                    break;
                case "5":
                    color = "green";
                    break;
                case "6":
                    color = colors.primaryColor;
                    break;
            }
            return color
        }, searchprops = {
            height,
            navigation,
            placeholder: "输入设备名称查询...",
            value: postData.equipmentName,
            onChangeText: (val) => {
                this.setState({
                    postData: {
                        ...postData,
                        equipmentName: val
                    }
                })
            },
            onSubmitEditing: () => {
                this.onRefresh()
            }

        }

        let renderItem = ({ item, index }) => {
            return <DeviceItem item={item} navigation={this.props.navigation}></DeviceItem>
        }

        return <SafeAreaViewPlus>
            <Header
                navigation={navigation}
                title="设备信息"
                headerRight={() => !search ? <AntIcons name="search1" size={22} onPress={() => {
                    this.setState({
                        search: !search
                    })
                }} /> : <Text onPress={() => {
                    this.setState({
                        search: !search
                    })
                }}>
                        取消
                </Text>}
            >
            </Header>
            <View style={{ paddingBottom: search ? 100 : 45 }}>
                <View style={{ padding: search ? 12 : 0,paddingBottom:0 }}>
                    <TitleSearch {...searchprops}></TitleSearch>
                </View>
                <FlatList
                    onScroll={(e) => {
                        let y = e.nativeEvent.contentOffset.y;
                        if (y > 200) {
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
                    ref={(FlatList) => this._FlatList = FlatList}
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 0,marginTop:-3 }}
                    data={this.state.resData}
                    onRefresh={() => { this.onRefresh() }} //刷新操作
                    refreshing={refreshing} //等待加载出现加载的符号是否显示
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    initialNumToRender={10}
                    ListEmptyComponent={() => <View center><Text style={styles.item}>{refreshing ? "数据加载中..." : "暂无更多..."}</Text></View>}
                    onEndReached={({ distanceFromEnd }) => this.pullUpLoading(distanceFromEnd)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => { return !this.props.index.infodevice.hasNextPage && !refreshing && this.state.resData.length > 0 ? <View center paddingV-12><Text>暂无更多...</Text></View> : this.state.isLoadMore ? <View center paddingV-12><Text>正在加载...</Text></View> : null }}
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
export default InfoDevice