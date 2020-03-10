import React from "react";
import {Button, TextInput, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image} from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";
import time from "../assets/images/time.png";
import github from "../assets/images/github.png";

class Area extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tmpID: 0,
		}
		this.deleteArea = this.deleteArea.bind(this)
	}
	componentDidMount() {
		console.log("SETTINGSAREA")
		console.log(this.props.settings.name)
		console.log(this.props.settings.id);
		this.setState({tmpID : this.props.settings.id})
		console.log(this.state.tmpID);
	}

	deleteArea() {
		console.log("DELETE")
		console.log(this.state.tmpID)
		console.log("DELETE2")
		const config =  {
			headers: { Authorization: `Bearer ${global.User.token}`},
		}
		axios.delete(`http://lucaspoirel.ovh:8080/action/delete/${this.state.tmpID}`, config)
			.then( res => {
				this.props.forceUpdate();
			})
	}


	render() {
		console.log("AHHH RENDER");
		let actionLogo;
		let reactionLogo;

		if (this.props.settings.headers === "github") {
			actionLogo = <Image
				source={require('../assets/images/github.png')}
				style={style.image} />
		} else if (this.props.settings.headers === "world-times-api") {
			actionLogo = <Image
				source={require('../assets/images/time.png')}
				style={style.image} />
		} else if (this.props.settings.headers === "slack") {
			actionLogo = <Image
				source={require('../assets/images/slack.png')}
				style={style.image} />
		} else if (this.props.settings.headers === "spotify") {
			actionLogo = <Image
				source={require('../assets/images/spotipute.png')}
				style={style.image} />
		} else if (this.props.settings.headers === "imgur") {
			actionLogo = <Image
				source={require('../assets/images/imgur.png')}
				style={style.image} />
		} else if (this.props.settings.headers === "trello") {
			actionLogo = <Image
				source={require('../assets/images/trello2.png')}
				style={style.image} />
		}

		if (this.props.settings.reaction.headers === "github") {
			reactionLogo = <Image
				source={require('../assets/images/github.png')}
				style={style.image} />
		} else if (this.props.settings.reaction.headers === "world-times-api") {
			reactionLogo = <Image
				source={require('../assets/images/time.png')}
				style={style.image} />
		} else if (this.props.settings.reaction.headers === "slack") {
			reactionLogo = <Image
				source={require('../assets/images/slack.png')}
				style={style.image} />
		} else if (this.props.settings.reaction.headers === "spotify") {
			reactionLogo = <Image
				source={require('../assets/images/spotipute.png')}
				style={style.image} />
		} else if (this.props.settings.reaction.headers === "imgur") {
			reactionLogo = <Image
				source={require('../assets/images/imgur.png')}
				style={style.image} />
		} else if (this.props.settings.reaction.headers === "trello") {
			reactionLogo = <Image
				source={require('../assets/images/trello2.png')}
				style={style.image} />
		}
		return (
			<View style={style.area}>
				<View style={style.onRight}>
					<TouchableOpacity onPress={this.deleteArea}>
						<Icon
							name="remove"
							size={30}
							color="red"
						/>
					</TouchableOpacity>
				</View>
				<View style={style.contentAreaRow}>
					<View style={style.contentAction}>
						{actionLogo}
						<Text>{this.props.settings.name}</Text>
						<Text>{this.props.settings.body.name}</Text>
					</View>
					<View style={style.contentReaction}>
						{reactionLogo}
						<Text>{this.props.settings.reaction.name}</Text>
						<Text>{this.props.settings.reaction.body.name}</Text>
					</View>
				</View>
			</View>
		)
	}
}

export default Area

const style = StyleSheet.create({
	area: {
		backgroundColor: 'white',
		//flexDirection: 'row',
		justifyContent: 'center',
		///backgroundColor: 'transparent',
		height: Layout.window.height * 0.25,
		borderBottomColor: Theme.theme.seagreen,
		borderBottomWidth: 2,
	},
	image: {
		width: Layout.window.width * 0.15,
		height: Layout.window.width * 0.15,
	},
	onRight : {
		height: Layout.window.height * 0.05,
		alignItems : 'flex-end',
	},
	contentAreaRow: {
		height: Layout.window.height * 0.2,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	contentAction: {
		width: Layout.window.width * 0.45,
		backgroundColor: 'moccasin',
		alignItems: 'center',
		margin: Layout.window.width * 0.03,
		borderColor: Theme.theme.seagreen,
		borderWidth: Layout.window.width * 0.01,
		borderRadius: Layout.window.width * 0.05,
	},
	contentReaction: {
		width: Layout.window.width * 0.45,
		backgroundColor: 'moccasin',
		alignItems: 'center',
		margin: Layout.window.width * 0.03,
		borderColor: Theme.theme.seagreen,
		borderWidth: Layout.window.width * 0.01,
		borderRadius: Layout.window.width * 0.05,
	}
});