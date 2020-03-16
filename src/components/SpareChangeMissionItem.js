import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, View, Text, Card, AnimatedImage, ThemeManager, BorderRadiuses, Badge, Colors } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors, ConvertPinyin } from '../utils';

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

class SpareChangeMissionItem extends Component {
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
    }, statusName = { 0: "未开始", 1: "进行中", 2: "已完成" };



    return <Card borderRadius={0} enableShadow={false} bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 128 }}
      paddingL-12 paddingR-12
      onPress={() => {
        type ?
          navigation.navigate("SpareChangeHistoryDetail", item) :
          navigation.navigate("SpareChangeMissonDetail", item)
      }}
    >
      <View row spread paddingV-12 paddingB-12 style={{ alignItems: "center" }}>
        <View left>
          <Text body dark10><Text style={{ color: getColor(item) }}>| </Text>{item.taskNo}</Text>
          <Text subbody dark40>{item.planStartMaintainDate}</Text>
        </View>
        {
          type ? <View flex-1 right>
            <Text subbody style={{ color: getColor(item) }}>使用:{item.sparePartsNum}个</Text>
          </View> : <View row center>
              <Text subbody dark100 marginR-3 style={{ color: getColor(item) }}>{statusName[item.status]}</Text>
              <Badge size='small' backgroundColor={getColor(item)}></Badge>
            </View>
        }

      </View>
      <View row spread top paddingB-8 style={{ alignItems: "center" }}>
        <View>
          <Text subbody>备件:{item.sparePartsName}</Text>
        </View>
        <View flex-1 right>
          <Text subbody>料号:{item.sparePartsNo}</Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={{ alignItems: "center" }}>
        <View>
          <Text subbody>设备:{item.equipmentName}</Text>
        </View>
        <View flex-1 right>
          <Text subbody>执行人:{item.planMaintainUserName}</Text>
        </View>
      </View>



    </Card>
  }
}





export default SpareChangeMissionItem
