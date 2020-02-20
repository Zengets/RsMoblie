import { Dialog, Constants,Colors,PanningProvider,View,Text } from 'react-native-ui-lib';
import React from 'react';
import { StyleSheet } from 'react-native'

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            panDirection: PanningProvider.Directions.DOWN,
        }
        this.supportedOrientations = ['portrait', 'landscape'];
    }


    renderPannableHeader = () => {
        const { title } = this.props;
        return (
            <View>
                <View margin-20>
                    <Text subheading>{title}</Text>
                </View>
                <View height={1} bg-dark80 />
            </View>
        );
    };


    render() {
        let { visible, height, hide,title,children } = this.props, { panDirection } = this.state;

        return <Dialog
            migrate
            useSafeArea
            key={"2s"}
            height={height}
            panDirection={panDirection}
            containerStyle={styles.roundedDialog}
            visible={visible}
            onDismiss={hide}
            renderPannableHeader={this.renderPannableHeader}
            supportedOrientations={this.supportedOrientations}
        >
            {children}
        </Dialog>


    }



}

const styles = StyleSheet.create({
    roundedDialog: {
        backgroundColor: Colors.white,
        marginBottom: Constants.isIphoneX ? 0 : 20,
        borderRadius: 12
    },

});
