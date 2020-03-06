import React, { Component } from 'react';
import { DeviceInfo, SafeAreaView, StyleSheet, ViewPropTypes, StatusBar } from 'react-native';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

@connect(({ index }) => ({ index }))
class SafeAreaViewPlus extends Component {

    static propTypes = {
        ...ViewPropTypes,
        topColor: PropTypes.string,
        bottomColor: PropTypes.string,
        enablePlus: PropTypes.bool,
        topInset: PropTypes.bool,
        bottomInset: PropTypes.bool,
    };

    static defaultProps = {
        topColor: "#fff",
        bottomColor: '#fff',
        enablePlus: true,
        topInset: true,
        bottomInset: false
    };

    getTopArea(topColor, topInset) {
        return DeviceInfo.isIPhoneX_deprecated || topInset ? <View style={[styles.topArea, { backgroundColor: topColor }]} /> : null
    }

    getBottomArea(bottomColor, bottomInset) {
        return DeviceInfo.isIPhoneX_deprecated || bottomInset ? <View style={[styles.bottomArea, { backgroundColor: bottomColor }]} /> : null
    }

    genSafeAreaViewPlus() {
        const { children, topColor, bottomColor, topInset, bottomInset,textContent, style,loading } = this.props;
        return <View style={[styles.container, style]}>
            <Spinner
                visible={loading}
                textContent={textContent?textContent:'加载中...'}
                textStyle={styles.spinnerTextStyle}
                animation="fade"
                overlayColor={"rgba(0,0,0,0.2)"}
            />
            <StatusBar translucent={true} backgroundColor={topColor} animated={false} barStyle='dark-content'></StatusBar>
            {this.getTopArea(topColor, topInset)}
            {children}
            {this.getBottomArea(bottomColor, bottomInset)}

        </View>
    }

    genSafeAreaView() {
        const { style, children, topColor, bottomColor, topInset, bottomInset,textContent, index,loading } = this.props;

        return <SafeAreaView style={[styles.container, style]} {...this.props}>
            <Spinner
                visible={loading}
                textContent={textContent?textContent:'加载中...'}
                textStyle={styles.spinnerTextStyle}
                animation="fade"
                overlayColor={"rgba(0,0,0,0.2)"}
            />
            <StatusBar translucent={true} backgroundColor={topColor} animated={false} barStyle='dark-content'></StatusBar>
            {children}
        </SafeAreaView>
    }

    render() {
        const { enablePlus } = this.props;
        return enablePlus ? this.genSafeAreaViewPlus() : this.genSafeAreaView();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topArea: {
        height: 34,
    },
    bottomArea: {
        height: 34,
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight:"normal"
    },
});

export default SafeAreaViewPlus