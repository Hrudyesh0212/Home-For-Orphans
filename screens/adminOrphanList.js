import React, { useState , useEffect } from 'react'
import { View,Image,Text,TouchableOpacity,FlatList,StyleSheet,Modal,Button,ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {firebaseApp,db,rdb,storage} from '../firebase';

import { globalStyles } from '../utils/globalStyles';
import AdminOrphanCard from '../components/AdminOrphanCard';

export default function adminOrphanList({navigation}) {

    const [menu, setMenu] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])

    function getOrphanageData() {
        const blogConnect = rdb.ref('orphanages') ;
        blogConnect.once('value').then(snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    orphanageName: child.val().orphanagename,
                    orphanageDiscription: child.val().orphanagediscription,
                    address: child.val().address,
                    city: child.val().city,
                    country: child.val().country,
                    email: child.val().email,
                    imageUrl: child.val().imageUrl,
                    link: child.val().link,
                    phone: child.val().phone,
                    typeOfUser: child.val().type_of_user
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
           <AdminOrphanCard 
              orphanData={item}
              moveToadminOrphanScreen={moveToadminOrphanScreen}
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

    function moveToadminOrphanScreen(orphanData) {
        navigation.navigate('orphanageVerifyForm', {
           orphanData
        })
    }

  return (
    <ScrollView style={globalStyles.primaryContainer}>
        {/*<Modal
            visible={modalOpen}
            animationType='fade'
            transparent={true}
        >
            <ModalView
                onPressHandlers={{
                    onViewBlog,
                    onUpdateBlog,
                    onDeleteBlog,
                    onCloseModal
                }}
            //onCloseModal={onCloseModal}
            />
            </Modal>
            <Ionicons
            style = {styles.addIcon}
            name = 'add-circle-sharp'
            color = 'black'
            size = {40}
            onPress = { () => {navigation.navigate('createBlog')}}
            />
            */}
        <View style = {styles.header}>
        <Text style= {globalStyles.headingText}>Unregistered Orphanage Data</Text>
        
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
       marginBottom: 10,
       flex:1,
       flexDirection:'row'
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