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
import Pdf from 'react-native-pdf';
let { height, width } = Dimensions.get('window');
import RNFetchBlob from 'rn-fetch-blob';


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
        const { index, route } = this.props
        let { sendMessage } = route.params ? route.params : { sendMessage }
        if (sendMessage) {
            alert(0)
            let { posturl, postdata } = sendMessage ? sendMessage : {};
            this.setNewState(posturl, postdata);//执行成功回调
        }
    }


    render() {
        const { index, navigation, route } = this.props;
        let { url, type } = route.params ? route.params : { url: "", type: "" },
            types = ["docx", "xlsx", "pptx", "doc", "xls", "ppt", "pdf", "png", "jpg", "jpeg", "txt"];
        const source = { uri: url, cache: true };

        if (type == "txt") {

        }


        return <SafeAreaViewPlus>
            <Header
                navigation={navigation}
                title="预览"
            />
            <View flex padding-12>
                {
                    type == 'pdf' ?
                        <Pdf
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link presse: ${uri}`)
                            }}
                            style={{ flex: 1 }} /> :
                            types.indexOf(type) == -1 ?
                            <View center height={400}>
                                <AntIcons name={"file1"} size={42}></AntIcons>
                                {/* <Button style={{ width: "100%" }} marginT-68 label="下载文件" onPress={() => {
                                    downloadFile(url, (path) => {
                                        RNFetchBlob.fs.readFile(path).then((data) => {
                                                alert(data)
                                        })
                                    })
                                }}></Button> */}
                                <Text marginT-33 style={{ fontSize: 18 }}>该文件暂不支持预览</Text>
                            </View>
                            :
                            <OfficeViewer containerStyle={{ flex: 1 }} source={url ? url : null} />
                }


            </View>
        </SafeAreaViewPlus>

    }
}

export default PreView