import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, TabBar } from 'react-native-ui-lib';
import { Modal, SubmitForm, AuthBase } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Dimensions, ActivityIndicator, NativeModules } from 'react-native';
import { colors, getItem, } from '../../../utils';
import { ECharts } from "react-native-echarts-wrapper";

let { height, width } = Dimensions.get('window');
let deviceHeight = Dimensions.get('window').height / Dimensions.get('window').width > 1.8 ? height + NativeModules.StatusBarManager.HEIGHT : height;


let timeline = ["周", "月", "季", "半年", "年"]
@connect(({ index, loading }) => ({ index, loading }))
class Charts extends React.Component {
    state = {
        progress: 0,
        fullscreen: false,
        selectedIndex: 0,
        visible: false,
        xAxis: [],
        yAxis: [],
        showbtn: false,
        zoom: false,
        loaded: true,
        postDatas: [
            {
                "departmentId": "",//部门id，筛选条件
                "shopId": "",// 车间id，筛选条件
                "unit": "周"//时间，筛选条件
            },
            {
                "departmentId": "",//部门id，筛选条件
                "shopId": "",// 车间id，筛选条件
                "unit": "周"//时间，筛选条件
            },
            {
                "departmentId": "",//部门id，筛选条件
                "shopId": "",// 车间id，筛选条件
                "unit": "周"//时间，筛选条件
            },
            {
                "departmentId": "",//部门id，筛选条件
                "shopId": "",// 车间id，筛选条件
                "unit": "周"//时间，筛选条件
            },
        ],
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

    getoption = (ifs) => {
        let { index: { chartdata } } = this.props;
        let { dataList } = chartdata ? chartdata : { dataList: [] };
        let xData = dataList && dataList.map((item) => {
            return item.date
        }), yData = dataList && dataList.map((item) => {
            return item.value
        })
        return {
            grid: [
                { x: ifs ? '10%' : "13%", y: '13%', width: '85%', height: ifs ? '67%' : '70%' },
            ],
            tooltip: {
                trigger: 'axis',
            },
            dataZoom: ifs ? [{
                type: 'inside'
            }, {
                type: 'slider'
            }] : [],
            xAxis: [
                {
                    type: 'category',
                    data: xData,
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            width: 0
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: "占比",
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            width: 0
                        }
                    }
                }
            ],
            series: [
                {
                    name: "占比",
                    type: 'line',
                    data: yData,
                    showSymbol: false,
                    itemStyle: {
                        normal: {
                            color: colors.primaryColor
                        }
                    },
                }
            ]
        }
    }

    getChartData() {
        let { postDatas, selectedIndex, zoom } = this.state,
            postDatanow = JSON.parse(JSON.stringify(postDatas[selectedIndex]))
        if (postDatanow && postDatanow.departmentId != "") {
            postDatanow.departmentId = postDatanow.departmentId.id
        }
        if (postDatanow && postDatanow.shopId != "") {
            postDatanow.shopId = postDatanow.shopId.id
        }

        switch (selectedIndex) {
            case 0:
                this.setNewState("queryOEE", postDatanow, () => {
                    this.chart && this.chart.setOption(this.getoption(zoom));
                })
                break;
            case 1:
                this.setNewState("queryJIA", postDatanow, () => {
                    this.chart && this.chart.setOption(this.getoption(zoom));
                })
                break;
            case 2:
                this.setNewState("queryMTTR", postDatanow, () => {
                    this.chart && this.chart.setOption(this.getoption(zoom));
                })
                break;
            case 3:
                this.setNewState("queryMTBF", postDatanow, () => {
                    this.chart && this.chart.setOption(this.getoption(zoom));
                })
                break;
            default:
                this.setNewState("queryOEE", postDatanow, () => {
                    this.chart && this.chart.setOption(this.getoption(zoom));
                })
                break
        }
    }

    onRef = ref => {
        if (ref) {
            this.chart = ref;
        }
    };
    //清空筛选
    resetData = () => {
        let { index: { submitdata } } = this.props;
        let newsubmitdata = submitdata.map((item, i) => {
            item.value = item.type == "multinput" ? [] : ""
            return item
        })
        this.setNewState("submitdata", newsubmitdata)
    }



    render() {
        const { index: { homenum, overview, chartdata, submitdata }, navigation, loading } = this.props,
            { progress, fullscreen, selectedIndex, visible, postDatas, showbtn, zoom } = this.state;
        let index = this.props.index;


        return <View>
            <Modal
                visible={visible}
                height={height * 0.75}
                hide={() => {
                    this.setState({
                        visible: false
                    })
                }}
                renderTitle={<View row spread padding-page>
                    <Text subheading>请选择部门/车间</Text>
                    <Text red10 onPress={this.resetData}>清空</Text>
                </View>}
            >
                <View style={{ backgroundColor: "#f0f0f0" }} flex-1>
                    <View flex-1 paddingV-12>
                        <SubmitForm></SubmitForm>
                    </View>
                    <Button label="确认" margin-12 marginT-0 onPress={() => {
                        function getVal(key) {
                            let one = {};
                            _it.props.index.submitdata.map((item) => {
                                if (item.key == key) {
                                    one = item
                                }
                            });
                            if (!one.type) {
                                return
                            }
                            if (one.type.indexOf("select") == -1) {
                                return one.value && one.value
                            } else {
                                return one.value && one.value.id
                            }
                        }
                        let newpostDatas = postDatas.map((it, i) => {
                            if (selectedIndex == i) {
                                it.departmentId = getVal("departmentId")
                                it.shopId = getVal("shopId")
                            }
                            return it
                        })
                        this.setState({
                            visible: false,
                            postDatas: newpostDatas
                        }, () => {
                            this.getChartData()
                        })

                    }}></Button>
                </View>
            </Modal>
            <AuthBase item={getItem("homePage", "equipmentChart", index.userAccount)}>
                <View marginH-12 bg-white style={{ borderRadius: 8, overflow: "hidden" }}>
                    <TabBar
                        selectedIndex={this.state.selectedIndex}
                        onChangeIndex={index => {
                            //this.scrollview.scrollTo({ x: 0, y: 720, animated: true }, 1)
                            this.setState({ selectedIndex: index }, () => {
                                this.getChartData()
                            })
                        }}
                        style={styles.tabbar}
                        enableShadow={false}
                        indicatorStyle={{ borderBottomWidth: 2, borderColor: colors.primaryColor }}>
                        <TabBar.Item
                            label={`OEE`}
                            labelStyle={{ textTransform: 'capitalize' }}
                            selectedLabelStyle={{
                                color: colors.primaryColor
                            }}
                        />


                        <TabBar.Item selectedLabelColor={colors.primaryColor}
                            label={`稼动率`}
                            labelStyle={{ textTransform: 'capitalize' }}
                            selectedLabelStyle={{
                                color: colors.primaryColor
                            }}
                        />

                        <TabBar.Item selectedLabelColor={colors.primaryColor}
                            label={`MTTR`}
                            labelStyle={{ textTransform: 'capitalize' }}
                            selectedLabelStyle={{
                                color: colors.primaryColor
                            }}
                        />

                        <TabBar.Item selectedLabelColor={colors.primaryColor}
                            label={`MTBF`}
                            labelStyle={{ textTransform: 'capitalize' }}
                            selectedLabelStyle={{
                                color: colors.primaryColor
                            }}
                        />
                    </TabBar>
                    <View style={{ borderColor: "#f0f0f0", borderTopWidth: 1 }}>
                        <Card row spread padding-12 style={{ borderColor: "#f0f0f0", borderBottomWidth: 1 }} enableShadow={false} onPress={() => {
                            let { departmentId, shopId } = postDatas[selectedIndex] ? postDatas[selectedIndex] : {};
                            let submitdatas = [
                                {
                                    key: "departmentId",
                                    type: "treeselect",
                                    value: departmentId,
                                    placeholder: "请选择部门",
                                    option: chartdata.departmentList && chartdata.departmentList
                                }, {
                                    key: "shopId",
                                    type: "select",
                                    value: shopId,
                                    width: "31%",
                                    placeholder: "请选择车间",
                                    option: chartdata.shopList && chartdata.shopList.map((item, i) => {
                                        return {
                                            dicName: item.shopName,
                                            dicKey: item.id
                                        }
                                    })
                                }
                            ]
                            this.setNewState("submitdata", submitdatas, () => {
                                this.setState({
                                    visible: true,
                                })
                            })
                        }}>
                            <View width={180}>
                                <Text>
                                    选择部门/车间
                                </Text>
                            </View>

                            <View row right flex-1>
                                {
                                    postDatas[selectedIndex].departmentId ?
                                        <Text style={{ color: colors.primaryColor }} numberOfLines={1}>{postDatas[selectedIndex].departmentId.name}</Text>
                                        :
                                        <Text>部门</Text>}
                                <Text>/</Text>
                                {postDatas[selectedIndex].shopId ?
                                    <Text style={{ color: colors.primaryColor }} numberOfLines={1}>{postDatas[selectedIndex].shopId.name}</Text>
                                    :
                                    <Text>车间</Text>}
                            </View>
                        </Card>
                        <View style={styles.chartContainer} paddingH-10 paddingT-12 paddingB-0>
                            <ECharts
                                postMessage={{}}
                                ref={this.onRef}
                                option={{}}
                                onLoadEnd={() => {
                                    this.getChartData();
                                }}
                            />

                        </View>
                        <View row>
                            {
                                timeline.map((item, i) => {
                                    return <Card key={i} flex-1 style={{ backgroundColor: postDatas[selectedIndex].unit == item ? "#FFFFFF" : "#ddd", borderRadius: 0 }} enableShadow={false} center padding-12 onPress={() => {
                                        let newpostDatas = postDatas.map((it, i) => {
                                            if (selectedIndex == i) {
                                                it.unit = item
                                            }
                                            return it
                                        })
                                        this.setState({
                                            postDatas: newpostDatas
                                        }, () => {
                                            this.getChartData()
                                        })
                                    }}>
                                        <Text>{item}</Text>
                                    </Card>
                                })
                            }
                        </View>
                    </View>
                </View>
            </AuthBase>
            {/*zoom &&
                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", position: "absolute" }}>
                    <View bg-white style={{ width: deviceHeight, height: width, transform: [{ rotate: "90deg" }], position: "absolute" }}>
                        <Card padding-7 enableShadow={false} style={{ backgroundColor: colors.primaryColor, position: "absolute", right: 8, top: 8, zIndex: 9999 }} onPress={() => {
                            this.setState({
                                zoom: false
                            }, () => {
                                navigation.setParams({ tabBarVisible: true })
                            })
                        }}>
                            <AntIcons name="shrink" color={"white"} size={14}></AntIcons>
                        </Card>
                        {
                            this.state.loaded &&
                            <View style={{ width: deviceHeight, height: width }} center>
                                <ActivityIndicator></ActivityIndicator>
                            </View>
                        }
                        <ECharts
                            postMessage={{}}
                            ref={this.onRef}
                            option={{}}
                            onLoadEnd={() => {
                                this.getChartData();
                                this.setState({
                                    loaded: false
                                })
                            }}
                        />


                    </View>
                </View>
                        */}
        </View>
    }
}


const styles = StyleSheet.create({
    tabbar: {
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    chartContainer: {
        height: 254,
        position: "relative",
        width: "100%"
    }

})


export default Charts