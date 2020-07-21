import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Colors, TabBar, Dialog, PanningProvider } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Empty, Rows, NoticeTodoItem, RepairItem, UpkeepItem, CheckItem, SpareReviewItem, SpareChangeMissionItem, Modal, SubmitForm, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, StyleSheet, Dimensions, StatusBar, NativeModules } from 'react-native';
import { colors, getItem, } from '../../utils';
import { ProgressCircle } from 'react-native-svg-charts'
import moment from 'moment';
import { ECharts } from "react-native-echarts-wrapper";
import ActionButton from 'react-native-action-button';
import Charts from './components/Charts';
import Todolist from './components/Todolist';
import { withNavigation } from '@react-navigation/compat'


let { height, width } = Dimensions.get('window');
let deviceHeight = Dimensions.get('window').height / Dimensions.get('window').width > 1.8 ? height + NativeModules.StatusBarManager.HEIGHT : height;


@connect(({ index, loading }) => ({ index, loading }))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      showbtn: false,
      shown: true
    }
    this._onfocus = undefined;
    this._onblur = undefined;
  }


  //返回顶部
  scrollToTop = () => {
    this._list && this._list.scrollTo(0, 0, true);
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

  componentDidMount() {
    this.setNewState("homenum", null, () => {
      let { homenum: { turnOnRate } } = this.props.index;
      this.setState({
        progress: turnOnRate / 100
      })
    });
    this._onfocus = this.props.navigation.addListener('focus', () => {
      this.setState({
        shown: true,
        topColor:"#fff"
      })
    });
    this._onblur = this.props.navigation.addListener('blur', () => {
      this.setState({
        shown: false,
        topColor:"#000"
      })
    });
  }

  componentWillUnmount() {
    if (this._onfocus) {
      this._onfocus.remove();
    }
    if (this._onblur) {
      this._onblur.remove();
    }
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      let defaultstatus = {
        name: data.name,
        id: data.key
      }
      this.props.navigation.navigate(url, { defaultstatus });
    })
  }

  jump(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }

  render() {
    const { index: { homenum, userAccount }, navigation, loading } = this.props,
      { progress, showbtn,topColor,shown } = this.state;
    let getColor = (item) => {
      let color = "#43c4cc"
      switch (item) {
        case "待机":
          color = "#ffcb01";
          break;
        case "运行中":
          color = "#5477ff";
          break;
        case "故障":
          color = "#cc0d01";
          break;
        case "维修中":
          color = "#43c4cc";
          break;
        case "流转中":
          color = "#54bbff";
          break;
        case "报废":
          color = "#999999";
          break;
      }
      return color
    }


    return <SafeAreaViewPlus topColor={topColor} style={{ position: "relative" }} loading={loading.effects['index/homenum']}>
      {
         topColor=="#fff"&&<StatusBar translucent={true} backgroundColor={topColor} animated={true} barStyle={"dark-content"}></StatusBar>
      }
      <Header
        title="首页"
        headerLeft={() => {
          return <AntIcons name={'menuunfold'} size={20} style={{ color: "#666" }} onPress={() => {
            navigation.openDrawer()
          }}></AntIcons>
        }}
        headerRight={() => {
          return <Ionicons name={'ios-qr-scanner'} size={22} onPress={() => {
            this.jump("Scan")
          }}></Ionicons>
        }}
      >
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ref={ref => (this._list = ref)}
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
        }}>
        <View>
          <AuthBase item={getItem("homePage", "essentialInformation", userAccount)}>
            <View bg-white margin-12 style={{ borderRadius: 8 }}>
              <View row center paddingV-12>
                <View flex-1 row center>
                  <FontAwesome name="laptop" size={60} style={{ color: colors.primaryColor }}></FontAwesome>
                  <View center paddingL-8>
                    <Text body>设备总数</Text>
                    <Text heading style={{ color: colors.primaryColor }}>{homenum.equipmentCount}</Text>
                  </View>
                </View>
                <View bg-dark60 width={1} height={40}></View>
                <View row center flex-1>
                  <ProgressCircle
                    style={{ height: 40, width: 40 }}
                    progress={progress}
                    progressColor={Colors.green30}
                    animate={true}
                  />
                  <View center paddingL-12>
                    <Text body>开机率</Text>
                    <Text heading style={{ color: Colors.green30 }}>{homenum.turnOnRate}%</Text>
                  </View>
                </View>
              </View>
              <View row center padding-4 paddingB-12>
                {
                  homenum.equipStatusChart && homenum.equipStatusChart.length > 0 ?
                    homenum.equipStatusChart.map((item, i) => {
                      return (
                        <Card margin-4 center flex-1 enableShadow={false}>
                          <Card marginB-4 center width={30} height={30} enableShadow={false} style={{ borderColor: getColor(item.name), borderWidth: 1, borderRadius: 60 }} onPress={() => {
                            this.jumpToUrl("InfoDevice", item)
                          }}>
                            <Text style={{ color: getColor(item.name) }}>{item.value}</Text>
                          </Card>
                          <Text style={{ fontSize: 11 }}>{item.name}</Text>
                        </Card>
                      )
                    }) : <Empty></Empty>
                }
              </View>
            </View>
          </AuthBase>
          <Charts></Charts>
          <Todolist navigation={navigation}></Todolist>
        </View>
      </ScrollView>


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


export default withNavigation(Home)