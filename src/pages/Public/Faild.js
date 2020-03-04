import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';


@connect(({ index }) => ({ index }))
class Header extends Component {
    render() {
        let { headerLeft, title, navigation,headerRight,backgroundColor,style } = this.props;

        return <View style={[style,{ height: 44, flexDirection: "row", alignItems: "center", backgroundColor:backgroundColor?backgroundColor:"#fff" }]}>
            <View style={{ width: 40 }} right>
                {
                    navigation ? <AntIcons name={"left"} size={20} color={"#666"} onPress={() => {
                        navigation.goBack()
                    }}></AntIcons> :
                        headerLeft ? headerLeft() : null
                }
            </View>
            <View flex-1 center>
                <Text subheading dark style={{ fontWeight: "bold" }}>{title}</Text>
            </View>
            <View style={{ width: 40 }} left>
                {
                    headerRight ? headerRight() : null
                }
            </View>


        </View>
    }

}
export default Header
