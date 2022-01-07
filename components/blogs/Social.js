import React, { Component } from "react";
import {AsyncStorage,FlatList,View,Alert,ActivityIndicator,RefreshControl, TouchableOpacity,Image,ImageBackground, Linking, Dimensions, Browser ,StyleSheet} from 'react-native';
import { Container, Header,Text, Content, Accordion ,Left,Button,Body,Title,Item,Textarea} from "native-base";
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Entertainment extends Component {
    constructor(props) {        
        super(props);
        this.state = {
          isLoading: true,            
          dataSourceLatestNews: [],
          serverData: [],
          fetching_from_server: false
        };
        this.timer = -1;
        this.page = 0;
       
      }
    
     
    componentDidMount() { 
      fetch('https://www.ujjawaltrivedi.com/api/pages/social.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // we will pass the input data  to servers
        
        })
    
      })
     .then((response) => response.json())
     .then((responseJson) => {
    //console.log(responseJson);
    // console.log(responseJson.items);
     this.setState({ 
          isLoading: false,     
          serverData:responseJson.Entertainment,
          
    }); 
      
    })
    .catch((error) =>{
      console.error(error);
    });
    }

    GetPosts(postid){
      //console.log('this is:', postid);
      //alert('ok');
      // Alert.alert(postid);
      this.props.navigation.navigate('S5',{postId:postid});
       }

    


  render() {

    const win = Dimensions.get('window');
    const ratio = (win.width)/1140; //1024 is actual image width
    const imagewidth = win.width;
    const imageheight = 1428 * ratio;

    const imageratio = (win.width)/640; //1024 is actual image width
    const Fimagewidth = win.width;
    const Fimageheight = 396 * imageratio;

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
          <Title style={styles.title}>Social</Title>
          </Body>
        </Header>
       
        <Content padder>
          
   

    <View>
    
    



<FlatList       
    refreshControl={
    <RefreshControl refreshing={this.state.refreshing} title="Loading..." progressBackgroundColor="#f1f1f1"  onRefresh={this._onRefresh} />
    }
    style={{ flex: 1 }}
    data={ this.state.serverData }
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem={({item}) => 
    <TouchableOpacity onPress={this.GetPosts.bind(this,item.id)}>     
    <View>
         <View>          
          <Text>{item.title.rendered}</Text>
          <Image source = {{ uri: item.featured_media_src_url}} style={{width:Fimagewidth, height: Fimageheight}} /> 
        </View>
        </View>
        </TouchableOpacity>
    }
    keyExtractor={(item, index) => index.toString()}/>


   

    
            
    </View>





        </Content>
        
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