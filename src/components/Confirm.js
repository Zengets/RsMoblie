import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActionSheet, Card } from 'react-native-ui-lib';


class Confirm extends Component {
    render() {
        let { successfn, visible, onDismiss, title } = this.props;

        return <ActionSheet
            useSafeArea={true}
            renderTitle={() => <View paddingT-16 paddingB-8 center><Text subheading>{title ? title : "是否删除？"}</Text></View>}
            useNativeIOS={true}
            containerStyle={{ borderRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}
            options={[
                {
                    label: '删除',
                    onPress: () => {
                        successfn ? successfn() : null
                    }
                },
                {
                    label: '取消',
                    onPress: () => {
                        onDismiss()
                    }
                },
            ]}
            renderAction={({ label, onPress }) => {
                return (<Card padding-14 enableShadow={false} center style={{ borderTopWidth: 1, borderColor: "#f0f0f0" }}
                    onPress={() => {
                        onPress ? onPress() : null
                    }}
                ><Text subheading style={{ color: label == "删除" ? "red" : "#999" }}>{label}</Text></Card>)
            }}
            visible={visible}
            onDismiss={() => {
                onDismiss()
            }}
        />
    }

}
export default Confirm
