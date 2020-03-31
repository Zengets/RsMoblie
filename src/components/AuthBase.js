import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';


@connect(({ index }) => ({ index }))
class AuthBase extends Component {
    render() {
        let { children,item } = this.props;

        return <View>
            {
                item.isExist=="1"?
                children:
                null
            }
        </View>
    }

}
export default AuthBase
