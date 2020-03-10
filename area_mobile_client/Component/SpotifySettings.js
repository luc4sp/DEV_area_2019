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
	Keyboard, AsyncStorage, Switch, ScrollView
} from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";

class SpotifySettings extends React.Component {
	constructor() {
		super();
		this.state = {
			search: '',
			isArtist: true,
			itemsSearched: [],
			searched: false,
		}
	}

	componentDidMount() {
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		};
		if (global.User.spotifylogin === undefined) {
			var curl = "http://lucaspoirel.ovh:8080/spotify/me/" + global.User.spotifyToken
			console.log(curl)
			axios.get(curl, config)
				.then(res => {
					console.log(res);
				})
		}
		//Prepare Spotify Settings
	}

	toggleSwitch() {
		if (this.state.isArtist === false) {
			this.setState({
				isArtist: true
			})
		} else {
			this.setState({
				isArtist: false
			})
		}
	}

	makeASearch() {
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		};
		axios.get('http://lucaspoirel.ovh:8080/spotify/search/' + this.state.search + "/" + global.User.spotifyToken, config)
			.then(res => {
				console.log(res)
				var i = 0;
				var tmp = [];
				while( i < res.data.artists.items.length) {
					tmp.push({
						label: res.data.artists.items[i].name,
						value: res.data.artists.items[i].id,
					});
					i++;
				}
				console.log(tmp)
				this.setState({
					itemsSearched: tmp,
					searched: true,
				})


			})
	}

	handleSearch = async (text) => {
		this.setState({search: text})
		if (this.props.action === true) {
			await AsyncStorage.setItem('ReactionSettings', "1/" + text)
		}
		console.log(text);
	};

	handleSearch2 =  (text) => {
		this.setState({search: text});
		console.log(text);
	};

	changeValue = async (value, index) => {
		console.log(value)
		await AsyncStorage.setItem('ReactionSettings', "2/" + value)
	}


	render() {
		var tmp = <Text>
		</Text>
		if (this.props.type === "New Follower on Me" && this.props.action === true) {
		}
		else if (this.props.action === true) {
			tmp =
				<View style={styles.ViewSettings}><
					TextInput style={styles.input}
											 underlineColorAndroid = "transparent"
											 placeholder = "Name of artist"
											 placeholderTextColor = '#2e8b57'
											 autoCapitalize = "none"
											 onChangeText = {this.handleSearch}
											 onSubmit={Keyboard.dismiss}/>
				</View>
		} else if (this.props.action === false) {
			tmp = <ScrollView>
				<View style={styles.ViewSettings}>
				<TextInput style={styles.input}
										underlineColorAndroid = "transparent"
										placeholder = "Name of artist"
										placeholderTextColor = '#2e8b57'
										autoCapitalize = "none"
										onChangeText = {this.handleSearch2}
										onSubmit={Keyboard.dismiss}/>
										<View style={styles.RowView}>
					<Text style={{paddingTop: 25}}>
						User
					</Text>
					<Switch
						style={{ marginTop: 30 }}
						onValueChange={this.toggleSwitch.bind(this)}
						value={this.state.isArtist}
					/>
					<Text style={{paddingTop: 25}}>
						Artist
					</Text>
				</View>
					{this.state.isArtist? <View><TouchableOpacity
						onPress = {
							() => this.makeASearch()
						}>
						<Text style={styles.searchButton}> Search </Text>
					</TouchableOpacity>
						{this.state.searched?
								<RNPickerSelect onValueChange={(value, index) => this.changeValue(value,index)} items={this.state.itemsSearched}/>
								:
						<Text>

						</Text>}
						</View>
						:
						<Text>

					</Text>
					}

				</View>
			</ScrollView>
		}
		return(
			<View>
				{tmp}
			</View>
		)
	}
}

export default SpotifySettings;

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
	RowView: {
		margin: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10
	},
	searchButton: {
		backgroundColor: Theme.theme.seagreen,
		padding: 10,
		margin: 15,
		height: 40,
	},
});