import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, View, Text, Card, AnimatedImage, ThemeManager, BorderRadiuses, Badge, Colors } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, StyleSheet,Dimensions, Alert } from 'react-native';
import { colors, downloadFile } from '../utils';
import Modal from './Modal';


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

class KnowledgeItem extends Component {

  render() {
    let { item, navigation, onpressfn } = this.props;
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
      style={{ borderBottomWidth: 1, borderColor: "#f9f9f9", height: 128 }}
      paddingL-12 paddingR-12
      onPress={() => {
        if (onpressfn) {
          onpressfn()
        } else {
          navigation.navigate("Knowledgedetail", item)
        }
      }}
      onLongPress={()=>{
        downloadFile("https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2888261511,2808819884&fm=26&gp=0.jpg")
        
      }}
    >
     

      <View row spread top paddingV-12 paddingB-12>
        <View left>
          <Text body dark10 numberOfLines={1}><Text style={{ color: getColor(item) }}>| </Text>{item.knowledgeBaseName}</Text>
          <Text subbody dark40>长按下载文件</Text>
        </View>
        <View row right>
          <Text body style={{ color: getColor(item) }} numberOfLines={1}>{item.purposeTypeName}</Text>
        </View>
      </View>
      <View row spread top paddingB-8 style={{ alignItems: "center" }}>
        <View>
          <Text subbody numberOfLines={1}>设备类型:{item.equipmentTypeName}</Text>
        </View>
        <View flex-1 right>
          <Text subbody numberOfLines={1}>上传人:{item.updateUserName}</Text>
        </View>
      </View>
      <View row spread top paddingV-0 style={{ alignItems: "center" }}>
        <View>
        </View>
        <View flex-1 right>
          <Text subbody dark40 numberOfLines={1}>{item.updateTime}</Text>
        </View>
      </View>



    </Card>
  }
}





export default KnowledgeItem
