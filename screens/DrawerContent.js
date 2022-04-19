import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';


import { AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseApp,db,rdb} from '../firebase';

export function DrawerContent(props) {

    const [isDarkTheme,setIsDarkTime] = React.useState(false)
    const {signOut} = React.useContext(AuthContext);
    const toggleTheme = () =>{
        setIsDarkTime(!isDarkTheme)
    }

    const [fname,setFname] = React.useState("");
    const [lname,setLname] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [image,setImage] = React.useState("");

    AsyncStorage.getItem('email')
            .then((val) => {
                try{
                    rdb
                    .ref('/users')
                    .orderByChild('email').equalTo(val)
                    .on('value', snapshot => {
                        snapshot.forEach(function(child) {
                            setFname(child.val().firstname);
                            setLname(child.val().lastname);
                            setEmail(child.val().email);
                            setImage(child.val().imguri);
                        });
                    });
                }catch(e){
                    alert(e);
                }
                
            
        })

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,backgroundColor:'white'}}>
                            <Avatar.Image 
                                source={{
                                    uri: image
                                }}
                                size={50}           
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{fname} {lname}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="blur-linear" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Details"
                            onPress={() => {props.navigation.navigate('Details')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Blog"
                            onPress={() => {props.navigation.navigate('blog')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cash" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Donation"
                            onPress={() => {props.navigation.navigate('donation')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="book" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Sponsorship"
                            onPress={() => {props.navigation.navigate('sponsorship')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Events/Webinar"
                            onPress={() => {props.navigation.navigate('events')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="target" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Mission Vision Of App"
                            onPress={() => {props.navigation.navigate('mv')}}
                        />
                        
                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor:'#f4f4f4',
        borderTopWidth: 1,
        
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      
    },
  });