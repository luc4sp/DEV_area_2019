import React from "react";
import {Button, TextInput, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image} from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";

import ImgurSettings from "./ImgurSettings";
import SlackSettings from "./SlackSettings";
import SpotifySettings from "./SpotifySettings";
import GithubSettings from "./GithubSettings";
import TrelloSettings from "./TrelloSettings";

class AddReaction extends React.Component {
	constructor() {
		super();
		this.state = {
			RServiceBool: false,
			RTypeList: [],
			RTypeBool: false,
			RSettingsBool: true,
			list: '',
			typeGithub: [],
			typeTrello: [],
			typeTimes: [],
			typeSlack: [],
			typeSpotify: [],
			typeImgur: [],
		};
		this.changeRService = this.changeRService.bind(this);
	}

	componentDidMount() {
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		};
		var list = [];
		// GITHUB TYPE
		let itemsgithub = [];
		axios.get(`http://lucaspoirel.ovh:8080/github/service`, config)
			.then(res => {
				list = res.data.reaction.split("$")
				for (let prop in list) {
					itemsgithub.push({
						label: list[prop], value: list[prop]
					});
				}
				this.setState({
					typeGithub: itemsgithub
				})
			});
		//TRELLO TYPE
		let itemsTrello = [];
		axios.get(`http://lucaspoirel.ovh:8080/trello/service`, config)
			.then(res => {
				list = res.data.reaction.split("$")
				for (let prop in list) {
					itemsTrello.push({
						label: list[prop], value: list[prop]
					});
				}
				this.setState({
					typeTrello: itemsTrello,
				})
			});
		//SLACK TYPE
		let itemsSlack = [];
		axios.get(`http://lucaspoirel.ovh:8080/slack/service`, config)
			.then(res => {
				console.log("SLACK : " + res.data.reaction);
				list = res.data.reaction.split("$")
				for (let prop in list) {
					itemsSlack.push({label: list[prop], value: list[prop]});
				}
			});
		this.setState({
			typeSlack: itemsSlack,
		});
		//SPOTIFY TYPE
		let itemsSpotify = [];
		axios.get(`http://lucaspoirel.ovh:8080/spotify/service`, config)
			.then(res => {
				console.log("SPOTIPUTE REACTION: " + res.data.reaction);
				list = res.data.reaction.split("$")
				for (let prop in list) {
					itemsSpotify.push({label: list[prop], value: list[prop]});
				}
			});
		this.setState({
			typeSpotify: itemsSpotify,
		});
		//IMGUR TYPE
		let itemsImgur = [];
		axios.get(`http://lucaspoirel.ovh:8080/imgur/service`, config)
			.then(res => {
				console.log("IMGUR : " + res.data.reaction);
				list = res.data.reaction.split("$")
				for (let prop in list) {
					itemsImgur.push({label: list[prop], value: list[prop]});
				}
			});
		this.setState({
			typeImgur: itemsImgur,
		})
	}

	changeRService(value) {
		console.log(value);
		if (this.props.RService !== value) {
			this.props.handleRService(value);
			this.setState({RServiceBool: true, RTypeBool: false});
			this.props.handleRSettings('');
			this.props.handleRType('');
		}
	}

	changeRType(value) {
		console.log("ChangeRType");
		this.props.handleRType(value);
		this.setState({RTypeBool: true});
		this.props.handleRSettings('');
	}

	changeRSettings(value) {
		this.props.handleRSettings(value);
	}


	render() {
		let reactionType;
		console.log("render");

		//TRELLO TYPE
		if (this.props.RService === "trello") {
			reactionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/trello2.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeRType(value)}
												items={this.state.typeTrello}
				/>
			</View>
		} /* GITHUB TYPE */
		else if (this.props.RService === "github") {
			reactionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/github.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeRType(value)}
												items={this.state.typeGithub}
				/>
			</View>
		} //SLACK
		else if (this.props.RService === "slack") {
			reactionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/slack.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
					/>
				<RNPickerSelect onValueChange={(value) => this.changeRType(value)}
												items={this.state.typeSlack}
				/>
			</View>
		} //SPOTIFY
		else if (this.props.RService == "spotify") {
			reactionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/spotipute.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeRType(value)}
												items={this.state.typeSpotify}
				/>
			</View>
		} //IMGUR
		else if (this.props.RService == "imgur") {
			reactionType = <View style={styles.AType}>
				<Image
					source={require('./../assets/images/imgur.png')}
					style={{width: Layout.window.width * 0.1, height: Layout.window.width * 0.1, justifyContent: 'center'}}
				/>
				<RNPickerSelect onValueChange={(value) => this.changeRType(value)}
												items={this.state.typeImgur}
				/>
			</View>
		}

		//SETTINGS
		let reactionSettings;

		//TRELLO
		if (this.props.RService === "trello" && this.state.RTypeBool) {
			reactionSettings =
				<TrelloSettings
					action={false}
					type={this.props.RType}
					setSettings={this.changeRSettings}
				>
				</TrelloSettings>
		}/* GITHUB */
		else if (this.props.RService === "github" && this.state.RTypeBool) {
			reactionSettings =
				<GithubSettings
					action={false}
					type={this.props.RType}
					setSettings={this.changeRSettings}
				>
				</GithubSettings>
		} // SLACK
		else if (this.props.RService === "slack" && this.state.RTypeBool) {
			reactionSettings =
				<SlackSettings
					action={false}
					type={this.props.RType}
					setSettings={this.changeRSettings}
				>
				</SlackSettings>
		} //SPOTIFY
		else if (this.props.RService === "spotify" && this.state.RTypeBool) {
			reactionSettings =
				<SpotifySettings
					action={false}
					type={this.props.RType}
					setSettings={this.changeRSettings}
				>
				</SpotifySettings>
		}
		else if (this.props.RService === "imgur" && this.state.RTypeBool) {
			reactionSettings =
				<ImgurSettings
					action={false}
					type={this.props.RType}
					setSettings={this.changeRSettings}
				>
				</ImgurSettings>
		}

		return(
			<View style={styles.mainviewStyle}>
				<View style={styles.actionView}>
					<Text style={styles.actionTextStyle}> Reaction </Text>
				</View>

				<View style={styles.AService}>
					<Text style={styles.actionTextStyle}> Choose Service </Text>
					<RNPickerSelect
						onValueChange={(value) => this.changeRService(value)}
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
					this.state.RServiceBool ?
						<View>
							{reactionType}
							{
								this.state.RTypeBool ?
									<View>
										{reactionSettings}
										{
											this.state.RSettingsBool ?
												<View>
													<TouchableOpacity
														style={styles.buttonSwitch}
														onPress={
															() => this.props.createArea()
														}>
														<Text style={styles.submitButtonText}>Add AREA</Text>
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

export default AddReaction;

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
		color:Theme.theme.seagreen,
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
