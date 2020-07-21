import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, ConvertPinyin } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/deviceuser'],
}))
class DeviceUser extends React.Component {

    state = {
        selectedIndex: 0
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
        this.setNewState("deviceuser", {
            equipmentId: this.props.route.params.id
        })
    }

    linking(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                OneToast("您未安装邮箱APP,请安装后重试...")
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {

        let { index, navigation,submitting } = this.props,
            { check, maintain, verification, repair } = index.deviceuser;
        check = check ? check : [];
        maintain = maintain ? maintain : [];
        verification = verification ? verification : [];
        repair = repair ? repair : [];

        let arr = [check.length, maintain.length, verification.length, repair.length],
            avatar = {
                title: 'Initials with Color',
                source: require("../../../assets/user.png"),
            }

        return <SafeAreaViewPlus style={{ backgroundColor: "#fff" }} loading={submitting}>
            <Header title={`设备负责人`} navigation={navigation}>
            </Header>
            <TabBar
                selectedIndex={this.state.selectedIndex}
                onChangeIndex={index => {
                    this.scrollview.scrollTo({ x: 0, y: 720, animated: true }, 1)
                    this.setState({ selectedIndex: index })
                }}
                style={styles.tabbar}
                enableShadow={false}
                indicatorStyle={{ borderBottomWidth: 2, borderColor: colors.primaryColor }}>
                <TabBar.Item
                    label={`维修(${repair.length})`}
                    labelStyle={{ textTransform: 'capitalize' }}
                    selectedLabelStyle={{
                        color: colors.primaryColor
                    }}
                />
                <TabBar.Item selectedLabelColor={colors.primaryColor}
                    label={`验证(${verification.length})`}
                    labelStyle={{ textTransform: 'capitalize' }}
                    selectedLabelStyle={{
                        color: colors.primaryColor
                    }}
                />
                <TabBar.Item selectedLabelColor={colors.primaryColor}
                    label={`点检(${check.length})`}
                    labelStyle={{ textTransform: 'capitalize' }}
                    selectedLabelStyle={{
                        color: colors.primaryColor
                    }}
                />
                <TabBar.Item selectedLabelColor={colors.primaryColor}
                    label={`保养(${maintain.length})`}
                    labelStyle={{ textTransform: 'capitalize' }}
                    selectedLabelStyle={{
                        color: colors.primaryColor
                    }}
                />
            </TabBar>
            <ScrollView  keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
            >
                <View style={{ width: "100%" }}>
                    <View style={[styles.inter, { height: 77 * Math.max(...arr), minHeight: height }]} >
                        {
                            this.state.selectedIndex == 0 ? repair.length > 0 ? repair.map((item, i) => (
                                <UserItem key={i} avatar={avatar} navigation={this.props.navigation} item={item}></UserItem>
                            )) : <Empty /> : null
                        }
                        {
                            this.state.selectedIndex == 1 ? verification.length > 0 ? verification.map((item, i) => (
                                <UserItem key={i} avatar={avatar} navigation={this.props.navigation} item={item}></UserItem>
                            )) : <Empty /> : null
                        }
                        {
                            this.state.selectedIndex == 2 ? check.length > 0 ? check.map((item, i) => (
                                <UserItem key={i} avatar={avatar} navigation={this.props.navigation} item={item}></UserItem>
                            )) : <Empty /> : null
                        }
                        {
                            this.state.selectedIndex == 3 ? maintain.length > 0 ? maintain.map((item, i) => (
                                <UserItem key={i} avatar={avatar} navigation={this.props.navigation} item={item}></UserItem>
                            )) : <Empty /> : null
                        }
                    </View>
                </View>
            </ScrollView>




        </SafeAreaViewPlus>

    }
}

const styles = StyleSheet.create({
    inter: {
        flex: 1,
        width: "100%",
        borderRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: "#ffffff",
        overflow: "hidden"
    },
    tabbar: {
        borderRadius: 0
    },
    item: {
        borderColor: "#f0f0f0",
        borderBottomWidth: 1,
        width: "100%",
        alignItems: "center",
        marginTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12
    },
    items: {
        borderColor: "#f0f0f0",
        borderBottomWidth: 0,
        width: "100%",
        alignItems: "center",
        marginTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12
    },
})


export default DeviceUser