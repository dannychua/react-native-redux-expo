import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View } from 'react-native'

export class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        this.props.navigation.navigate((this.props.settings.isLoggedIn) ? 'Main' : 'Auth');
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);