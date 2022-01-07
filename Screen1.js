
import React,{Component} from 'react';
import {View,Text,Button} from 'react-native';

export default class Screen1 extends Component{
    show=()=>{
       // alert('pranab');
       this.props.navigation.navigate('S2');
    }

    render(){
        return(
            <View>
                <Text>Screen1</Text>
                <Button title="Go" onPress={()=>this.props.navigation.navigate('S2')}></Button>
            </View>
        )
    }  
}