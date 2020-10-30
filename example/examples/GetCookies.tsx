import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import WebView from 'react-native-webview';
type Props = {};
type State = {};

export default class GetCookies extends Component<Props, State> {
    state = {
        restarting: false,
        cookies: null,
        reloading: false,
    };

    constructor(props) {
        super(props);
        this.webView = React.createRef();
    }

    _simulateRestart = () => {
        this.setState({ restarting: true }, () => this.setState({ restarting: false }));
    };

    render() {
        console.log('State', this.state);
        return (
            <>
                {
                    this.state.restarting ? null : (<View style={{ height: 500 }}>
                        <WebView
                            ref={this.webView}
                            source={{ uri: 'https://api.virginqa.sweepr.com/login/sso' }}
                            onNavigationStateChange={(syntheticEvent: any) => {
                                console.log("GetCookies -> render -> Nav change", syntheticEvent)
                            }}
                            onLoadEnd={(syntheticEvent: any) => {
                                const { nativeEvent } = syntheticEvent;
                                if (nativeEvent.cookies !== null && nativeEvent.cookies.includes('JSESSIONID')) {
                                    this.setState({ cookies: nativeEvent.cookies })
                                }
                                console.log("GetCookies -> render -> nativeEvent LoadedEnd", nativeEvent)
                                if (nativeEvent.url === 'https://onlogin/') {
                                    if (nativeEvent.cookies === null) {

                                        if (!this.state.reloading) {
                                            console.log('reloading');
                                            this.setState({
                                                reloading: true,
                                            })
                                            this._simulateRestart();
                                        }
                                    }
                                }
                            }}
                            automaticallyAdjustContentInsets={false}
                            thirdPartyCookiesEnabled={true}
                            sharedCookiesEnabled={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            useWebKit={true}
                        />
                    </View>)
                }
            </>
        );
    }
}