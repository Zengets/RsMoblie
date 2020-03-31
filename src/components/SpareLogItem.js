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

class SpareLogItem extends Component {

  render() {
    let { item, navigation, type } = this.props;
    let getColor = (item) => {
      let color = "#43c4cc"
      switch (item) {
        case "0":
          color = colors.primaryColor;
          break;
        case "1":
          color = colors.warnColor;
          break;
      }
      return color
    }, statusName = { 0: "入库", 1: "出库" };


    return <Card borderRadius={ 0 } enableShadow={ false } bg-white
      style={ { borderBottomWidth: 1, borderColor: "#f9f9f9", height: 110 } }
      paddingL-12 paddingR-12
      onPress={ () => {
        navigation.navigate("SpareLogDetail", {
          id:item.id
        })
      } }
    >
      <View row spread paddingV-12 paddingB-16 style={{alignItems:"center"}}>
        <View>
          <Text body dark10 numberOfLines={1}><Text style={ { color: getColor(item.ioType) } }>| </Text>{ item.sparePartsName }</Text>
        </View>
        <View row center>
          <Text subbody dark100 marginR-3  style={ { color: getColor(item.ioType) } }>{ item.ioTypeName }</Text>
          <Badge size='small' backgroundColor={ getColor(item.ioType) }></Badge>
        </View>
      </View>
      <View row spread top paddingB-8 style={ { alignItems: "center" } }>
        <View>
          <Text subbody numberOfLines={1}>料号:{ item.sparePartsNo }</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>{ item.ioType == "0" ? "入库数量" : item.ioType == "1" ? "出库数量" : "" }:<Text style={ { color: getColor(item.ioType) } }>{ item.batchCount }个</Text></Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={ { alignItems: "center" } }>
        <View>
          <Text subbody numberOfLines={1}>操作人:{ item.dealUserName }</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>{ item.dealTime }</Text>
        </View>
      </View>



    </Card>
  }
}





export default SpareLogItem
