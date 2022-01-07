import React, { Component } from "react";
import {AsyncStorage,View,Alert,ActivityIndicator, Image,ImageBackground, Linking, Dimensions, Browser ,StyleSheet} from 'react-native';
import { Container, Header,Text, Content, Accordion ,Left,Button,Body,Title,Item,Textarea} from "native-base";
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class ContactMe extends Component {
    constructor(props) {        
        super(props);
        this.state = {
          isLoading: false,  
          userFirstName:'',
          userLastName:'',
          userEmail:'',
          userMobileNo:'',
          userSubject:'',
          userYourMessage:'',
        };
       
      }
    
      _onPressButton = () => {     
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   

        if(this.state.userFirstName.trim()==""){
          Alert.alert('Please Enter First Name');
        }else if(this.state.userLastName.trim()==""){
            Alert.alert('Please Enter Last Name');
        }else if(reg.test(this.state.userEmail) === true){
            Alert.alert('Please Enter Valid Email');
        }else if(this.state.userMobileNo.trim()==""){
            Alert.alert('Please Enter Mobile No');
        }else if(this.state.userSubject.trim()==""){
            Alert.alert('Please Enter Subject');
        }else if(this.state.userYourMessage.trim()==""){
            Alert.alert('Please Enter Your Message');
        }else{
            alert('ok');
        }    
    }
       
  render() {

    const win = Dimensions.get('window');
    const ratio = (win.width)/1140; //1024 is actual image width
    const imagewidth = win.width;
    const imageheight = 1428 * ratio;
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator size='large' />
          </View>
        );
      }else{    

    return (
        <Container>
        <Header style={styles.header} androidStatusBarColor="#be1426">
        <Left>
        <Button transparent onPress={() => this.props.navigation.goBack()}>        
        <Icon name="angle-left" size={30} color="#000000" />
            </Button>
          </Left>
          <Body>
          <Title style={styles.title}>Contact Me</Title>
          </Body>
        </Header>
        <ImageBackground source={require("../assets/image/Ujjawal.jpg")}   style={{width:imagewidth, height:imageheight, backgroundColor: '#eeeeee', flex:1, justifyContent:'flex-end'}}>
    
        <Content padder>
          
   

    <View>
    
    <View>
            <Item inlineLabel>            
              <TextInput required={true} style={styles.inputStyle}  placeholder='First Name'  onChangeText={userFirstName=>this.setState({userFirstName})} value={this.state.userFirstName}  />
            </Item>
            <Item inlineLabel>            
              <TextInput required={true} style={styles.inputStyle}   placeholder='Last Name'  onChangeText={userLastName=>this.setState({userLastName})} value={this.state.userLastName} />
            </Item>
            <Item inlineLabel>            
              <TextInput required={true} style={styles.inputStyle}  placeholder='Email'  onChangeText={userEmail=>this.setState({userEmail})} value={this.state.userEmail}  />
            </Item>
            <Item inlineLabel>            
              <TextInput required={true} style={styles.inputStyle}   placeholder='Mobile No.'  onChangeText={userMobileNo=>this.setState({userMobileNo})} value={this.state.userMobileNo}  />
            </Item>
            <Item inlineLabel>            
              <TextInput required={true} style={styles.inputStyle}  placeholder='Subject'  onChangeText={userSubject=>this.setState({userSubject})} value={this.state.userSubject}  />
            </Item>
            <Item inlineLabel>            
              <Textarea rowSpan={3} required={true} style={styles.inputStyle}   placeholder='Your Message'  onChangeText={userYourMessage=>this.setState({userYourMessage})} value={this.state.userYourMessage}  />
            </Item>


            <Button rounded onPress={this._onPressButton} style={styles.nextButton}>
              <Text>Submit</Text>
            </Button> 
            </View> 
            
    </View>





        </Content>
        </ImageBackground>
      </Container>
    );
  }
}
}

const styles = StyleSheet.create({
  legalButton: {
  flex: 1,
  alignItems: "center",
  width: 350,
  alignSelf: 'center',
  marginTop:20,
 // marginBottom:20
},
nextButton: {
flex: 1,
backgroundColor: "#be1426",
alignItems: "center",
width:250,
alignSelf: 'center',
marginTop:20,
marginLeft: 20,
height: 56,
fontSize: 16,
textTransform: "capitalize"
},
header:{
  backgroundColor:  'transparent',
},
content:{
  backgroundColor:'#e5e5e5'
},
title:{
  color:'#000'
},
inputStyle:{
    color:'#000'
},
newsCover:{
  flex:1, 
  flexDirection: 'row', 
  backgroundColor:'#FFF', 
  marginLeft:10, 
  marginTop:10, 
  marginRight:10, 
  borderRadius : 10
  },
  
  imageView: { 
      width: '30%',
      height: 80 ,
      margin: 7,
      borderRadius : 7,
      backgroundColor: 'transparent'
  }, 
  textView: { 
      width:'65%', 
      padding:10,
  },
  textTitleView: { 
    fontSize: 14
  },
textTitleView: {   
fontFamily: 'Proxima Nova Regular', 
color:'#333333'    
},
textByView: {   
fontFamily: 'Proxima Nova Regular', 
color:'#a5a5a5'    
},
container:
{
 
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: ( Platform.OS === 'ios' )? 20 : 0
},

item:
{
  padding: 10
},

separator:
{
  
},

text:
{
  fontSize: 20,
  color: 'black'
},

footer:
{
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  borderTopWidth: 1.5,
  borderTopColor: 'black'
},

loadMoreBtn:
{
  padding: 10,
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: 4,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},

btnText:
{
  color: 'white',
  fontSize: 15,
  textAlign: 'center'
}
})