import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button, TextField, Colors } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import { AsyncStorage } from 'react-native'

import { Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { colors, getItem } from '../../utils';

let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({ index, loading }))
class ChangePwd extends React.Component {

    state = {
        see: false,
        see1: false,
        oldpwd: null,
        newpwd: null,
    }

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
        this.setNewState("logout", {}, async () => {
            await AsyncStorage.clear();
            setTimeout(() => {
                this.props.navigation.navigate('Login')
            }, 400)
        })
    }
    render() {
        let { index, navigation, loading } = this.props, { see, see1, oldpwd, newpwd } = this.state;
        let textfieldprops = {
            floatingPlaceholder: true,
            floatOnFocus: true,
            underlineColor: "#999",
            floatingPlaceholderColor: {
                default: 'black',
                error: colors.primaryColor,
                focus: 'black',
                disabled: 'grey'
            }
        }, oldpwdprops = {
            ...textfieldprops,
            rightButtonProps: {
                iconSource: see ? require("../../assets/nosee.png") : require("../../assets/see.png"),
                iconColor: "#666",
                onPress: () => {
                    this.setState({
                        see: !see
                    })
                },
                style: { paddingTop: 8 },
            },
            secureTextEntry: !see,
            error: "密码为空",
            enableErrors: oldpwd == "",
            placeholder: '请输入旧密码',
            value: oldpwd,
            onChangeText: (val) => {
                this.setState({
                    oldpwd: val
                })
            }
        }, newpwdprops = {
            ...textfieldprops,
            rightButtonProps: {
                iconSource: see1 ? require("../../assets/nosee.png") : require("../../assets/see.png"),
                iconColor: "#666",
                onPress: () => {
                    this.setState({
                        see1: !see1
                    })
                },
                style: { paddingTop: 8 },
            },
            secureTextEntry: !see1,
            error: "密码为空",
            enableErrors: newpwd == "",
            placeholder: '请输入新密码',
            value: newpwd,
            onChangeText: (val) => {
                this.setState({
                    newpwd: val
                })
            }
        }



        return <SafeAreaViewPlus>
            <Header
                navigation={navigation}
                title="修改密码"
            />
            <ScrollView keyboardShouldPersistTaps="handled">
                <Card flex padding-page margin-12 enableShadow={false}>
                    <View>
                        <TextField  {...oldpwdprops} style={{ color: "#000" }}></TextField>
                    </View>
                    <View marginT-page>
                        <TextField  {...newpwdprops} style={{ color: "#000" }}></TextField>
                    </View>
                    <Button label={"修改密码"} marginT-page disabled={loading.effects['index/changePassword']} onPress={() => {
                        this.setNewState("changePassword", {
                            password: oldpwd,
                            newPassword: newpwd
                        }, () => {
                            OneToast(`修改成功，请重新登录`, Colors.green10, null, () => {
                                this.logout()
                            });
                        })
                    }}>
                        {
                            loading.effects[`index/changePassword`] ?
                                <ActivityIndicator color="white" style={{ paddingRight: 8 }} />
                                : null
                        }
                    </Button>
                </Card>
            </ScrollView>

        </SafeAreaViewPlus>

    }
}

export default ChangePwd