import React,{ useState , useEffect } from 'react';
import { View,FlatList, StyleSheet, Text,ScrollView, StatusBar, Image,Dimensions , TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../utils/globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseApp,db,rdb,storage} from '../firebase';

export default function blogpage({ route, navigation }) {

    const { title, content, coverImage,createdAt,id } = route.params.blogData

    const deleteBlog = () =>{
        rdb.ref('blogs/' + id).remove();
        alert("Deleted Sucessfully!!")
        navigation.goBack();
        navigation.goBack();
    }

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
           return <TouchableOpacity
                    style = {styles.buttonSubmit}
                    activeOpacity={0.7}
                    onPress={deleteBlog}
                    //onPress={() => alert(this.state.blogTitle +"\n"+ this.state.blogContent +"\n"+ this.state.PickedImagePath)}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>;
        return null;
    }

  return (
      <SafeAreaView style={{flex:1,padding:5}}>
        <ScrollView style = {[globalStyles.primaryContainer,{}]}>
            <StatusBar hidden />
                {
                coverImage ?
                <Image 
                    style = {styles.image}
                    source = {{uri: coverImage}}
                />
                : null
                }
                <Text style={styles.headingText}>
                    {title}
                </Text>
                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: Dimensions.get('screen').width/1.1,
                    alignSelf:'center',
                    marginBottom: 5
                    }} 
                />
                <Text style={styles.content}>{content}</Text>
                <View style={{flexDirection:'row',marginTop:6,marginBottom:6,alignItems:'center',}}>
                    <Text style={[styles.content,{flex:2,alignSelf:'flex-start',fontWeight: 'bold'}]}>{new Date(createdAt).toDateString()}</Text>
                    <Text style={[styles.content,{flex:1,alignSelf:'flex-end',textAlign:'right',fontWeight: 'bold'}]}>{new Date(createdAt).toLocaleTimeString()}</Text>
                </View>
                
        </ScrollView>
        { renderElement() }
        
      </SafeAreaView> 
  )
}


const styles = StyleSheet.create({
    header: {
       marginHorizontal: 10,
       marginVertical: 10
    },
    addIcon: {
       position: 'absolute',
       bottom: 10,
       left: '45%',
       zIndex:1,
       elevation: 20,
    },
    image: {
        width: Dimensions.get('screen').width,
        height: 200
    },
    content: {
       ...globalStyles.secondaryText,
       flex: 1,  
       flexWrap: 'wrap',
       marginHorizontal: 10,
       fontSize: 17,
       marginBottom:5,
       justifyContent:'center'
    },
    headingText:{
        fontSize: 28,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        //fontFamily: 'Nunito-Black',
        color: 'rgba(0,0,0,0.7)', 
    },
    creatTime:{
        position:'relative',
        right: '30%'
    },
    buttonSubmit:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginRight:5,
        marginBottom:5,
        backgroundColor: '#FF6347',
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        width: "100%"
    },
 })