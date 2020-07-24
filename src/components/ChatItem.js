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

class ChatItem extends Component {
  render() {
    let { item, navigation, type, hidden, children } = this.props;
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
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: hidden ? 70 : 114 }}
      paddingL-12 paddingR-12
      onPress={() => {
        navigation.navigate("ChatDetail", item)
      }}
    >
      {children ? children : <View height={16}></View>}
      <View row spread paddingB-12 style={{ alignItems: "center" }}>
        <View left flex-1>
          <Text body dark10 numberOfLines={1}><Text style={{ color: getColor(item) }}>| </Text>{item.title}</Text>
        </View>
      </View>
      {
        hidden ? null : <View row spread top paddingB-8 style={{ alignItems: "center" }}>
          <View>
            <Text subbody numberOfLines={1}>{item.comment}</Text>
          </View>
        </View>
      }
      {
        hidden ? null :
          <View row spread top paddingV-0 style={{ alignItems: "center" }}>
            <View spread row>
              <View flex-1 left>
                <Text subbody numberOfLines={1}>{item.uploadUserName} {item.createTime}</Text>
              </View>
              <View flex-1 row right style={{alignItems: "center"}}>
                <AntIcons name='message1'></AntIcons>
                <Text marginL-6 subbody numberOfLines={1}>{item.commentCount}</Text>
              </View>
            </View>
          </View>
      }



    </Card>
  }
}





export default ChatItem
