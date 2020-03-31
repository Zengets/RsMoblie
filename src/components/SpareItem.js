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
    let { item, navigation, avatar, lastRender } = this.props;
    lastRender = lastRender?lastRender:{};
    return <Card borderRadius={ 0 } enableShadow={ false } bg-white
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 90 } }
      spread
      padding-12
      paddingL-page paddingR-page
      onPress={ () => {
        lastRender.key == "totalStock" ?
        navigation.navigate("SpareOwnerDetail", item)
        :
        navigation.navigate("InfoSpareDetail", {
          id: item.sparePartsId ? item.sparePartsId : item.id,
        })
      } }
    >
      <View row spread>
        <View style={ { borderColor: item.availableStock > item.warnStock ? colors.primaryColor : colors.errorColor, borderLeftWidth: 2, height: 6 } } marginT-6 marginB-12 paddingL-6 center>
          <Text body dark numberOfLines={1}>{ item.sparePartsName }</Text>
        </View>
        {
          item.availableStock > item.warnStock || lastRender.key == "totalStock" ?
            null : <View center style={ { width: 64, height: 20, backgroundColor: colors.errorColor, marginTop: -12, marginRight: -20 } }>
              <Text white>
                低库存
              </Text>
            </View>

        }
      </View>

      <View row spread>
        <Text subbody dark40 numberOfLines={1}><Text >料号:</Text>{ item.sparePartsNo }</Text>
        <Text subbody numberOfLines={1} style={ { color: item.availableStock > item.warnStock ? "#999" : colors.errorColor } }><Text >库存:</Text><Text >{ item.availableStock }</Text></Text>
      </View>

      <View row spread marginT-4>
        <Text subbody dark40 numberOfLines={1}><Text >规格:</Text>{ item.sparePartsTypeName }</Text>
        {
          lastRender.key ?
            <Text subbody dark40 numberOfLines={1}><Text>{ lastRender.name }:</Text>{ item[lastRender.key] }</Text>
            : <Text subbody dark40 numberOfLines={1}><Text >负责人:</Text>{ item.warnNoticeUserName }</Text>
        }
      </View>


    </Card>
  }
}





export default SpareItem
