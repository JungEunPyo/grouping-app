import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/Colors';

export default class PhoneCodeNextButton extends Component {
    constructor(props) {
        super(props);
    }

    buttonStyle = function () {
        return {
            width: '35%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            height: 50,
            backgroundColor: this.props.isActive === true ? COLORS.SUB_COLOR : '#FFF',
            borderRadius: 5,
            // marginBottom: this.props.isKeyboardShow
            //   ? this.props.keyboardHeight - 15
            //   : 0,
        };
    };

    render() {
        return (
            <TouchableOpacity
                style={this.buttonStyle()}
                onPress={this.props.isActive ? () => this.props.onClick() : null}
            >
                <Text style={styles.title}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        fontWeight: '600',
        color: 'black',
    },
});
