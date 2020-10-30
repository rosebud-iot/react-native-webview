import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import WebView from 'react-native-webview';
type Props = {};
type State = {};

export default class GetCookies extends Component<Props, State> {
    state = {
        reloaded: false,
        cookies: null,
    };

    constructor(props) {
        super(props);
        this.webView = React.createRef();
    }

    render() {
        console.log('Estado', this.state);
        return (
            <View style={{ height: 500 }}>
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
                        console.log("GetCookies -> render -> nativeEvent", nativeEvent)
                        if (nativeEvent.url === 'https://onlogin/') {
                            if (nativeEvent.cookies === null) {
                                console.log('reload');
                                if (!this.state.reloaded) {
                                    // this.webView.current.reload();
                                    this.setState({ reloaded: true });
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
            </View>
        );
    }
}