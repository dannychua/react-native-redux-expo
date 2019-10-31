import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

class ApplicationLoader extends Component {

    state = {
        isReady: false
    };

    componentWillMount = () => {
        // Preload data
    }

    async loadFonts(fonts) {
        return Font.loadAsync(fonts);
    }

    async loadImages(images) {
        const cacheImages = images.map(image => {
            if (typeof image === 'string') {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
            return Asset.fromModule(image).downloadAsync();
        }); 
        return Promise.all(cacheImages);
    }

    async loadResourcesAsync(assets) {
        const { fonts, images } = assets;

        return Promise.all([
            this.loadFonts(fonts),
            this.loadImages(images)
        ]);
    }

    renderLoading() {
        return (
            <AppLoading 
                startAsync={ () => this.loadResourcesAsync(this.props.assets) }
                onFinish={() => this.setState({ isReady: true })}
                onError={() => console.warn}
            />
        )
    }

    render() {
        return (
            <React.Fragment>
                { this.state.isReady ? this.props.children : this.renderLoading() }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationLoader);