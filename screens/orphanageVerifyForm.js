import React, { useState } from 'react'
import {
  View, FlatList, TextInput, StyleSheet, Text, ScrollView, StatusBar, Image, Dimensions,
  Platform,
  TouchableOpacity,Linking
} from 'react-native';
import { globalStyles } from '../utils/globalStyles';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather';
import { add } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {firebaseApp,db,rdb} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function orphanageVerifyForm({ route, navigation }) {

  const { orphanageName,
    orphanageDiscription,
    address,
    city,
    country,
    email,
    imageUrl,
    link,
    phone,
    typeOfUser } = route.params.orphanData

  const [orphanagename, setOrphanagename] = useState(orphanageName);
  const [orphanagediscription, setOrphanageDiscription] = useState(orphanageDiscription);
  const [Address, setAddress] = useState(address);
  const [Link, setLink] = useState(link);
  const [imgUrl, setImgUrl] = useState(imageUrl);
  const [Phone, setPhone] = useState(phone);
  const [City, setCity] = useState(city);
  const [Country, setCountry] = useState(country);
  const [Email, setEmail] = useState(email);
  const [type_of_user, setTypeOfUser] = useState(typeOfUser);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  async function orphanageAccepted() {
    if(!password){
      alert("Set a password!!");
      return
    }

    if(password !== confirm_password){
        alert("Password do not match");
        return
    }

    try {
        const { user: {uid} } = await firebaseApp.auth().createUserWithEmailAndPassword(email,password);

        rdb.ref('/users')
        .push({
            userId : uid,
            firstname : orphanagename,
            lastname : "",
            orphanageDiscription : orphanagediscription,
            address: Address,
            link: Link,
            imgUrl: imgUrl,
            email : Email,
            type_of_user : type_of_user,
            password : password,
            phone : Phone,
            city: City,
            country: Country
        })
        .then(() => {
            try {
              Linking.openURL('mailto:'+ email +'?subject=Password to login for Home-For-Orphan Application&body=Email: '+ email +'    Password: '+password)
            } catch(e) {
                //save error
                console.log(e);
            }
            alert("Orphanage have been verified");
            try{
              rdb.ref('/orphanages')
              .orderByChild('email').equalTo(Email)
              .on('value', snapshot => {
                  snapshot.forEach(function(child) {
                    rdb.ref('orphanages/' + child.key).remove();
                  });
              });
              navigation.goBack();
              navigation.goBack();
          }catch(e){
            alert(e)
          }
        });
    }catch(error) {
        alert(error);
    }

  }

  function orphanageRejected() {
    try{
      rdb.ref('/orphanages')
      .orderByChild('email').equalTo(Email)
      .on('value', snapshot => {
          snapshot.forEach(function(child) {
            rdb.ref('orphanages/' + child.key).remove();
          });
      });
      alert("Orphanage Deleted Successfully!!")
      navigation.goBack();
      navigation.goBack();
  }catch(e){
    alert(e)
  }

    
  }

  return (
    <ScrollView style={globalStyles.primaryContainer}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.text_footer}>Orphanage Name </Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={orphanagename}
            //placeholder="Your Orphanage Name"
            //placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.text_footer}>Orphanage Description </Text>
        <View style={styles.action}>
          <SimpleLineIcons
            name="book-open"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={orphanagediscription}
            //placeholder="Short Description of your Orphanage"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setOrphanageDiscription(val)}

          />

        </View>

        <Text style={styles.text_footer}>Address</Text>
        <View style={styles.action}>
          <FontAwesome
            name="address-book-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={Address}
            multiline={true}
            numberOfLines={8}
            //placeholder="Your Address"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setAddress(val)}
          />
        </View>

        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Fontisto
            name="email"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={Email}
            //placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setEmail(val)}

          />

        </View>

        <Text style={styles.text_footer}>Type Of User </Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={type_of_user}
            //placeholder="Type of User"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setTypeOfUser(val)}

          />
        </View>

        <Text style={styles.text_footer}>Phone No </Text>
        <View style={styles.action}>
          <AntDesign
            name="phone"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={Phone}
            //placeholder="Your Phone No"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setPhone(val)}

          />
        </View>

        <Text style={styles.text_footer}>City</Text>
        <View style={styles.action}>
          <EvilIcons
            name="location"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={City}
            //placeholder="Your City"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setCity(val)}

          />
        </View>

        <Text style={styles.text_footer}>Country</Text>
        <View style={styles.action}>
          <FontAwesome name="globe" color="#05375a" size={20} />
          <TextInput
            value={Country}
            //placeholder="Your Country"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setCountry(val)}

          />
        </View>

        <Text style={styles.text_footer}>Link for documents </Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            value={Link}
            //placeholder="Type of User"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          //onChangeText={(val) => setTypeOfUser(val)}

          />
        </View>

        <Text style={styles.text_footer}>Set a Password </Text>
        <View style={styles.action}>
          <Feather 
              name="key"
              color="#05375a"
              size={20}
          />
          <TextInput
            value={password}
            placeholder="Set a password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setPassword(val)}

          />
        </View>

        <Text style={styles.text_footer}>Confirm the Password </Text>
        <View style={styles.action}>
          <Feather 
              name="lock"
              color="#05375a"
              size={20}
          />
          <TextInput
            value={confirm_password}
            placeholder="Confirm the password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setConfirmPassword(val)}

          />
        </View>

        <Text style={styles.text_footer}>Orphanage Image</Text>
        <View style={styles.actionImage}>
          <Image
            style={styles.image}
            source={{ uri: imgUrl }}
            resizeMode='cover'
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
          <View style={{ alignSelf: 'stretch', width: '50%' }}>
            <TouchableOpacity
              onPress={orphanageAccepted}
              style={[styles.signUp, {
                borderColor: '#000000',
                borderWidth: 1,
                marginTop: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#009387'
              }]}>  Accepted  </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: 'stretch', width: '50%' }}>
            <TouchableOpacity
              onPress={orphanageRejected}
              style={[styles.signUp, {
                borderColor: '#000000',
                borderWidth: 1,
                marginTop: 15,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#009387'
              }]}>  Rejected  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#009387',
    padding: 10
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },

  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },

  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 18
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 5
  },
  actionImage: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000000',
    padding: 6,
    borderRadius: 2
  },

  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },

  textInput: {
    flex: 1,
    //marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    backgroundColor: '#F9F9F9',
    color: '#05375a',
  },

  button: {
    //alignItems: 'center',
    marginTop: 50
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  },

  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  link_text: {
    paddingVertical: 5,
    fontSize: 14
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    padding: 10
  },

  touchabelBtn: {
    width: "100%",
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});