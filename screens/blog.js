import React, { useState , useEffect } from 'react'
import { View,Image,Text,TouchableOpacity,FlatList,StyleSheet,Modal,Button,ScrollView,StatusBar,TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {firebaseApp,db,rdb,storage} from '../firebase';

import { globalStyles } from '../utils/globalStyles';
import ModalView from '../components/ModalView';
import BlogCard from '../components/BlogCard';
import ViewMoreText from 'react-native-view-more-text';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function blog({navigation}) {

    const [menu, setMenu] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])
    const [dataBackup, setDataBackup] = useState([])
    const [query, setQuery] = useState("")

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


    function getBlogData() {
        const blogConnect = rdb.ref('blogs') ;
        blogConnect.once('value').then(snapshot => {
            var items = []
            snapshot.forEach((child) =>{
                items.push({
                    id: child.key,
                    title : child.val().title,
                    content: child.val().content,
                    coverImage: child.val().imguri,
                    createdAt: child.val().createdAt,
                });
            });
            setMenu(items.reverse())
            setDataBackup(items)
            //console.log(items)
            console.log(menu)
        });
     }
  
     useEffect(() => {
        getBlogData()
     }, [])


     function filterItem (event) {
        var query = event;
        setQuery(query)
        if (query == '') {
          setMenu(dataBackup)
        } else {
          var data = dataBackup;
          query = query.toLowerCase();
          data = data.filter(l => l.title.toLowerCase().match(query));
          setMenu(data)
        }
     };


     function renderItem({ item }) {
        return(
           <BlogCard 
              blogData={item}
              moveToBlogScreen={moveToBlogScreen}
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
  
    function moveToBlogScreen(blogData) {
        navigation.navigate('blogpage', {
           blogData
        })
    }

    function onViewBlog(blogData){
        moveToBlogScreen(blogData)
    }

    function onUpdateBlog(){
        
    }

    function onDeleteBlog(){
        
    }

    function renderElement(){
        
        if(userType == 'Admin' || userType == 'admin' || userType == 'Orphanage' || userType == 'orphanage')
           return <Ionicons
                    style = {styles.addIcon}
                    name = 'add-circle-sharp'
                    color = 'black'
                    size = {40}
                    onPress = { () => {navigation.navigate('createBlog')}}
                    />;
        return null;
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
            </Modal>*/}
        <View style = {styles.header}>
            <Text style= {globalStyles.headingText}>All Blogs</Text>
            { renderElement() }
        </View>

        <View style={{alignContent:'center',alignItems:'center'}}>
          <TextInput
            placeholder="Search your Blog here "
            placeholderTextColor="gray"
            value={query }
            onChangeText={val => filterItem(val)}
            style={styles.input}
          />
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