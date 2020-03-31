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

class CheckItem extends Component {

  render() {
    let { item, navigation, type, hidden,children } = this.props;
    let getColor = (item) => {
      let color = "#43c4cc"
      switch (item.status) {
        case 0:
          color = colors.successColor;
          break;
        case 1:
          color = colors.errorColor;
          break;
        case 2:
          color = colors.secondaryColor;
          break;
      }
      return color
    }, statusName = type == "error" ? { 1: "待处理", 2: "已处理" } : { 0: "正常", 1: "异常" };


    return <Card borderRadius={0} enableShadow={false} bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: hidden ? 70 : 95 }}
      paddingL-12 paddingR-12
      onPress={() => {
        if (type == "error") {
          navigation.navigate("CheckErrorDetail", {
            posturl: "checkerrordetail",
            postdata: { id: item.id },
          })
        } else {
          navigation.navigate("CheckHistoryDetail", {
            posturl: "checkhistorydetail",
            postdata: { equipmentPointCheckItemDayTaskId: item.id },
          })
        }
      }}
    >
      {
        type == "error" ?
          <View>
            {children ? children : <View height={16}></View>}
            <View row spread paddingB-12 top>
              <View>
                <Text body dark10 numberOfLines={1}><Text style={{ color: getColor(item) }}>| </Text>点检项:{item.pointCheckItem}</Text>
                {
                  hidden ? null : <Text subbody numberOfLines={1}>设备:{item.equipmentName}</Text>
                }
              </View>
              <View row center>
                <Text subbody dark100 marginR-3 style={{ color: getColor(item) }}>{statusName[item.status]}</Text>
                <Badge size='small' backgroundColor={getColor(item)}></Badge>
              </View>
            </View>
            {
              hidden ? null : <View row spread top paddingB-6 style={{ alignItems: "center" }}>
                <View>
                  <Text subbody  numberOfLines={1}>点检人:{item.pointCheckUserName}</Text>
                </View>
                <View flex-1 right marginL-12>
                  <Text subbody  numberOfLines={1}>点检日期:{item.pointCheckItemDate}</Text>
                </View>
              </View>
            }

          </View>
          :
          <View>
            <View row spread paddingV-12 top>
              <View>
                <Text body dark10><Text style={{ color: getColor(item) }}>| </Text>{item.taskNo}</Text>
              </View>
              <View row center>
                <Text subbody dark100 marginR-3 style={{ color: getColor(item) }}>{statusName[item.status]}</Text>
                <Badge size='small' backgroundColor={getColor(item)}></Badge>
              </View>
            </View>
            <View row spread top paddingB-6 style={{ alignItems: "center" }}>
              <View>
                <Text subbody>设备:{item.equipmentName}</Text>
              </View>
              <View flex-1 right>
                <Text subbody >点检日期:{item.pointCheckItemDate}</Text>
              </View>
            </View>
            <View row spread top paddingV-0 style={{ alignItems: "center" }}>
              <View>
                <Text subbody>编号:{item.equipmentNo}</Text>
              </View>
              <View flex-1 right>
                <Text subbody >点检人:{item.pointCheckUserName}</Text>
              </View>
            </View>
          </View>
      }





    </Card>
  }
}





export default CheckItem
