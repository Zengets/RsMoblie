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

class SpareUsageItem extends Component {
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

    // "consumeCount": 1,--------------------------------使用数量
    // "id": "2020030522570355358",---------------------------id
    // "consumeUserName": "小李子",-------------------------使用人名
    // "consumeType": "0",---------------------------------使用类型key

    return <Card borderRadius={0} enableShadow={false} bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 128 }}
      paddingL-12 paddingR-12
      onPress={() => {
          navigation.navigate("SpareUsageDetail", item)
      }}
    >
      <View row spread paddingV-12 paddingB-12 style={{ alignItems: "center" }}>
        <View left>
          <Text body dark10 numberOfLines={1}><Text style={{ color: getColor(item) }}>| </Text>{item.taskNo}</Text>
          <Text subbody dark10>使用数量:{item.consumeCount}</Text>
        </View>
        <View flex-1 right>
          <Text subbody style={{ color: getColor(item) }} numberOfLines={1}>{item.consumeTypeName}</Text>
        </View>
      </View>
      <View row spread top paddingB-8 style={{ alignItems: "center" }}>
        <View>
          <Text subbody numberOfLines={1}>备件:{item.sparePartsName}</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>料号:{item.sparePartsNo}</Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={{ alignItems: "center" }}>
        <View>
          <Text subbody numberOfLines={1}>使用人:{item.consumeUserName}</Text>
        </View>
        <View flex-1 right>
          <Text subbody dark40 numberOfLines={1}>{item.consumeTime}</Text>
        </View>
      </View>



    </Card>
  }
}





export default SpareUsageItem
