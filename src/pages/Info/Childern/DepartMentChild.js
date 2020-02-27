import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Colors, Button, Badge, Avatar, TabBar } from 'react-native-ui-lib';
import { SafeAreaViewPlus, Header, OneToast, UserItem, Empty, TreeShown } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, Linking, ListItem, AnimatedImage } from 'react-native';
import { colors, ConvertPinyin } from '../../../utils';


let { height, width } = Dimensions.get('window');

@connect(({ index, loading }) => ({
    index,
    submitting: loading.effects['index/departmentmore'],
}))
class DepartMentChild extends React.Component {

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
        this.setNewState("departmentmore",{
            "key": this.props.navigation.state.params.key
        })
    }


    render() {

        let { index, navigation, submitting, index: { departmentmore } } = this.props;

        return <SafeAreaViewPlus loading={submitting}>
            <Header title={this.props.navigation.state.params.title} navigation={navigation}>
            </Header>

            <TreeShown data={[{
                title:this.props.navigation.state.params.title,
                children:departmentmore
            }]}>
            </TreeShown>


        </SafeAreaViewPlus>

    }
}

const styles = StyleSheet.create({

})


export default DepartMentChild