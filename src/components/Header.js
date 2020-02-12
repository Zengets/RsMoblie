import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

@connect(({ index }) => ({ index }))
class Header extends Component {
    render() {
        let { headerLeft, title, navigation,headerRight,backgroundColor } = this.props;

        return <View style={{ height: 44, flexDirection: "row", alignItems: "center", backgroundColor:backgroundColor?backgroundColor:"#fff" }}>
            <View style={{ width: 56 }} center>
                {
                    navigation ? <Ionicons name={"ios-arrow-back"} size={24} color={"#666"} onPress={() => {
                        navigation.goBack()
                    }}></Ionicons> :
                        headerLeft ? headerLeft() : null
                }
            </View>
            <View flex-1 center>
                <Text subheading dark style={{ fontWeight: "bold" }}>{title}</Text>
            </View>
            <View style={{ width: 56 }} center>
                {
                    headerRight ? headerRight() : null
                }
            </View>


        </View>
    }

}
export default Header
