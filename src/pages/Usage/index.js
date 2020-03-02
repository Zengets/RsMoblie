import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast,Header } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';

@connect(({ index }) => ({ index }))
class Usage extends React.Component {

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
    this.setNewState("test", null)
  }


  render() {
    const { index,navigation } = this.props

    return <SafeAreaViewPlus>
     <Header
        title="应用"
        headerLeft={() => {
          return <AntIcons name={'menuunfold'} size={20} style={{ color: "#666", paddingLeft: 20 }} onPress={() => {
            navigation.openDrawer()
          }}></AntIcons>
        }}
        headerRight={() => {
          return <Ionicons name={'ios-qr-scanner'} size={22} onPress={() => {
            navigation.navigate("Scan")
          }}></Ionicons>
        }}
      />
      <View flex padding-page>
        <Text heading marginB-s4>Usage</Text>
        <Card height={100} center padding-card marginB-s4>
          <Text body>This is an Usage card {index.count}</Text>
        </Card>
        <Button label="Button" body bg-primaryColor square onPress={() => {
          this.login()
        }}></Button>
      </View>
    </SafeAreaViewPlus>

  }
}

export default Usage