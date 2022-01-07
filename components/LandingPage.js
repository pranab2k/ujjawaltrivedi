import React, { Component } from 'react';
import { Image, Alert,FlatList, TouchableOpacity,RefreshControl,ActivityIndicator , View,Text,Modal , TextInput, TouchableHighlight, Dimensions, StyleSheet,TabHeading } from 'react-native';
import { Container, Content, Drawer, Header, Left, Item, Body, Right, Button,  Title,Tab, Tabs,Footer ,FooterTab} from 'native-base';
import { WebView } from "react-native-webview";
import Icon from 'react-native-vector-icons/FontAwesome5';

import SideBar from './Sidebar';

export default class TabsExample extends Component {
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
    updateContent() {
       this.setState({refreshing:true});
      setTimeout(()=>{
      this.setState({refreshing:false});
     },2000);
    }
     
    closeDrawer = () => {
        this._drawer._root.close()
    };
    openDrawer = () => {           
        this._drawer._root.open();          
    };
    
    seacthDataSubmit = () => {
      if(this.state.searchText.trim()==""){
        Alert.alert("Please Enter Search Data");
      }else{
        // alert('pppp');
         this.props.navigation.navigate('S12',{searchval: this.state.searchText.trim()});
      }
    }

    componentDidMount() { 
      fetch('https://www.ujjawaltrivedi.com/api/pages/homepage.php',{
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


        fetch('https://www.ujjawaltrivedi.com/api/pages/homepage.php?pageToken='+this.state.NextPage,{
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
          <View style={{ flex: 1, paddingTop: 20, justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#00ff00" />
          </View>
      );
    } else {
    return (
      <Drawer ref={(ref) => { this._drawer = ref; }} content={<SideBar navigation={this.props.navigation} closeDrawer={this.closeDrawer.bind(this)} />} onClose={this.closeDrawer}>
      <Container style={styles.container} >
        
     
        <Header hasTabs style={styles.header} androidStatusBarColor="#be1426">
          <Left style={{flex: 1}}>
            <Button transparent onPress={this.openDrawer}>
              <Icon name='bars' size={20} color="#fff" />           
            </Button>
            
          </Left>
          
          <Body style={{ flex: 6, paddingTop:7, paddingBottom:7, borderbotoom:0}}>
          
          <Item style={[styles.addressItem]}>
          <Image source = {require("../assets/image/logo5.png")} style={{width:100, height:30}} />
                   
                   <Item style={styles.searchInput}>      
                   <Icon active name='search' />
          <TextInput  placeholder='Search'      
          onChangeText={(searchText) => this.setState({searchText})}          
          returnKeyType='Search'
          autoFocus={false} 
          value={this.searchText}
          onSubmitEditing={this.seacthDataSubmit}          
          />
          </Item>
          </Item>
          </Body>
           
            <Right>
         </Right>         
        </Header>
        <Content>

       
        

       


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
        <Footer>
          <FooterTab style={{backgroundColor:"#f5f5f5"}}>
            <Button>
            <Icon name="home" size={20} color="#C51527" />
            </Button>            
            <Button  onPress={()=>{this.props.navigation.navigate('S10')}}>
            <Icon name="video" size={20} color="#000" />
            </Button>
            <Button  onPress={()=>{this.props.navigation.navigate('S10')}}>
            <Icon name="file-pdf" size={20} color="#000" />
            </Button>
            <Button  onPress={()=>{this.props.navigation.navigate('S19')}}>
            <Icon name="cog" size={20} color="#000" />
            </Button>
          </FooterTab>
        </Footer>
        
      </Container>
      </Drawer>
    );
  }
}
}



const styles = StyleSheet.create({
  container: {
     backgroundColor: 'transparent',  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
},
header:{
  backgroundColor:  '#be1426',
},
tabs:{
  backgroundColor:  'transparent', flex:1, shadowColor: 'transparent'
},
tabText:{
 color:'#FFF', fontSize: 16
},
tabcontrol:{
  backgroundColor:  'transparent',  fontSize:10, 
},
backhroundimage: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
addressItem: {
   //backgroundColor: "#FFF",
 // paddingLeft:15,  
  //borderRadius: 30  
    borderBottomColor: "#be1426"
},
searchInput:{
  backgroundColor: "#FFF",
  paddingLeft:15,  
  width:180,
  borderRadius: 24, 
  marginLeft:20
},
tabStyle:{
  backgroundColor: "transparent",  
},
activeTabStyle:{
  backgroundColor: "transparent"
},
bottomView: {
  width: '100%',
  height: 50,
  backgroundColor: '#EE5407',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute', //Here is the trick
  bottom: 0, //Here is the trick
},  profileCreateModal: {
  flex: 1,
  backgroundColor: "transparent"
},
profileCreateModalBlock: {
  backgroundColor: "#FFF",
  marginTop: 60,
  marginLeft: 0,
  marginRight: 0,
  borderRadius: 5,
  paddingBottom:20
},
WebViewContainer:{
  height:400
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