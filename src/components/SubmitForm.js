import React from 'react';
import { connect } from 'react-redux';
import { View, TextField, TextArea, Text, Card, Button, Colors, AnimatedImage } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors } from '../utils';
import { ActivityIndicator, Animated, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import TreeSelect from 'react-native-tree-select';
import Spinner from 'react-native-loading-spinner-overlay';


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

@connect(({ index, loading }) => ({ index, loading }))
class SubmitForm extends React.Component {

    state = {
        curkey: "",
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
            item.value = item.type == "multinput" ? [] : undefined
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
        let { index: { submitdata, uploadImg }, loading } = this.props,
            { curkey } = this.state;
        let inputprops = (item) => {
            let { value, placeholder, key } = item;
            return {
                rightButtonProps: value ? {
                    iconSource: require("../assets/close.png"),
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
                placeholder: item.require ? `* ${placeholder}` : placeholder,
                value: value,
                onChangeText: (val) => {
                    this.changeData(key, val)
                }
            }
        }, textareaprops = (item) => {
            let { value, placeholder, key } = item;
            return {
                title: placeholder,
                placeholder: placeholder,
                value: value,
                onChangeText: (val) => {
                    this.changeData(key, val)
                }
            }
        }, inserprops = (item, curkey) => {
            let { value, placeholder, key, format } = item;
            if (!value) {
                value = []
            }
            let inputval = 0;
            value.map((items) => {
                if (items[format.id] == curkey) {
                    inputval = items[format.value]
                }
            })
            return {
                keyboardType: 'numeric',
                rightButtonProps: inputval ? {
                    iconSource: require("../assets/close.png"),
                    iconColor: '#fff',
                    onPress: () => {
                        let newvalue = value.map((itemz) => {
                            if (itemz[format.id] == curkey) {
                                itemz[format.value] = 0
                            }
                            return itemz
                        })
                        this.changeData(key, newvalue)
                    },
                    style: { paddingTop: 10 },
                } : null,
                underlineColor: { default: 'transparent', error: 'transparent', focus: "transparent", disabled: 'transparent' },
                value: inputval ? inputval.replace(/[^0-9]*/g, '') : 0,
                placeholder: "请填写数量",
                onChangeText: (val) => {
                    let newvalue = value.map((itemz) => {
                        if (itemz[format.id] == curkey) {
                            itemz[format.value] = val.replace(/[^0-9]*/g, '')
                        }
                        return itemz
                    })
                    this.changeData(key, newvalue)
                }
            }
        }


        return <KeyboardAwareScrollView style={ { padding: 12 } } contentContainerStyle={ { flexGrow: 1 } } keyboardShouldPersistTaps="handled">
            <View paddingB-12>
                {
                    submitdata.map((item, i) => {
                        if (item.type == "input" && !item.hidden) {
                            return <Card bottom padding-12 paddingB-0 marginB-12 enableShadow={ false }>
                                <TextField { ...inputprops(item) }></TextField>
                            </Card>
                        } else if (item.type == "textarea" && !item.hidden) {
                            return <Card bottom padding-12 marginB-12 enableShadow={ false }>
                                <Text marginB-10>{ item.require ? <Text style={ { color: colors.warnColor } }>*</Text> : null } { item.placeholder }</Text>
                                <View style={ { padding: 8, backgroundColor: "#f9f9f9" } }>
                                    <TextArea { ...textareaprops(item) }></TextArea>
                                </View>

                            </Card>
                        } else if (item.type == "treeselect" && !item.hidden) {
                            return <Card marginB-12 enableShadow={ false }>
                                <Card padding-12 style={ { backgroundColor: colors.secondaryColor, alignItems: "center" } } enableShadow={ false } row spread onPress={ () => {
                                    this.setState({
                                        curkey: curkey !== item.key ? item.key : ""
                                    })

                                } }>
                                    <Text white body>{ item.require ? <Text style={ { color: colors.warnColor } }>*</Text> : null } { item.placeholder }</Text>

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
                                            openIcon: <AntIcons name="down" size={ 12 } style={ { color: colors.primaryColor } } />,
                                            closeIcon: <AntIcons name="right" size={ 12 } style={ { color: colors.secondaryColor } } />
                                        } }
                                    ></TreeSelect>
                                </Animated.View>
                                <Card padding-4 center enableShadow={ false } onPress={ () => {
                                    this.setState({
                                        curkey: curkey !== item.key ? item.key : ""
                                    })

                                } }>
                                    <AntIcons name={ curkey !== item.key ? "down" : "up" } style={ { color: "#ddd" } }></AntIcons>
                                </Card>
                            </Card>
                        } else if (item.type == "select" && !item.hidden) {
                            return <Card marginB-12 enableShadow={ false }>
                                <Spinner
                                    visible={ item.linked ? loading.effects[`index/${item.linked.posturl}`] : false }
                                    textContent={ '加载中...' }
                                    textStyle={ {
                                        color: '#FFF',
                                        fontWeight: "normal"
                                    } }
                                    animation="fade"
                                    overlayColor={ "rgba(0,0,0,0.2)" }
                                />
                                
                                <Card padding-12 style={ { backgroundColor: colors.secondaryColor, alignItems: "center" } } enableShadow={ false } row spread onPress={ () => {
                                    this.setState({
                                        curkey: curkey !== item.key ? item.key : ""
                                    })

                                } }>
                                    <Text white body>{ item.require ? <Text style={ { color: colors.warnColor } }>*</Text> : null } { item.placeholder }{ `(${item.option && item.option.length})` }</Text>

                                    <Text white>{ item.value && item.value.name }</Text>
                                </Card>

                                <View row paddingT-8 style={ { height: curkey == item.key ? "auto" : 0, width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" } }>
                                    {
                                        item.option &&
                                        item.option.map((it, i) => (
                                            <Card width={ (width - 36) / 3 } padding-12 margin-2 style={ { minHeight: 70, backgroundColor: item.value && item.value.id == it.dicKey ? "lightblue" : "#F0F0F0" } } center key={ i } enableShadow={ false } onPress={ () => {
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
                                            type: response.type
                                        });
                                        this.setNewState("uploadImg", data, () => {
                                            //this.changeData(item.key, uploadImg.dataList[0]);

                                        })
                                    }
                                });
                            } }>
                                <Text marginB-10>{ item.require ? <Text style={ { color: colors.warnColor } }>*</Text> : null } { item.placeholder }</Text>
                                <AnimatedImage
                                    containerStyle={ { width: "100%", height: 200, borderRadius: 8, backgroundColor: "#f9f9f9" } }
                                    style={ { resizeMode: 'contain', height: 200, width: "100%" } }
                                    source={ item.value ? { uri: item.value } : require("../assets/404.png") }
                                    loader={ <ActivityIndicator /> }
                                />
                            </Card>
                        } else if (item.type == "multinput") {
                            return <Card marginB-12 enableShadow={ false }>
                                <Card padding-12 style={ { backgroundColor: colors.secondaryColor, alignItems: "center" } } enableShadow={ false } row spread onPress={ () => {
                                    this.setState({
                                        curkey: curkey !== item.key ? item.key : ""
                                    })
                                } }>
                                    <Text white body>{ item.require ? <Text style={ { color: colors.warnColor } }>*</Text> : null } { item.placeholder }{ `(${item.option && item.option.length})` }</Text>
                                    <Text white>({ item.value && item.value.length })</Text>
                                </Card>

                                <View row paddingT-8 style={ { height: curkey == item.key ? "auto" : 0, width: "100%", flexWrap: 'wrap', alignItems: 'flex-start', overflow: "hidden" } }>
                                    {
                                        item.option &&
                                        item.option.map((it, i) => (
                                            <Card flex-1 padding-12 margin-12 style={ {
                                                backgroundColor:
                                                    item.value && item.value.length > 0 ?
                                                        item.value.map((on) => { return on[item.format.id] }).indexOf(it.dicKey) !== -1 ?
                                                            "lightblue" :
                                                            "#999" :
                                                        "#999"
                                            } } key={ i } enableShadow={ false } onPress={ () => {
                                                let { value, key, format } = item;
                                                if (value && value.length > 0) {
                                                    let idarr = value.map((on) => { return on[format.id] }), newvalue = [];
                                                    if (idarr.indexOf(it.dicKey) !== -1) {
                                                        newvalue = value.filter((its) => {
                                                            return its[format.id] !== it.dicKey
                                                        })
                                                    } else {
                                                        newvalue = value;
                                                        newvalue.push({
                                                            [format.id]: it.dicKey,
                                                            [format.value]: 0
                                                        })

                                                    }
                                                    this.changeData(key, newvalue)

                                                } else {
                                                    this.changeData(key, [{
                                                        [format.id]: it.dicKey,
                                                        [format.value]: 0
                                                    }])

                                                }
                                            } }>
                                                <View row>
                                                    {
                                                        item.subs.map((k, j) => {
                                                            return <View center flex-1><Text white>{ k.name }:{ it[k.key] }</Text></View>
                                                        })
                                                    }
                                                </View>
                                                {
                                                    item.value && item.value.length > 0 ?
                                                        item.value.map((on) => { return on[item.format.id] }).indexOf(it.dicKey) !== -1 ?
                                                            <View flex-1 padding-8 marginT-12 style={ {
                                                                height: 40, overflow: "hidden", backgroundColor: "#fff", borderRadius: 8
                                                            } }>
                                                                <TextField
                                                                    { ...inserprops(item, it.dicKey) }
                                                                ></TextField>

                                                            </View>
                                                            : null
                                                        : null

                                                }
                                            </Card>
                                        ))
                                    }
                                </View>
                                <Card padding-4 center enableShadow={ false } onPress={ () => {
                                    this.setState({
                                        curkey: curkey !== item.key ? item.key : ""
                                    })
                                } }>
                                    <AntIcons name={ curkey !== item.key ? "down" : "up" } style={ { color: "#ddd" } }></AntIcons>
                                </Card>
                            </Card>
                        }
                    })
                }

            </View>
        </KeyboardAwareScrollView>


    }
}

export default SubmitForm