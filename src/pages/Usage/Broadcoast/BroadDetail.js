import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar, TextArea } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, SelectFiles, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, downloadFile } from '../../../utils';
//http://view.xdocin.com/xdoc?_xdoc=
let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    loading
}))
class BroadDetail extends React.Component {

    state = {
        url: "",
        ismore: false
    }

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

    resetdata() {
        this.setNewState("broadqueryById", {
            id: this.props.route.params.id
        })
    }

    componentDidMount() {
        this.resetdata()
    }


    render() {
        let { index: { broadqueryById }, navigation, loading } = this.props, { ismore } = this.state,
            {
                announcementTitle, publishTime, publishUserName,announcementContent,
                urlIds, remark, status, executeList, sendList
            } = broadqueryById ? broadqueryById : {}

        let getColor = (item) => {
            let color = "#43c4cc"
            switch (item) {
                case 0:
                    color = "#999";
                    break;
                case 1:
                    color = "#5477ff";
                    break;
                case 2:
                    color = "#cc0d01";
                    break;
                case 3:
                    color = colors.errorColor;
                    break;
                case 4:
                    color = "#54bbff";
                    break;
                case 5:
                    color = "#999999";
                    break;
            }
            return color
        }, statustypeName = { 1: "执行人", 2: "抄送人" }, cardwidth = (width - 96) / 5

        return <SafeAreaViewPlus loading={loading.effects['index/broadqueryById']}>
            <Header title={`通知公告详情`} navigation={navigation}>
            </Header>

            <ScrollView keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
            >
                <View padding-12 paddingT-0>
                    <View style={{ overflow: "hidden" }} row={false} spread left>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <View padding-12>
                                <Text subheading dark10>
                                    {announcementTitle}
                                </Text>
                                <View row paddingV-10>
                                    <Text subbody>{publishTime}</Text>
                                    <Text marginL-10 subbody>{publishUserName}</Text>
                                </View>
                                <Text subbody >
                                    {announcementContent}
                                </Text>
                            </View>
                        </Card>

                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                        <Rows name={`附件(${urlIds && urlIds.length}):`} rightRender={<View row >
                                {
                                    urlIds &&
                                    urlIds.map((it, i) => {
                                        return (
                                            <Card enableShadow={false}
                                                style={{ backgroundColor: colors.primaryColor }}
                                                paddingH-12 paddingV-6
                                                marginL-12
                                                onPress={() => {
                                                    navigation.navigate("PreView", {
                                                        url: it,
                                                        type: it.split(".")[it.split(".").length - 1]
                                                    })
                                                }}>
                                                <Text white>附件{i + 1}</Text>
                                            </Card>
                                        )
                                    })}

                            </View>} />
                        </Card>


                      
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
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
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


export default BroadDetail