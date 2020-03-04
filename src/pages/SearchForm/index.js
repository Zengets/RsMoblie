import React from 'react';
import { connect } from 'react-redux';
import { View, TextField, Text, Card, Button, Colors } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors } from '../../utils';
import { ViewPropTypes, Animated, Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TreeSelect from 'react-native-tree-select';
import Spinner from 'react-native-loading-spinner-overlay';


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

@connect(({ index,loading }) => ({ index,loading }))
class SearchForm extends React.Component {

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
        let { index: { formdata } } = this.props;
        let newformdata = formdata.map((item, i) => {
            if (item.key == key) {
                item.value = value
            } else {
            }
            return item
        })
        this.setNewState("formdata", newformdata, () => {
            fn ? fn() : null
        })
    }

    resetData = () => {
        let { index: { formdata } } = this.props;
        let newformdata = formdata.map((item, i) => {
            item.value = undefined
            return item
        })
        this.setNewState("formdata", newformdata)
    }

    changeOption = (val, linked) => {
        let { key, posturl, format, postkey } = linked
        console.log(posturl)
        this.setNewState(posturl, { [postkey]: val }, () => {
            let res = this.props.index[posturl];
            let { index: { formdata } } = this.props;
            let newformdata = formdata.map((item, i) => {
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
            this.setNewState("formdata", newformdata)
        })
    }


    render() {
        let { index: { formdata }, navigation,loading } = this.props, { curkey, rotate } = this.state;

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
        })


        return <SafeAreaViewPlus>
            <Header title={ `筛选` } navigation={ navigation }
                headerRight={ () => (<Card enableShadow={ false } paddingV-12 onPress={ this.resetData } >
                    <Text dark40>重置</Text>
                </Card>) }
            >
            </Header>
            <KeyboardAwareScrollView style={ { padding: 12 } } contentContainerStyle={ { flexGrow: 1 } } keyboardShouldPersistTaps="handled">
                <View paddingB-12>
                    {
                        formdata.map((item, i) => {
                            if (item.type == "input" && !item.hidden) {
                                return <Card bottom padding-12 paddingB-0 marginB-12 enableShadow={ false }>
                                    <TextField { ...inputprops(item) }></TextField>
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
                                    <Spinner
                                        visible={ item.linked?loading.effects[`index/${item.linked.posturl}`]:false }
                                        textContent={ '加载中...' }
                                        textStyle={ {
                                            color: '#FFF',
                                            fontWeight:"normal"
                                        } }
                                        animation="fade"
                                        overlayColor={ "rgba(0,0,0,0.2)" }
                                    />

                                    
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
                            }
                        })
                    }

                    <Button onPress={ () => {
                        this.setNewState("done", "1", () => {
                            let { backurl } = navigation.state.params ? navigation.state.params : { backurl: undefined };
                            if (backurl) {
                                navigation.navigate(backurl)
                            } else {
                                navigation.goBack()
                            }
                        })
                    } } marginB-12 backgroundColor={ colors.successColor }>
                        <Text white>提交</Text>
                    </Button>
                </View>





            </KeyboardAwareScrollView>



        </SafeAreaViewPlus>
    }
}

export default SearchForm