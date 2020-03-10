import React from "react";
import {Image, Dimensions, Keyboard, TextInput, Text, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';
import Layout from '../Constant/Layout'
import Theme from "../Constant/Theme";
import OAuthManager from 'react-native-oauth';
import {expectNoConsoleWarn} from "react-native/Libraries/Utilities/ReactNativeTestTools";

const resetAction = StackActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({ routeName: 'Dashboard' })
	],
});

const manager = new OAuthManager('areaAndroid')
manager.configure({
	github: {
		client_id: 'Iv1.ab9857810b96e777',
		client_secret: '12ef41b0bedd847e9f03e015c53b5fa7ff6d11df'
	}
});

class ConnectScreen extends React.Component {
	static navigationOptions = {
		title: 'Connexion',
		headerStyle: {
			backgroundColor: Theme.theme.seagreen,
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
			textAlign:'center',
			flex:1
		},
	};

	state = {
		email: '',
		password: '',
		error: false,
	};

	componentDidMount() {
	}

	handleEmail = (text) => {
		this.setState({ email: text })
	};
	handlePassword = (text) => {
		this.setState({ password: text })
	};
	_storeToken = async (token, userid) => {
		console.log("token : " + token);
		console.log("id : " + userid);
		const value = [['token', token], ['id', userid]];
	};


	callbackGithub = (token) => {
		console.log("THIS IS MY CALLBACK FUNCTION");
		const config = {
			headers: { Authorization:`token ${token}`}
		}
		axios.get(`https://api.github.com/user`, config)
			.then(res => {
				let login = res.data.login + "@area.com"
				axios.post(`http://lucaspoirel.ovh:8080/auth/postEmail`, {
					email: login,
					client_id: "Iv1.ab9857810b96e777"
				})
					.then(resp => {
						console.log(resp);
						global.User.token = resp.data.token;
						global.User.id = resp.data.user.id;
						this.props.navigation.dispatch(resetAction)
					})
					.catch(err => {
						console.log(err)
					})
			})
};

	loginWithGithub = () => {
		manager.authorize('github')
			.then(resp => {
				global.User.githubToken = resp.response.credentials.accessToken;
				this.callbackGithub(resp.response.credentials.accessToken);
			})
			.catch(err => {
				global.User.githubToken = undefined;
				console.log(err)
			});
	};

	loginWithOffice = () => {
		console.log("Log in With Office")
	};

	login = async () => {
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(user);

		axios.post(`http://lucaspoirel.ovh:8080/auth/login`, {
			email: user.email,
			password: user.password
		})
			.then(res => {
				if (res.status === 201) {
					console.log("Status 201 Auth Success");
					global.User.token = res.data.token;
					global.User.id = res.data.user.id;
					this._storeToken(res.data.token, res.data.id);
					this.props.navigation.dispatch(resetAction)
				}
				else {
					console.log("Bad status Auth failed");
					this.setState({error: true})
				}
			})
			.catch((error) => {
				this.setState({error: true});
				console.log(error.response);
			});
	};

	render() {
		let error;
		if (this.state.error == true) {
			console.log("Error Connexion")
			error = <Text style = {{textAlign: 'center',justifyContent: 'center', color: 'red'}}>Erreur de connexion</Text>
		}

		return (
			<ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 50}}
									keyboardShouldPersistTaps='handled'
			>
				<View style = {{justifyContent: 'center', alignItems:'center'}}>
					<Image
						source={require('./../assets/images/logo.png')}
						style={{ width: 150, height: 150, justifyContent: 'center'}}
					/>
				</View>
				{error}
				<TextInput style = {styles.input}
									 underlineColorAndroid = "transparent"
									 placeholder = "Email"
									 placeholderTextColor = '#2e8b57'
									 autoCapitalize = "none"
									 onChangeText = {this.handleEmail}
									 onSubmit={Keyboard.dismiss}/>

				<TextInput style = {styles.input}
									 underlineColorAndroid = "transparent"
									 placeholder = "Mot de passe"
									 placeholderTextColor = '#2e8b57'
									 autoCapitalize = "none"
									 secureTextEntry ={true}
									 onChangeText = {this.handlePassword}
									 onSubmit={Keyboard.dismiss}/>

				<TouchableOpacity
					style = {styles.submitButton}
					onPress = {
						() => this.login()
					}>
					<Text style = {styles.submitButtonText}> Se connecter </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style = {styles.submitButton}
					onPress = {
						() => this.props.navigation.navigate('Inscriptions')
					}>
					<Text style = {styles.submitButtonText}> S'inscrire </Text>
				</TouchableOpacity>
				<View style = {styles.logo}>
					<TouchableOpacity style={styles.touchable} onPress={this.loginWithGithub}>
						<Image
							source={require('../assets/images/github.png')}
							style={styles.image} />
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

export default ConnectScreen

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
	},
	logo:{
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		height: Layout.window.height * 0.1,
	},
	view: {
		position: 'absolute',
		backgroundColor: 'transparent'
	},
	image: {
		width: Layout.window.width * 0.1,
		height: Layout.window.width * 0.1,
		margin: Layout.window.width * 0.1
	},
	touchable: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: Theme.theme.seagreen,
		fontSize: 18,
		textAlign: 'center'
	}
});