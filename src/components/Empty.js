import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text,Card } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';


@connect(({ index }) => ({ index }))
class Empty extends Component {
    render() {
        let { style, title, children } = this.props;

        return <Card style={style?style:{}} center padding-page enableShadow={false}>
            <Text subheading>{title?title:"暂无数据"}</Text>
            {children}
        </Card>
    }

}
export default Empty
