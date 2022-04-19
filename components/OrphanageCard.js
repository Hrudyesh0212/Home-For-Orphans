import React from 'react'
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Text} from 'react-native';
import { Button,
	Card, 
	Paragraph, 
	Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import ViewMoreText from 'react-native-view-more-text';
import { globalStyles } from '../utils/globalStyles';


export default function OrphanageCard({orphanData}) {

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
	orphanageDiscription,
	address,
	city,
	country,
	email,
	imageUrl,
	phone} = orphanData


  	return (
		<View style={{width: Dimensions.get('screen').width/1.08,marginBottom: 10,}}>
			<Card style={styles.cardBox}>
				<Title style={{fontSize:23}}>{orphanageName}</Title>
				<Card.Cover style={{borderRadius:10,borderWidth:1,borderColor:"#111111"}}  source={{ uri: imageUrl }} />
				<Card.Content style={{padding:9}}>
					<Paragraph style={styles.infostyle}>{orphanageDiscription}</Paragraph>
					<View>
						<Text style={{fontSize:18,fontWeight:'bold'}}>Contact:
						<Feather name="phone-call" style={styles.iconO} color="#000000" size={15}/>
						</Text>
						<Text style={styles.infostyle}>{phone}</Text>
					</View>
					<View>
						<Text style={{fontSize:18,fontWeight:'bold'}}>Address:
						<Ionicons name="location" style={styles.iconO} color="#000000" size={15}/>
						</Text>
						<Text style={styles.infostyle}>{address}</Text>
					</View>
					<View>
						<Text style={{fontSize:18,fontWeight:'bold'}}>City:
						<FontAwesome5 name="city" style={styles.iconO} color="#000000" size={15}/>
						</Text>
						<Text style={styles.infostyle}>{city}</Text>
					</View>
					<View>
						<Text style={{fontSize:18,fontWeight:'bold'}}>Country:
						<FontAwesome5 name="landmark" style={styles.iconO} color="#000000" size={15}/>
						</Text>
						<Text style={styles.infostyle}>{country}</Text>
					</View>
					
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
        marginBottom: 5,
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
