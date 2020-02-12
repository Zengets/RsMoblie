import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OpenToast } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

@connect(({ index }) => ({ index }))
class PerCenter extends React.Component {
  static navigationOptions = {
    title: 'PerCenter',
  };

  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then(() => {
      OpenToast("success")
    })
  }

  componentDidMount() {

  }

  login() {
    this.setNewState("login", {
      accountName: "1123",
      sendType: "1"
    })
  }




  render() {
    const { index } = this.props

    return <SafeAreaViewPlus>
      <View flex padding-page>
        <Text heading marginB-s4>My PerCenter</Text>
        <Card height={100} center padding-card marginB-s4>
        </Card>
        {/* <Ionicons
          name={"ios-home"}
          style={{ color: "red" }}
          size={26}
        ></Ionicons> */}
        
      </View>
    </SafeAreaViewPlus>

  }
}

export default PerCenter