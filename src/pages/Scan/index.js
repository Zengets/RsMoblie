import React, { Component } from 'react';
import { RNCamera } from "react-native-camera"
import { SafeAreaViewPlus, OneToast,Header } from '../../components';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    Easing
} from 'react-native';


class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveAnim: new Animated.Value(-18)
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(-18);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -168,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    //  识别二维码
    onBarCodeRead = (result) => {
        const { navigate } = this.props.navigation;
        const {data} = result;
        //navigate('Sale', {
        //    url: data
        //})
        alert(data)
    };

    render() {
        let {navigation} = this.props;
        return (<SafeAreaViewPlus>
            <Header navigation={navigation} title="扫描二维码"></Header>
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={styles.rectangleContainer}>
                        <ImageBackground style={styles.rectangle} source={require("../../assets/bordered.png")} resizeMode='contain'/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        </SafeAreaViewPlus>
            
        );
    }
}

export default Scan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 166,
        alignSelf:"center",
        height:2,
        borderRadius:20,
        backgroundColor: 'rgba(255,255,255,0.5)',
    }
});