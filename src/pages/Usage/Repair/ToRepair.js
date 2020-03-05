import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Badge, TextField, Colors, Dialog, Button, FloatingButton } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, Modal, TitleSearch, RepairItem } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { colors } from '../../../utils';
import { StyleSheet, ImageBackground, Animated } from 'react-native';
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader, ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
import ActionButton from 'react-native-action-button';

@connect(({ index, loading }) => ({
  index,
  submitting: loading.effects['index/repairList'],
  submittings: loading.effects['index/repairstep'],
}))
class ToRepair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: true,
      height: new Animated.Value(45),
      refreshing: true,
      postUrl: "repairList",
      search: true,
      showbtn: false,
      postData: {
        "pageIndex": 1,
        "pageSize": 10,
        "equipmentName": "",//设备名，筛选条件
        "equipmentNo": "",//设备编号，筛选条件
        "taskNo": "",//工单号，筛选条件
        "repairType": "",//维修类型，筛选条件
        "faultLevel": "",//故障级别，筛选条件
        "status": ""//维修状态，筛选条件
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
              resData: [{ items: this.props.index.repairList.list }],
              refreshing: false,
              isLoadMore: false
            })
          } else {
            this.setState({
              resData: this.state.resData.concat([{ items: this.props.index.repairList.list }]),
              isLoadMore: false
            })
          }
        })
      })
    })
  }

  resetData = (yuan) => {
    let { index: { done, formdata } } = yuan
    function getVal(key) {
      let one = {};
      formdata.map((item) => {
        if (item.key == key) {
          one = item
        }
      });
      if (!one.type) {
        return
      }
      if (one.type.indexOf("select") == -1 && one.type.indexOf("icker") == -1) {
        return one.value && one.value
      } else {
        return one.value && one.value.id
      }
    }
    if (done == "1" && formdata.length > 0) {
      this.setState({
        postData: {
          "pageIndex": 1,
          "pageSize": 10,
          "equipmentName": getVal("equipmentName"),//设备名，筛选条件
          "equipmentNo": getVal("equipmentNo"),//设备编号，筛选条件
          "taskNo": getVal("taskNo"),//工单号，筛选条件
          "repairType": getVal("repairType"),//维修类型，筛选条件
          "faultLevel": getVal("faultLevel"),//故障级别，筛选条件
          "status": getVal("status")//维修状态，筛选条件
        },
      }, () => {
        this.onRefresh()
      })
    } else {
      this.getData()
    }

  }

  UNSAFE_componentWillReceiveProps(np) {
    if (this.props.index.done !== np.index.done) {
      this.resetData(np);
    }
  }


  componentDidMount() {
    this.resetData(this.props)
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
    if (!this.state.isLoadMore && this.props.index.repairList.hasNextPage) {
      this.setState({
        isLoadMore: true,
        postData: {
          ...this.state.postData,
          pageIndex: this.props.index.repairList.pageNum + 1
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
    let { index: { res, formdata }, navigation, submitting,submittings } = this.props,
      { refreshing, search, postData, height, isLoadMore, showbtn } = this.state;

    let searchprops = {
      height,
      navigation,
      placeholder: "输入工单号查询...",
      value: postData.taskNo,
      onChangeText: (val, ifs) => {
        this.setState({
          postData: {
            ...postData,
            taskNo: val
          }
        }, () => {
          this.changeData("taskNo", val)
          if (ifs) {
            this.onRefresh()
          }
        })
      },
      onSubmitEditing: () => {
        this.onRefresh()
      },
      handleFormData: (fn) => {
        let formdatas = [{
          key: "taskNo",
          type: "input",
          require: false,
          value: "",
          placeholder: "请输入工单号"
        }, {
          key: "equipmentName",
          type: "input",
          require: false,
          value: postData.equipmentName,
          hidden: false,
          placeholder: "请输入设备名称"
        }, {
          key: "repairType",
          type: "select",
          require: false,
          value: "",
          placeholder: "请选择维修类型",
          option: res.repairTypeList && res.repairTypeList
        }, {
          key: "faultLevel",
          type: "select",
          require: false,
          value: "",
          placeholder: "请选择故障级别",
          option: res.faultLevelList && res.faultLevelList
        }, {
          key: "status",
          type: "select",
          require: false,
          value: "",
          placeholder: "请选择维修状态",
          option: res.statusList && res.statusList
        }
        ]
        this.setNewState("formdata", formdata.length > 0 ? formdata : formdatas, () => {
          fn ? fn() : null
        })
      }

    }

    let renderItem = ({ section: section, row: row }) => {
      let item = this.state.resData[section].items[row];
      return item ? <RepairItem pressfn={ () => {
        this.setNewState("repairstep", { id: item.equipmentId }, () => {
          let res2 = this.props.index.res2, submitdatas = [];

          if (item.status == 1) {//状态待维修，点击后开始维修


            this.setNewState("submitdata", submitdatas, () => {
              navigation.navigate("SubmitForm", { title: "开始维修", type: "repair" })
            })

          } else if (item.status == 2) {//状态待维修中，点击后完成维修

            submitdatas = [
              {
                key: "faultReason",
                type: "input",
                require: true,
                value: "",
                placeholder: "请填写故障原因",
              },
              {
                key: "repairContent",
                type: "input",
                require: true,
                value: "",
                placeholder: "请填写维修内容",
              },
              {
                key: "repairType",
                type: "select",
                require: true,
                value: "",
                placeholder: "请选择维修类型",
                option: res2.repairTypeList && res2.repairTypeList
              }, {
                key: "faultLevel",
                type: "select",
                require: true,
                value: "",
                placeholder: "请选择故障等级",
                option: res2.faultLevelList && res2.faultLevelList
              }, {
                key: "spare",
                type: "multinput",
                require: false,
                value: [],
                format: {
                  "id": "userSparePartsId",//备件id
                  "value": "consumeCount" //使用数量
                },
                subs: [{
                  name: "备件名",
                  key: "sparePartsName"
                }, {
                  name: "备件类型",
                  key: "sparePartsTypeName"
                }, {
                  name: "可用库存",
                  key: "availableStock"
                }
                ],

                placeholder: "请选择消耗备件",
                option: res2.spareList && res2.spareList.map((item,i)=>{
                  return {
                    ...item,
                    dicName:item.sparePartsName,
                    dicKey:item.id
                  }

                })
              }
            ]
            this.setNewState("submitdata", submitdatas, () => {
              navigation.navigate("SubmitForm", { title: "完成维修", type: "repair" })
            })


          } else if (item.status == 3) {//状态待待验证，点击后验证

            
            submitdatas = [
              {
                key: "confirmIsPass",
                type: "select",
                require: true,
                value: "",
                placeholder: "请选择验证结果",
                option: [{
                  dicName:"通过",
                  dicKey:"1"
                },{
                  dicName:"不通过",
                  dicKey:"2"
                }]
              },
              {
                key: "confirmDesc",
                type: "textarea",
                require: false,
                value: "",
                placeholder: "请填写验证说明",
              },
            ]
            this.setNewState("submitdata", submitdatas, () => {
              navigation.navigate("SubmitForm", { title: "验证维修", type: "repair" })
            })



          } else { //已完成
            return
          }



        })


      } } item={ item } navigation={ this.props.navigation }></RepairItem> : <View></View>
    }

    return <SafeAreaViewPlus loading={ submitting && isLoadMore && refreshing||submittings }>
      <Header
        navigation={ navigation }
        title="待处理维修单列表"
        headerRight={ () => !search ? <AntIcons name="search1" size={ 22 } onPress={ () => {
          this.setState({
            search: !search
          })
        } } /> : <Text onPress={ () => {
          this.setState({
            search: !search
          })
        } }>
            取消
        </Text> }
      >
      </Header>
      <View flex >
        <View style={ { padding: search ? 12 : 0, paddingBottom: 0 } }>
          <TitleSearch { ...searchprops }></TitleSearch>
        </View>
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
          heightForIndexPath={ () => 100 }
          allLoaded={ !this.props.index.repairList.hasNextPage }
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
export default ToRepair