import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { 
    SafeAreaView, StyleSheet, Text, View, Image 
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import {firebaseApp,db,rdb} from '../firebase';


const FeedbackForm = () => {
    const [defaultRating, setdefaultRating] = useState(5)
    const [maxRating, setmaxRating] = useState([1,2,3,4,5])
    const [name, setname] = useState("Avantika Tiwari")
    const [userEmail, setuserEmail] = useState("avantika.tiwari2000@gmail.com")
    const [userFeedback, setuserFeedback] = useState("add text Good ")

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImageCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
    
    const CustomerRatingBar = () => {
        return(
            <View style = {styles.CustomerRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return(
                            <TouchableOpacity
                                activeOpacity = {0.7}
                                key = {item}
                                onPress = {() => setdefaultRating(item)}
                            >
                                <Image
                                    style = {styles.starImgStyle}
                                    source = {
                                        item <= defaultRating
                                            ? {uri: starImgFilled}
                                            : {uri: starImageCorner}
                                    }
                                />
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
        )
    }

    async function onSubmitFeedback(){
        if(!name && !userEmail){
            alert("Enter the details!!");
            return
        }

        if(!userFeedback){
            alert("Feedback not entered");
            return
        }

        try {
            //const { user: {uid} } = await firebaseApp.auth().createUserWithEmailAndPassword(email,password);

            
            rdb.ref('/feedback')
            .push({
                name : name,
                email : userEmail,
                feedback : userFeedback,
                rating: defaultRating
            })
            .then(() => {
                alert('Form Submitted Successfully');
            });
        
        }catch(error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={{padding:15,borderWidth: 1,borderColor: "#dddddd",borderBottomWidth: 0 }}> 
                <Text style={{textAlign: 'left',fontSize:23}}>Name</Text>
                <TextInput
                    placeholder = 'Username'
                    placeholderTextColor="#666666"
                    onChangeText = {name => setname(name)}
                    defaultValue = ''
                    style={styles.textInput}
                />
                <Text style={styles.textStyleForm}>Email</Text>

                <TextInput
                    placeholder = 'user@gmail.com'
                    placeholderTextColor="#666666"
                    onChangeText = {userEmail => setuserEmail(userEmail)}
                    defaultValue = ''
                    style={styles.textInput}
                />
                <Text style={styles.textStyleForm}>Is the application helpfull?</Text>

                <TextInput
                    placeholder = 'Yes/No'
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                />

                <Text style={styles.textStyleForm}>FeedBack about application</Text>
                <TextInput
                    placeholder = 'FeedBack if any ....'
                    placeholderTextColor="#666666"
                    onChangeText = {userFeedback => setuserFeedback(userFeedback)}
                    defaultValue = ''
                    multiline={true}
                    numberOfLines={5}
                    style={styles.textInputpara}
                />
                

            </View>
            <View style={{borderBottomColor:"black",borderBottomWidth:1,marginRight:5,marginLeft:5}}></View>
            <Text style={styles.textStyle}>Please Rate Our Application</Text>
            <CustomerRatingBar/>
            <Text style={styles.textStyle}>
                {defaultRating + ' / ' + maxRating.length}
            </Text>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={onSubmitFeedback}>
                <Text>Submit</Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 10,
        borderColor:"#694fad",
        borderWidth:1
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        marginTop: 15
    },
    textStyleForm:{
        textAlign: 'left',
        fontSize: 23,
        marginTop: 18
    },
    CustomerRatingBarStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    starImgStyle: {
        width: 30 ,
        height: 30 ,
        resizeMode: 'cover'
    },
    textInput:{
        marginTop: 10,
        paddingLeft: 10,
        color: '#05375a',
        fontSize:18,
        borderBottomWidth:2,
        marginLeft:5,
        borderColor:'#05375a'
    },
    textInputpara:{
        flex:1,
        flexDirection: 'row',
        borderColor: '#05375a',
        borderRadius: 5,
        marginTop: 6,
        borderWidth: 2,
        fontSize: 18,
        padding: 10
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginLeft:10,
        marginRight: 10,
        padding: 15,
        backgroundColor: '#FF6347',
        borderRadius: 5
    }
});

export default FeedbackForm;