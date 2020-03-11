import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, View, Text, Card, AnimatedImage, ThemeManager, BorderRadiuses, Badge } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../utils';

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 12,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});

class UpkeepItem extends Component {

  render() {
    let { item, navigation, type } = this.props;
    let getColor = (item) => {
      let color = "#43c4cc"
      switch (item.status) {
        case 0:
          color = "#ff5800";
          break;
        case 1:
          color = "#5477ff";
          break;
        case 2:
          color = "#cc0d01";
          break;
        case 3:
          color = "#43c4cc";
          break;
        case 4:
          color = "#54bbff";
          break;
        case 5:
          color = "#999999";
          break;
      }
      return color
    }, statusName = { 0: "待执行", 2: "执行中", 3: "已执行", 4: "关闭" };



    return <Card borderRadius={ 0 } enableShadow={ false } bg-white
      style={ { borderBottomWidth: 1, borderColor: "#f9f9f9", height: 120 } }
      paddingL-12 paddingR-12
      onPress={ () => {
        let postdata = {}, posturl = ""
        if (type == "plan") {
          postdata = {
            id: item.id,
            fromTable: item.fromTable
          }
          posturl = "upkeeplandetail"
        } else if (type == "mission") {
          postdata = {
            id: item.id,
          }
          posturl = "upkeepmissiondetail"
        }else if(type == "history"){
           postdata = {
            id: item.id,
          }
          posturl = "upkeephistorydetail"
        }
        navigation.navigate("UpkeepChild", {
          posturl,
          postdata,
          type
        })
      } }
    >
      <View row spread paddingV-8 top>

        <View>
          <Text body dark10><Text style={ { color: getColor(item) } }>| </Text>{ item.taskNo }</Text>
          <Text subbodybody dark40>负责人：{ item.planMaintainUserName }</Text>
        </View>
        <View row center>
          <Text subbody dark100 marginR-3 marginT-3 style={ { color: getColor(item) } }>{ statusName[item.status] }</Text>
          <Badge size='small' backgroundColor={ getColor(item) }></Badge>
        </View>
      </View>
      <View row spread top paddingV-4 style={ { alignItems: "center" } }>
        <View>
          <Text subbody>设备:{ item.equipmentName }</Text>
        </View>
        <View flex-1 right>
          {
            type == "history" ?
              <Text subbody >开始日期:{ item.startMaintainDate }</Text> :
              <Text subbody >计划日期:{ item.planStartMaintainDate }</Text>
          }

        </View>
      </View>
      <View row spread top paddingV-0 style={ { alignItems: "center" } }>
        <View>
          <Text subbody>编号:{ item.equipmentNo }</Text>
        </View>
        <View flex-1 right>
          {
            type == "history" ?
              <Text subbody >结束日期:{ item.endMaintainDate }</Text> :
              <Text subbody >维保类型:{ item.maintainPlanTypeName }</Text>

          }
        </View>
      </View>



    </Card>
  }
}





export default UpkeepItem
