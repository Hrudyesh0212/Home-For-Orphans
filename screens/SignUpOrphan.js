import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar, SafeAreaView, ScrollView, Image

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';
import {firebaseApp,db,rdb,storage} from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const SignInScreen = ({navigation}) => {

    const [orphanagename, setOrphanagename] = useState("");
    const [orphanagediscription, setOrphanageDiscription] = useState("");
    const [address, setAddress] = useState("");
    const [link, setLink] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const[type_of_user , setTypeOfUser]= useState('Orphanage');

    const [pickedImagePath, setPickedImagePath] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2q-gg5MYz-_XlW6ULtf6qIVFwQCl_Iwk2Ew&usqp=CAU');

    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        
    });
    const {signIn }=React.useContext(AuthContext);

    /*const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,               
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val, 
            });
        } else {
            setData({
                ...data,
                password: val,
            });
        }
    }
    const handleConfirmPasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                confirm_password: val, 
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }*/

    async function onRegister(){
        if(!email || !orphanagename || !address || !orphanagediscription || !link || !phone || !state || !city || !country || !pickedImagePath){
            alert("Enter all the details!!");
            return
        }

        const uploadUri = pickedImagePath;

        try {
            //const { user: {uid} } = await firebaseApp.auth().createUserWithEmailAndPassword(email,password);
            
            if(pickedImagePath){
                const response = await fetch(uploadUri);
                const blob = await response.blob()
                storage.ref("orphanageImages/"+email+"_ProfileImg")
                .put(blob)
                .then(()=>{
                    storage.ref("orphanageImages/"+email+"_ProfileImg")
                    .getDownloadURL()
                    .then((url) => {
                        try{
                            rdb.ref('/orphanages')
                            .push({
                                orphanagename : orphanagename,
                                orphanagediscription: orphanagediscription,
                                address: address,
                                email : email,
                                type_of_user : type_of_user,
                                link: link,
                                phone : phone,
                                city: city,
                                state: state,
                                country: country,
                                imageUrl: url
                            })
                            .then(() => {
                                try {
                                    AsyncStorage.setItem('email',email);
                                    //AsyncStorage.setItem('password',password);
                                    AsyncStorage.setItem('userType',type_of_user);
                                } catch(e) {
                                    //save error
                                    console.log(e);
                                }
                                alert('Registration Successful!! Your Credentials will be provided by the admin after sucessful verification');
                                //signIn(email,password);
                                navigation.navigate("SignInScreen");
                            });

                        }catch(e){
                            alert(e);
                        }

                })})
            }

            
        }catch(error) {
            alert(error);
        }
    }

    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library 
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //const permissionResult = true;

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
      // Explore the result
      //console.log(result);
      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    }

    return (
        <SafeAreaView style={styles.container}>
        
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Orphanage Signup</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <ScrollView style={styles.scrollView}>

                        <Text style={styles.text_footer}>Orphanage Name </Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = {orphanagename}
                                placeholder="Your Orphanage Name"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setOrphanagename(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Orphanage Description </Text>
                        <View style={styles.action}>
                            <SimpleLineIcons
                                name="book-open"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = {orphanagediscription}
                                placeholder="Short Description of your Orphanage"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setOrphanageDiscription(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Address</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="address-book-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = {address}
                                placeholder="Your Address"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setAddress(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Email</Text>
                        <View style={styles.action}>
                            <Fontisto
                                name="email"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = {email}
                                placeholder="Your Email"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setEmail(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Phone No </Text>
                        <View style={styles.action}>
                            <AntDesign 
                                name="phone"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = {phone}
                                placeholder="Your Phone No"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setPhone(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Type Of User </Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = "Orphanage"
                                placeholder="Type of User"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setTypeOfUser(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Link For Documents </Text>
                        <Text style={styles.link_text}>1. PUBLIC TRUST ACT, 1950 <Text style={{color:"red"}}>*</Text></Text>
                        <Text style={styles.link_text}>2. CENTRAL ADOPTION RESOURCE AUTHORITY, MINISTRY OF WOMEN AND CHILD DEVELOPMENT <Text style={{color:"red"}}>*</Text></Text>
                        <Text style={styles.link_text}>3. SOCIETIES REGISTRATION ACT, 1860 <Text style={{color:"red"}}>*</Text></Text>
                        <Text style={styles.link_text}>4. COMMISSIONER, WOMEN AND CHILD DEVELOPMENT, GOVERNMENT OF MAHARASHTRA <Text style={{color:"red"}}>*</Text></Text>
                        <Text style={styles.link_text}>5. FOREIGN CONTRIBUTION REGULATION ACT, 1976 <Text style={{color:"red"}}>*</Text></Text>
                        <Text style={styles.link_text}>6. DONATION ARE EXEMPTED UNDER SECTION 80G OF INCOME TAX ACT, 1961 <Text style={{color:"red"}}>*</Text></Text>
                        <Text style={{fontSize: 14,marginBottom: 15}}>All the above documents are mandatory for registration</Text>
                        <View style={styles.action}>
                            <MaterialIcons 
                                name="add-to-drive"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value = {link}
                                placeholder="Drive Link of Valid Orphanage Documents"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setLink(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>City</Text>
                        <View style={styles.action}>
                            <EvilIcons 
                                name="location"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value={city}
                                placeholder="Your City"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setCity(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>State</Text>
                        <View style={styles.action}>
                            <EvilIcons 
                                name="location"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                value={state}
                                placeholder="Your State"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setState(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Country</Text>
                        <View style={styles.action}>
                        <FontAwesome name="globe" color="#05375a" size={20} />
                            <TextInput 
                                value={country}
                                placeholder="Your Country"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => setCountry(val)}
                            
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>

                        <Text style={styles.text_footer}>Upload Orphanage Image</Text>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <TouchableOpacity
                                style={styles.touchabelBtn} 
                                onPress={showImagePicker}
                            >
                                <Image 
                                style={styles.image}
                                source = {{uri : pickedImagePath}}
                                resizeMode='cover'
                                />
                            </TouchableOpacity>
                        </View>
                        

                        <View style={styles.button}>
                            <TouchableOpacity
                            onPress={onRegister}
                            style={styles.signIn}>
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}  
                                    style={styles.signIn}  
                                >
                                    <Text style={[styles.textSign, {
                                        color:'#fff'
                                    }]}>        Orphanage Sign Up          </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{alignSelf:'stretch',width:'50%'}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('SignInScreen')}
                                        style={[styles.signUp, {
                                            borderColor: '#009387',
                                            borderWidth: 1,
                                            marginTop: 15,
                                            borderTopLeftRadius:10,
                                            borderBottomLeftRadius:10
                                        }]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#009387'
                                        }]}>  Sign In  </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignSelf:'stretch',width:'50%'}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('SignUpScreen')}
                                        style={[styles.signUp, {
                                            borderColor: '#009387',
                                            borderWidth: 1,
                                            marginTop: 15,
                                            borderBottomRightRadius:10,
                                            borderTopRightRadius:10
                                        }]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#009387'
                                        }]}>  Signup  </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({

    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },

    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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
        marginTop: 35
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
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

    image:{
        width: '100%',
        height: 150,
        borderRadius: 20
    },

    touchabelBtn: {
        width: "100%",
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });