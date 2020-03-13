import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, View, Text, Card, AnimatedImage, ThemeManager, BorderRadiuses, Badge, TextField } from 'react-native-ui-lib';
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

class SpareTakeItem extends Component {
  render() {
    let { item, navigation, onPressfn, select, onChangeText,value } = this.props,
      inserprops = (item) => {
        if (!value) {
          value = 0
        }
        return {
          keyboardType: 'numeric',
          underlineColor: { default: 'transparent', error: 'transparent', focus: "transparent", disabled: 'transparent' },
          value: value ? value.replace(/[^0-9]*/g, '') : 0,
          placeholder: "请填写数量",
          onChangeText: (val) => {
            onChangeText(val)
          }
        }
      }

    return <Card borderRadius={ 0 } enableShadow={ false }
      style={ { borderBottomWidth: 1, borderColor: "#f9f9f9", height: 120, backgroundColor: select ? "lightblue" : "#fff" } }
      padding-12
      paddingL-page paddingR-page
      onLongPress={ () => {
        navigation.navigate("InfoSpareDetail", {
          id:item.sparePartsId?item.sparePartsId:item.id,
        })
      } }
      onPress={ () => {
        onPressfn()
      } }
    >
      <View row spread style={ { alignItems: "center", overflow: "hidden" } }>
        <View style={ { borderColor: item.availableStock > item.warnStock ? colors.primaryColor : colors.errorColor, borderLeftWidth: 2, height: 6 } } marginT-6 marginB-12 paddingL-6 center>
          <Text body dark>{ item.sparePartsName }</Text>
        </View>

        {
          select ?
            <View flex-1 marginL-12 paddingH-12 paddingV-8 height={ 40 } style={ { overflow: "hidden", backgroundColor: "#f0f0f0" } }>
              <TextField { ...inserprops(item) } style={ { width: "100%" } }></TextField>
            </View> :
            <View flex-1 marginL-12 paddingV-8 height={ 40 } right>
              <Text subbody dark40><Text dark60>点击选择该备件</Text></Text>
            </View>
        }
      </View>

      <View row spread paddingT-8>
        <Text subbody dark40><Text >料号:</Text>{ item.sparePartsNo }</Text>
        <Text subbody style={ { color: item.availableStock > item.warnStock ? "#999" : colors.errorColor } }><Text >库存:</Text><Text >{ item.availableStock }</Text></Text>
      </View>

      <View row spread marginT-4>
        <Text subbody dark40><Text >规格:</Text>{ item.sparePartsTypeName }</Text>
        <Text subbody dark40><Text >负责人:</Text>{ item.warnNoticeUserName }</Text>
      </View>


    </Card>
  }
}





export default SpareTakeItem
