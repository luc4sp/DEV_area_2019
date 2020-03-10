import React from "react";
import {Button, TextInput, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image} from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";

import GithubSettings from "./GithubSettings";
import TrelloSettings from "./TrelloSettings";
import TimesSettings from "./TimesSettings";
import ImgurSettings from "./ImgurSettings";
import SlackSettings from "./SlackSettings";
import SpotifySettings from "./SpotifySettings";

class AddAction extends React.Component {
	constructor() {
		super();
		this.state = {
			AServiceBool: false,
			ATypeList: [],
			ATypeBool: false,
			ASettingsBool: true,
			list: '',
			typeGithub: [],
			typeTrello: [],
			typeTimes: [],
			typeSlack: [],
			typeSpotify: [],
			typeImgur: [],
		};
	}

	componentDidMount() {
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		};
		if (global.User.trelloLogin === undefined && global.User.trelloToken !== undefined) {
			console.log("Trello Token : " + global.User.trelloToken)
			var curl = 'https://api.trello.com/1/members/me?key=c234d77a50c1e86fb3fd36501e7ea194&token=' + global.User.trelloToken;
			console.log(curl);
			axios.get(curl)
				.then(res => {
					global.User.trelloLogin = res.data.username;
					console.log(global.User.trelloLogin);
				});
		}

		var list = [];
		let itemsgithub = [];
		axios.get(`http://lucaspoirel.ovh:8080/github/service`, config)
			.then(res => {
				list = res.data.action.split("$")
				for (let prop in list) {
					itemsgithub.push({label: list[prop], value: list[prop]});
				}
				this.setState({typeGithub: itemsgithub})
			});
		let itemsTrello = [];
		axios.get(`http://lucaspoirel.ovh:8080/trello/service`, config)
			.then(res => {
				list = res.data.action.split("$")
				for (let prop in list) {
					itemsTrello.push({label: list[prop], value: list[prop]});
				}
				this.setState({typeTrello: itemsTrello})
			});
		let itemsTime = [];
		axios.get(`http://lucaspoirel.ovh:8080/world-times-api/service`, config)
			.then(res => {
				list = res.data.action.split("$")
				itemsTime.push({label: list[0], value: list[0]});
				this.setState({typeTimes: itemsTime})
			});
		let itemsSlack = [];
		axios.get(`http://lucaspoirel.ovh:8080/slack/service`, config)
			.then(res => {
				console.log("SLACK : " + res.data.action);
				list = res.data.action.split("$")
				for (let prop in list) {
					itemsSlack.push({label: list[prop], value: list[prop]});
				}
			});
		this.setState({
			typeSlack: itemsSlack,
		});
		let itemsSpotify = [];
		axios.get(`http://lucaspoirel.ovh:8080/spotify/service`, config)
			.then(res => {
				console.log("SPOTIPUTE : " + res.data.action);
				list = res.data.action.split("$")
				for (let prop in list) {
					itemsSpotify.push({label: list[prop], value: list[prop]});
				}
			});
		this.setState({
			typeSpotify: itemsSpotify,
		});
		let itemsImgur = [];
		axios.get(`http://lucaspoirel.ovh:8080/imgur/service`, config)
			.then(res => {
				console.log("IMGUR : " + res.data.action);
				list = res.data.action.split("$")
				for (let prop in list) {
					itemsImgur.push({label: list[prop], value: list[prop]});
				}
			});
		this.setState({
			typeImgur: itemsImgur,
		})
	}

	changeAService(value) {
		console.log(value);
		if (this.props.AService !== value) {
			this.props.handleAService(value);
			this.setState({AServiceBool: true, ATypeBool: false});
			this.props.handleAType('');
			this.props.handleASettings('');
		}
	}

	changeAType(value) {
		console.log("ChangeAType");
		this.props.handleAType(value);
		this.setState({ATypeBool: true});
		this.props.handleASettings('');
	}

	render() {

		//DRAW TYPE OF THE SERVICES
		let actionType;
		console.log("render");

		//TRELLO TYPE
		if (this.props.AService === "trello") {
			actionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/trello2.png')}
					style={{ width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeAType(value)}
												items={this.state.typeTrello}
				/>
			</View>
		} /* GITHUB TYPE */
		else if (this.props.AService === "github") {
			actionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/github.png')}
					style={{ width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeAType(value)}
												items={this.state.typeGithub}
				/>
			</View>
		} /* HORAIRES  TYPE */
		else if (this.props.AService === "world-times-api") {
			actionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/time.png')}
					style={{ width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeAType(value)}
												items={this.state.typeTimes}/>
			</View>
		} /* SLACK  TYPE */
		else if (this.props.AService === "slack") {
			actionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/slack.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeAType(value)}
												items={this.state.typeSlack}
				/>
			</View>
		}   /* SPOTIFY  TYPE */
		else if (this.props.AService === "spotify") {
			actionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/spotipute.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeAType(value)}
												items={this.state.typeSpotify}
				/>
			</View>
		} /* IMGUR  TYPE */
		else if (this.props.AService === "imgur") {
			actionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/imgur.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeAType(value)}
												items={this.state.typeImgur}
				/>
			</View>
		}


		//SETTINGS
		let actionSettings;

		//TRELLO
		if (this.props.AService === "trello" && this.state.ATypeBool) {
			actionSettings = <TrelloSettings
				action={true}
				type={this.props.AType}
			>

			</TrelloSettings>
		}/* GITHUB */
		else if (this.props.AService === "github" && this.state.ATypeBool) {
			actionSettings = <GithubSettings
				action={true}
				type={this.props.AType}
			>
			</GithubSettings>
		}/* TimeZone */
		else if (this.props.AService === "world-times-api") {
			actionSettings = <TimesSettings
				action={true}>
				</TimesSettings>
		} /* Slack */
		else if (this.props.AService === "slack") {
			actionSettings = <SlackSettings
				action={true}
				type={this.props.AType}>
			</SlackSettings>
		} /* spotify */
		else if (this.props.AService === "spotify") {
			actionSettings = <SpotifySettings
				action={true}
				type={this.props.AType}>
			</SpotifySettings>
		} /* Imgur */
		else if (this.props.AService === "imgur") {
			actionSettings = <ImgurSettings
				action={true}
				type={this.props.AType}>
			</ImgurSettings>
		}

		return(
			<View style={styles.mainviewStyle}>
				<View style={styles.actionView}>
					<Text style={styles.actionTextStyle}> Action </Text>
				</View>

				<View style={styles.AService}>
					<Text style={styles.actionTextStyle}> Choose Service </Text>
					<RNPickerSelect
						onValueChange={(value) => this.changeAService(value)}
						items={[
							{ label: 'Github', value: 'github' },
							{ label: 'Trello', value: 'trello' },
							{ label: 'Slack', value: 'slack' },
							{ label: 'Spotify', value: 'spotify' },
							{ label: 'Imgur', value: 'imgur' },
						]}
					/>
				</View>
				{
					this.state.AServiceBool ?
						<View>
							{actionType}
							{
								this.state.ATypeBool ?
									<View>
										{actionSettings}
										{
											this.state.ASettingsBool ?
												<View>
													<TouchableOpacity
														style={styles.buttonSwitch}
														onPress={
															() => this.props.handleSwitchOff()
														}>
														<Text style={styles.submitButtonText}>Choose Reaction</Text>
													</TouchableOpacity>
												</View>:
												<Text/>
										}
									</View>
									:
									<Text></Text>
							}
						</View>
						:
						<Text></Text>
				}
			</View>
		);
	}
}

export default AddAction;

var styles = StyleSheet.create({
	submitButtonText:{
		textAlign: 'center',
		color: 'white'
	},
	buttonSwitch: {
		backgroundColor: Theme.theme.seagreen,
		padding: 10,
		margin: 15,
		height: 40,
	},
	AService: {
		height: Layout.window.height * 0.2,
		alignItems: 'center',
		backgroundColor: Theme.theme.seagreen,
		justifyContent: 'center',
		elevation: 3,
	},
	AType: {
		height: Layout.window.height * 0.2,
		alignItems: 'center',
		backgroundColor: Theme.theme.seagreen,
		justifyContent: 'space-around',
		elevation: 3,
	},
	ASettings: {
		height: Layout.window.height * 0.3,
		alignItems: 'center',
		backgroundColor: 'gray',
		justifyContent: 'center',
	},
	actionView: {
		height: Layout.window.height * 0.1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionTextStyle: {
		color: Theme.theme.seagreen,
		fontSize:18,
	},
	mainviewStyle: {
		flex: 1,
		flexDirection: 'column',
	},
	footer: {
		position: 'absolute',
		flex:0.1,
		left: 0,
		right: 0,
		bottom: -10,
		backgroundColor:'transparent',
		flexDirection:'row',
		height:80,
		alignItems:'center',
	},
	bottomButtons: {
		alignItems:'center',
		justifyContent: 'center',
		flex:1,
	},
	footerText: {
		color: Theme.theme.seagreen,
		fontWeight:'bold',
		alignItems:'center',
		fontSize:18,
	},
	textStyle: {
		alignSelf: 'center',
		color: 'orange'
	},
	scrollViewStyle: {
		borderWidth: 2,
		borderColor: 'blue'
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: Theme.theme.seagreen,
		paddingStart: 10,
		borderWidth: 1
	},
});