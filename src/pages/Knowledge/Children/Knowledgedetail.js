import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, Rows } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/knowledgedetail'],
}))
class Knowledgedetail extends React.Component {

    state = {
        selectedIndex: 0
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

    componentDidMount() {
        this.setNewState("knowledgedetail", {
            id: this.props.navigation.state.params.id
        })
    }
    // "knowledgeBaseUrl": null,-----------------------------------文件地址

    render() {
        let { index, navigation, submitting } = this.props,
            {
                knowledgeBaseName, knowledgeBaseVersion, documentNo, knowledgeBaseDescribe, purposeTypeName,
                equipmentTypeName, updateUserName,updateTime,id
            } = index.knowledgedetail;

        return <SafeAreaViewPlus loading={submitting}>
            <Header title={`知识库详情`} navigation={navigation}>
            </Header>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={(scrollview) => this.scrollview = scrollview}
            >
                <View padding-12 paddingT-0>
                    <View style={{ overflow: "hidden" }} row={false} spread left>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="上传人" values={updateUserName} />
                            <Rows name="上传时间" values={updateTime} />
                        </Card>
                        <Card marginT-12 style={{ width: "100%" }} enableShadow={false}>
                            <Rows name="文件名" values={knowledgeBaseName} />
                            <Rows name="版本号" values={knowledgeBaseVersion} />
                            <Rows name="文件编号" values={documentNo} />
                            <Rows name="用途类型" values={purposeTypeName} />
                            <Rows name="设备类型" values={equipmentTypeName} />
                            <Rows name="描述" values={knowledgeBaseDescribe} />
                            <View padding-12 row>
                                <Button flex-1 label='历史记录' outline onPress={()=>{
                                    navigation.navigate("KnowledgeHistory",{id:id})
                                }}></Button>
                                <Button flex-1 label="下载文件"  marginL-12></Button>

                            </View>
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


export default Knowledgedetail