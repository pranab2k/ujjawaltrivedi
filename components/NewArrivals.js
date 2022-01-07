import React, { Component } from 'react';
import { Image,FlatList,Alert, Linking, View,TouchableOpacity,ScrollView , RefreshControl, TouchableHighlight, Dimensions, StyleSheet ,AsyncStorage, ActivityIndicator} from 'react-native';
import { Container, Content, Text , Button} from 'native-base';
import Carousel from 'react-native-snap-carousel';
//const Entities = require('html-entities').XmlEntities; 
const Entities = require('html-entities').XmlEntities; 
//const entities = new Entities();

export default class NewArrivals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, 
      refreshing: false,   
      position: 1,
      interval: null,
      arrowRight:false,
      dataSource: [],
      dataSourceLatestNews: [],
      activeIndex:0, 
    };
  }

  _renderItem({item,index}){
    return (
      <View style={{
          backgroundColor:'floralwhite',
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25, }}>
        <Text style={{fontSize: 30}}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>

    )
}


LastestNewsCall= () =>{
 
  return fetch('https://varindia.com/varindiaapp/api/newarrivals.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,              
             dataSourceLatestNews: responseJson.lattestnews,   
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
 
 }



   componentDidMount() {
    this.LastestNewsCall();
   }

   onRefresh() {
     alert('pp');
    //Clear old data of the list
    //this.setState({ dataSourceLatestNews: [] });
    //Call the Service to get the latest data
    //this.LastestNewsCall();
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

        const win = Dimensions.get('window');
        const ratio = (win.width)/500; //640 is actual image width
        const imagewidth = win.width-20;
        const imageheight = 300 * ratio;

        const bratio = (win.width)/700; //640 is actual image width
        const bimagewidth = win.width-20;
        const bimageheight = 100 * bratio;

        const bgratio = ((win.width)/950); //640 is actual image width
        const bgimagewidth = win.width-110;
        const bgimageheight = 100 * bgratio;


    return (
      <Content style={{flex:1}}>
        <View>   
        
 
 

<View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', padding:10 }}>
                <Carousel
                  layout={"default"}
                  autoplay={true}
                  autoplayDelay={1000}
                  loop={true}
                  ref={ref => this.carousel = ref}
                  data={this.state.dataSource}
                  sliderWidth={imageheight}
                  itemWidth={imagewidth}
                  //renderItem={this._renderItem}

                  renderItem={({item}) => 
                  <View>

          <TouchableOpacity onPress={this.GetNews.bind(this,item.nid)}>
                    
          <Image source = {{ uri: item.url }}  style={{width:imagewidth, height:imageheight, borderRadius:7, position:'relative'}} />
                    
                      
                      <Text style={styles.topSliderText}>
                        {item.title}</Text>
                      </TouchableOpacity>
                  </View>
              
                }


                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>



            
        
        
<View>





<FlatList       
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} title="Loading..." progressBackgroundColor="#ffff00"  onRefresh={this._onRefresh} />
          }

          style={{ flex: 1 }}
        data={ this.state.dataSourceLatestNews }
        
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        
      
        renderItem={({item}) => 
        <TouchableOpacity  onPress={this.GetNews.bind(this,item.nid)}>             
        <View style={styles.newsCover}>                 
          <Image source = {{ uri: item.imageurl }} style={styles.imageView} onPress={this.GetNews.bind(this,item.nid)} />            
          <View style={styles.textView}>
            <Text style={styles.textTitleView}  >{item.title}</Text>  
          </View>               
        </View>  
      </TouchableOpacity>     
          } 
        keyExtractor={(item, index) => index.toString()}
        
        />




</View>



</View>


</Content>   
        
    );
  }
}
}
const styles = StyleSheet.create({
  container: {
     backgroundColor: 'transparent'
  
},

 titleText:{
  color:"#000", 
  fontSize:22,
  marginLeft:10, 
  marginTop:13, 
  marginBottom:12,
  fontFamily: 'Oswald'
 },
 titleTextTopMore:{
  color:"#fff",
 fontSize:12, 
 right:10,  
 marginTop: 8,
 alignSelf: 'flex-end',
 flex:1,
  position:'absolute',
  backgroundColor: '#C51527',
  paddingTop: 5,
  paddingBottom: 5,
  paddingRight: 10,
  paddingLeft: 10,
  borderRadius: 4
},
titleTextTop:{
  color:"#FFF", fontSize:24, marginLeft:10, marginTop:16, marginBottom:8, fontFamily: 'Oswald'
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

textByView: { 
  fontSize: 11,
  color: '#aaaaaa'
},
topSliderText: {
  position:'absolute', 
  color: '#444444',
  fontSize: 16,
  bottom:0,
  left:0, 
  width: '100%', 
  padding:12, 
  flex:1, 
  fontWeight:'bold',
  backgroundColor: '#fff',
  height: 66,
  borderBottomRightRadius: 7,
  borderBottomLeftRadius: 7

}
})