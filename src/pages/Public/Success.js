import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, AuthBase } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import { colors, getItem } from '../../utils';

let { height, width } = Dimensions.get('window');

@connect(({ index }) => ({ index }))
class Success extends React.Component {

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



    render() {
        const { index, navigation } = this.props
        let { btn, description } = navigation.state.params ? navigation.state.params : { btn: [], description: "" }
        return <SafeAreaViewPlus>
            <Header
                title="操作成功"
            />
            <View flex padding-12>
                <View center padding-page paddingB-32>
                    <AntIcons name="checkcircle" size={ 120 } style={ { color: colors.successColor } } />
                    <Text marginT-24 body>{ description }</Text>
                </View>

                <View row>
                    {
                        btn.map((item, i) => {
                            return <Card padding-page center margin-4 flex-1 key={ i } enableShadow={ false } onPress={ () => {
                                this.jumpToUrl(item.url, item.params)
                            } }>
                                <Text>{ item.name }</Text>
                            </Card>
                        })
                    }
                </View>

            </View>
        </SafeAreaViewPlus>

    }
}

export default Success