import React, { Component } from 'react';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        width: "100%",
        marginTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
    }
})


class Rows extends Component {

    render() {
        let { name, values, noborder, color, rightRender } = this.props;

        return <View row top style={ [styles.item, { borderColor: noborder ? "transparent" : "#f0f0f0" }] }>
            <View>
                <Text subbody style={ { color: color ? color : "#666" } }>
                    { name }{rightRender?"":":"}
                </Text>
            </View>
            <View flex-1 paddingL-6 style={ { overflow: "hidden" } } right>
                {
                    rightRender ? rightRender : <Text subbody style={ { color: color ? color : "#666" } }>
                        { values }
                    </Text>
                }

            </View>


        </View>

    }

}

export default Rows