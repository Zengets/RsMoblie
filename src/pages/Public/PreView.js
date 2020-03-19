import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, AnimatedImage, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions, ActivityIndicator } from 'react-native';
import { colors, getItem, downloadFile } from '../../utils';
import { OfficeViewer } from '@sishuguojixuefu/react-native-office-viewer'

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class PreView extends React.Component {

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


    jumpToUrl(url, data) {
        this.setNewState("submitdata", [], () => {
            this.props.navigation.navigate(url, data);
        })
    }

    componentDidMount() {
        const { index, navigation } = this.props
        let { sendMessage } = navigation.state.params ? navigation.state.params : { sendMessage }
        if (sendMessage) {
            alert(0)
            let { posturl, postdata } = sendMessage ? sendMessage : {};
            this.setNewState(posturl, postdata);//执行成功回调
        }
    }


    render() {
        const { index, navigation, } = this.props
        let { url, type } = navigation.state.params ? navigation.state.params : { url: "", type: "" },
            types = ["docx", "xlsx", "pptx", "doc", "xls", "ppt"];
        return <SafeAreaViewPlus>
            <Header
                navigation={navigation}
                title="预览"
            />
            <View flex padding-12>
                {
                    type == "jpg" || type == "png" ?
                        <AnimatedImage
                            containerStyle={{ flex: 1, borderRadius: 8, backgroundColor: "#f9f9f9" }}
                            style={{ resizeMode: 'contain', flex: 1 }}
                            source={url ? { uri: url } : require("../../assets/404.png")}
                            loader={<ActivityIndicator />}
                        /> :
                        types.indexOf(type) == -1 ?
                            <View center height={400}>
                                <AntIcons name={"file1"} size={88}></AntIcons>
                                <Button style={{width:"100%"}} marginT-68 label="下载文件" onPress={()=>{
                                    downloadFile(url)
                                }}></Button>
                            </View>
                            :
                            <OfficeViewer containerStyle={{ flex: 1 }} source={url ? url : null} />

                }


            </View>
        </SafeAreaViewPlus>

    }
}

export default PreView