import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OpenToast } from '../../components';


@connect(({ index }) => ({ index }))
class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then(()=>{
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
        <Text heading marginB-s4>My Screen</Text>
        <Card height={100} center padding-card marginB-s4>
          <Text body>This is an example card {index.count}</Text>
        </Card>

        <Button label="Button" body bg-primaryColor square onPress={() => {
          this.login()
        }}></Button>
      </View>
    </SafeAreaViewPlus>

  }
}

export default Home