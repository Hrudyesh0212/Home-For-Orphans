import React, { useState , useEffect } from 'react'
import { View,Image,Text,TouchableOpacity,FlatList,StyleSheet,Modal,Button,ScrollView,TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {firebaseApp,db,rdb,storage} from '../firebase';

import { globalStyles } from '../utils/globalStyles';
import SponsorshipCard from '../components/SponsorshipCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SponsorshipLog({navigation}) {

    const [menu, setMenu] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])
    const [userType, setUserType] = useState("");
    const [dataBackup, setDataBackup] = useState([])
    const [query, setQuery] = useState("")

    function getSponsorshipData(userType,email,name) {
        setUserType(userType);
        if(userType == "User" || userType == "user"){
        const sponsorshipConnect = rdb.ref('sponsorship') ;
        sponsorshipConnect.orderByChild('email').equalTo(email)
        .on('value',snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    amount : child.val().amount,
                    email: child.val().email,
                    orphanageName: child.val().orphanageName,
                    name: child.val().name,
                    date: child.val().date,
                    duration:child.val.duration,
                    type:child.val().type,
                });
            });
            setMenu(items)
            setDataBackup(items)
            //console.log(items)
            console.log(menu)
        });
    }
    else if(userType == "Orphanage" || userType == "orphanage"){
        
        const sponsorshipConnect = rdb.ref('sponsorship') ;
        sponsorshipConnect.orderByChild('orphanageName').equalTo(name)
        .on('value',snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    amount : child.val().amount,
                    email: child.val().email,
                    orphanageName: child.val().orphanageName,
                    name: child.val().name,
                    date: child.val().date,
                    duration:child.val.duration,
                    type:child.val().type,
                });
            });
            setMenu(items)
            //console.log(items)
            console.log(menu)
        });

    }
    else{
        const sponsorshipConnect = rdb.ref('sponsorship') ;
        sponsorshipConnect.once('value').then(snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    amount : child.val().amount,
                    email: child.val().email,
                    orphanageName: child.val().orphanageName,
                    name: child.val().name,
                    date: child.val().date,
                    duration:child.val.duration,
                    type:child.val().type,
                });
            });
            setMenu(items)
            setDataBackup(items)
            //console.log(items)
            console.log(menu)
        });
    }

}

        useEffect(() => {
            var user = "";
            var email = "";
            var name = "";
            AsyncStorage.getItem('email')
                .then((val) => {
                    rdb.ref('/users')
                    .orderByChild('email').equalTo(val)
                    .on('value', snapshot => {
                        snapshot.forEach(function(child) {
                            user = child.val().type_of_user;
                            email = child.val().email;
                            name = child.val().firstname;
                        });
                    }); 
                    getSponsorshipData(user,email,name)
            })
            
        }, [])

        function filterItem (event) {
            var query = event;
            setQuery(query)
            if (query == '') {
              setMenu(dataBackup)
            } else {
              var data = dataBackup;
              query = query.toLowerCase();
              data = data.filter(l => l.orphanageName.toLowerCase().match(query));
              setMenu(data)
            }
        };
    
        function renderAdmin(){
            if(userType == "Admin" || userType == "admin" || userType == "User" || userType == "user"){
                return <View style={{alignContent:'center',alignItems:'center'}}>
                            <TextInput
                            placeholder="Search your Sponsorship here "
                            placeholderTextColor="gray"
                            value={query}
                            onChangeText={val => filterItem(val)}
                            style={styles.input}
                            />
                        </View>
            }
            return null
        }

    function renderItem({ item }) {
        return(
           <SponsorshipCard 
              SponsorshipData={item}
              //moveToEventScreen={moveToEventScreen}
              onModalOpen={onModalOpen}
           />
        )
    }

    function moveToEventScreen(SponsorshipData) {
        navigation.navigate('eventpage', {
            SponsorshipData
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
        <Text style= {globalStyles.headingText}>Sponsorship Logs</Text>
        </View>
        {renderAdmin()}
        
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
    },

    input: {
        height: 55,
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 0,
        paddingLeft: 10,
        borderWidth:1,
        marginBottom:10,
    },
 })