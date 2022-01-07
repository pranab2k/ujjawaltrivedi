import React, { Component } from 'react';
import { Image, Alert,FlatList, TouchableOpacity,RefreshControl,ActivityIndicator , View,Text,Modal , TextInput, TouchableHighlight, Dimensions, StyleSheet,TabHeading } from 'react-native';
import { Container, Content, Drawer, Header, Left, Item, Body, Right, Button,  Title,Tab, Tabs,Footer ,FooterTab} from 'native-base';
import { WebView } from "react-native-webview";

import Icon from 'react-native-vector-icons/FontAwesome5';
import HTML from "react-native-render-html";


export default class Podcastdatails extends Component {
  constructor(props) {        
    super(props);
    this.state = {
      isLoading: true,            
      dataSourceLatestNews: [],
      serverData: [],
      fetching_from_server: false,
      modalData:false,
      audiofile: '',  
    };
    this.timer = -1;
    this.page = 0;
   
  }
  componentDidMount() { 
    const postId = this.props.navigation.getParam('postId', '');
    fetch('https://www.ujjawaltrivedi.com/api/pages/podcastdetails.php?pageid='+postId,{
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

  //GetPosts(postid,posttitle,postduration,postaudio,postimage){
    GetAudio(postaudio){
    //console.log('this is:', postid);
   // console.log('this is Title:', posttitle);
    //console.log('this is Duration:', postduration);
    console.log('this is Audio URL:', postaudio);
    //console.log('this is Image:', postimage);
    //alert('ok');
    // Alert.alert(postid);
   // this.props.navigation.navigate('S5',{postId:postid});

   this.setState({ 
    modalData: true,
    audiofile: postaudio,  
  });



     }

  




  render() {

    
    const win = Dimensions.get('window');
    const ratio = (win.width)/320; //1024 is actual image width
    const imagewidth = win.width;
    const imageheight = 180 * ratio;

    
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
          <Title style={styles.title}>Podcast</Title>
          </Body>
        </Header>
  
    <Content padder>
  <View>
  
  <Modal visible={this.state.modalData} transparent={true}>
                    <View style={styles.profileCreateModal}>
                        
                        <View style={styles.profileCreateModalBlock} activeOpacity={.5}>
                        <TouchableOpacity activeOpacity={.5} style={{ alignItems: 'flex-end', marginTop:10, marginRight:10}} onPress={() => { this.setState({ modalData: false }) }}>
                           <Icon name="times" size={20} color="#000" />
                        </TouchableOpacity>
                            <View>
                                <Text style={{padding:20}}>{this.state.videotitle}</Text>
                                {this.state.hidesWhenStopped && 
                                <ActivityIndicator size="large" color="#00ff00" style={{flex:1, zIndex: 2}} />
                                }
                                <View style={{  height:imageheight, width:imagewidth}} >
                                 
                             
                               <Text> <audio style="width: 100%;" controls><source src=""  type="audio/mpeg">Your browser does not support the audio element.</source></audio>

                               </Text>
                               
           </View>
          

                            </View>
                        </View>
                    </View>
                </Modal>





  <FlatList       
    refreshControl={
    <RefreshControl refreshing={this.state.refreshing} title="Loading..." progressBackgroundColor="#f1f1f1"  onRefresh={this._onRefresh} />
    }
    style={{ flex: 1 }}
    data={ this.state.serverData }
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem={({item}) => 
    <View>
         <View>    
         <Image source = {{ uri: item.featured_media_src_url}} style={{width:Fimagewidth, height: Fimageheight}} />       
        
          <Text >{item.title.rendered}</Text>
         
          <HTML source={{html: item.content.rendered}}/>   
          
        <View>
   


        <WebView
      style={{ height:60}}
      originWhitelist={['*']}
      //source={{ html: '<audio style="width: 100%;" controls><source src="'++'"  type="audio/mpeg">Your browser does not support the audio element.</source></audio>' }}
      source={{html: '<audio style="width: 100%;" controls><source src='+item.jnews_podcast_option.upload+' type="audio/mpeg"></audio>'}}
    
    />
        
          </View>  
        
        </View>
        </View>
        
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
},
textView:{
backgroundColor:'#FFF',
textAlign: "center",
padding:10,
marginBottom:10,
paddingVertical: 8, 
borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 6,
}
})