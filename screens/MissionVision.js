import React from 'react';
import { View, Text,Image} from 'react-native';


const MissionVision = () => {
  return (
    <View style={{flex:1}}>
      
      <Image style={{width: '100%', height: '20%' }}
        source={{uri:'https://cdn.dribbble.com/users/538090/screenshots/4420086/media/7d44fa6a2328ca997211665c549423fd.gif' }} />
      <Image source={require('../assets/mission.png')} style={{ marginTop:10,width: '100%', height: '22%' }}/>
      <Image style={{ marginTop:20,width: '100%', height: '20%' }}
        source={{uri:'https://articlesbase.com/wp-content/uploads/2021/02/Vision-Building.gif' }} />
      <Image source={require('../assets/vision.png')} style={{ marginTop:20,width: '100%', height: '30%' }}/>
    </View>
  );
};
export default MissionVision;

