import React, {Component} from 'react';
import {Text} from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LogInForm extends Component {
    state = {
        email: '',
        pass: '',
        error: '',
        loading: false
    };


    onButtonPress(){
        const {email, pass} = this.state;
        this.setState({error: '', loading: true})
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=> {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
            this.setState({ error: 'Authentication Failed', loading: false });
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            pass: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner size='small' />
        } 
        
        return (
        <Button onPress={this.onButtonPress.bind(this)}>
        LogIn
        </Button>
        );
    }

render() {
    return (
        <Card>
            <CardSection>
            <Input
            label={'Email'}
            placeholders={'user@domain.com'}
            values={this.state.email}
            onChangeTexts={email => this.setState({email})} 
             />
            </CardSection>
           
            <CardSection>
                <Input
                    secureTextEntry
                    label={'Password'}
                    placeholders={'password'}
                    values={this.state.pass}
                    onChangeTexts={pass => this.setState({ pass })}
                />
            </CardSection>

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>

            <CardSection>
               {this.renderButton()}
            </CardSection>
        </Card>
    );
}
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'

    }
}

export default LogInForm;