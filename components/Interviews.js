
import React, { Component } from "react";
import {View,Alert,FlatList,RefreshControl, TouchableOpacity,Platform, ActivityIndicator, Image, Linking, Dimensions, Browser ,StyleSheet} from 'react-native';
import { Container, Header,Text, Content, Accordion ,Left,Button,Body,Title} from "native-base";
//const Entities = require('html-entities').XmlEntities; 
//const entities = new Entities();
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Interviews extends Component {
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
            this.page = this.page + 1;
            fetch('https://varindia.com/varindiaapp/api/newslisting.php/?results=20&cat=639&posttype=news&page=' + this.page)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ serverData: [ ...this.state.serverData,...responseJson.newslist], isLoading: false });
            })
            .catch((error) => {
             //console.error(error);
             if (error.message === 'Timeout' || error.message === 'Network request failed') {
              Alert.alert("Network request failed");
            // retry
          } else {
            throw error; // rethrow other unexpected errors
          }
            });
        }

    
        loadMoreData = () =>  {        
            this.page = this.page + 1;      
            this.setState({ fetching_from_server: true }, () => {
                clearTimeout(this.timer);      
                this.timer = -1;      
                this.timer = setTimeout(() => {
                    fetch('https://varindia.com/varindiaapp/api/newslisting.php/?results=20&cat=639&posttype=news&page=' + this.page)
                    .then((response) => response.json())
                    .then((responseJson) =>
                    {
                      this.setState({ serverData: [ ...this.state.serverData,...responseJson.newslist], fetching_from_server: false });
                       // this.setState({ serverData: [ ...this.state.serverData, ...responseJson.results ], fetching_from_server: false });
                    })
                    .catch((error) =>
                    {
                        //console.error(error);
                        if (error.message === 'Timeout' || error.message === 'Network request failed') {
                          Alert.alert("Network request failed");
                        // retry
                      } else {
                        throw error; // rethrow other unexpected errors
                      }
                    });
                }, 1500);   
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
     
      GetNews(news_id){
      
       // Alert.alert(news_id);
        this.props.navigation.navigate('S9',{newsId:news_id});
        }


  render() {
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator size='large' />
          </View>
        );
      }else{    

    return (
      
        <Content style={styles.content}>  
       
       
        <View style = { styles.container }>
        <Text style={styles.titleTextTop}>Face to Face</Text> 
      {
        ( this.state.loading )
        ?
          ( <ActivityIndicator size = "large" /> )
        :
          (
              <FlatList
                style = {{ width: '100%' }}
                keyExtractor = {( item, index ) => index }
                data = { this.state.serverData }
                renderItem = {({ item, index }) => 
                <TouchableOpacity  onPress={this.GetNews.bind(this,item.nid)}>             
                    <View style={styles.newsCover}>                 
                      <Image source = {{ uri: item.imageurl }} style={styles.imageView} onPress={this.GetNews.bind(this,item.nid)} />            
                      <View style={styles.textView}>
                        <Text style={styles.textTitleView}  >{item.title}</Text>  
                      </View>               
                    </View>  
                  </TouchableOpacity>

                }
                ItemSeparatorComponent = {() => <View style = { styles.separator } /> }
                ListFooterComponent = { this.renderFooter.bind( this ) }
              />
          )
      }                
      </View>




        </Content>
      
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
header:{
  backgroundColor:  'transparent',
},
content:{
  backgroundColor:'#e5e5e5'
},
title:{
  color:'#000'
},
newsCover:{
flex:1, flexDirection: 'row', backgroundColor:'#FFF', marginLeft:10, marginTop:10, marginRight:10, borderRadius : 10
},
imageView: {
 
    width: '30%',
    height: 100 ,
    margin: 7,
    borderRadius : 7 ,
 
},
titleTextTop:{
  color:"#000", fontSize:15, marginLeft:10, fontWeight: "bold", marginTop:10
},
textView: { 
  width:'70%', 
  padding:10, textAlign: 'justify'
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
  flex: 1,
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