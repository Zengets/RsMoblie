import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Card, Button } from 'react-native-ui-lib';
import { SafeAreaViewPlus, OneToast, Header, SpareItem } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LargeList } from "react-native-largelist-v3";



@connect(({ index }) => ({ index }))
class UserMore extends React.Component {

    state={
        resData:[]
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
        let { index, route } = this.props,
            { id, key, posturl } = route.params ? route.params : {};

        if (posturl) {
            this.setNewState(posturl, { [key]: id },()=>{
                this.setState({
                    resData:[{
                        items:index[posturl]
                    }]
                })

            })
        }
    }


    render() {
        let { index, navigation,route } = this.props,{resData} = this.state,
            { id, title, posturl } = route.params ? route.params : {};

        let getHeight = ()=>{
            if(posturl=="getuserspare"){
               return 90
           }else if(posturl==""){

           }else{

           }
        }

        let getItem = (item)=>{
           if(posturl=="getuserspare"){
               return <SpareItem item={item} navigation={this.props.navigation}></SpareItem>
           }else if(posturl==""){

           }else{

           }
        }


        let renderItem = ({ section: section, row: row }) => {
            let item = this.state.resData[section].items[row];
            return item ? getItem(item) : <View></View>
        }



        return <SafeAreaViewPlus>
            <Header navigation={navigation} title={title ? title : ""}>
            </Header>

            <LargeList
                style={{flex:1}}
                data={resData}
                heightForIndexPath={getHeight}
                renderIndexPath={renderItem}
            />

        </SafeAreaViewPlus>

    }
}

export default UserMore