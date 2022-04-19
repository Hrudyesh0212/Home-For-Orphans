import React, { useState , useEffect } from 'react'
import { View,Image,Text,TouchableOpacity,FlatList,StyleSheet,Modal,Button,ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {firebaseApp,db,rdb,storage} from '../firebase';

import { globalStyles } from '../utils/globalStyles';
import FeedbackCard from '../components/FeedbackCard';


export default function FeedbackLog({navigation}) {

    const [menu, setMenu] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])

    

    function getFeedbackData() {
        const feedbackConnect = rdb.ref('feedback') ;
        feedbackConnect.once('value').then(snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    email: child.val().email,
                    name: child.val().name,
                    date: child.val().date,
                    feedback: child.val().feedback,
                    rating: child.val().rating,
                });
            });
            setMenu(items)
            //console.log(items)
            console.log(menu)
        });
    }

    useEffect(() => {
        getFeedbackData()
    }, [])


    function renderItem({ item }) {
        return(
           <FeedbackCard 
              FeedbackData={item}
              //moveToEventScreen={moveToEventScreen}
              onModalOpen={onModalOpen}
           />
        )
    }

    function moveToEventScreen(FeedbackData) {
        navigation.navigate('eventpage', {
            FeedbackData
        })
    }

    function onModalOpen(cardId) {
        setModalOpen(true)
        setSelectedCardId(cardId)
    }

    function onCloseModal() {
        setModalOpen(false)
        setSelectedCardId(null)
    }
  return (
    <ScrollView style={globalStyles.primaryContainer}>
        {/*<Modal
            visible={modal}
            animationType='fade'
            transparent={true}
        >
        <ModalView
            onPressHandlers={{    
                    onCloseModal
            }}
            onCloseModal={onCloseModal}
        /> 
        </Modal>*/}
        <View style = {styles.header}>
        <Text style= {globalStyles.headingText}>Feedback Logs</Text>
        </View>
        
        
        <View style= {{alignItems:'center'}}>

            <FlatList 
                data ={menu}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
            
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    header: {
       marginHorizontal: 10,
       marginVertical: 10,
       marginBottom: 10
    },
    addIcon: {
        position: 'absolute',
        top: -3,
        right: '1%',
        zIndex:1,
        elevation: 20,
     },
    buttonSubmit:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginLeft:10,
        marginRight: 10,
        padding: 15,
        backgroundColor: '#FF6347',
        borderRadius: 5
    },
    container: {
        marginTop:40,
        
    },
    cardText: {
        fontSize:20,
        padding:10,

    },
    cardContent: {
        fontSize:16,
        padding:10
    },
    card:{
        backgroundColor: '#e0dada',
        marginBottom:10,
        padding:'2%',
        margin:'2%',
        borderRadius:20,
        width:'96%',
        shadowColor:'#000',
        shadowOpacity:1,
        shadowOffset:{
            width:3,
            height:3
        }
    },
    cardImage:{
        width:'100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius:15
    },
    flatText:{
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    image:{
        width: '100%',
        height: 150,
    },
    iconContainer:{
        marginTop:45,
    }
 })
