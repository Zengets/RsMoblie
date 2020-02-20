import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert, FlatList } from 'react-native';
import { View, Text, Card, AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OpenToast } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native'
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
    }).then((res) => {
      if (!res) {
        return
      }
      fn ? fn() : null
    })
  }

  componentDidMount() {

  }

  logout() {
    this.setNewState("logout",{},async ()=>{
      await AsyncStorage.clear();
      this.props.navigation.closeDrawer();
      setTimeout(()=>{
        this.props.navigation.navigate('Login')
      },400)
    })
  }




  render() {
    const { index } = this.props
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();


    return <SafeAreaViewPlus>
      <View flex>
        <View padding-page>
          <Text heading marginB-s4>My PerCenter</Text>
          <Card height={100} center padding-card marginB-s4>
          </Card>
        </View>

        <View>
          <ListItem
            paddingL-20
            paddingR-20
            paddingT-0
            paddingB-0
            containerStyle={{ borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            height={44}
            onPress={() => {
              this.logout()
            }}
          >
            <ListItem.Part middle>
              <Text dark10>退出登录</Text>
            </ListItem.Part>
            <ListItem.Part right>
              <Ionicons name={'ios-arrow-forward'} size={12}></Ionicons>
            </ListItem.Part>
          </ListItem>
        </View>


      </View>
    </SafeAreaViewPlus>

  }
}

export default PerCenter