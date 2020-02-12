import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OpenToast } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

@connect(({ index }) => ({ index }))
class SettingMenu extends React.Component {

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



  render() {
    const { index } = this.props

    return <SafeAreaViewPlus>
    </SafeAreaViewPlus>

  }
}

export default SettingMenu