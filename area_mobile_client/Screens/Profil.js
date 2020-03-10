import React from "react";
import {Button, TextInput, Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";
import OAuthManager from "react-native-oauth";
import { WebView, WebViewNavigation } from 'react-native-webview';




//area_mobile
const IMGUR_CLIENT_ID = '8b324ccfaf7ec46';
const IMGUR_SECRET = 'd1864350c726d4f119505ee89cdc80b1bd2b7c6b';

const SPOTIFY_CLIENT_ID = 'cecc7e76cd1e437aba475fa8ab667e26';
const SPOTIFY_SECRET = '767a0020869849078a243b10087ac883';

const TRELLO_API_KEY = 'c234d77a50c1e86fb3fd36501e7ea194';
const TRELLO_SERCRET = '7b8f6d84dfa7342cc04ee907462683bef8ad365dac6e20d7cb64dfc7afb1b26b';

const SLACK_CLIENT_ID = '973222196038.959312549842';

const manager = new OAuthManager('areaAndroid')

manager.configure({
	github: {
		client_id: 'Iv1.ab9857810b96e777',
		client_secret: '12ef41b0bedd847e9f03e015c53b5fa7ff6d11df'
	}
});

class ProfilScreen extends React.Component {
	static navigationOptions = {
		title: 'Profil',
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

	constructor() {
		super()
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			tmp: false,
			pressed: false,
			spotify: false,
			imgur: false,
			slack: false,
		};
		this.handleGithubPress = this.handleGithubPress.bind(this);
		this.handleTrelloPress = this.handleTrelloPress.bind(this);
		this.handleSpotifyPress = this.handleSpotifyPress.bind(this);
		this.handleImgurPress = this.handleImgurPress.bind(this);
		this.handleSlackPress = this.handleSlackPress.bind(this);
	}

	onNavigationStateChange = (navigationState) => {
		var url = navigationState.url;
		console.log(url)
		if (url.includes("8081/trello#token=")) {
			var tab = url.split("8081/trello#token=");
			console.log(url)
			console.log(tab[1])
			global.User.trelloToken = tab[1];
			this.props.navigation.navigate("Dashboard");
		}
	};

	componentDidMount() {
		if (global.User.token != null) {
			const config = {
				headers: {Authorization: `Bearer ${global.User.token}`}
			};
			axios.get(`http://lucaspoirel.ovh:8080/users/${global.User.id}`, config)
				.then(res => {
					this.setState({
						firstname: res.data.firstName,
						lastname: res.data.lastName,
						email: res.data.email
					})
				})
		}
	}

	handleGithubPress() {
		console.log("GithubPressed")
		if (global.User.githubToken === undefined) {
			manager.authorize('github')
				.then(resp => {
					global.User.githubToken = resp.response.credentials.accessToken;
					this.setState({
						tmp: true
					})
				})
				.catch(err => {
					global.User.githubToken = undefined;
					console.log(err)
				});
		}
	}

	handleTrelloPress() {
		if (global.User.trelloToken === undefined) {
			this.setState({
				pressed: true,
			});
		}
	}

	handleSpotifyPress() {
		if (global.User.spotifyToken === undefined) {
			this.setState({
				spotify: true,
			});
		}
	}

	handleImgurPress() {
		if (global.User.imgurToken === undefined) {
			this.setState({
				imgur: true,
			});
		}
	}

	handleSlackPress() {
		if (global.User.slackToken === undefined) {
			this.setState({
				slack: true,
			});
		}
	}

	navigationSpotify = (navigationState) => {
		var url = navigationState.url;
		console.log(url)
		if (url.includes("http://localhost:8081/")) {
			var tab = url.split('#');
			var encoretab = tab[1].split('=');
			var code = encoretab[1]
			code = code.split("&")
			global.User.spotifyToken = code[0];
			console.log(code[0])
			this.props.navigation.navigate("Dashboard");
		}
	};

	navigationImgur = (navigationState) => {
		var url = navigationState.url;
		console.log(url);
		if (url.includes("http://localhost/?state=stateReponse#")) {
			var tab = url.split('#')
			var encoretab = tab[1].split('=')
			var code = encoretab[1]
			code = code.split("&")
			global.User.imgurToken = code[0];
			console.log(code[0]);
			console.log(code[1]);
			var quasipseudo = url.split("username=");
			console.log("quasi")
			console.log(quasipseudo)
			var pseudo = quasipseudo[1].split('&acc');
			console.log("pseudo")
			console.log(pseudo[0])
			global.User.imgurLogin = pseudo[0]
			this.props.navigation.navigate("Dashboard");
		}
	};

	navigationSlack = (navigationState) => {
		var url = navigationState.url;
		if (url.includes(".slack.com/oauth/")) {
			var tab = url.split("/oauth/");
			console.log(tab[1])
			const config = {
				headers: { Authorization: `token ${tab[1]}`}
			}
			axios.post(`https://api.slack.com/api/oauth.v2.access?code=${tab[1]}&client_id=973222196038.972875814919&client_secret=ad8fd04a734392f80743ffcaea857033`, config)
				.then(res => {
					console.log(res);
					console.log(res.data);
					console.log(res.data.access_token);
					this.props.navigation.navigate("Dashboard");
				})
		}
		console.log(url);
	};

	render() {
		let greenButton = <Icon
			name="circle"
			size={30}
			color="green"
			style={{marginTop: 0}}
			/>;
		let redButton = <Icon
			name="circle"
			size={30}
			color="red"
			style={{marginTop: 0}}
			/>;
		console.log(global.User.githubToken);
		let webView = undefined;
		if (this.state.pressed === true) {
			webView = <WebView
				source={{ uri: 'https://trello.com/1/authorize?expiration=1day&name=area_mobile_client&scope=read&response_type=token&key=c234d77a50c1e86fb3fd36501e7ea194&callback_method=fragment&return_url=http://localhost:8081/trello'}}
				onNavigationStateChange={this.onNavigationStateChange}
			/>
		}
		else if (this.state.spotify === true) {
			webView = <WebView
				source={{uri: 'https://accounts.spotify.com/authorize?client_id=cecc7e76cd1e437aba475fa8ab667e26&redirect_uri=http://localhost:8081&response_type=token&scope=user-follow-modify'}}
				onNavigationStateChange={this.navigationSpotify}
			/>
		}
		else if (this.state.imgur === true) {
			webView = <WebView
				source={{uri: 'https://api.imgur.com/oauth2/authorize?client_id=8b324ccfaf7ec46&response_type=token&state=stateReponse&return_url=http://localhost:8081/imgur'}}
				onNavigationStateChange={this.navigationImgur}
			/>
		}
		else if (this.state.slack === true) {
			webView = <WebView
				source={{uri: 'https://slack.com/oauth/v2/authorize?scope=commands,channels:read,groups:read,mpim:read,im:read,channels:manage,groups:write,mpim:write,im:write&client_id=973222196038.959312549842&response_type=code'}}
				onNavigationStateChange={this.navigationSlack}
			/>
		}

		return(
			<View style={{alignContent: 'center', alignItems: 'center'}}>
				{webView !== undefined ?
					<View style={{width: Layout.window.width, height: Layout.window.height}}>
						{webView}
					</View>
					:
					<View style={{alignContent: 'center', alignItems: 'center'}}>
						<View style={style.rowView}>
							<Text style={style.Text}>
								List of services
							</Text>
						</View>
						<TouchableOpacity
							onPress={this.handleGithubPress}
							style={style.rowView}>
							<Image
								source={require('../assets/images/github.png')}
								style={style.image}/>
							<Text style={style.githubText}>Github</Text>
							{global.User.githubToken === undefined ? redButton : greenButton}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.handleTrelloPress}
							style={style.rowView}>
							<Image
								source={require('../assets/images/trello2.png')}
								style={style.image}/>
							<Text style={style.githubText}>Trello</Text>
							{global.User.trelloToken === undefined ? redButton : greenButton}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.handleSpotifyPress}
							style={style.rowView}>
							<Image
								source={require('../assets/images/spotipute.png')}
								style={style.image}/>
							<Text style={style.githubText}>Spotify</Text>
							{global.User.spotifyToken === undefined ? redButton : greenButton}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.handleImgurPress}
							style={style.rowView}>
							<Image
								source={require('../assets/images/imgur.png')}
								style={style.image}/>
							<Text style={style.githubText}>Imgur</Text>
							{global.User.imgurToken === undefined ? redButton : greenButton}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.handleSlackPress}
							style={style.rowView}>
							<Image
								source={require('../assets/images/slack.png')}
								style={style.image}/>
							<Text style={style.githubText}>Slack</Text>
							{global.User.slackToken === undefined ? redButton : greenButton}
						</TouchableOpacity>
					</View>
				}
			</View>
		);
	}
}

export default ProfilScreen;

const style = StyleSheet.create({
	rowView:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'moccasin',
		borderBottomColor:'black',
		borderTopColor:'black',
		borderBottomWidth: 2,
		borderTopWidth: 2,
		height: Layout.window.height * 0.1,
		width: Layout.window.width,
	},
	image: {
		marginTop: 0,
		width: Layout.window.width * 0.15,
		height: Layout.window.width * 0.15,
		marginLeft: 10,
	},
	imageTrello: {
		height: Layout.window.width * 0.13,
		width: Layout.window.width * 0.45,
	},
	githubText: {
		fontFamily: "sans-serif-medium",
		marginLeft: Layout.window.width * 0.05,
		marginRight: Layout.window.width * 0.3,
		fontSize: 40,
	},
	trelloText: {
		fontFamily: "sans-serif-medium",
		marginLeft: Layout.window.width * 0.02,
		marginRight: Layout.window.width * 0.1,
		fontSize: 40,
	},
	Text: {
		fontFamily: "sans-serif-medium",
		fontSize: 40,
	},
});