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
	Switch,
	ScrollView, Keyboard
} from "react-native";
import axios from 'axios';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";
import AsyncStorage from '@react-native-community/async-storage';

class GithubSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			isRepo: false,
			listSearch: [],
			valueSelected: '',
		}
	}

	componentDidMount() {
		console.log(this.props.type);
		this.setState({isRepo: false})
		//PREPARE COMPONENT
	}

	toggleSwitch() {
		if (this.state.isRepo === false) {
			this.setState({
				isRepo: true
			})
		} else {
			this.setState({
				isRepo: false
			})
		}
	}

	handleSearch = (text) => {
		this.setState({search: text})
	};

	changeValue = async (value, index) => {
		this.setState({valueSelected: value})
		//SETTINGS GITHUB : isRepo or isUser "/" value
		if (this.state.isRepo) {
			if (this.props.action === true) {
				console.log("OK1" + "isRepo/" + value + "/" + this.state.search)
				await AsyncStorage.setItem('ActionSettings', "isRepo/" + value + "/" + this.state.search);
			} else {
				console.log("OK2" + "isRepo/" + value + "/" + this.state.search)
				await AsyncStorage.setItem('ReactionSettings', "isRepo/" + value + "/" + this.state.search);
			}
		}
		else {
			if (this.props.action === true) {
				console.log("OK3" +  "isUser/" + this.state.search + "/" + value)
				await AsyncStorage.setItem('ActionSettings', "isUser/" + this.state.search + "/" + value);
			} else {
				console.log("OK4"  + "isUser/" + this.state.search + "/" + value)
				await AsyncStorage.setItem('ReactionSettings', "isUser/" + this.state.search + "/" + value);
			}
		}
	}

	makeASearch() {
		console.log("JE SUIS LA")
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		}
		if (this.state.isRepo === true) {
			axios.get(`http://lucaspoirel.ovh:8080/github/search/repos/${this.state.search}`, config)
				.then(res => {
					console.log(res);
					var i = 0;
					var tmp = [];
					while( i < res.data.items.length) {
						tmp.push({
							label: res.data.items[i].name,
							value: res.data.items[i].owner.login,
						});
						i++
					}
					console.log(tmp);
					this.setState({listSearch: tmp})
				})
		}
		else {
			axios.get(`http://lucaspoirel.ovh:8080/github/${this.state.search}/repos`, config)
				.then(res => {
					console.log(res);
					var i = 0;
					var tmp = [];
					while( i < res.data.length) {
						tmp.push({
							label: res.data[i].name,
							value: res.data[i].name,
						});
						i++
					}
					console.log(tmp)
					this.setState({listSearch: tmp})
				})
		}
	}

	render() {
		let result = <Text></Text>
		if (this.state.listSearch.length >= 1) {
			result = <RNPickerSelect
				style={styles.inputAndroid}
				onValueChange={(value, index) => this.changeValue(value,index)}
				items={this.state.listSearch}>
			</RNPickerSelect>
		}
		return(
			<View style={styles.ViewSettings}>
				<TextInput style={styles.input}
									 underlineColorAndroid = "transparent"
									 placeholder = "Search here"
									 placeholderTextColor = '#2e8b57'
									 autoCapitalize = "none"
									 onChangeText = {this.handleSearch}
									 onSubmit={Keyboard.dismiss}/>
				<View style={styles.RowView}>
					<Text style={{paddingTop: 25}}>
						Username
					</Text>
					<Switch
						style={{ marginTop: 30 }}
						onValueChange={this.toggleSwitch.bind(this)}
						value={this.state.isRepo}
					/>
					<Text style={{paddingTop: 25}}>
						Repository
					</Text>
				</View>
				<TouchableOpacity
					onPress = {
						() => this.makeASearch()
					}>
					<Text style={styles.searchButton}> Search </Text>
				</TouchableOpacity>
				{result}
			</View>
		)
	}
}

export default GithubSettings;

var styles = StyleSheet.create({
	input: {
		width: Layout.window.width * 0.8,
		borderColor: Theme.theme.seagreen,
		paddingStart: 10,
		borderWidth: 1
	},
	ViewSettings: {
		height: Layout.window.height * 0.5,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
	},
	RowView: {
		margin: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	searchButton: {
		backgroundColor: Theme.theme.seagreen,
		padding: 10,
		margin: 15,
		height: 40,
	},
});