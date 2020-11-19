import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';

import WebView from 'react-native-webview';
type Props = {};
type State = {};

export default class GetCookies extends Component<Props, State> {
    state = {
        restarting: false,
        cookies: null,
        reloading: false,
        uri: null
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
        const NewWebView = () => {
            return (<View style={{ height: 500 }}>
                <Text>wtf</Text>
                <WebView
                    ref={this.webView}
                    source={{ uri: this.state.uri }}
                    onLoadEnd={(syntheticEvent: any) => {
                        const { nativeEvent } = syntheticEvent;
                        console.log("GetCookies -> render -> nativeEvent", nativeEvent)
                    }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('WebView error: ', nativeEvent);
                    }}
                    onLoadError
                    automaticallyAdjustContentInsets={false}
                    thirdPartyCookiesEnabled={true}
                    sharedCookiesEnabled={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    useWebKit={true}
                />
            </View>)
        }
        return (
            <>
                {
                    !this.state.uri && (<View style={{ height: 500 }}>
                        <WebView
                            ref={this.webView}
                            source={{ uri: this.state.uri ? this.state.uri : 'https://api.virginqa.sweepr.com/login/sso' }}
                            onLoadEnd={(syntheticEvent: any) => {
                                const { nativeEvent } = syntheticEvent;
                                console.log("GetCookies -> render -> nativeEvent", nativeEvent)
                                if (nativeEvent.url === "https://onlogin/") {
                                    this.setState({ uri: 'https://api.virginqa.sweepr.com/login/sso' })
                                }
                            }}
                            onError={(syntheticEvent) => {
                                const { nativeEvent } = syntheticEvent;
                                console.warn('WebView error: ', nativeEvent);
                            }}
                            onLoadError
                            automaticallyAdjustContentInsets={false}
                            thirdPartyCookiesEnabled={true}
                            sharedCookiesEnabled={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            useWebKit={true}
                        />
                    </View>)


                }
                {
                    this.state.uri && <NewWebView></NewWebView>
                }
            </>
        );
    }
}