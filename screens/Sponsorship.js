import React from 'react';
import { Text,Image, View,  StyleSheet,ScrollView,Dimensions,Pressable,TextInput,Alert,Linking } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {firebaseApp,db,rdb} from '../firebase';

const {width} = Dimensions.get("window");
const height = width* 0.8;

const images = [
    'https://cdn.shopify.com/s/files/1/1151/8374/articles/smaller_lead_photo_1000x.jpg?v=1523044466',
    'https://static.toiimg.com/thumb/67772455.cms?width=680&height=512&imgsize=747337',
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/131380480/original/a364dcce38a319ff95f944d87cbd7737399a4f0b/provide-free-education-to-orphan-and-poor-childs.jpg',
    'https://lifesong.org/site/wp-content/uploads/2018/05/DSC_0730-4.jpg',
    'http://www.ramanamaharshitrust.in/images/children_studying.jpg',
    'https://serudsindia.org/wp-content/uploads/2020/10/SERUDS-Orphanage-in-Kurnool-helping-Orphan-Children.jpg'
    

]
const benefits = [
    'https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    
]

const data = [
    { label: 'Rs 2000', value: '2000' },
    { label: 'Rs 5000', value: '5000' },
    { label: 'Rs 10000', value: '10000' },
  ];

export default class Sponsorship extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:"", 
            amount:"",
            orphanageName:"",
            type:"",
            duration:"",
            panNo:"",
            country:"",
            address:"",
            city:"",
            state:"",
            email: "",
            phone:"",
            value: null,
            valueOrphan: null,
            menu: []
        }

        this.renderItem = this.renderItem.bind(this);
        this.renderName = this.renderName.bind(this);

        AsyncStorage.getItem('email')
            .then((val) => {
                let uname,email,phone,state,city,country
                rdb
                .ref('/users')
                .orderByChild('email').equalTo(val)
                .on('value', snapshot => {
                    snapshot.forEach(function(child) {
                        email = child.val().email;
                        uname = child.val().firstname + " " + child.val().lastname;
                        phone = child.val().phone;
                        city = child.val().city;
                        state = child.val().state;
                        country = child.val().country;
                        //alert(uid);
                    });
                });

                this.setState({phone : phone})
                this.setState({name : uname})
                this.setState({email : email})
                this.setState({city : city})
                this.setState({state : state})
                this.setState({country : country})
            })

            const donationConnect = rdb.ref('users') ;
            donationConnect.orderByChild('type_of_user').equalTo("Orphanage")
            .on('value',snapshot => {
                var items = []
                snapshot.forEach((child) =>{
                    items.push({
                        label: child.val().firstname,
                        valueOrphan: child.val().firstname,
                    });
                });
                this.setState({menu : items})
                //console.log(items)
                //console.log("hello",this.state.menu)
            });
    }
    
    state={
        active:0
    }
    
    change= ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        
        if(slide !== this.state.active){
            this.setState({active: slide});
        }
    }

    async onSubmit(){
        if(!this.state.email || !this.state.name || !this.state.type || !this.state.duration || !this.state.phone || !this.state.city || !this.state.country || !this.state.valueOrphan || !this.state.panNo || !this.state.address || !this.state.state || !this.state.value){
            alert("Enter all the details!!");
            return
        }

        try {
            //const { user: {uid} } = await firebaseApp.auth().createUserWithEmailAndPassword(email,password);
                rdb.ref('/sponsorship')
                .push({
                    name: this.state.name, 
                    amount: this.state.valueOrphan,
                    orphanageName: this.state.value,
                    type:this.state.type,
                    duration:this.state.duration,
                    country: this.state.country,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    email: this.state.email,
                    phone: this.state.phone,
                    panNo: this.state.panNo,
                    date: Date.now()
                })
                .then(() => {  
                    console.log('Payment Sucessful');
                    this.props.navigation.goBack();
                });
            

            
        }catch(error) {
            alert(error);
        }

        if(this.state.valueOrphan == 2000){
            return Linking.openURL("https://buy.stripe.com/test_fZedUmd62bf63MQ28d");
        }
        else if(this.state.valueOrphan == 5000){
            return Linking.openURL("https://buy.stripe.com/test_7sIbMe3vs82UabebIOs");
        }
        else{
            return Linking.openURL("https://buy.stripe.com/test_3cs5nQ0jgcjacjm14b");
        }
    }

    renderItem = (item) => {
        return (
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {item.value === this.state.value && (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          </View>
        );
      };

    renderName = (item) => {
        return (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
              {item.value === this.state.valueOrphan && (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            </View>
          );
    }
    
    
    render(){
        
        return(
            
            <View>
            <ScrollView>
            <View style={style.container}>
                <ScrollView pagingEnabled 
                horizontal 
                onScroll={this.change}
                showsHorizontalScrollIndicator={false}
                style={style.scroll}>
                    {
                        images.map((image,index) => (
                            <Image
                            key={index}
                            source={{uri: image}}
                            style={style.image}/>
                        ))
                    }
                </ScrollView>
                <View style={style.pagination}>
                    {
                        images.map((i,k) => (
                            <Text key={k} style = {k == this.state.active ? style.paginActiveText : style.pagingText}>⬤</Text>
                        ))
                    }
                    
                </View>               
            </View> 
            <View>
                <Text style={style.subheading}>BETI PADHAO !</Text>
                <Text style={style.subheading}>SPONSOR A KANYA’S EDUCATION</Text>
            </View>
            <View style={{ width: width * 1, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
            {
                 benefits.map((image,index) => (
                            <Image
                            key={index}
                            source={{uri: image}}
                            style={style.candonate}/>
                        ))
            }
            </View>
            
            <View style={style.form}>
            <Text style={[style.text_footer, {marginTop: 25}]}>Name</Text>
                <TextInput 
                        value={this.state.name}
                        placeholder="Your Name"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({name: val})}
                    />
            <Text style={[style.text_footer, {marginTop: 25}]}>Amount</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={250}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Amount"
                    searchPlaceholder="Search..."
                    value={this.state.valueOrphan}
                    onChange={item => {
                    this.setState({valueOrphan: item.value});
                    }}
                    renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    )}
                    renderItem={this.renderItem}
                />

                {/*<TextInput 
                        value={this.state.amount}
                        placeholder="Amount to Sponsor"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => this.setState({amount: val})}
                    />*/}
            <Text style={[style.text_footer, {marginTop: 25}]}>Orphanage Name</Text>
                
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={this.state.menu}
                search
                maxHeight={250}
                labelField="label"
                valueField="valueOrphan"
                placeholder="Select Orphanage"
                searchPlaceholder="Search..."
                value={this.state.value}
                onChange={item => {
                this.setState({value: item.valueOrphan});
                }}
                renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )}
                renderItem={this.renderName}
            />
                
                {/*<TextInput 
                        value={this.state.orphanageName}
                        placeholder="Name of the Orphanage"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({orphanageName: val})}
                />*/}

            <Text style={[style.text_footer, {
                marginTop: 35
            }]}>Type of Sponsorship</Text>
                <TextInput 
                        value={this.state.type}
                        placeholder="School,Degree courses Etc.."
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({type: val})}
                    />
                <Text style={[style.text_footer, {
                marginTop: 35
            }]}>Duration</Text>
                <TextInput 
                        value={this.state.duration}
                        placeholder="Once,Yearly,Half-Yearly,Quarterly.."
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({duration: val})}
                    />

                <Text style={[style.text_footer, {marginTop: 25}]}>PAN Card No.</Text>
                <TextInput 
                        value={this.state.panNo}
                        placeholder="PanCard Number"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({panNo: val})}
                    />

                <Text style={[style.text_footer, {marginTop: 25}]}>Email</Text>
                <TextInput 
                        value={this.state.email}
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        //onChangeText={(val) => this.setState({email: val})}
                    />
                <Text style={[style.text_footer, {marginTop: 25}]}>Mobile No.</Text>
                <TextInput 
                        value={this.state.phone}
                        placeholder="Your Mobile Number"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({phone: val})}
                    />

                
                <Text style={[style.text_footer, {marginTop: 25}]}>Address</Text>
                <TextInput 
                        value={this.state.address}
                        placeholder=" Your Permanent Address"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => this.setState({address: val})} 
                    />
                <Text style={[style.text_footer, {marginTop: 25}]}>City/Town</Text>
                <TextInput 
                        value={this.state.city}
                        placeholder="City/Town"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({city: val})}
                    />
                <Text style={[style.text_footer, {marginTop: 25}]}>State</Text>
                <TextInput 
                        value={this.state.state}
                        placeholder="State"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({state: val})}
                    />

                <Text style={[style.text_footer, {marginTop: 25}]}>Country</Text>
                <TextInput 
                        value={this.state.country}
                        placeholder="Country"
                        placeholderTextColor="#666666"
                        style={style.textInput}
                        autoCapitalize="none" 
                        onChangeText={(val) => this.setState({country: val})}
                    />
                
                <Pressable style={style.b} onPress={() => {
                    this.onSubmit();
                }}>
                    <Text style={style.text}>Submit</Text>
                </Pressable>
                    </View>
            </ScrollView>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

const style = StyleSheet.create({
    container:{marginTop: 50,
         width,
         height},

    scroll:{width,
        height},

    image:{width,
        height, 
        resizeMode: 'cover',
        borderRadius:15,
    },

    pagination:{flexDirection:'row', 
        position: 'absolute',
        bottom:0 , 
        alignSelf:'center' },
    pagingText:{fontSize: (width / 30),
        color:'#888' ,
        margin:3},
    paginActiveText:{fontSize: (width / 30),
        color:'#fff' ,
        margin:3},
    heading:{
        fontSize:20,
        marginTop:10,
        margin:20
    },
    t:{
        borderWidth:2,
        borderRadius:10,
        margin:10
    },
    subheading:{
        fontSize:30,
        fontWeight:'bold',
        paddingLeft:10,
    },
    candonate:{
        width,height,
        margin:5   
    },
    form:{
        margin:20,
        borderStyle:'solid',
        borderColor:'black',
        borderWidth: 2,
        padding:20,
        borderRadius:15
    },
    text_footer: {
        color: '#05375a',
        fontSize: 20,
        marginLeft:10,
        
    },
    textInput: {
        flex: 1,
        marginTop: 15,
        paddingLeft: 10,
        color: '#05375a',
        fontSize:18,
        borderBottomWidth:2,
        marginLeft:5,
        borderColor:'#05375a'

    },
    b:{
        margin:30,
        padding:20,
        backgroundColor:'#009387',
        borderRadius:50
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf:'center',
        fontSize:16
    }
   
})