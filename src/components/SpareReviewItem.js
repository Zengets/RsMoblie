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

class SpareReviewItem extends Component {
  render() {
    let { item, navigation, type, hidden,children } = this.props;
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
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: hidden ? 70 :128 }}
      paddingL-12 paddingR-12
      onPress={() => {
        navigation.navigate("SpareReviewDetail", {
          ...item,
          type
        })
      }}
    >
      {children?children:<View height={12}></View>}

      <View row spread paddingB-12 style={{ alignItems: "center" }}>
        <View left>
          <Text body dark10><Text style={{ color: getColor(item) }}>| </Text>{item.taskNo}</Text>
          {
        hidden ? null :<Text subbody dark10>总价值:{item.totalSparePartsValue ? `${item.totalSparePartsValue}元` : ""}</Text>}
        </View>
        <View row center>
          <Text subbody dark100 marginR-3 style={{ color: getColor(item) }}>{statusName[item.status]}</Text>
          <Badge size='small' backgroundColor={getColor(item)}></Badge>
        </View>
      </View>
      {
        hidden ? null : <View row spread top paddingB-8 style={{ alignItems: "center" }}>
          <View>
            <Text subbody>申请人:{item.applyUserName}</Text>
          </View>
          <View flex-1 right>
            <Text subbody>审批人:{item.auditUserName}</Text>
          </View>
        </View>
      }
      {
        hidden ? null :
          <View row spread top paddingV-0 style={{ alignItems: "center" }}>
            <View>
              <Text subbody>操作类型:{item.applyTypeName}</Text>
            </View>
            <View flex-1 right>
              <Text subbody dark40>{item.applyTime}</Text>
            </View>
          </View>
          }



    </Card>
  }
}





export default SpareReviewItem
