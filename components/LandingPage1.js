import React, { Component } from 'react';
import { Image, Alert,Linking, ImageBackground,RefreshControl,ScrollView , View,Text,KeyboardAvoidingView , TextInput, TouchableHighlight, Dimensions, StyleSheet,TabHeading } from 'react-native';
import { Container, Content, Drawer, Header, Left, Item, Body, Right, Button,  Title,Tab, Tabs,Footer ,FooterTab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Tab1 from './LatestNews';
import Tab2 from './NewArrivals';
import Tab3 from './Interviews';

import SideBar from './Sidebar';
const backhroundimagesource = { uri: "https://varindia.com/varindiaapp/images/var-dashboard-bg.png" };

export default class TabsExample extends Component {
    constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      searchText:'',
      isLoading: true,
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
         this.props.navigation.navigate('S18',{searchval: this.state.searchText.trim()});
      }
    }

  render() {
    
    const win = Dimensions.get('window');
    const ratio = (win.width)/1024; //1024 is actual image width
    const imagewidth = win.width;
    const imageheight = 730 * ratio;

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
         <ImageBackground source={backhroundimagesource} style={{width:imagewidth, height:imageheight, backgroundColor: '#eeeeee', flex:1, justifyContent:'flex-end'}}>
     
        <Header hasTabs style={styles.header} androidStatusBarColor="#be1426">
          <Left style={{flex: 1}}>
            <Button transparent onPress={this.openDrawer}>
              <Icon name='bars' size={20} color="#fff" />           
            </Button>
            
          </Left>
          
          <Body style={{ flex: 6, paddingTop:7, paddingBottom:7, borderbotoom:0}}>
          
          <Item style={[styles.addressItem]}>
          <Image source = {{uri: "https://varindia.com/varindiaapp/images/varindia-logo-white.png" }} style={{width:80, height:16}} />
                   
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

        <Tabs locked={true} style={styles.tabs}>
        <Tab  style={styles.tabs} heading={<TabHeading style={{backgroundColor: '#be1426'}}><Text style={styles.tabText}>Latest News</Text></TabHeading>}>
     
            <Tab1 style={{flex:1}}   navigation={this.props.navigation} />
            <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>{this.updateContent()}}/>
                        }></Content>
                      
          </Tab>
          <Tab  style={styles.tabs} heading={<TabHeading style={{backgroundColor: '#be1426'}}><Text style={styles.tabText}>New Arrivals</Text></TabHeading>}>
               <Tab2 navigation={this.props.navigation} />
               <Content refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>{this.updateContent()}}/>
                        }></Content>
          </Tab>
          <Tab style={styles.tabs} heading={<TabHeading style={{backgroundColor: '#be1426'}}><Text style={styles.tabText} onPress={()=>{this.props.navigation.navigate('S7')}}>Face to Face</Text></TabHeading>}>
              <Tab3 />
          </Tab>         
        </Tabs>


        
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:"#f5f5f5"}}>
            <Button>
            <Icon name="home" size={20} color="#C51527" />
            </Button>            
            <Button  onPress={()=>{this.props.navigation.navigate('S10')}}>
            <Icon name="video" size={20} color="#000" />
            </Button>
            <Button  onPress={()=>{ Linking.openURL('https://varindia.com/varindiaapp/pdf/varindia.pdf')}}>
            <Icon name="file-pdf" size={20} color="#000" />
            </Button>
            <Button  onPress={()=>{this.props.navigation.navigate('S19')}}>
            <Icon name="cog" size={20} color="#000" />
            </Button>
          </FooterTab>
        </Footer>
        </ImageBackground>
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
  backgroundColor:  'transparent',
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
  borderBottomColor: "transparent"
},
searchInput:{
  backgroundColor: "#FFF",
  paddingLeft:15,  
  width:200,
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
}
})