import React from 'react';
import { connect } from 'react-redux';
import { View, TextField } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { colors } from '../utils';
import { ViewPropTypes, Animated } from 'react-native';
import { PropTypes } from 'prop-types';


@connect(({ index }) => ({ index }))
class TitleSearch extends React.Component {

    static defaultProps = {
        height: 45,
        navigation: {},
        placeholder: "",
        value: "",
        onChangeText: () => {
        },
        onSubmitEditing: () => {
        },
    };

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


    render() {
        const { height, navigation, placeholder, value, onChangeText, onSubmitEditing } = this.props
        let SearchProps = {
            rightButtonProps: value ? {
                iconSource: require("../assets/close.png"),
                iconColor: colors.primaryColor,
                onPress: () => {
                    onChangeText(undefined)
                },
                style: { paddingBottom: 16 },
            } : null,
            placeholder,
            value,
            onChangeText,
            onSubmitEditing
        }
        return <Animated.View style={{ height: height, overflow: "hidden", flexDirection: "row", alignItems: "flex-end" }}>
            <View style={{ width: 42 }} paddingB-20 paddingR-12 right>
                <AntIcons name="filter" size={22} onPress={() => {
                    navigation.navigate("Home")
                }} />
            </View>
            <View flex-1 style={{ height: 40 }}>
                <TextField {...SearchProps}></TextField>
            </View>
        </Animated.View>
    }
}

export default TitleSearch