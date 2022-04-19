import React from 'react';
import {SafeAreaView, View, Button, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import OrphanDetailScreen from './OrphanDetailScreen';
import { useState } from 'react';

import {firebaseApp,db,rdb} from '../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [userType, setUserType] = useState("");
    try{
        AsyncStorage.getItem('email')
            .then((val) => {
                    rdb.ref('/users')
                    .orderByChild('email').equalTo(val)
                    .on('value', snapshot => {
                        snapshot.forEach(function(child) {
                            setUserType(child.val().type_of_user);
                        });
                    }); 
        })
    }catch(e){
        console.log(e);
    }

    function renderElement(){
        
        if(userType == 'Admin' || userType == 'admin')
           return <TouchableRipple style={{flex: 1}} onPress={() => {navigation.navigate("orphanUnapproved")}}>
                    <View style={styles.menuItem}>
                        <Icon1 name="gifts" style={{}} color="#FF6347" size={65}/>
                        <Text style={styles.menuItemText}>Admin Registered Orphanages</Text>
                    </View>
                    </TouchableRipple>;
        return null;
    }

    
    return (

        
        
        <SafeAreaView style={styles.container}>

            <View style={styles.box}>
                <TouchableRipple style={{flex: 1}} onPress={() => {navigation.navigate("OrphanDetail")}}>
                    <View style={styles.menuItem}>
                        <Icon name="home" style={{}} color="#FF6347" size={65}/>
                        <Text style={styles.menuItemText}>Orphanages</Text>
                    </View>
                </TouchableRipple>
            </View>

            <View style={styles.box}>
                <TouchableRipple style={{flex: 1}} onPress={() => {navigation.navigate("donation")}}>
                    <View style={styles.menuItem}>
                        <Icon1 name="donate" style={{}} color="#FF6347" size={65}/>
                        <Text style={styles.menuItemText}>Donation</Text>
                    </View>
                 </TouchableRipple>
            </View>

            <View style={styles.box}>
                <TouchableRipple style={{flex: 1}} onPress={() => {navigation.navigate("sponsorship")}}>
                    <View style={styles.menuItem}>
                        <Icon1 name="hands-helping" style={{}} color="#FF6347" size={65}/>
                        <Text style={styles.menuItemText}>Sponsorship</Text>
                    </View>
                </TouchableRipple>
            </View>

            <View style={styles.box}>
                <TouchableRipple style={{flex: 1}} onPress={() => {navigation.navigate("blog")}}>
                    <View style={styles.menuItem}>
                        <Icon1 name="blog" style={{}} color="#FF6347" size={65}/>
                        <Text style={styles.menuItemText}>Blogs</Text>
                    </View>
                </TouchableRipple>
            </View>

            <View style={styles.box}>
                <TouchableRipple style={{flex: 1}} onPress={() => {navigation.navigate("events")}}>
                    <View style={styles.menuItem}>
                        <Icon1 name="gifts" style={{}} color="#FF6347" size={65}/>
                        <Text style={styles.menuItemText}>Events</Text>
                    </View>
                </TouchableRipple>
            </View>

            <View style={styles.box}>
                { renderElement() }
            </View>
            
            
        </SafeAreaView>
    );
};
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box:{
        width: '50%',
        height: '30%',
        padding: 5
    },
    inner:{
        flex:1,
        
    },
    infoBoxWrapper: {
        width: 200
    },
    menuItem: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems:'center'
    },
    menuItemText: {
        color: '#777777',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        alignItems:'center',
        textAlign: 'center'
    },
});