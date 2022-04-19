import React, { useState } from 'react';
import { StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';

import ProfileScreen from './Profile';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {firebaseApp,db,rdb,storage} from '../firebase';
import { NavigationContainer } from '@react-navigation/native';


const EditProfileScreen = ({navigation}) => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");

    const[currUserId , setCurrUserId]= useState("");
    const[currFname , setCurrFname]= useState("");
    const[currLname , setCurrLname]= useState("");
    const[currEmail , setCurrEmail]= useState("");
    const[currPhone , setCurrPhone]= useState("");
    const[currCity , setCurrCity]= useState("");
    const[currState , setCurrState]= useState("");
    const[currCountry , setCurrCountry]= useState("");
    const[currImagePath , setCurrImagePath]= useState("");
    const [userType, setUserType] = useState("");
    const [orphanageDescription, setOrphanageDescription] = useState("");

    const [pickedImagePath, setPickedImagePath] = useState('');
    const {colors}  = useTheme();
    const camera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
          console.log(result.uri);
        }
      }
      const gallery = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your photos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync();
    
        // Explore the result
        console.log(result);
        bs.current.snapTo(1)
    
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
          console.log(result.uri);
          
        }
      }
        const renderInner = () => (
            <View style={styles.panel}>

                <View style={{alignItems:'center'}}>
                    <Text style={styles.panelTitle}>Upload Photo</Text>
                    <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                </View>
                <TouchableOpacity style={styles.panelButton} 
                onPress={camera} >
                    <Text style={styles.panelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton}
                onPress={gallery} >
                    <Text style={styles.panelButtonTitle}>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} 
                onPress={() => bs.current.snapTo(1)} >
                    <Text style={styles.panelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
        const renderHeader = () => (
            <View style={styles.header}> 
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        );

        const bs = React.createRef();
        const fall = new Animated.Value(1);

        try{
            AsyncStorage.getItem('email')
                .then((val) => {

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
                            setCurrUserId(child.key);
                            setCurrImagePath(child.val().imguri);
                            setUserType(child.val().type_of_user);
                            if(child.val().type_of_user == "Orphanage"){
                                setOrphanageDescription(child.val().orphanageDiscription)
                            }
                        });
                    });
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
                            setCurrUserId(queryDocumentSnapshot.id);
                        });

                        //setCurrUser(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
                        
                        /*querySnapshot.forEach(documentSnapshot => {
                            if (documentSnapshot.exists) {
                                alert('User data: ', documentSnapshot.data());
                            }
                        });*
                    })*/
            })
        }catch(e){
            console.log(e)
        }
    
    async function onSubmit(){
        if(!fname || !lname || !phone || !city || !state || !country){
            alert("Enter all the details!!");
            return
        }

        const uploadUri = pickedImagePath;

        try{
            if(pickedImagePath){
                const response = await fetch(uploadUri);
                const blob = await response.blob()
                storage.ref("userProfileImages/"+currEmail+"_ProfileImg")
                .put(blob)
                .then(()=>{
                    storage.ref("userProfileImages/"+currEmail+"_ProfileImg")
                    .getDownloadURL()
                    .then((url) => {
                        try{

                            rdb.ref('/users/'+currUserId)
                            .update({
                                imguri: url,
                            })
                
                        }catch(e){
                            alert(e);
                        }

                })})
            }
            try{

                if(userType == 'Orphanage' || userType == 'orphanage'){
                    rdb.ref('/users/'+currUserId)
                    .update({
                        firstname: fname,
                        orphanageDiscription: lname,
                        phone: phone,
                        city: city,
                        state: state,
                        country: country,
                    })
                    .then(() => {
                        alert('User updated!');
                        navigation.goBack();
                    });
                }else{
                    rdb.ref('/users/'+currUserId)
                    .update({
                        firstname: fname,
                        lastname: lname,
                        phone: phone,
                        city: city,
                        state: state,
                        country: country,
                    })
                    .then(() => {
                        alert('User updated!');
                        navigation.goBack();
                    });
                }

                
    
            }catch(e){
                alert(e);
            }
            
            

        }catch(e){
            alert(e);
        }
    }

    function renderElement(){
        
        if(userType == 'Orphanage' || userType == 'orphanage'){
           return <View style={styles.action}>
                        <FontAwesome name="address-book-o" color={colors.text} size={20} />
                        <TextInput
                            value = {orphanageDescription}
                            placeholder={orphanageDescription}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines="4"
                            onChangeText={(val) => setLname(val)}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                        />
                    </View>
        }else{
            return <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            //defaultValue = {currLname}
                            placeholder={currLname}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            onChangeText={(val) => setLname(val)}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                        />
                    </View>;
        }
    }

    return (
        <View style={styles.container}>
            <BottomSheet 
                ref={bs}
                snapPoints={[330,0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{alignItems: 'center'}} >
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}>
                            <ImageBackground
                            source={{
                                 uri: pickedImagePath,
                            }}
                            style={{height: 100 , width: 100}}
                            imageStyle={{borderRadius: 15}}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="camera" size={35} color='#fff' style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10
                                    }} />
                                </View>

                            </ImageBackground>

                        </View>
                    </TouchableOpacity>
                    <Text style={{marginTop: 10,fontSize: 18, fontWeight: 'bold' }} >
                        {currFname} {currLname}
                    </Text>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        //defaultValue = {currFname}
                        placeholder={currFname}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(val) => setFname(val)}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>

                <View>
                    { renderElement() }
                </View>

                <View style={styles.action}>
                    <Feather name="phone" color={colors.text} size={20} />
                    <TextInput
                        //defaultValue = {currPhone}
                        placeholder={currPhone}
                        placeholderTextColor="#666666"
                        keyboardType='number-pad'
                        autoCorrect={false}
                        onChangeText={(val) => setPhone(val)}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={colors.text} size={20} />
                    <TextInput
                        value = {currEmail}
                        placeholder={currEmail}
                        placeholderTextColor="#666666"
                        keyboardType='email-address'
                        autoCorrect={false}
                        onChangeText={(val) => setEmail(val)}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>
                
                <View style={styles.action}>
                    <Icon name="map-marker-outline" color={colors.text} size={20} />
                    <TextInput
                        //defaultValue = {currCity}
                        placeholder={currCity} 
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(val) => setCity(val)}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>

                <View style={styles.action}>
                    <Icon name="map-marker-outline" color={colors.text} size={20} />
                    <TextInput
                        //defaultValue = {currState}
                        placeholder={currState} 
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(val) => setState(val)}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome name="globe" color={colors.text} size={20} />
                    <TextInput
                        //defaultValue = {currCountry}
                        placeholder={currCountry} 
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(val) => setCountry(val)}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>

                <TouchableOpacity style={styles.commandButton} onPress={onSubmit} >
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});


/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
*/