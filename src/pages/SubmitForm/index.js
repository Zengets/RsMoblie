import React from 'react';
import { connect } from 'react-redux';
import { View, TextField, TextArea, Text, Card, Button, Colors, AnimatedImage } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors } from '../../utils';
import { ActivityIndicator, Animated, Dimensions } from 'react-native';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Collapsible from 'react-native-collapsible';
import ImagePicker from 'react-native-image-picker';
import TreeSelect from 'react-native-tree-select';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const loop = (data) => {
    let newdata = data.map((item) => {
        return {
            id: item.key,
            parentId: item.parentKey,
            name: item.title,
            children: item.children ? loop(item.children) : []
        }
    });
    return newdata
};

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class SubmitForm extends React.Component {

    state = {
        curkey: "",
        rotate: new Animated.Value(0)
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

    changeData = (key, value, fn) => {
        let { index: { submitdata } } = this.props;
        let newsubmitdata = submitdata.map((item, i) => {
            if (item.key == key) {
                item.value = value
            } else {
            }
            return item
        })
        this.setNewState("submitdata", newsubmitdata, () => {
            fn ? fn() : null
        })
    }

    resetData = () => {
        let { index: { submitdata } } = this.props;
        let newsubmitdata = submitdata.map((item, i) => {
            item.value = undefined
            return item
        })
        this.setNewState("submitdata", newsubmitdata)
    }

    changeOption = (val, linked) => {
        let { key, posturl, format, postkey } = linked
        this.setNewState(posturl, { [postkey]: val }, () => {
            let res = this.props.index[posturl];
            let { index: { submitdata } } = this.props;
            let newsubmitdata = submitdata.map((item, i) => {
                if (item.key == key) {
                    item.option = res ? res.map((item) => {
                        return {
                            dicName: item[format.dicName],
                            dicKey: item[format.dicKey]
                        }
                    }) : [];
                    item.value = undefined
                } else {
                }
                return item
            })
            this.setNewState("submitdata", newsubmitdata)
        })
    }


    render() {
        let { index: { submitdata, uploadImg }, navigation } = this.props, { curkey, rotate } = this.state, { title } = navigation.state.params ? navigation.state.params : { title: "提交" };

        let inputprops = (item) => {
            let { value, placeholder, key } = item;
            return {
                rightButtonProps: value ? {
                    iconSource: require("../../assets/close.png"),
                    iconColor: colors.primaryColor,
                    onPress: () => {
                        this.changeData(key, "")
                    },
                    style: { paddingTop: 10 },
                } : null,
                floatingPlaceholder: true,
                floatOnFocus: true,
                floatingPlaceholderColor: {
                    default: 'black',
                    error: 'red',
                    focus: colors.primaryColor,
                    disabled: 'grey'
                },
                placeholder: placeholder,
                value: value,
                onChangeText: (val) => {
                    this.changeData(key, val)
                }
            }
        }, rotatecha = rotate.interpolate({ // 旋转，使用插值函数做值映射
            inputRange: [0, 1],
            outputRange: ['-180deg', '0deg']
        }), textareaprops = (item) => {
            let { value, placeholder, key } = item;
            return {
                title: placeholder,
                placeholder: placeholder,
                value: value,
                onChangeText: (val) => {
                    this.changeData(key, val)
                }
            }
        }


        return <SafeAreaViewPlus>
            <Header title={ title } navigation={ navigation }
                headerRight={ () => (<Card enableShadow={ false } paddingV-12 onPress={ () => {
                    this.setNewState("done", "1", () => {
                        let { backurl } = navigation.state.params ? navigation.state.params : { backurl: undefined };
                        if (backurl) {
                            navigation.navigate(backurl)
                        } else {
                            navigation.goBack()
                        }
                    })
                } }>
                    <Text>确定</Text>
                </Card>) }
            >
            </Header>
            <KeyboardAwareScrollView style={ { padding: 12 } } contentContainerStyle={ { flexGrow: 1 } } keyboardShouldPersistTaps="handled">
                <View paddingB-12>
                    {
                        submitdata.map((item, i) => {
                            if (item.type == "input" && !item.hidden) {
                                return <Card bottom padding-12 paddingB-0 marginB-12 enableShadow={ false }>
                                    <TextField { ...inputprops(item) }></TextField>
                                </Card>
                            } else if (item.type == "textarea" && !item.hidden) {
                                return <Card bottom padding-12 marginB-12 enableShadow={ false }>
                                    <Text marginB-10>{ item.placeholder }</Text>
                                    <View style={ { padding: 8, backgroundColor: "#f9f9f9" } }>
                                        <TextArea { ...textareaprops(item)}></TextArea>
                                    </View>

                                </Card>
                            } else if (item.type == "treeselect" && !item.hidden) {
                                return <Card marginB-12 enableShadow={ false }>
                                    <Card padding-12 style={ { backgroundColor: colors.secondaryColor, alignItems: "center" } } enableShadow={ false } row spread onPress={ () => {
                                        this.setState({
                                            curkey: curkey !== item.key ? item.key : ""
                                        })
                                        Animated.timing(
                                            this.state.rotate,
                                            {
                                                toValue: curkey !== item.key ? 0 : 1,
                                                duration: 1000,
                                            }
                                        ).start()

                                    } }>
                                        <Text white body>{ item.placeholder }</Text>

                                        <Text white>{ item.value && item.value.name }</Text>
                                    </Card>
                                    <Animated.View style={ { height: curkey == item.key ? "auto" : 0, overflow: "hidden" } }>
                                        <TreeSelect
                                            data={ loop(item.option) }
                                            itemStyle={ {
                                                fontSize: 14,
                                                color: '#999',
                                                paddingVertical: 14
                                            } }
                                            defaultSelectedId={ [item.value && item.value.id] }
                                            selectType="single"
                                            selectedItemStyle={ {
                                                backgroudColor: "lightblue",
                                                fontSize: 16,
                                                color: '#fff'
                                            } }
                                            onClick={ (e) => {
                                                let cur = e.item;
                                                this.changeData(item.key, {
                                                    id: cur.id,
                                                    name: cur.name
                                                })
                                            } }
                                            treeNodeStyle={ {
                                                // openIcon: <Icon size={18} color="#171e99" style={{ marginRight: 10 }} name="ios-arrow-down" />,
                                                // closeIcon: <Icon size={18} color="#171e99" style={{ marginRight: 10 }} name="ios-arrow-forward" />
                                                openIcon: <AntIcons name="down" size={ 12 } style={ { color: colors.primaryColor } } />,
                                                closeIcon: <AntIcons name="right" size={ 12 } style={ { color: colors.secondaryColor } } />
                                            } }
                                        ></TreeSelect>
                                    </Animated.View>
                                    <Card padding-4 center enableShadow={ false } onPress={ () => {
                                        this.setState({
                                            curkey: curkey !== item.key ? item.key : ""
                                        })
                                        Animated.timing(
                                            this.state.rotate,
                                            {
                                                toValue: curkey !== item.key ? 0 : 1,
                                                duration: 1000,
                                            }
                                        ).start()

                                    } }>
                                        <AntIcons name={ curkey !== item.key ? "down" : "up" } style={ { color: "#ddd" } }></AntIcons>
                                    </Card>
                                </Card>
                            } else if (item.type == "select" && !item.hidden) {
                                return <Card marginB-12 enableShadow={ false }>
                                    <Card padding-12 style={ { backgroundColor: colors.secondaryColor, alignItems: "center" } } enableShadow={ false } row spread onPress={ () => {
                                        this.setState({
                                            curkey: curkey !== item.key ? item.key : ""
                                        })
                                        Animated.timing(
                                            this.state.rotate,
                                            {
                                                toValue: curkey !== item.key ? 0 : 1,
                                                duration: 1000,
                                            }
                                        ).start()

                                    } }>
                                        <Text white body>{ item.placeholder }{ `(${item.option && item.option.length})` }</Text>

                                        <Text white>{ item.value && item.value.name }</Text>
                                    </Card>

                                    <View row paddingT-8 style={ { height: curkey == item.key ? "auto" : 0, width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" } }>
                                        {
                                            item.option &&
                                            item.option.map((it, i) => (
                                                <Card width={ (width - 36) / 3 } padding-12 margin-2 style={ { minHeight: 60, backgroundColor: item.value && item.value.id == it.dicKey ? "lightblue" : "#F0F0F0" } } center key={ i } enableShadow={ false } onPress={ () => {
                                                    this.changeData(item.key, {
                                                        id: it.dicKey,
                                                        name: it.dicName
                                                    }, () => {
                                                        item.linked ?
                                                            this.changeOption(it.dicKey, item.linked) :
                                                            null
                                                    })
                                                } }>
                                                    <Text subbody style={ { color: item.value && item.value.id == it.dicKey ? "#fff" : "#999" } }>{ it.dicName }</Text>
                                                </Card>
                                            ))
                                        }
                                    </View>
                                    <Card padding-4 center enableShadow={ false } onPress={ () => {
                                        this.setState({
                                            curkey: curkey !== item.key ? item.key : ""
                                        })
                                        Animated.timing(
                                            this.state.rotate,
                                            {
                                                toValue: curkey !== item.key ? 0 : 1,
                                                duration: 1000,
                                            }
                                        ).start()

                                    } }>
                                        <AntIcons name={ curkey !== item.key ? "down" : "up" } style={ { color: "#ddd" } }></AntIcons>
                                    </Card>
                                </Card>
                            } else if (item.type == "image") {
                                return <Card padding-page left marginB-12 enableShadow={ false } onPress={ () => {
                                    ImagePicker.showImagePicker(options, (response) => {
                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                        } else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                        } else if (response.customButton) {
                                            console.log('User tapped custom button: ', response.customButton);
                                        } else {
                                            this.changeData(item.key, response.uri);//change after
                                            let data = new FormData();
                                            data.append('file', {
                                                uri: response.uri,
                                                name: response.fileName,
                                                type:  response.type
                                            });
                                            this.setNewState("uploadImg", data, () => {
                                                //this.changeData(item.key, uploadImg.dataList[0]);

                                            })
                                        }
                                    });
                                } }>
                                     <Text marginB-10>{ item.placeholder }</Text>
                                    <AnimatedImage
                                        containerStyle={ { width: "100%", height: 200, borderRadius: 8,backgroundColor:"#f9f9f9" } }
                                        style={ { resizeMode: 'contain', height: 200, width: "100%" } }
                                        source={ item.value ? { uri: item.value } : require("../../assets/404.png") }
                                        loader={ <ActivityIndicator /> }
                                    />
                                </Card>
                            }
                        })
                    }

                    <Button onPress={ this.resetData } marginB-12 backgroundColor={ "#b9b9b9" }>
                        <Text white>重置</Text>
                    </Button>
                </View>





            </KeyboardAwareScrollView>



        </SafeAreaViewPlus>
    }
}

export default SubmitForm