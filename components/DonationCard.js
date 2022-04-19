import React,{ useState , useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Text} from 'react-native';
import { Button,
	Card, 
	Paragraph, 
	Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseApp,db,rdb,storage} from '../firebase';

export default function DonationCard({DonationData}) {
    function renderViewMore(onPress){
		return(
		<Text style={{ fontWeight: 'bold', fontSize:18 }} onPress={onPress}>View more</Text>
		)
  	}
  	function renderViewLess(onPress){
		return(
			<Text style={{ fontWeight: 'bold', fontSize:18  }} onPress={onPress}>View less</Text>
		)
  	}

    const {orphanageName,
    email,
    amount,date,name} = DonationData

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
        //alert(userType)
        if(userType == 'User' || userType == 'user')
           return null
        else{
            
            return <View>
                <Title style={{fontSize:23}}>{name}</Title>
                <Title style={{fontSize:23}}>{email}</Title>
            </View>
            
        }
    }

  return (
    <View style={{width: Dimensions.get('screen').width/1.08,marginBottom: 10,}}>
        <Card style={styles.cardBox}>
            <Title style={{fontSize:23,marginStart:5,borderBottomWidth:1}}>{orphanageName}</Title>
            <Card.Content>
                { renderElement() }
                <Title style={{fontSize:23}}>Amount: {amount}</Title>
                <Title style={{fontSize:23}}>{new Date(date).toDateString()}</Title>
                <Title style={{fontSize:23}}>{new Date(date).toLocaleTimeString()}</Title>
            </Card.Content>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    outsideCard: {
        padding: 10
    },
    cardBox: {
        width: '100%',
        padding: 10,
        borderRadius:10,
		borderWidth: 1,
		borderColor: "#808080"
    },

    infostyle:{
        fontSize:15,
        fontWeight:'200',
    },
	iconO:{
		marginLeft: 5
	}
});