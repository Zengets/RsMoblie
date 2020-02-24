import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, View, Text, Card, AnimatedImage,ThemeManager,BorderRadiuses,Badge } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator,StyleSheet } from 'react-native';
import { colors } from '../utils';

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

class UserItem extends Component {
    render() {
        let { item,navigation,avatar } = this.props;
        return  <Card borderRadius={0} enableShadow={false} bg-white row
        style={{ alignItems: "center", borderBottomWidth: 1, borderColor: "#f9f9f9",height:77 }}
        paddingL-page paddingR-page
        onPress={() => {
          console.log(item)
          navigation.navigate("UserListDetail", {
            id: item.id?item.id:item.userId,
          })
        }}
      >
        <Avatar {...avatar}></Avatar>
        <View paddingL-12 spread>
          <Text dark20 subheading>{item.userName}<Text body>{item.jobTitle?`(${item.jobTitle})`:null}</Text></Text>
          <Text body marginT-4>{item.departmentName}</Text>
        </View>
      </Card>
    }
}





export default UserItem
