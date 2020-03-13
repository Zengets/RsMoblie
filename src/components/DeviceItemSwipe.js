import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors, View, Text, ListItem, AnimatedImage, ThemeManager, BorderRadiuses, Badge,Card } from 'react-native-ui-lib';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, StyleSheet, TouchableHighlight } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { colors } from '../utils'
const styles = StyleSheet.create({
    image: {
        width: 48,
        height: 48,
        borderRadius: BorderRadiuses.br20,
        marginHorizontal: 12,
    },
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: ThemeManager.dividerColor,
    },
});

class DeviceItemSwipe extends Component {

    swipeable = null;



    render() {
        let { item, navigation,onSwipePress } = this.props;

        let getColor = (item) => {
            let color = "#43c4cc"
            switch (item.status) {
                case "0":
                    color = "#ffcb01";
                    break;
                case "1":
                    color = "#5477ff";
                    break;
                case "2":
                    color = "#cc0d01";
                    break;
                case "3":
                    color = "#43c4cc";
                    break;
                case "4":
                    color = "#54bbff";
                    break;
                case "5":
                    color = "#999999";
                    break;
            }
            return color
        }



        return <ListItem
                activeBackgroundColor={ Colors.dark60 }
                activeOpacity={ 0.3 }
                height={ 77 }
                onPress={() => {
                    onSwipePress()
                }}
                onLongPress={()=>{
                    navigation.navigate("InfoDeviceDetail", {
                        id: item.equipmentId ? item.equipmentId : item.id,
                        name: item.equipmentName
                    })
                }}
                
            >
                <ListItem.Part left>
                    <AnimatedImage
                        containerStyle={ styles.image }
                        style={ { resizeMode: 'cover', height: 48, width: 48 } }
                        source={/*item.pictureUrl ? { uri: item.pictureUrl } : */require("../assets/404.png") }
                        loader={ <ActivityIndicator /> }
                    />
                </ListItem.Part>
                <ListItem.Part middle column containerStyle={ [styles.border, { paddingRight: 12 }] }>
                    <View flex-1 paddingV-12>
                        <View row spread top flex-1>
                            <View>
                                <Text body dark10>{ item.equipmentName }</Text>
                            </View>
                            <View row center>
                                <Text subbody dark100 marginR-3  style={ { color: getColor(item) } }>{ item.statusName }</Text>
                                <Badge size='small' backgroundColor={ getColor(item) }></Badge>
                            </View>
                        </View>
                        <View flex-1 bottom>
                            <View row spread>
                                <View flex-1>
                                    <Text subbody >编号:{ item.equipmentNo }</Text>
                                </View>
                                <View flex-1 right>
                                    <Text subbody >位置:{ item.positionNo }</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </ListItem.Part>
            </ListItem>
    }
}





export default gestureHandlerRootHOC(DeviceItemSwipe)
