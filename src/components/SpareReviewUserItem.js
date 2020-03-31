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

class SpareReviewUserItem extends Component {
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
    }, statusName = { 0: "待审批", 1: "审批通过", 2: "审批未通过", 3: "撤回" };


    return <Card borderRadius={0} enableShadow={false} bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 108 }}
      paddingL-12 paddingR-12
      onPress={() => {
        navigation.navigate("InfoSpareDetail", {
          id: item.sparePartsId ? item.sparePartsId : item.id,
        })
      }}
    >
      <View row spread paddingV-12 paddingB-12 style={{ alignItems: "center" }}>
        <View left>
          <Text body dark10 numberOfLines={1}><Text style={{ color: getColor(item) }}>| </Text>{item.sparePartsName}</Text>
        </View>
      </View>
      <View row spread top paddingB-8 style={{ alignItems: "center" }}>
        <View>
          <Text subbody numberOfLines={1}>料号:{item.sparePartsNo}</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>价值:{item.sparePartsValue ? `${item.sparePartsValue}元` : ""}</Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={{ alignItems: "center" }}>
        <View>
          <Text subbody numberOfLines={1}>备件类型:{item.sparePartsTypeName}</Text>
        </View>
        <View flex-1 right>
          <Text subbody dark40 numberOfLines={1}>申请:{item.applyCount ? `${item.applyCount}个` : ""}</Text>
        </View>
      </View>



    </Card>
  }
}





export default SpareReviewUserItem
