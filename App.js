import React, {useEffect} from 'react';
import database from '@react-native-firebase/database';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from './screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Maintab from './screens/Maintab';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import RootStackScreen from './screens/RootStackScreen'
//import { useEffect } from 'react/cjs/react.production.min';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from './components/context';
import blog from './screens/blog';
import createBlog from './screens/createBlog';
import blogpage from './screens/blogpage';
import Donation from './screens/Donation';
import Sponsorship from './screens/Sponsorship';
import event from './screens/event';
import createevent from './screens/createevent';
import eventPage from './screens/eventPage';
import HomeScreen from './screens/HomeScreen';
import MV from './screens/MissionVision';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

import { createStackNavigator } from '@react-navigation/stack';
//import {Picker} from '@react-native-picker/picker';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import {firebaseApp,db} from './firebase';


import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';



const Drawer = createDrawerNavigator();
const BlogStack = createStackNavigator();
const DonationStack = createStackNavigator();
const SponsorshipStack = createStackNavigator();
const EventsStack = createStackNavigator();
const MVStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const BlogStackScreen = ({navigation}) => (
  <BlogStack.Navigator 
   screenOptions={{
    headerStyle: {
      backgroundColor:"#009387",
    },

    headerTintColor: "#fff",
    headerTitleStyle: { 
      fontWeight:'bold'
  }
  }}>
    <BlogStack.Screen name="Blog" component={blog} options={{
      title:"Story of Orphans",
      headerLeft: () => (
        <AntDesign name="arrowleft" size={25}
              backgroundColor='#009387'  onPress={() => navigation.goBack()}
            />
      )
    }}/>

    <BlogStack.Screen name="createBlog" component={createBlog} options={{
      title:"Create a Blog",  
    }}/>

    <BlogStack.Screen name="blogpage" component={blogpage} options={{
      title:"Blog",  
    }}/>
    
  </BlogStack.Navigator>
  
);
const DonationStackScreen = ({navigation}) => (
  <DonationStack.Navigator 
   screenOptions={{
    headerStyle: {
      backgroundColor:"#009387",
    },

    headerTintColor: "#fff",
    headerTitleStyle: { 
      fontWeight:'bold'
  }
  }}>
    <DonationStack.Screen name="Donation" component={Donation} options={{
      title:"Donation",
      headerLeft: () => (
        <AntDesign name="menu-fold" size={25}
              backgroundColor='#009387'  onPress={() => { navigation.openDrawer(); }}
            />
      )
    }}/>
    
  </DonationStack.Navigator>
  
);

const SponsorStackScreen = ({navigation}) => (
  <SponsorshipStack.Navigator 
   screenOptions={{
    headerStyle: {
      backgroundColor:"#009387",
    },

    headerTintColor: "#fff",
    headerTitleStyle: { 
      fontWeight:'bold'
  }
  }}>
    <SponsorshipStack.Screen name="Sponsor" component={Sponsorship} options={{
      title:"Sponsorship",
      headerLeft: () => (
        <AntDesign name="menu-fold" size={25}
              backgroundColor='#009387'  onPress={() => { navigation.openDrawer(); }}
            />
      )
    }}/>
    
  </SponsorshipStack.Navigator>
  
);

const EventStackScreen = ({navigation}) => (
  <EventsStack.Navigator 
   screenOptions={{
    headerStyle: {
      backgroundColor:"#009387",
    },

    headerTintColor: "#fff",
    headerTitleStyle: { 
      fontWeight:'bold'
  }
  }}>
    <EventsStack.Screen name="events" component={event} options={{
      title:"Events / Webinar",
      headerLeft: () => (
        <AntDesign name="arrowleft" size={25}
              backgroundColor='#009387'  onPress={() => navigation.goBack()}
            />
      )
    }}/>

    <EventsStack.Screen name="createevent" component={createevent} options={{
      title:"Create an Event",
    }}/>

    <EventsStack.Screen name="eventpage" component={eventPage} options={{
      title:"Events",
    }}/>
    
    
  </EventsStack.Navigator>
  
);

const MissionVisionStackScreen = ({navigation}) => (
  <MVStack.Navigator 
   screenOptions={{
    headerStyle: {
      backgroundColor:"#009387",
    },

    headerTintColor: "#fff",
    headerTitleStyle: { 
      fontWeight:'bold'
  }
  }}>
    <MVStack.Screen name="MV" component={MV} options={{
      title:"Mission Vision of App",
      headerLeft: () => (
        <AntDesign name="menu-fold" size={25}
              backgroundColor='#009387'  onPress={() => { navigation.openDrawer(); }}
            />
      )
    }}/>
    
  </MVStack.Navigator>
  
);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 

  const initialLoginState = {
    isLoading : true,
    userToken : null,
  };
  
  const loginReducer = (prevState, action) => {
    switch( action.type ){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken : action.token,
          isLoading : false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken : action.token,
          isLoading : false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken : null,
          isLoading : false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken : action.token,
          isLoading : false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  
  const authContext = React.useMemo(() => ({
    signIn:async(email,password) => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      let userToken;
      userToken = null;
      if(email && password){
        try{
          userToken = "dfgdfg";
          await AsyncStorage.setItem('userToken',userToken);
        }catch(e){
            console.log(e);
        }
      }
      dispatch({type: 'LOGIN', token: userToken})
    
    },
    signOut:async() => {
      //setUserToken(null);
      //setIsLoading(false);
      try{
        await AsyncStorage.clear();
       }catch(e){
         console.log(e);
       }
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
  }),[]);

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      }catch(e){
         console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    },1000);
  },[]);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  /*if(!userToken) {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='SignUpScreen'>
          <Tab.Screen name='SignUpScreen' component={SignUpScreen} />
          <Tab.Screen name='Donation' component={Donation} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }*/

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer >
    {  loginState.userToken !== null    ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={Maintab} />
          <Drawer.Screen name="blog" component={BlogStackScreen} />
          <Drawer.Screen name="donation" component={DonationStackScreen} />
          <Drawer.Screen name="sponsorship" component={SponsorStackScreen} />
          <Drawer.Screen name="events" component={EventStackScreen} />
          <Drawer.Screen name="mv" component={MissionVisionStackScreen} />
        </Drawer.Navigator>
        )
    :   
    <RootStackScreen/>
   } 
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default App;