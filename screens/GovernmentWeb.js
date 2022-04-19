import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';


const Google = 'https://carings.nic.in/Parents/Guidelines-for-Adoption.aspx';

export default function GovernmentWeb() {
        return (
            
            <View style={styles.container}>
                <View style={{width:'100%',height:'100%'}}>
                    
                    <WebView 
                        source={{uri: Google}}
                    />
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container:{
        marginTop:28,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
