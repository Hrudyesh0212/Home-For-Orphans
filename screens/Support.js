import React from 'react';
import { Text, View,Image ,StyleSheet,TouchableOpacity,Linking} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Support = () => {
  
    return (
    <View style={{padding:1,marginTop:20}}>
      <Image source={require('../assets/support.jpg')} style={styles.ima} />
      <View style={styles.button}
            >
                <TouchableOpacity 
                onPress={()=>{Linking.openURL('tel:6352009559');}}
                style={styles.signIn}
                >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Phone</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Linking.openURL('mailto:support@example.com') }
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>E-Mail</Text>
                </TouchableOpacity>
            </View>
    </View>
    
  )
}
export default Support;
const styles = StyleSheet.create({
  ima:{
    height:240,
    borderRadius:10,
    opacity: 0.7,
    marginBottom: 3,
    width:'97%',
    marginLeft:5,
    marginRight:5,
    marginTop:20
},
button: {
  alignItems: 'center',
  marginTop: 50,
  width:'100%'
},
signIn: {
  width: '95%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold',
}

});