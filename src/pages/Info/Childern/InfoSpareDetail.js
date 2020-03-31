import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty,Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, ConvertPinyin } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
  index,
  submitting: loading.effects['index/infosparedetail'],
}))
class InfoSpareDetail extends React.Component {

  state = {
    selectedIndex: 0
  }

  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then((res) => {
      if (!res) {
        return
      }
      fn ? fn() : null
    })
  }

  componentDidMount() {
    this.setNewState("infosparedetail", {
      id: this.props.navigation.state.params.id
    }, () => {
    })
  }


  render() {
    let { index, navigation, submitting } = this.props,
      { sparePartsName, sparePartsTypeName, sparePartsNo, sparePartsValue, spartPartsSerialNo, totalStock, availableStock, warnStock, warnNoticeUserName, warnNoticeUserId } = index.infosparedetail;


    return <SafeAreaViewPlus loading={ submitting }>
      <Header title={ `备件详情` } navigation={ navigation }>
      </Header>
      <ScrollView  keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={ false }
        ref={ (scrollview) => this.scrollview = scrollview }
      >
        <View padding-12 paddingT-0>
          <View style={ { overflow: "hidden" } } row={ false } spread left>
            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false }>
              <Rows name="备件名" values={ sparePartsName } />
              <Rows name="料号" values={ sparePartsNo } />
              <Rows name="型号规格" values={ sparePartsTypeName } />
              <Rows name="备件价值" values={ sparePartsValue ? sparePartsValue + "元" : "" }/>
              <Rows name="备件编号" values={ spartPartsSerialNo } />
              <Rows name="累计库存" values={ totalStock } />
              <Rows name="可用库存" values={ availableStock } />
              <Rows name="库存预警基数" values={ warnStock } />
            </Card>
            <Card marginT-12 style={ { width: "100%" } } enableShadow={ false } onPress={ () => {
              navigation.navigate("UserListDetail", {
                id: warnNoticeUserId,
              })
            } }>
              <View row spread style={ styles.item }>
                <Text subheading style={ { color: colors.primaryColor } }>
                  备件负责人
                </Text>
                <Text body style={ { color: colors.primaryColor } }>
                  <Text>{ warnNoticeUserName } </Text>
                  <Ionicons name='ios-arrow-forward' size={ 14 } style={ { color: colors.primaryColor } }></Ionicons>
                </Text>
              </View>

            </Card>




          </View>
        </View>

      </ScrollView>




    </SafeAreaViewPlus>

  }
}

const styles = StyleSheet.create({
  inter: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#ffffff",
    overflow: "hidden"
  },
  tabbar: {
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  item: {
    borderColor: "#f0f0f0",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
  items: {
    borderColor: "#f0f0f0",
    borderBottomWidth: 0,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
})


export default InfoSpareDetail