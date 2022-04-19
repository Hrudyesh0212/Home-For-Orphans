import React from 'react'
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Text} from 'react-native';
import { Button,
	Card, 
	Paragraph, 
	Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ViewMoreText from 'react-native-view-more-text';

export default function FeedbackCard({FeedbackData}) {
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

    const {feedback,
    email,
    rating,name,date} = FeedbackData

  return (
    <View style={{width: Dimensions.get('screen').width/1.08,marginBottom: 10,}}>
        <Card style={styles.cardBox}>
            <Title style={{fontSize:23,marginStart:5,borderBottomWidth:1}}>{name}</Title>
            <Card.Content>
                <Title style={{fontSize:23}}>{email}</Title>
                <Title style={{fontSize:23}}>Rating: {rating}</Title>
                <ViewMoreText
                    numberOfLines={3}
                    renderViewMore={renderViewMore}
                    renderViewLess={renderViewLess}
                    >
                    <Text style={{fontSize:23}}>FeedBack: {feedback}</Text>
                </ViewMoreText>
            </Card.Content>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    outsideCard: {
        padding: 10
    },
    cardBox: {
        width: '100%',
        padding: 10,
        borderRadius:10,
		borderWidth: 1,
		borderColor: "#808080"
    },

    infostyle:{
        fontSize:15,
        fontWeight:'200',
    },
	iconO:{
		marginLeft: 5
	}
});

