import RNFileSelector from 'react-native-file-selector';
import RNFetchBlob from 'rn-fetch-blob';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Card, Text } from 'react-native-ui-lib';
import { Dimensions } from 'react-native';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ipandport, colors } from '../utils'
import Confirm from "./Confirm"
import { OneToast } from './Toast';

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class SelectFiles extends Component {

    state = {
        files: [],
        visible: false,
        curitem: "",
        index: ""
    }


    selectfile = () => {
        RNFileSelector.Show(
            {
                title: '请选择文件',
                onDone: (path) => {
                    let filename = path.split("/")[path.split("/").length - 1]
                    this.uploadfile(path, filename)
                },
                onCancel: () => {
                }
            }
        )
    }

    uploadfile = (path, filename) => {
        RNFetchBlob.fetch('POST', `${ipandport}/common/uploadFile`, {
            'Content-Type': 'multipart/form-data',
        }, [
            { name: filename, filename: filename, data: RNFetchBlob.wrap(path) },
        ]).then((res) => {
            let result = JSON.parse(res.text())
            let path = result.data.dataList[0],
                filename = result.data.fileNameList[0];
            let newfiles = JSON.parse(JSON.stringify(this.state.files));
            newfiles.push(path);
            console.log(newfiles)
            this.setState({
                files: newfiles
            }, () => {
                this.props.getfiles(newfiles)
            })


        })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        let { style, navigation, title,color } = this.props, cardwidth = (width - 96) / 5, { files, visible, curitem, index } = this.state;

        return <View>
            <Text subbody dark10 style={{color:color?color:"#333"}}>{title ? title : "上传附件"}
                <Text dark40>(长按附件删除)</Text></Text>
            <View marginT-12 row style={[style, { width: width, flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" }]}>
                {
                    files && files.length > 0 ?
                        files.map((item, i) => {
                            return <Card width={cardwidth} height={cardwidth} marginR-12 spread  marginB-12 enableShadow={false} style={{ backgroundColor: colors.primaryColor, alignItems: "center" }}
                                onPress={() => {
                                    navigation.navigate("PreView", {
                                        url: item,
                                        type: item.split(".")[item.split(".").length - 1]
                                    })
                                }}
                                onLongPress={() => {
                                    this.setState({
                                        visible: true,
                                        curitem: item,
                                        index: i
                                    })
                                }}
                            >
                                <AntIcons name="file1" size={16} style={{ color: "#fff" }}></AntIcons>
                                <Text white style={{fontSize:10}} marginT-6>附件{i + 1}</Text>
                            </Card>

                        }) : null
                }

                <Card width={cardwidth} height={cardwidth} marginR-12 center marginB-12 enableShadow={false} style={{ borderColor: "#ddd", borderWidth: 1 }} onPress={() => {
                    this.selectfile()
                }}>
                    <AntIcons name="plus" size={32}></AntIcons>
                </Card>
                <Confirm
                    successfn={() => {
                        let newfiles = JSON.parse(JSON.stringify(this.state.files));
                        newfiles = newfiles.filter((it) => {
                            return curitem !== it
                        })
                        this.setState({
                            files: newfiles,
                            visible: false
                        }, () => {
                            this.props.getfiles(newfiles);
                            OneToast("删除成功")
                        })
                    }}
                    visible={visible}
                    title={`是否删除附件${index + 1}?`}
                    onDismiss={() => { this.setState({ visible: false }) }}
                ></Confirm>
            </View>
        </View>
    }

}
export default SelectFiles

