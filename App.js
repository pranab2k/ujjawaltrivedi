import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LandingPage from './components/LandingPage';
import ContactMe from './components/ContactMe';
import Entertainment from './components/blogs/Entertainment';
import Social from './components/blogs/Social';
import BlogPost from './components/Posts';

import Vlogs from './components/utreels/Vlogs';
import KhamoshKhayal from './components/utreels/KhamoshKhayal';
import Lifestyle from './components/utreels/Lifestyle';

import Astrology from './components/mylifemantra/Astrology';
import Motivational from './components/mylifemantra/Motivational';
import Podcast from './components/Podcast';
import Search from './components/Search';
import Podcastdatails from './components/Podcastdatails';
const App=createStackNavigator(
  {
    //S1: {screen:S1},
   // S2: {screen:S2},
   
   S1: {screen:LandingPage},
   S2: {screen:ContactMe},
   S3: {screen:Entertainment},
   S4: {screen:Podcast},
   S5: {screen:BlogPost},
   S6: {screen:Social},
   S7: {screen:Vlogs},
   S8: {screen:KhamoshKhayal},
   S9: {screen:Lifestyle},
   S10: {screen:Astrology},
   S11: {screen:Motivational},
   S12: {screen:Search},
   S13: {screen:Podcastdatails},
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(App);