import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, Colors } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dimensions, ScrollView, Alert } from 'react-native';
import { colors, getItem } from '../../utils';

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class Mine extends React.Component {

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
    //this.setNewState("test", null)
  }

  jumpToUrl(url, data) {
    this.setNewState("formdata", [], () => {
      this.props.navigation.navigate(url, data);
    })
  }
  render() {
    const { index, navigation } = this.props, cardwidth = (width - 48) / 3, roundwidth = (width - 125) / 4;

    return <SafeAreaViewPlus>
      <Header
        title="我的"
        headerLeft={() => {
          return <AntIcons name={'menuunfold'} size={20} style={{ color: "#666" }} onPress={() => {
            navigation.openDrawer()
          }}></AntIcons>
        }}
        headerRight={() => {
          return <Ionicons name={'ios-qr-scanner'} size={22} onPress={() => {
            this.jumpToUrl("Scan")
          }}></Ionicons>
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 12 }}>
        <Card row padding-12 marginB-12 center enableShadow={false}>
          <Text subheading style={{ color: Colors.dark20 }}>我的全部待办:</Text>
          <Text subheading style={{ color: colors.warnColor }}>10个  </Text>
          <AntIcons name="right" style={{ color: Colors.dark20 }}></AntIcons>
        </Card>


        <View>
          <View marginB-12 marginT-6 row style={{ alignItems: "center" }}>
            <Text subheading style={{ color: Colors.dark20 }}>任务通知 </Text>
            <EntypoIcons name='bell' size={16} style={{ color: Colors.dark20 }}></EntypoIcons>
          </View>

          <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>
            {/* <AuthBase>
            
          </AuthBase> */}
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeTodo")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>
              </View>
              <Text subbody>未完成任务</Text>
            </Card>


            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeToConfirm")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>
              </View>
              <Text subbody>未审核</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeFinished")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
        <View>
          <Card row enableShadow={false} spread style={{ alignItems: "center",backgroundColor:"transparent" }} marginB-12 marginT-6
            onPress={()=>{
              this.jumpToUrl("Publish")
            }}
          >
            <View row style={{ alignItems: "center" }}>
              <Text subheading style={{ color: Colors.dark20 }}>我的发布 </Text>
              <AntIcons name='file1' size={16} style={{ color: Colors.dark20 }}></AntIcons>
            </View>
            <View row center padding-6 style={{backgroundColor:Colors.green10,borderRadius:4}}>
              <AntIcons name='edit' size={16} style={{ color: Colors.white }}></AntIcons>
              <Text white> 发布</Text>
            </View>
          </Card>


          <View row style={{ width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }}>
            {/* <AuthBase>
            
          </AuthBase> */}
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeTodo")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <Ionicons name='ios-time' size={33} style={{ color: colors.warnColor }}></Ionicons>
              </View>
              <Text subbody>未完成任务</Text>
            </Card>


            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeToConfirm")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <FontAwesome5 name='pen' size={24} style={{ color: colors.primaryColor }}></FontAwesome5>
              </View>
              <Text subbody>审核</Text>
            </Card>
            <Card width={cardwidth} marginR-12 center padding-12 marginB-12 enableShadow={false} onPress={() => {
              this.jumpToUrl("NoticeFinished")
            }}>
              <View center style={{ width: 48, height: 48 }}>
                <AntIcons name='checkcircle' size={27} style={{ color: "#999" }}></AntIcons>
              </View>
              <Text subbody>已完成</Text>
            </Card>
          </View>
        </View>
        <View height={1} marginV-12 style={{ backgroundColor: Colors.black, opacity: 0.2 }}></View>
      </ScrollView>





    </SafeAreaViewPlus>

  }
}

export default Mine