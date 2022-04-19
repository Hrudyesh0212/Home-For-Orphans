import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar, SafeAreaView, ScrollView

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

import {firebaseApp,db,rdb} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = ({navigation}) => {

    const[pickerValue , setPickerValue]= useState('User');
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        
    });
    const { signIn } = React.useContext(AuthContext);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const[type_of_user , setTypeOfUser]= useState('User');

    const textInputChange = (val) => {
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
    }

    async function onRegister(){
        if(!fname || !lname || !email || !password || !phone || !city || !country || !state){
            alert("Enter all the details!!");
            return
        }

        if(password !== confirm_password){
            alert("Password do not match");
            return
        }

        try {
            const { user: {uid} } = await firebaseApp.auth().createUserWithEmailAndPassword(email,password);

            /*db.collection('users')
            .doc(uid)
            .set({
                firstname : fname,
                lastname : lname,
                email : email,
                type_of_user : pickerValue,
                password : password,
                phone : phone,
                city: city,
                country: country
            })
            .then(() => {
                    alert('Registration Successful');
                    signIn(email,password);
                }
            )*/

            rdb.ref('/users')
            .push({
                userId : uid,
                firstname : fname,
                lastname : lname,
                email : email,
                type_of_user : type_of_user,
                password : password,
                phone : phone,
                city: city,
                state: state,
                country: country
            })
            .then(() => {
                try {
                    AsyncStorage.setItem('email',email);
                    AsyncStorage.setItem('password',password);
                    AsyncStorage.setItem('userType',type_of_user);
                } catch(e) {
                    //save error
                    console.log(e);
                }
                alert('Registration Successful');
                signIn(email,password);
            });
        }catch(error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now</Text>
        </View>

        
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView style={styles.scrollView}>
            <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    value= {fname}
                    placeholder="Your First Name"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setFname(val)}
                   
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Last Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    value={lname}
                    placeholder="Your Last Name"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setLname(val)}
                   
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Email</Text>
            <View style={styles.action}>
                <Fontisto
                    name="email"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    value={email}
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Phone No</Text>
            <View style={styles.action}>
                <AntDesign 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    value={phone}
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Type Of User </Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    value = "User"
                    placeholder="Type of User"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    //onChangeText={(val) => setTypeOfUser(val)}
                
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>City</Text>
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>State</Text>
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Country</Text>
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="key"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    value={password} 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setPassword(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    value={confirm_password} 
                    placeholder="Confirm Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setConfirmPassword(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
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
                        }]}>         Sign Up          </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{alignSelf:'stretch',width:'50%'}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignInScreen')}
                            style={[styles.signUp, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                backgroundColor : '#ffffff',
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
                            onPress={() => navigation.navigate('SignUpOrphan')}
                            style={[styles.signUp, {
                                borderColor: '#009387',
                                backgroundColor : '#ffffff',
                                borderWidth: 1,
                                marginTop: 15,
                                borderBottomRightRadius:10,
                                borderTopRightRadius:10
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>  Orphanage Signup  </Text>
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
        paddingVertical: 60
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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
        borderRadius: 10
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    picker: {
        width: '50%',
        height: 40 ,
        justifyContent: 'center',
        color:'#05375a',
        marginTop: 10,
        fontSize: 30
        
    }
  });