import React, { Component } from 'react';
import { SafeAreaView,Text,Switch, View, Button, StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native';
import DropDownItem from "react-native-drop-down-item";
import { max } from 'react-native-reanimated';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const BACON_IPSUM = 
'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CARA_INFO = '‣ Central Adoption Resource Authority(CARA) is a statutory body of Ministry of Women & Child Development, Government of India.\n\n‣ It functions as the nodal body for adoption of Indian children and is mandated to monitor and regulate in-country and inter-country adoption.\n\n‣ CARA is designated as the Central Authority to deal with inter-country adoption in accordance with the provision of Hague Convention on Inter-country Adoption, 1993, ratified by Government of India in 2003.\n\n‣ CARA primarily deals with the adoption of orphan, abandoned and surrendered children through its associated/recognised adoption agencies.'

const DOs = '‣ Only adopt from Specialised Adoption Agecies(SAAs) recognised by State Government.\n\n‣ Read the guidlines carefully on the website and follow the due procedure.\n\n‣ Follow the steps by completing the registrition.\n\n‣ Please upload document as per instruction.\n\n‣ Keep away from touts/middleman in adoption.They will mislead you to adopt a child illegally.\n\n‣ For adoption related charges please refer Schedule-13 of the Guildline Governing Adoption of Children. Always make playment by check or draft and collect your recept.\n\n‣ Through illegal adoption, you may unintentionally become part of child trafficking network. Safe yoursafe from legal ramification.'

const DONts = '‣ Do not approch any nursing home, hospital, maternity home, unathorised institution or individual for adoption.\n\n‣ Do not upload any incorrect document, else your registration will be cancelled.\n\n‣ Do not pay any additional charges other than what is prescribed in CARA Guidelines.'

const DoxReq  = '‣ Photograph of person/s adopting a child (Post Card Size).\nBirth Certificate.\n\n‣ Proof of Residence.\n\n‣ Proof of Income of last year.\n\nIn case you are married, please upload Marriage Certificate.\n\n‣ In case you are divorcee, please upload copy of Divorce Decree.\n\n‣ In case of death of your spouse, please upload Death Certificate of spouse.\n\n‣ Certificate from a medical practitioner certifying that the PAPs do not suffer from any chronic, contagious or fatal disease and they are fit to adopt.'

const CONTENT = [
    {
        title: 'Central Adoption Resource Authority',
        content: CARA_INFO,
    },
    {
        title: 'Dos',
        content: DOs,
    },
    {
        title: "Don'ts",
        content: DONts,
    },
    {
        title: 'Document Required',
        content: DoxReq,
    },
    
];


const SELECTORS = [
    {
        title: 'First',
        value: 0,
    },
    {
        title: 'Third',
        value: 2,
    },
    {
        title: 'None',
    },
];



class DetailsScreen extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };

    option1 = () =>{
        this.props.navigation.navigate('MainWebsite')
    };
    
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    
    setSections = (sections) => {
        this.setState({
          activeSections: sections.includes(undefined) ? [] : sections,
        });
    };
    
    renderHeader = (section, _, isActive) => {
        return (
          <Animatable.View
            duration={400}
            style={[styles.header, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor"
          >
            <Text style={styles.headerText}>{section.title}</Text>
          </Animatable.View>
        );
    };
    
    renderContent(section, _, isActive) {
        return (
          <Animatable.View
            duration={400}
            style={[styles.content, isActive ? styles.active : styles.inactive,
                {fontSize:13 , fontWeight: '200',marginLeft:9,marginRight:9}]}
            transition="backgroundColor"
          >
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
              {section.content}
            </Animatable.Text>
          </Animatable.View>
        );
    }
    
    render() {
        const { multipleSelect, activeSections } = this.state;
        
        return (
          <View style={styles.container}>
              <ScrollView>
            <ScrollView contentContainerStyle={{ paddingTop: 5 , flex: 1}}>
                <View>
                    <View style={{marginBottom:20}}>
                        <Text style={styles.title}>Legal Adoption Guidelines Of India</Text>
                    </View>

                    <View style={styles.multipleToggle}>
                        <Switch
                        value={multipleSelect}
                        onValueChange={(a) => this.setState({ multipleSelect: a })}
                        />
                    </View>
                    <View style={{padding:2}}>
                    <Image source={require('../assets/caralogo.png')} style={styles.ima1}/>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate("MainWebsite")}} style={styles.butto}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={{fontSize: 18,color:"#FF6347"}}>Government Site</Text>
                    </View>
                </TouchableOpacity></View>
                  
                
                    <View style={{marginTop:10,padding:5}}>
                        <Image source={{uri:"http://cdn.cdnparenting.com/articles/2018/07/1108919288-H-1024x700.jpg"}} style={styles.ima}/>
                    </View>
                    <View style={{padding:10,marginTop:5}}>
                        <Text style={{fontSize:28,fontWeight:'bold',fontStyle:'normal', marginLeft:8}}>Important Points:</Text>
                    </View>
                </View>
    
                {/* This is to select specific section like first secounf last */}
                
              {/* <View style={styles.selectors}>
                <Text style={styles.selectTitle}>Select:</Text>
    
                {SELECTORS.map((selector) => (
                  <TouchableOpacity
                    key={selector.title}
                    onPress={() => this.setSections([selector.value])}
                  >
                    <View style={styles.selector}>
                      <Text
                        style={
                          activeSections.includes(selector.value) &&
                          styles.activeSelector
                        }
                      >
                        {selector.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View> */}
    
              {/* <TouchableOpacity onPress={this.toggleExpanded}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Single Collapsible</Text>
                </View>
                </TouchableOpacity> */}
                <Collapsible collapsed={this.state.collapsed} align="center" >
                    <View style={styles.content}>
                        <Text>
                        Central Adoption Resource Authority(CARA) is a statutory body of Ministry of Women and Child Development, Government of India.It functions as the nodal body for adoption of Indian children and is mandated to monitor and regulate in-country and inter-country adoption. CARA is designated as the Central Authority to deal with inter-country adoption in accordance with the provision of Hague Convention on Inter-country Adoption, 1993, ratified by Government of India in 2003.\nCARA primarily deals with the adoption of orphan, abandoned and surrendered children through its associated/recognised adoption agencies.
                        </Text>
                    </View>
                </Collapsible>
                <Accordion
                    activeSections={activeSections}
                    sections={CONTENT}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={multipleSelect}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    duration={400}
                    onChange={this.setSections}
                    renderAsFlatList={false}
                />
                <View style={{padding:2}}>
                    <Image source={require('../assets/caraexplain.png')} style={styles.ima2}/>
                </View>

            </ScrollView>
            
                </ScrollView>

              
          </View>

        );
    }   
}
export default DetailsScreen ;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '300',
        marginBottom: 10,
        fontWeight:'bold'
    },

    menuItem: {
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 12,
        paddingHorizontal: 10
        
    },

    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },

    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        
    },

    content: {
        padding: 20,
        margin:10,
        backgroundColor: '#fff',
    },

    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },

    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },

    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    

    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },

    activeSelector: {
        fontWeight: 'bold',
    },

    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },

    multipleToggle: {
        flexDirection: 'row',
        marginVertical: 30,
        marginRight: 10 ,
        alignSelf: 'flex-end',
        marginTop: -38,
    },

    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
        
    },

    ima:{
        height:240,
        borderRadius:10,
        opacity: 1,
        marginBottom: 3,
        width:'100%',
        padding:5,
        marginTop:10
    },
    ima1:{
        height:70,
        borderRadius:10,
        marginBottom: 1,
        width:'100%',
        alignItems: 'center',
        
    },
    ima2:{
        height:230,
        borderRadius:10,
        marginBottom: 1,
        width:'100%',
        alignItems: 'center',
        
    },

    butto:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:120
        
    },
    
});