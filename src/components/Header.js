import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';


@connect(({ index }) => ({ index }))
class Header extends Component {
    render() {
        let { headerLeft, title, navigation,headerRight,backgroundColor,style,rightwidth,mode } = this.props;
        let bg = backgroundColor?backgroundColor:"#fff";
        return <View style={[style,{ height: 44, flexDirection: "row", alignItems: "center", backgroundColor:bg}]}>
            <View style={{ width: rightwidth?rightwidth:66}} left paddingL-12>
                {
                    navigation ? <AntIcons name={"left"} size={20} color={mode=="light"?"#fff":"#666"} onPress={() => {
                        navigation.goBack()
                    }}></AntIcons> :
                        headerLeft ? headerLeft() : null
                }
            </View>
            <View flex-1 center>
                <Text subheading dark style={{ fontWeight: "bold",color:mode=="light"?"#fff":"#666" }}>{title}</Text>
            </View>
            <View style={{ width: rightwidth?rightwidth:66 }} right paddingR-12>
                {
                    headerRight ? headerRight() : null
                }
            </View>


        </View>
    }

}
export default Header
