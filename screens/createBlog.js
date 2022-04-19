import React, { Component,useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,SafeAreaView,Button } from 'react-native';
import {firebaseApp,db,rdb,storage} from '../firebase';
import { globalStyles } from '../utils/globalStyles';
import { TextInput } from 'react-native-gesture-handler';
//import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';



export class createBlog extends Component {

    constructor(props){
        super(props);
        this.state ={
            blogTitle: "",
            blogContent: "",
            PickedImagePath : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkN_D3jOvqW_lf1_KSOwIZkhyODWXo3zcVpQ&usqp=CAU",
            resourcePath: {},
        };
    }

    
    
    showImagePicker = async () => {
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
        this.setState({
          PickedImagePath: result.uri,
        });
        console.log(result.uri);
      }
    }

    saveItem = async()=>  {
        if(!this.state.blogTitle || !this.state.blogContent || !this.state.PickedImagePath){
            alert("Fill all the details!!")
            return
        }

        if(this.state.PickedImagePath){
            //alert(this.state.blogTitle)
            const blogConnect = rdb.ref("blogs");
            //console.log(this.state.blogTitle +"\n"+ this.state.blogContent +"\n"+ this.state.PickedImagePath)
            blogConnect.push({
            title : this.state.blogTitle,
            content: this.state.blogContent,
            //coverImage: this.state.PickedImagePath,
            createdAt: Date.now(),
            })
            .then(async(val)=> {
            
            const response = await fetch(this.state.PickedImagePath)
            const blob = await response.blob()
            storage.ref("blogImage/"+ val.key)
            .put(blob)
            .then(()=>{
                storage.ref("blogImage/"+ val.key)
                .getDownloadURL()
                .then((url) => {
                    try{
                        rdb.ref('/blogs/'+val.key)
                        .update({
                            imguri: url,
                        })
            
                    }catch(e){
                        alert(e);
                    }

            })})
           this.props.navigation.goBack()
           this.props.navigation.goBack()
        })

        }
        else{
            return
        }
        
        
        
    }

  render() {
    return (
        <SafeAreaView style = {styles.container}>
        <ScrollView style={globalStyles.primaryContainer}>
            <View style = {styles.header}>
                <Text style= {globalStyles.headingText}>New Blog</Text>
            </View>
            <View style= {{padding:10}}>
                <View style  = {{borderWidth:2, padding : 1.5,borderRadius:4}}>
                <Text style = {styles.styleText}>Title</Text>
                <TextInput
                    placeholder='Title'
                    placeholderTextColor="#666666"
                    defaultValue = ''
                    style={styles.textInput}
                    onChangeText={text => this.setState({blogTitle:text})}
                />
                <Text style = {styles.styleText}>Content</Text>
                <TextInput
                    multiline = {true}
                    numberOfLines={15}
                    placeholder='Content'
                    placeholderTextColor="#666666"
                    defaultValue = ''
                    onChangeText={text => this.setState({blogContent:text})}
                    style={styles.textInput}
                    onContentSizeChange={(event) => {
                        this.setState({height: event.nativeEvent.contentSize.height})
                    }}
                />
                <Text style = {styles.styleText}>Cover Image</Text>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <TouchableOpacity
                        style={styles.touchabelBtn} 
                        onPress={this.showImagePicker}
                    >
                        <Image 
                        style={styles.image}
                        source = {{uri : this.state.PickedImagePath}}
                        resizeMode='cover'
                        />
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            <TouchableOpacity
                style = {styles.buttonSubmit}
                activeOpacity={0.7}
                onPress={this.saveItem}
                //onPress={() => alert(this.state.blogTitle +"\n"+ this.state.blogContent +"\n"+ this.state.PickedImagePath)}
            >
                <Text>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        marginHorizontal: 10,
        marginVertical: 10,
    },
    textInput:{
        marginTop: 10,
        paddingLeft: 10,
        color: '#05375a',
        fontSize:18,
        borderBottomWidth:2,
        backgroundColor:'#F9F9F9',
        marginLeft:5,
        marginRight:5,
        borderColor:'#05375a'
    },
    styleText:{
        textAlign: 'left',
        fontSize: 23,
        marginTop: 18,
        marginRight:5,
    },
    image:{
        width: '100%',
        height: 150,
    },
    touchabelBtn: {
        width: "100%",
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
    },
    buttonSubmit:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginLeft:10,
        marginRight: 10,
        padding: 15,
        backgroundColor: '#FF6347',
        borderRadius: 5
    },
    

})

export default createBlog;