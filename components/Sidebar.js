import React, { Component } from 'react';
import {View, AsyncStorage,ActivityIndicator, Image, Linking, TouchableOpacity, Dimensions, Browser, StyleSheet,createAppContainer, createSwitchNavigator } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text,  Left, Body, Right, Switch } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Sidebar extends Component{
  constructor(props) {
    super(props)
    this.state = {};   
}

  render() {
     // const {navigate} = this.props.navigation;     
      // 
      
    return (
      <Container>        
        <Content style={{backgroundColor:"#ececec"}}>  
       
          <ListItem icon onPress={()=>this.props.closeDrawer()} style={{backgroundColor:"#FFF", marginLeft:0}} >
            <Left>
              <Icon name="home-outline" size={20} color="#000" style={{paddingLeft:20}} />                 
            </Left>
            <Body>
              <Text >Home</Text>
            </Body>  
            <Icon name="chevron-right" size={20} color="#000" style={{paddingRight:20}} />            
          </ListItem>
          <ListItem icon> 
          <Left>
          <Icon name="blogger" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text>Blogs</Text>
            </Body>            
          </ListItem>
          
          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S3')}>Entertainment</Text>
            </Body>            
          </ListItem>
          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S6')}>Social</Text>
            </Body>            
          </ListItem>




          <ListItem icon> 
          <Left>
          <Icon name="video-box" size={20} color="#000"  /> 
        </Left>            
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S15')}>UT Reels</Text>
            </Body>            
          </ListItem>

          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S7')}>Vlogs</Text>
            </Body>            
          </ListItem>
          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S8')}>Khamosh Khayal</Text>
            </Body>            
          </ListItem>
          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S9')}>Lifestyle</Text>
            </Body>            
          </ListItem>

          <ListItem icon> 
          <Left>
          <Icon name="yoga" size={20} color="#000"  /> 
        </Left>            
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S13')}>My Life Mantra</Text>
            </Body>            
          </ListItem>

          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S10')}>Astrology</Text>
            </Body>            
          </ListItem>
          <ListItem icon> 
          <Left>
          <Icon name="chevron-triple-right" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S11')}>Motivational</Text>
            </Body>            
          </ListItem>
          <ListItem icon> 
          <Left>
          <Icon name="access-point" size={20} color="#000"  /> 
        </Left>            
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S4')}>Podcast</Text>
            </Body>            
          </ListItem>
                  
          <ListItem icon>  
          <Left>
          <Icon name="contacts" size={20} color="#000"  /> 
        </Left>           
            <Body>
              <Text onPress={() => this.props.navigation.navigate('S2')}>Contact Me</Text>
            </Body>            
          </ListItem> 
         
        </Content>
      </Container>
    );
  }
}