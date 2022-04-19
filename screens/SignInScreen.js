import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import {firebaseApp,db,rdb} from '../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[getEmail , setGetEmail]= useState("");
    try {
        const value1 = AsyncStorage.getItem('email')
        .then((val) => {
            setGetEmail(val);
        })

    } catch(e) {
        // error reading value
        console.log(e);
    }

    const[pickerValue , setPickerValue]= useState('User');
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    

    const { signIn }=React.useContext(AuthContext);
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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (username, password) =>{
        signIn(username, password);
    }

    async function onSignIn(){
        if(!email && !password){
            alert("Enter all the details!!");
            return
        }

        try {
            await firebaseApp.auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
                try{
                    AsyncStorage.setItem('email',email);
                    AsyncStorage.setItem('password',password);
                    AsyncStorage.setItem('userType',pickerValue);

                    signIn(email,password);
                               
                }catch(e) {
                    //save error
                    console.log(e);
                }
            })
        }catch(error) {
            alert(error);
        }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    value={email}
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    editable = {true}
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

            {/*<View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Type of User</Text>
            
                <Picker 
                style={styles.picker}
                selectedValue={pickerValue}
                onValueChange={ (itemValue) => setPickerValue(itemValue)}
                >
                    <Picker.Item label="User" value="User"></Picker.Item>
                    <Picker.Item label="Orphanage" value="Orphanage"></Picker.Item>

                </Picker>
                
            </View>*/}

            <View style={styles.button}
            >
                <TouchableOpacity 
                onPress={onSignIn}
                style={styles.signIn}
                >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
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
        alignItems: 'center',
        marginTop: 50,
        width:'100%'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
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