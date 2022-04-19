import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

export default function EligibilityCriteria() {
    return (
        <WebView
        source={{ uri: 'https://carings.nic.in/Parents/Eligibility-Criteria.aspx' }}
        style={{ marginTop: 20 }}
        />
    )
}
