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

class SpareItem extends Component {
  render() {
    let { item, navigation, avatar, device } = this.props;
    return <Card borderRadius={0} enableShadow={false} bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 90 }}
      spread
      padding-12
      paddingL-page paddingR-page
      onPress={() => {
        console.log(item)
        navigation.navigate("SpareListDetail", {
          id: item.userId ? item.userId : item.id,
        })
      }}
    >
      <View row spread>
        <Text subheading>{item.sparePartsName}</Text>
        {
          item.availableStock > item.warnStock ?
            null : <View center style={{ width: 64, height: 20, backgroundColor: colors.warnColor,marginTop:-12,marginRight:-20 }}>
              <Text white>
                低库存
              </Text>
            </View>

        }
      </View>

      <View row spread>
        <Text subbody dark20><Text dark50>料号:</Text>{item.sparePartsNo}</Text>
        <Text subbody style={{color:item.availableStock > item.warnStock ?"#666":colors.warnColor}}><Text dark50>库存:</Text><Text >{item.availableStock}</Text></Text>


      </View>

      <View row spread>
        <Text subbody dark20><Text dark50>规格型号:</Text>{item.sparePartsTypeName}</Text>
        <Text subbody dark20><Text dark50>负责人:</Text>{item.warnNoticeUserName}</Text>
      </View>


    </Card>
  }
}





export default SpareItem
