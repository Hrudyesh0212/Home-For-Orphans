import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ProfileScreen from './Profile';
import OrphanDetailScreen from './OrphanDetailScreen';
import SupportScreen from './Support';
import GovernmentWeb from './GovernmentWeb';
import EditProfileScreen from './EditProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedbackForm from './FeedbackForm';
import createBlog from './createBlog';
import blog from './blog';
import blogpage from './blogpage';
import event from './event';
import eventPage from './eventPage';
import createevent from './createevent';
import orphanageVerifyForm from './orphanageVerifyForm';
import adminOrphanList from './adminOrphanList';
import DonationLogs from './DonationLogs';
import SponsorshipLog from './SponsorshipLog';
import FeedbackLog from './FeedbackLog';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Maintab = () => {
 return(
  <Tab.Navigator shifting={true}
  initialRouteName="Feed"
  activeColor="#ffff"
  
>
  <Tab.Screen
    name="Feed"
    component={HomeStackScreen}
    options={{
      tabBarLabel: 'Home',
      tabBarColor:'#009387',
      tabBarIcon: ({ color }) => (
        <Icon name="home" color={color} size={26} />
      ),
    }}
  />
  <Tab.Screen
    name="Details"
    component={DetailsStackScreen}
    options={{
      tabBarLabel: 'Details',
      tabBarColor:'#009387',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-notifications"  color={color} size={26} />
      ),
    }}
  />
  <Tab.Screen  
    name="Profile"
    component={ProfileStackScreen}
    options={{
      tabBarLabel: 'Profile',
      tabBarColor:'#009387',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-person"  color={color} size={26} />
      ),
    }}
  />
</Tab.Navigator>
 );
};
const HomeStackScreen = ({ navigation }) => {
    return (
      <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <HomeStack.Screen name="Home" component={HomeScreen}  options={{
          headerLeft: () => (
            <AntDesign name="menu-fold" size={25}
              backgroundColor='#009387'  onPress={() => { navigation.openDrawer(); }}
            />
          )
        }} />
        <HomeStack.Screen 
          name="OrphanDetail" 
          options={{
            title: "Orphan Detail"
          }}
          component={OrphanDetailScreen} 
        />

        <HomeStack.Screen 
          name="createBlog" 
          options={{
            title: "Create a Blog"
          }}
          component={createBlog} 
        />

        <HomeStack.Screen 
          name="blog" 
          options={{
            title: "Story of Orphans"
          }}
          component={blog} 
        />

        <HomeStack.Screen 
          name="blogpage" 
          options={{
            title: "Blog"
          }}
          component={blogpage} 
        />

        <HomeStack.Screen 
          name="events" 
          options={{
            title: "Events/Webinar"
          }}
          component={event} 
        />
        <HomeStack.Screen 
          name="eventpage" 
          options={{
            title: "Event Page"
          }}
          component={eventPage} 
        />
        <HomeStack.Screen 
          name="createevent" 
          options={{
            title: "Create Event"
          }}
          component={createevent} 
        />

        <HomeStack.Screen 
          name="orphanUnapproved" 
          options={{
            title: "Unapproved Orphange"
          }}
          component={adminOrphanList} 
        />
        <HomeStack.Screen 
          name="orphanageVerifyForm" 
          options={{
            title: "Approval Form"
          }}
          component={orphanageVerifyForm} 
        />

      </HomeStack.Navigator>
    );
  }
  const DetailsStackScreen = ({ navigation }) => {
    return (
      <DetailsStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
          headerLeft: () => (
            <AntDesign name="menu-fold" size={25}
              backgroundColor='#009387' onPress={() => { navigation.openDrawer(); }}
            />
          )
        }} />
        <DetailsStack.Screen 
          name="MainWebsite" 
          options={{
            title: "Government Website"
          }}
          component={GovernmentWeb}
        />
      </DetailsStack.Navigator>
    );
  }
  
  const ProfileStackScreen = ({ navigation }) => {
    return (
      <ProfileStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
          headerLeft: () => (
            <AntDesign name="menu-fold" size={25}
              backgroundColor='#009387' onPress={() => { navigation.openDrawer(); }}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons name="account-edit" size={25}
              backgroundColor='#694fad' onPress={() => { navigation.navigate('EditProfile'); }}
            />
          )
        }} />
        <ProfileStack.Screen 
          name="EditProfile" 
          options={{
            title: "Edit Profile"
          }}
          component={EditProfileScreen} 
        />
        <HomeStack.Screen 
          name="Support" 
          options={{
            title: "Support"
          }}
          component={SupportScreen} 
        />
        <ProfileStack.Screen 
          name="Feedback" 
          options={{
            title: "Feedback"
          }}
          component={FeedbackForm} 
        />
        <ProfileStack.Screen 
          name="donationLogs" 
          options={{
            title: "Donation Logs"
          }}
          component={DonationLogs} 
        />
        <ProfileStack.Screen 
          name="sponsorshipLogs" 
          options={{
            title: "Sponsorship Logs"
          }}
          component={SponsorshipLog} 
        />
        <ProfileStack.Screen 
          name="FeedbackLog" 
          options={{
            title: "Feedback Logs"
          }}
          component={FeedbackLog} 
        />
      </ProfileStack.Navigator>
    );
  }

  export default Maintab;