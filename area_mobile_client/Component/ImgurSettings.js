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
	AsyncStorage, Keyboard
} from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";

class ImgurSettings extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	componentDidMount() {
		//Prepare Imgur Settings
	}

	handleSearch = async (text) => {
		this.setState({search: text})
		if (this.props.action === false) {
			await AsyncStorage.setItem('ReactionSettings', text)
		}
		console.log(text);
	};

	render() {
		var Settings = <Text>
		</Text>;

		if (this.props.action === false) {
			Settings = <View style={styles.ViewSettings}>
				<TextInput style={styles.input}
									 underlineColorAndroid = "transparent"
									 placeholder = "Tag Name"
									 placeholderTextColor = '#2e8b57'
									 autoCapitalize = "none"
									 onChangeText = {this.handleSearch}
									 onSubmit={Keyboard.dismiss}/>
			</View>
		}
		return(
			<View>
				{Settings}
			</View>
		)
	}
}

export default ImgurSettings;

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
	searchButton: {
		backgroundColor: Theme.theme.seagreen,
		padding: 10,
		margin: 15,
		height: 40,
	},
});