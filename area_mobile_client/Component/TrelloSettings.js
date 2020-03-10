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
	Settings, Keyboard, AsyncStorage
} from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";

class TrelloSettings extends React.Component {
	constructor() {
		super();
		this.state = {
			listBoards: [],
			listListId: [],
			searchedBoards: false,
		}
	}

	componentDidMount() {
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		};

		var curlBoard = 'http://lucaspoirel.ovh:8080/trello/members/' + global.User.trelloLogin + "/c234d77a50c1e86fb3fd36501e7ea194/"+ global.User.trelloToken + '/boards'
		console.log("CURLBOARD : " + curlBoard)
		axios.get(curlBoard, config)
			.then(res => {
				console.log("RES TRELLO")
				console.log(res)
				var i = 0;
				var tmp = [];
				while( i < res.data.length) {
					tmp.push({
						label: res.data[i].name,
						value: res.data[i].shortLink,
					});
					i++
				}
				console.log("TMP TRELLO: ")
				console.log(tmp);
				console.log(this.props.type)
				this.setState({
					listBoards: tmp, //CA MARCHE PAS LA
					searchedBoards: true
				});
				console.log("LIST TRELLO: ")
			})
			.catch(err =>{
				console.log("ERROR TRELLO LA")
			})
	}

	changeValue = async (value, index) => {
		console.log(value);

		await AsyncStorage.setItem('ActionSettings', value)
	}

	changeSettings = async (value) => {
		console.log(value)
		if (this.props.type === "New Board" && this.props.action === true) {
			await AsyncStorage.setItem('ActionSettings', global.User.trelloLogin)
		}
		//VOIR POUR REACTION NEW BOARD
	}

	render() {
		var Settings = <Text>
		</Text>;
		if (this.props.type === "New Board" && this.props.action === true) {
			Settings = <View><Text>

			</Text></View>
		}
		else if (this.props.type === "New list" && this.props.action === true && this.state.searchedBoards) {
			Settings = <View>
			</View>
		} else if (this.props.type === "New Card") {
			Settings = <View>
			</View>
		}
		return(
			<View style={styles.ViewSettings}>
				{Settings}
			</View>
		)
	}
}

export default TrelloSettings;

var styles = StyleSheet.create({
	ViewSettings: {
		height: Layout.window.height * 0.5,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
	},
	input: {
		width: Layout.window.width * 0.8,
		borderColor: Theme.theme.seagreen,
		paddingStart: 10,
		borderWidth: 1
	},
});