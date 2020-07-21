import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors } from 'react-native-ui-lib';
import { Rows, NoticeTodoItem, RepairItem, UpkeepItem, CheckItem, SpareReviewItem, SpareChangeMissionItem, AuthBase } from '../../../components';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import { colors, getItem, } from '../../../utils';
import moment from 'moment';

let option = [
  {
    dicName: "全部",
    dicKey: "1",
    color: colors.textColor
  },
  {
    dicName: "我的发布(审核)",
    dicKey: "2",
    color: colors.primaryColor
  },
  {
    dicName: "任务通知(未完成)",
    dicKey: "3",
    color: Colors.green30,
  },
  {
    dicName: "我的维修(未完成)",
    dicKey: "4",
    color: Colors.green30,
  },
  {
    dicName: "我的维保(未完成)",
    dicKey: "5",
    color: Colors.green30,
  },
  {
    dicName: "我的点检(异常待处理)",
    dicKey: "6",
    color: "#F50",
  },
  {
    dicName: "我的备件(审批)",
    dicKey: "7",
    color: colors.primaryColor,
  },
  {
    dicName: "我的备件(更换任务)",
    dicKey: "8",
    color: Colors.blue20,
  },
]
@connect(({ index, loading }) => ({ index, loading }))
class Todolist extends React.Component {

  state = {
    fullscreen: false,
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
    this.setNewState("overview", { taskType: "1" });
  }

  jump(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }

  render() {
    const { index: { homenum, overview }, navigation, loading } = this.props,
      { fullscreen } = this.state;
    let renderItem = (item, i) => {
      let dicName = option.filter((it) => { return it.dicKey == item.taskType })[0].dicName,
        color = option.filter((it) => { return it.dicKey == item.taskType })[0].color;
      if (item.taskType == "2") {
        return <View bg-white marginB-1>
          <NoticeTodoItem item={item} navigation={this.props.navigation} type="history" hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </NoticeTodoItem>
        </View>
      } else if (item.taskType == "3") {
        return <View bg-white marginB-1>
          <NoticeTodoItem item={item} navigation={this.props.navigation} type="history" hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </NoticeTodoItem>
        </View>
      } else if (item.taskType == "4") {
        return <View bg-white marginB-1>
          <RepairItem pressfn={() => {
            this.jump("RepairAction", { title: "开始维修", type: item.status.toString(), id: item.equipmentId })
          }} item={item} navigation={this.props.navigation} hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </RepairItem>
        </View>
      } else if (item.taskType == "5") {
        return <View bg-white marginB-1>
          <UpkeepItem item={item} navigation={this.props.navigation} type="mission" hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </UpkeepItem>
        </View>
      } else if (item.taskType == "6") {
        return <View bg-white marginB-1>
          <CheckItem item={item} navigation={this.props.navigation} type="error" hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </CheckItem>
        </View>
      } else if (item.taskType == "7") {
        return <View bg-white marginB-1>
          <SpareReviewItem item={item} navigation={this.props.navigation} hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </SpareReviewItem>
        </View>
      } else if (item.taskType == "8") {
        return <View bg-white marginB-1>
          <SpareChangeMissionItem item={item} navigation={this.props.navigation} hidden={true}>
            <Rows padding={0} name={dicName} rightRender={<Text>{item.createTime}</Text>} color={color} noborder={true}></Rows>
          </SpareChangeMissionItem>
        </View>
      }
    }, index = this.props.index;


    return <AuthBase item={getItem("homePage", "compleToTask", index.userAccount)}>
      <View margin-12 style={{ borderRadius: 8, overflow: "hidden" }}>
        <Text marginB-12 onPress={() => {
          this.setState({
            fullscreen: !fullscreen
          })
        }}>待办任务({overview.taskList ? overview.taskList.length : ""}):</Text>
        <View style={{ borderRadius: 8, overflow: "hidden" }}>
          {
            overview.taskList && overview.taskList.length > 0 ?
              overview.taskList.sort((a, b) => {
                return moment(b.createTime).valueOf() - moment(a.createTime).valueOf()
              }).map((item, i) => {
                if (fullscreen) {
                  return renderItem(item, i)
                } else if (i < 3) {
                  return renderItem(item, i)
                }
              }) :
              null
          }
          {
            overview.taskList && overview.taskList.length > 3 ?
              <Card row center padding-4 borderRadius={0} enableShadow={false} onPress={() => {
                this.setState({
                  fullscreen: !fullscreen
                })
              }}>
                <AntIcons name={fullscreen ? "arrowup" : "arrowdown"} size={16} style={{ color: colors.primaryColor }}></AntIcons>
                <Text>
                  {fullscreen ? " 收起" : " 展开"}
                </Text>
              </Card> : null
          }
        </View>
      </View>
    </AuthBase>

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


export default Todolist