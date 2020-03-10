import React from "react";
import {Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import Theme from "../Constant/Theme";
import {NavigationActions, StackActions} from "react-navigation";

const resetAction = StackActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({ routeName: 'Dashboard' })
	],
});

class InscriptionScreen extends React.Component {
	static navigationOptions = {
		title: 'Inscription',
		headerStyle: {
			backgroundColor: Theme.theme.seagreen,
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
			textAlign:"center",
			flex:1
		},
	};

	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		error: false
	};
	handleFirstName = (text) => {
		this.setState({ firstName: text })
	};
	handleLastName = (text) => {
		this.setState({ lastName: text })
	};
	handleEmail = (text) => {
		console.log(text);
		this.setState({ email: text })
	};
	handlePassword = (text) => {
		this.setState({ password: text })
	};
	_storeData = async (value, id) => {
		try {
			global.User.token = value;
			global.User.id = id;
			var data = [['token', value], ['id', id]];
			await AsyncStorage.multiSet(data, () => {
				console.log('Stored');
			})
		} catch (error) {
			// Error saving data
		}
	};
	signup = () => {
		const user = {
			email: this.state.email,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};

		console.log(user);

		axios.post(`http://lucaspoirel.ovh:8080/auth/signin`, {
			password: user.password,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		})
			.then(res => {
				console.log(res.data.token)
				if (res.status == 201) {
					console.log("Je stocke")
					this._storeData(res.data.token, res.data.user.id);

					this.props.navigation.dispatch(resetAction);
				}
				else {
					this.setState({error: true})
				}
			})
			.catch((error) => {
				console.log(error.response);
			})
	};

	render() {
		return (
				<ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
										keyboardShouldPersistTaps='handled'
				>
					<View style = {{justifyContent: 'center', alignItems:'center'}}>
						<Image
							source={require('./../assets/images/logo.png')}
							style={{ width: 150, height: 150, justifyContent: 'center'}}
						/>
					</View>
					<TextInput style = {styles.input}
										 underlineColorAndroid = "transparent"
										 placeholder = "FirstName"
										 placeholderTextColor = '#2e8b57'
										 autoCapitalize = "none"
										 onChangeText = {this.handleFirstName}/>
					<TextInput style = {styles.input}
										 underlineColorAndroid = "transparent"
										 placeholder = "LastName"
										 placeholderTextColor ='#2e8b57'
										 autoCapitalize = "none"
										 onChangeText = {this.handleLastName}/>
					<TextInput style = {styles.input}
										 underlineColorAndroid = "transparent"
										 placeholder = "Email"
										 placeholderTextColor = '#2e8b57'
										 autoCapitalize = "none"
										 onChangeText = {this.handleEmail}/>

					<TextInput style = {styles.input}
										 underlineColorAndroid = "transparent"
										 placeholder = "Mot de passe"
										 placeholderTextColor = '#2e8b57'
										 autoCapitalize = "none"
										 secureTextEntry ={true}
										 onChangeText = {this.handlePassword}/>

					<TouchableOpacity
						style = {styles.submitButton}
						onPress = {
							() => this.signup()
						}>
						<Text style = {styles.submitButtonText}> S'inscrire </Text>
					</TouchableOpacity>
				</ScrollView>
		);
	}
}

export default InscriptionScreen

const styles = StyleSheet.create({
	input: {
		margin: 15,
		height: 40,
		borderColor: Theme.theme.seagreen,
		paddingStart: 10,
		borderWidth: 1
	},
	submitButton: {
		backgroundColor: Theme.theme.seagreen,
		padding: 10,
		margin: 15,
		height: 40,
	},
	submitButtonText:{
		textAlign: 'center',
		color: 'white'
	}
});