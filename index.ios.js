/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ActivityIndicator,
  ToolbarAndroid
} from 'react-native';
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

export default class login extends Component {
 constructor(props){
     super(props);
     // We have the same props as in our signup.js file and they serve the same purposes.
     this.state = {
       loading: false,
       username: '',
       password: ''
     }
   }

   render() {
     // The content of the screen should be inputs for a username, password and submit button.
     // If we are loading then we display an ActivityIndicator.
     const content = this.state.loading ?
     <View style={styles.body}>
     <ActivityIndicator size="large"/>
     </View> :

     <Content>
                    <List>
                      <ListItem>
                          <InputGroup>
                          <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                          <Input
                           onChangeText={(text) => this.setState({username: text})}
                           value={this.state.username}
                           placeholder={"Username"} />
                           </InputGroup>
                     </ListItem>
                     <ListItem>
                         <InputGroup>
                           <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                         <Input
                           onChangeText={(text) => this.setState({password: text})}
                           value={this.state.password}
                           secureTextEntry={true}
                           placeholder={"Password"} />
                         </InputGroup>
                    </ListItem>
                   </List>
                   <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
                     <Text>Login</Text>
                   </Button>
           </Content>
         ;

     // A simple UI with a toolbar, and content below it.
         return (
                   <Container>
                             <Header>
                               <Title>Login</Title>
                            </Header>

                   {content}
                 </Container>
                 );
   }

   login(){
     this.setState({
       loading: true
     });

     fetch('https://activexbacks.com/api/user/token', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          'user': this.state.username,
          'pass': this.state.password
       })
     }).then( (userToken) => {
            fetch('https://activexbacks.com/api/user/login', {
                   method: 'POST',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                     'name': this.state.username,
                     'pass': this.state.password,
                     'token': JSON.parse(userToken._bodyText).token
                   })
                 }).then( (userData) => {
                    if(userData.status === 200){
                        alert(JSON.stringify(userData));
                    }
                    else{
                         alert('Login Failed. Please try again');
                    }
                        this.setState({
                               loading: false
                             });
                    }
                 ).catch((error) =>
                     {
                           this.setState({
                             loading: false
                           });
                     alert('Login Failed. Please try again'+error);
                 });
        }
        ).catch((error) =>
          {
             alert('User authentication failed for reason: '+error);
        });
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('toke', () => login);
