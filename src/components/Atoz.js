import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ToastAndroid,
    TouchableWithoutFeedback,
} from 'react-native';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;
const returnTrue = () => true;

export default class Atoz extends Component {
    constructor(props, context) {
        super(props);
        this.select_nav = this.select_nav.bind(this);
        this.select_null = null;
        this.state = {
            now: null
        }
    }

    select_nav(e) { //滑动触发事件
        // 输出当前 view
        const ev = e.nativeEvent.touches[0]; //获取多个触摸事件的第一个。比如你放了三根手指在屏幕上，他只算第一个放到屏幕上的
        const targetY = ev.pageY; //动态获取屏幕上触摸点垂直方向的距离
        const localY = ev.locationY; //第一次触摸到屏幕上距离顶部的距离
        const { y, width, height } = this.measure;
        this.getZM(y, targetY); //定位字母，并且触发相应的事件

    }

    resetSection() {
        this.select_null = null;
    }

    fixSectionItemMeasure() {
        const sectionItem = this.refs.view;
        if (!sectionItem) {
            return;
        }
        this.measureTimer = setTimeout(() => {
            sectionItem.measure((x, y, width, height, pageX, pageY) => {
                this.measure = {
                    y: pageY,
                    width,
                    height
                };
            })
        }, 0);
    }

    getZM(topHeight, currentHeight) { //定位字母 topHeight:外层元素到顶部的距离 currentHeight:当前触摸点距离y高度
        var zm = this.props.pinyin;
        var navItemHeight = 16;//字母行高 如果有边框请注意把边框也加上
        var navHeight = navItemHeight * zm.length; //计算字母导航高度
        var indexNav = Math.ceil((currentHeight - topHeight) / navItemHeight) - 1;

        if (zm[indexNav]) {
            if (this.state.now == indexNav) {
                return
            }
            this.setState({
                now: indexNav
            }, () => {
                this.props.changetodo(indexNav)//父组件跳转
            })
        }
        else {
        }

    }
    componentDidMount() {
        this.fixSectionItemMeasure();
    }

    // fix bug when change data
    componentDidUpdate() {
        this.fixSectionItemMeasure();
    }

    componentWillUnmount() {
        this.measureTimer && clearTimeout(this.measureTimer);
    }

    //给最外层的view增加一个
    render() {
        return (
            <View ref="view" style={styles.container}
                onStartShouldSetResponder={returnTrue}
                onMoveShouldSetResponder={returnTrue}
                onResponderMove={this.select_nav}
                onResponderRelease={this.select_null}
            >
                {
                    this.props.pinyin.map((item) => {
                        return <View style={styles.oit} ref={item}><Text dark style={styles.text}>{item}</Text></View>
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 24,
        position: "absolute",
        right: 0,
        zIndex: 99999,
        top:60
    },
    oit: {
        width: 24,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
        color:"#000",
        fontWeight:"bold"
    }

});



