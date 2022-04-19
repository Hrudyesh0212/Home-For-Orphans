import React from 'react'
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewMoreText from 'react-native-view-more-text';
import { globalStyles } from '../utils/globalStyles';

export default function AdminOrphanCard({orphanData,moveToadminOrphanScreen}) {

    function renderViewMore(onPress){
        return(
          <Text style={{ fontWeight: 'bold', fontSize:18 }} onPress={onPress}>View more</Text>
        )
    }
    function renderViewLess(onPress){
        return(
          <Text style={{ fontWeight: 'bold', fontSize:18  }} onPress={onPress}>View less</Text>
        )
    }

    const {orphanageName,
        orphanageDiscription,
        address,
        city,
        country,
        email,
        imageUrl,
        link,
        phone,
        typeOfUser} = orphanData

    return (
        <View style={{width: Dimensions.get('screen').width/1.1,marginBottom: 10,}}>
         <TouchableOpacity
          style={styles.container}
          onPress={() => moveToadminOrphanScreen(orphanData)}
         >
 
          {/*<TouchableWithoutFeedback>
             <Ionicons 
                name='ios-ellipsis-vertical-circle'
                size={32}
                color='white'
                style={{ 
                   position: 'absolute',
                   top: 10,
                   right: 10,
                   zIndex: 1,
                 }}
                //onPress={() => onModalOpen(blogData.id)}
             />
          </TouchableWithoutFeedback>*/}
          
          <View style={styles.card}>
             <Image 
                style={styles.image}
                source={{ uri: imageUrl }}
             />
             <Text style={styles.cardTitle}>{orphanageName}</Text>
          </View>
         </TouchableOpacity>
         <View style={styles.contentView}>
            <ViewMoreText
                numberOfLines={3}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}
                >
                <Text style={styles.cardContent}>{orphanageDiscription}{"\n"}</Text>
                <Text style={styles.boldText}>Address:</Text>
                <Text style={styles.cardContent}>{"\n"}{address}{"\n"}</Text>
                <Text style={styles.boldText}>Email:</Text>
                <Text style={styles.cardContent}>{"\n"}{email}{"\n"}</Text>
                <Text style={styles.boldText}>Phone:</Text>
                <Text style={styles.cardContent}>{"\n"}{phone}</Text>
             </ViewMoreText>
         </View>
         </View>
     )
 
  return (
    <View></View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 200,
    },
    cardContent: {
       fontSize:16,
       padding:2,
       marginBottom:7,
       fontWeight:'200'
    },
 
    cardContentt: {
       fontSize:16,
       padding:2,
       fontWeight:'bold'
   },
    card: {
       height: '100%',
       width: '100%',
       
    },
    image: {
       resizeMode: 'cover',
       width: '100%',
       height: '100%',
       borderTopLeftRadius: 15,
       borderTopRightRadius: 15,
       borderWidth:1
    },
    cardTitle: {
       ...globalStyles.primaryText,
       color: 'white',
       padding: 10,
       fontSize: 26,
       backgroundColor: 'rgba(0,0,0,0.81)',
       position: 'absolute',
       bottom: 0,
       width: '100%'
    },
    contentView:{
        borderWidth:1,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginTop:-1,
        padding:4
   },
   boldText:{
       fontSize:20,
       fontWeight:'bold'
   }
 })