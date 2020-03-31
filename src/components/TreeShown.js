import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Card } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { Animated, ScrollView } from 'react-native'
import { colors } from '../utils';
import { OneToast } from './Toast';
import Empty from './Empty';

@connect(({ index }) => ({ index }))
class TreeShown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            margin: new Animated.Value(-50),
            rotate: new Animated.Value(1),
            opacity: new Animated.Value(0),
            opacitys: new Animated.Value(0),
            height: new Animated.Value(24),
            roller: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(
                        this.state.margin,
                        {
                            toValue: 0,
                            duration: 1000,
                        }
                    ),
                    Animated.timing(
                        this.state.opacitys,
                        {
                            toValue: 0.8,
                            duration: 1000,
                        }
                    ),
                ]),
                Animated.parallel([
                    Animated.timing(
                        this.state.opacity,
                        {
                            toValue: 1,
                            duration: 1000,
                        }
                    ),
                    Animated.timing(
                        this.state.height,
                        {
                            toValue: 0,
                            duration: 1000,
                        }
                    ),
                    Animated.timing(
                        this.state.opacitys,
                        {
                            toValue: 1,
                            duration: 1000,
                        }
                    ),
                    Animated.timing(
                        this.state.rotate,
                        {
                            toValue: 0,
                            duration: 1000,
                        }
                    ),
                    
                ]),
            ]).start()
        }, 1000)
    }


    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (this.state.roller !== nextState.roller) {
            let roller = nextState.roller<100?nextState.roller:100
            Animated.timing(
                this.state.rotate,
                {
                    toValue: roller/100,
                    duration: 1000,
                }
            ).start()
        }

    }


    render() {
        let { style, navigation, data,clickable } = this.props, { margin, opacity, opacitys, rotate, height } = this.state;
        let rotatecha = rotate.interpolate({ // 旋转，使用插值函数做值映射
            inputRange: [0, 1],
            outputRange: ['-30deg', '0deg']
        })


        let renderCard = (item, i) => {
            return <Animated.View key={i}  style={{ marginTop: margin, opacity: opacitys,transform: [{ rotateX: rotatecha }] }}>
                <Card padding-12 enableShadow={false} style={{ marginBottom: -8, borderColor: "#f0f0f0", borderWidth: 1 }} onPress={()=>{
                   
                    if(!clickable){
                       return
                    }
                    if(!item.children){
                        OneToast("没有下级部门了");
                        return
                    }
                    navigation.navigate("DepartMentDetail",{title:item.title,key:item.key}) 
                }}>
                    <View row spread paddingV-12>
                        <Text body style={{ color: colors.primaryColor }}>{item.title}</Text>
                        {
                            !item.children?null:<AntIcons name={"right"} size={12}></AntIcons>
                        }
                        
                    </View>
                </Card>
            </Animated.View>

        }

        return <ScrollView  keyboardShouldPersistTaps="handled" style={[style, { padding: 12 }]} onScroll={(event) => {
            this.setState({
                roller: event.nativeEvent.contentOffset.y
            })
        }}>
            {
                data.map((item, i) => {
                    return <View paddingV-6 paddingB-12>
                        <Animated.View style={{ opacity: opacity, paddingTop: height,marginBottom:12 }}>
                            <Text subheading>{item.title}</Text>
                        </Animated.View>
                        {
                            item.children ? item.children.map((items, j) => {
                                return renderCard(items, j)
                            }):<Animated.View style={{ marginTop: margin, opacity: opacitys,transform: [{ rotateX: rotatecha }] }}><Empty/></Animated.View>
                        }
                    </View>

                })
            }
            <View height={30}></View>
        </ScrollView>
    }

}
export default TreeShown
