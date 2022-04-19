import React, { useState , useEffect } from 'react'
import { View,Image,Text,TouchableOpacity,FlatList,StyleSheet,Modal,Button,ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrphanageCard from '../components/OrphanageCard';
import {firebaseApp,db,rdb,storage} from '../firebase';
import { globalStyles } from '../utils/globalStyles';

export default function OrphanDetailScreen() {

    const [menu, setMenu] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])

    function getOrphanageData() {
        const blogConnect = rdb.ref('users') ;
        blogConnect.orderByChild('type_of_user').equalTo("Orphanage").on("value",snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    orphanageName: child.val().firstname,
                    orphanageDiscription: child.val().orphanageDiscription,
                    address: child.val().address,
                    city: child.val().city,
                    country: child.val().country,
                    email: child.val().email,
                    imageUrl: child.val().imguri,
                    phone: child.val().phone,
                });
            });
            setMenu(items)
            //console.log(items)
            console.log(menu)
        });
     }

    useEffect(() => {
        getOrphanageData()
    }, [])


    function renderItem({ item }) {
        
        return(
           <OrphanageCard 
              orphanData={item}
              //moveToadminOrphanScreen={moveToadminOrphanScreen}
              onModalOpen={onModalOpen}
           />
        )
    }

    function onModalOpen(cardId) {
        setModalOpen(true)
        setSelectedCardId(cardId)
    }

    function onCloseModal() {
        setModalOpen(false)
        setSelectedCardId(null)
    }

    /*function moveToadminOrphanScreen(orphanData) {
        navigation.navigate('orphanageVerifyForm', {
           orphanData
        })
    }*/

  return (
    <ScrollView style={globalStyles.primaryContainer}>
        
        <View style= {{backgroundColor: '#eee',alignItems:'center',paddingTop:10}}>
            <FlatList 
                data ={menu}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
        
    </ScrollView>
  )
}
