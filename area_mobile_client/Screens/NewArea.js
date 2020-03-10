import React from "react";
import {
	Button,
	TextInput,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	ScrollView
} from "react-native";
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import AddAction from "../Component/AddAction";
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";
import AddReaction from "../Component/AddReaction";

class NewScreen extends React.Component {
	static navigationOptions = {
		title: 'Add AREA',
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
		super();
		this.state = {
			AService: "",
			AType: "",
			ASettings: "",
			RService: "",
			RType: "",
			RSettings: "",
			Switch: true,
		};
		this.handleAService = this.handleAService.bind(this);
		this.handleAType = this.handleAType.bind(this);
		this.handleASettings = this.handleASettings.bind(this);
		this.handleRService = this.handleRService.bind(this);
		this.handleRType = this.handleRType.bind(this);
		this.handleRSettings = this.handleRSettings.bind(this);
		this.handleSwitchOff = this.handleSwitchOff.bind(this);
		this.createArea = this.createArea.bind(this);
	}

	handleAService(AService) {
			this.setState({AService: AService})
	}

	handleAType(AType) {
		console.log(AType);
		this.setState({AType: AType})
	}

	handleASettings(ASettings) {
		console.log("ASETTINGS");
		console.log(ASettings);
		this.setState({ASettings: ASettings})
	}

	handleRService(RService) {
		this.setState({RService: RService})
	}

	handleRType(RType) {
		this.setState({RType: RType})
	}

	handleRSettings(RSettings) {
		this.setState({RSettings: RSettings})
	}

	handleSwitchOff() {
		console.log("SWITCHCHANGE");
		this.setState({Switch: false});
	}

	createArea = async () => {
		console.log("create new area");
		let values
		try {
			values = await AsyncStorage.multiGet(['ActionSettings', 'ReactionSettings'])
		} catch(e) {
			// read error
		}
		console.log(values);
		console.log("Action");
		console.log(this.state.AService);
		console.log(this.state.AType);
		console.log(values[0][1]);
		console.log("Reaction");
		console.log(this.state.RService);
		console.log(this.state.RType);
		console.log(values[1][1]);

		var urlAction = "";
		var params;
		var paramsRea;
		var result;
		var urlRea;

		console.log("5")
		if (this.state.AService === "github") {
			var tmp = values[0][1].split('/');
			console.log(tmp);
			urlAction = "http://lucaspoirel.ovh:8080/github/" + tmp[1] + "/" + tmp[2] + "/select"
			params = JSON.stringify({
				token: global.User.githubToken,
				name: tmp[1],
				content: tmp[2]
			});
		}
		console.log("4")
		if (this.state.AService === "spotify")
		{
			if (this.state.AType === "New Follower on artist") {
				var tmp = values[0][1];
				urlAction = "http://lucaspoirel.ovh:8080/spotify/search/" + tmp + '/' + global.User.spotifyToken;
				params = JSON.stringify({
					token: global.User.spotifyToken,
				})
			}
			else {
				urlAction = "http://lucaspoirel.ovh:8080/spotify/me/" + global.User.spotifyToken;
				params = JSON.stringify({
					token: global.User.spotifyToken,
				})
			}
		}

		if (this.state.AService === "imgur") {
			urlAction = "http://lucaspoirel.ovh:8080/imgur/getreputation/" + global.User.imgurToken;
			params = JSON.stringify({
				token: global.User.imgurToken,
				name: global.User.imgurLogin,
			})
		}

		if (this.state.AService === "world-times-api") {
			var tmp = values[0][1].split('$');
			var tmp2 = tmp[0].split(':');
			console.log(tmp);
			urlAction = "http://lucaspoirel.ovh:8080/world-times-api/GetHoursFromTimezone/" + tmp[1];
			params = tmp2[0] + ":" + tmp2[1] + " " + tmp[1];
		}

		//__________________REACTION___________________________________

		console.log("1")
		if (this.state.RService === "github") {
			var tmp = values[1][1].split('/');
			urlRea = 'http://lucaspoirel.ovh:8080/github/' + tmp[1] + '/' + tmp[2];
			paramsRea = JSON.stringify({
				token: global.User.githubToken,
				name: tmp[1],
				content: tmp[2]
			})
		}
		console.log("2")
		if (this.state.RService === "world-times-api") {
			var tmp = values[1][1].split('$');
			var tmp2 = tmp[0].split(':');
			paramsRea = tmp2[0] + ":" + tmp2[1] + " " + tmp[1]
		}
		console.log("3")

		if (this.state.RService === "imgur") {
			urlRea = 'http://lucaspoirel.ovh:8080/imgur/followtag/' + values[1][1]
			paramsRea = JSON.stringify({
				token: global.User.imgurToken,
				name: global.User.imgurLogin,
			})
		}

		if (this.state.RService === "spotify") {
			var tmp = values[1][1].split('/')
			if (tmp[0] === "1") {
				urlRea = 'http://lucaspoirel.ovh:8080/spotify/follow/user/' + tmp[1]
				paramsRea = JSON.stringify({
					token: global.User.spotifyToken,
					type: "User",
					name: tmp[1],
				})
			} else {
				urlRea = 'http://lucaspoirel.ovh:8080/spotify/follow/artist/' + tmp[1]
				paramsRea = JSON.stringify({
					token: global.User.spotifyToken,
					type: "artist",
					name: tmp[1],
				})
			}
		}

		var token = global.User.token;
		console.log(token)
		const config =  {
			headers: { Authorization: `Bearer ${token}`},
		}
		console.log("URL: " + urlAction);
		console.log("PARAMS: " + params);
		console.log("URL REA : " + urlRea);
		console.log("PARAMS: " + paramsRea);
		axios.get(urlAction, config)
			.then(res => {
				result = res
				var id = global.User.id
				console.log(res)
				axios.post (`http://lucaspoirel.ovh:8080/action/pushActions`,
					{
						id: "2",
						name: this.state.AType,
						apiCall: urlAction,
						body: params,
						headers: this.state.AService,
						response: result,
						user: {id: id},
						reaction: {
							name: this.state.RType,
							apiCall: urlRea,
							body: paramsRea,
							headers : this.state.RService,
						}
					}, {
					headers: { Authorization: `Bearer ${token}`
					}
					})
					.then(res => {
						console.log(res)
						this.props.navigation.navigate('Dashboard')
					})
			})
			.catch(error => {
				console.log(error)
			})
	}

	handleTabChange = () => {
		this.props.navigation.navigate('Dashboard')
	};

	render() {
		return(
			<ScrollView>
			<View>
				{
					this.state.Switch ?
					<AddAction
						AService={this.state.AService}
						AType={this.state.AType}
						ASettings={this.state.ASettings}
						handleAService={this.handleAService}
						handleAType={this.handleAType}
						handleASettings={this.handleASettings}
						handleSwitchOff={this.handleSwitchOff}>
					</AddAction>
						:
						<AddReaction
							RService={this.state.RService}
							RType={this.state.RType}
							RSettings={this.state.RSettings}
							handleRService={this.handleRService}
							handleRType={this.handleRType}
							handleRSettings={this.handleRSettings}
							createArea={this.createArea}>
						</AddReaction>
				}
			</View>
			</ScrollView>
		);
	}
}

export default NewScreen;

var styles = StyleSheet.create({

});