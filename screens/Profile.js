import React from 'react';
import {View, SafeAreaView,Button, StyleSheet,Share,navigation} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,

  } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {firebaseApp,db,rdb} from '../firebase';



const ProfileScreen = ({ navigation }) => {
    const[currFname , setCurrFname]= useState("");
    const[currLname , setCurrLname]= useState("");
    const[currEmail , setCurrEmail]= useState("");
    const[currPhone , setCurrPhone]= useState("");
    const[currCity , setCurrCity]= useState("");
    const[currState , setCurrState]= useState("");
    const[currCountry , setCurrCountry]= useState("");
    const[currProfile , setCurrProfile]= useState("");
    const [userType, setUserType] = useState("");
    const [orphanageDescription, setOrphanageDescription] = useState("");
    
    const [donationCount, setDonationCount] = useState(0);
    const [sponsorshipCount, setSponsorshipCount] = useState(0);

    const myCustomShare = async() => {
        
        try {
            const result = await Share.share({
             title: 'App link',
        message: 'Please install this app and helph Orphans  , AppLink :https://play.google.com/store/apps/details?id=com.kareem.orphanproject', 
        url: 'https://play.google.com/store/apps/details?id=com.kareem.orphanproject'
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
    };


    try{
        AsyncStorage.getItem('email')
            .then((val) => {
                /*db.collection('users')
                // Filter results
                .where('email', '==', val)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(queryDocumentSnapshot => {
                        setCurrFname(queryDocumentSnapshot.get("firstname"));
                        setCurrLname(queryDocumentSnapshot.get("lastname"));
                        setCurrEmail(queryDocumentSnapshot.get("email"));
                        setCurrPhone(queryDocumentSnapshot.get("phone"));
                        setCurrCity(queryDocumentSnapshot.get("city"));
                        setCurrCountry(queryDocumentSnapshot.get("country"));
                    });/
                    //setCurrUser(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
                    
                    /*querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            alert('User data: ', documentSnapshot.data());
                        }
                    });*/

                    rdb
                    .ref('/users')
                    .orderByChild('email').equalTo(val)
                    .on('value', snapshot => {
                        snapshot.forEach(function(child) {
                            setCurrFname(child.val().firstname);
                            setCurrLname(child.val().lastname);
                            setCurrEmail(child.val().email);
                            setCurrPhone(child.val().phone);
                            setCurrCity(child.val().city);
                            setCurrState(child.val().state);
                            setCurrCountry(child.val().country);
                            setCurrProfile(child.val().imguri);
                            setUserType(child.val().type_of_user);
                            if(child.val().type_of_user == "Orphanage"){
                                setOrphanageDescription(child.val().orphanageDiscription)
                            }
                        });
                    });

                    if(userType == 'User' || userType == 'user'){
                        rdb
                        .ref('/donation')
                        .orderByChild('email').equalTo(val)
                        .on('value', snapshot => {
                            setDonationCount(snapshot.numChildren());
                        })

                        rdb
                        .ref('/sponsorship')
                        .orderByChild('email').equalTo(val)
                        .on('value', snapshot => {
                            setSponsorshipCount(snapshot.numChildren());
                        })
                    }
                    else if(userType == 'Orphanage' || userType == 'orphanage'){
                        rdb
                        .ref('/donation')
                        .orderByChild('orphanageName').equalTo(currFname)
                        .on('value', snapshot => {
                            setDonationCount(snapshot.numChildren());
                        })

                        rdb
                        .ref('/sponsorship')
                        .orderByChild('orphanageName').equalTo(currFname)
                        .on('value', snapshot => {
                            setSponsorshipCount(snapshot.numChildren());
                        })
                    }
                    else{
                        rdb
                        .ref('/donation')
                        .once('value').then( snapshot => {
                            setDonationCount(snapshot.numChildren());
                        })

                        rdb
                        .ref('/sponsorship')
                        .once('value').then( snapshot => {
                            setSponsorshipCount(snapshot.numChildren());
                        })
                    }

                    

            
        })
    }catch(e){
        console.log(e);
    }

    function renderElement(){
        
        if(userType == 'Orphanage' || userType == 'orphanage')
           return <View style={styles.row}>
                    <FontAwesome name="address-book-o" color="#777777" size={20} />
                    <Text style={{color:"#777777", marginLeft: 20}}>{orphanageDescription}</Text>
                </View>;
        return null;
    }
    
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image source={{uri: currProfile,}} size={80} />
                    
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop:15,
                            marginBottom: 5,
                            }]}>
                            {currFname} {currLname}
                        </Title>
                        
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>

                { renderElement() }

                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{currPhone}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{currEmail}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{currCity}, {currState}, {currCountry}</Text>
                </View>

            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox,{borderRightColor:'#dddddd', borderRightWidth: 1}]}>
                    <Title>{donationCount}</Title>
                    <Caption>Donations</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>{sponsorshipCount}</Title>
                    <Caption>Sponsorship </Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                
                <TouchableRipple onPress={() => {navigation.navigate("donationLogs");}}>
                    <View style={styles.menuItem}>
                        <Icon1 name="logo-buffer" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Donation Logs</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {navigation.navigate("sponsorshipLogs");}}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Sponsorship Logs</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={myCustomShare}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {navigation.navigate("Support")}}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => 
                {if (userType=='Admin'){
                    {navigation.navigate("FeedbackLog")}
                }
                else{
                    {navigation.navigate("Feedback")}
                }
            }}
                    >
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Feedback</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
