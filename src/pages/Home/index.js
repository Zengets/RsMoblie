import React from 'react';
import { connect } from 'react-redux';
import {View, Text, Card, Button} from 'react-native-ui-lib';
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
    }).then((res) => {
      if (res) {
        fn ? fn() : null;
      }
    });
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setNewState("test")
    },1000)
  }

  render() {
    const { index } = this.props
    console.log(index)


    return <View flex padding-page>
    <Text heading marginB-s4>My Screen</Text>
    <Card height={100} center padding-card marginB-s4>
      <Text body>This is an example card {index.count}</Text>
    </Card>
    
    <Button label="Button" body bg-primaryColor square></Button>
  </View>
  }
}

export default Home