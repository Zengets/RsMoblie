import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, View, Text, Card, AnimatedImage, ThemeManager, BorderRadiuses, Badge ,Colors} from 'react-native-ui-lib';
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

class SpareOwnerItem extends Component {
  render() {
    let { item, navigation, type } = this.props;
    let tocolor = ()=>{
      return item.availableStock/item.totalStock>0.5?colors.errorColor:colors.successColor
    }
    let avatarprops = {
      title: 'USER',
      label: item.userName ? ConvertPinyin(item.userName).substring(0, 1).toUpperCase() : "",
      labelColor: Colors.white,
      backgroundColor:tocolor(),
      size: 20
    }
    
    return <Card borderRadius={ 0 } enableShadow={ false } bg-white
      style={ { borderBottomWidth: 1, borderColor: "#f9f9f9", height: 110 } }
      paddingL-12 paddingR-12
      onPress={ () => {
        navigation.navigate("SpareOwnerDetail", item)
      } }
    >
      <View row spread paddingV-12 paddingB-16 style={ { alignItems: "center" } }>
        <View row center>
          <Avatar { ...avatarprops }></Avatar>
          <Text body dark10 marginL-8>{ item.userName }</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>持有:<Text style={{color:tocolor()}}>{ item.availableStock }个</Text></Text>
        </View>
      </View>
      <View row spread top paddingB-8 style={ { alignItems: "center" } }>
        <View>
          <Text subbody numberOfLines={1}>备件:{ item.sparePartsName }</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>料号:{ item.sparePartsNo }</Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={ { alignItems: "center" } }>
        <View>
          <Text subbody numberOfLines={1}>规格:{ item.sparePartsTypeName }</Text>
        </View>
        <View flex-1 right>
        <Text subbody numberOfLines={1}>总计:{ item.totalStock }个</Text>
        </View>
      </View>



    </Card>
  }
}





export default SpareOwnerItem
