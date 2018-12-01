import React , { Component } from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LogInForm from './components/LogInForm';

class App extends Component {
    state = {loggedIn: null};

    componentDidMount() {
        firebase.initializeApp({
                apiKey: "AIzaSyDZdjBWAPHSZLa8RdEb06I3LIXM6z1f-ps",
                authDomain: "auth-38d13.firebaseapp.com",
                databaseURL: "https://auth-38d13.firebaseio.com",
                projectId: "auth-38d13",
                storageBucket: "auth-38d13.appspot.com",
                messagingSenderId: "22141551183"
              });

              firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                this.setState({loggedIn: true});
                } else {
                this.setState({loggedIn: false});
                }
              });
            }

    renderContent() {

        switch (this.state.loggedIn){
            case true:
                return (
                <Button onPress={() => firebase.auth().signOut()}>
                    Logout
                 </Button>
                );
            case false:
                return <LogInForm />;
            default:
            return <Spinner size="large" />
        }

    }

render() {
    return(
        <View>
            <Header headerText="Authentication" />
            <View style={{height:50}}>
            {this.renderContent()}
            </View>
        </View>
    );
 }
}

export default App;