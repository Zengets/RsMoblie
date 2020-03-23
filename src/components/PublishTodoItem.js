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

class PublishTodoItem extends Component {
  render() {
    let { item, navigation, type } = this.props;
    let getColor = (item) => {
      let color = "#43c4cc"
      switch (item.status) {
        case 0:
          color = "#999";
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
    }, statusName = { 1: "执行人", 2: "抄送人" }



    return <Card borderRadius={0} enableShadow={false} bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 108 }}
      paddingL-12 paddingR-12
      onPress={() => {
        navigation.navigate("PublishTodoDetail", item)
      }}
    >
      <View row spread paddingV-12 paddingB-12 style={{ alignItems: "center" }}>
        <View left>
          <Text body dark10><Text style={{ color: getColor(item) }}>| </Text>{item.assignmentTitle}</Text>
        </View>
        <View row center>
          <Text subbody dark100 marginR-3 style={{ color: getColor(item) }}>{item.statusName}</Text>
          <Badge size='small' backgroundColor={getColor(item)}></Badge>
        </View>
      </View>
      <View row spread top paddingB-8 style={{ alignItems: "center" }}>
        <View>
          <Text subbody>截至:{item.closeDate}</Text>
        </View>
        <View>
          <Text subbody dark60>{item.publishTime}</Text>

        </View>
      </View>
      <View row spread top paddingV-0 style={{ alignItems: "center" }}>
        <View>
          <Text subbody numberOfLines={1}>任务内容:{item.assignmentContent}</Text>
        </View>
      </View>



    </Card>
  }
}





export default PublishTodoItem
