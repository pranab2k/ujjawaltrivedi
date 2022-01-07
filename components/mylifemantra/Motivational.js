import React, { Component } from 'react';
import { Image, Alert,FlatList, TouchableOpacity,RefreshControl,ActivityIndicator , View,Text,Modal , TextInput, TouchableHighlight, Dimensions, StyleSheet,TabHeading } from 'react-native';
import { Container, Content, Drawer, Header, Left, Item, Body, Right, Button,  Title,Tab, Tabs,Footer ,FooterTab} from 'native-base';
import { WebView } from "react-native-webview";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Motivational extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      searchText:'',
      NextPage:'',
      isLoading: true,  
      serverData:[],
      modalData: false,
      videotitle:'',
      videofile:'',
      hidesWhenStopped:false,
      fetching_from_server: false
    };
    }
    componentDidMount() { 
      fetch('https://www.ujjawaltrivedi.com/api/pages/homepage.php?cID=UCie62Zh1TP_jrinrFt0fZOA',{
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
    // this.setState({ 
         // isLoading: false,     
         // DataList:responseJson.items,
         // NextPage:responseJson.nextPageToken,
         //nextPageToken=responseJson.nextPageToken,
   // }); 
      
   this.setState({ serverData: [ ...this.state.serverData,...responseJson.items],  NextPage:responseJson.nextPageToken, isLoading: false });

    })
    .catch((error) =>{
      console.error(error);
    });
    }


    Getvideo(vid,title){
     
        


      this.setState({ 
        modalData: true,
        videotitle: title,
        videofile:vid,
        hidesWhenStopped:true
      });
      setTimeout(() => {this.setState({hidesWhenStopped: false})}, 3000);
      // Alert.alert(vid);
        // this.props.navigation.push('Adminleavedetails',{leaveid:lid});
       }

       ActivityIndicatorLoadingView() {
        return (
          <ActivityIndicator
             color="#009688"
             size="large"
             style={styles.ActivityIndicatorStyle}
          /> 
        );
     }
     loadMoreData = () =>  { 
        //alert("Ok");
      //  alert(this.state.NextPage);


        fetch('https://www.ujjawaltrivedi.com/api/pages/homepage.php?cID=UCie62Zh1TP_jrinrFt0fZOA&pageToken='+this.state.NextPage,{
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
      
      this.setState({ serverData: [ ...this.state.serverData,...responseJson.items],NextPage:responseJson.nextPageToken, fetching_from_server: false }); 
      })
      .catch((error) =>{
        console.error(error);
      });

     }
     renderFooter() {
      return (
          <View style = { styles.footer }>
              <TouchableOpacity activeOpacity = { 0.9 } onPress = { this.loadMoreData } style = { styles.loadMoreBtn }>
                  <Text style = { styles.btnText }>Load More</Text>
                  {
                      ( this.state.fetching_from_server )
                      ?
                          <ActivityIndicator color = "white" style = {{ marginLeft: 8 }} />
                      :
                          null
                  }
              </TouchableOpacity>                    
          </View>
      )
    }
 




  render() {


    const win = Dimensions.get('window');
    const ratio = (win.width)/320; //1024 is actual image width
    const imagewidth = win.width;
    const imageheight = 180 * ratio;

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
          <Title style={styles.title}>Motivational</Title>
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
                                 
                             
                                  <WebView
               javaScriptEnabled={true}
               domStorageEnabled={true}   
               style={{width:'100%',zIndex: 1}}  
               mediaPlaybackRequiresUserAction={true} // true or false seems to have no change           
               source={{uri: 'https://www.youtube.com/embed/'+this.state.videofile}}
            />
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
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop:5}}>
         <View style={{ flex: 1, alignSelf: 'stretch', alignItems:'center' }} >
          <TouchableOpacity  onPress={this.Getvideo.bind(this,item.videoId,item.title)}> 
          <Image source = {{uri: item.thumbnails.medium.url}} style={{width:imagewidth, height:imageheight}} />
        </TouchableOpacity>
        </View>
        </View>
    }
    keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent = {() => <View style = { styles.separator } /> }
        ListFooterComponent = { this.renderFooter.bind( this ) }    
    />

   

    
            
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