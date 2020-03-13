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

class SpareOwnerDetailItem extends Component {
  // "equipmentId": "2020011933778926941",----------------设备id
  // "equipmentNo": "cs2",----------------------------------------设备编号
  // "equipmentName": "测试",------------------------------------设备名
  // "equipmentModel": "1",--------------------------------------设备型号


  render() {
    let { item, navigation, type } = this.props;

    return <Card borderRadius={ 0 } enableShadow={ false } bg-white
      style={ { borderBottomWidth: 1, borderColor: "#f9f9f9", height: 110 } }
      paddingL-12 paddingR-12
      onPress={ () => {
        navigation.navigate("SpareOwnerDetail", {
          sparePartsId: item.id,
          userId: item.userId
        })
      } }
    >
      <View row spread paddingV-12 paddingB-16 style={ { alignItems: "center" } }>
        <View row flex-1 left>
          <Text body dark10>工单:{ item.taskNo }</Text>
        </View>
        <View right>
          <Text subbody >使用:<Text style={ { color: colors.secondaryColor } }>{ item.consumeCount }个</Text></Text>
        </View>
      </View>

      <View row spread top paddingB-8 style={ { alignItems: "center" } }>
        <View>
          <Text subbody>使用类型:{ item.consumeTypeName }</Text>
        </View>
        <View flex-1 right>
          <Text subbody>使用时间:{ item.consumeTime }个</Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={ { alignItems: "center" } }>
        <View>
          <Text subbody>设备:{ item.equipmentName }</Text>
        </View>
        <View flex-1 right>
          <Text subbody>编号:{ item.equipmentNo }</Text>
        </View>
      </View>



    </Card>
  }
}





export default SpareOwnerDetailItem
