import React from "react";
import {Button, TextInput, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import TimePicker from "react-native-24h-timepicker";
import RNPickerSelect from 'react-native-picker-select';

import Theme from "../Constant/Theme";
import Layout from "../Constant/Layout";

class TimesSettings extends React.Component {
	constructor() {
		super();
		this.state = {
			timezone: [],
			timezoneSelected: "Europe/Paris",
			hour: '0',
			min: '00',
			toUpdate: false,
		}
	}

	componentDidMount() {
		const config = {
			headers: { Authorization:`Bearer ${global.User.token}`},
		}
		axios.get(`http://lucaspoirel.ovh:8080/world-times-api/GetAllTimezone`, config)
			.then( res => {
				console.log(res.data)
				var i = 0;
				var tmp = [];
				while( i < res.data.length) {
					tmp.push({
						label: res.data[i],
						value: res.data[i],
					});
					i++
				}
				this.setState({
					timezone: tmp
				})
			});
		//Prepare components
	}

	changeValue = async (value) => {
		this.setState({
			timezoneSelected: value
		})
		let tmp = this.state.hour + ":" + this.state.min + "$" + value;
		//this.props.changeASettings(tmp);
		//TIMES SETTINGS HEURE:MIN $ timezone
		if (this.props.action === true) {
			console.log(global.User.token)
			await AsyncStorage.setItem('ActionSettings', tmp);
		} else {
			await AsyncStorage.setItem('ReactionSettings', tmp);
		}
	};

	onCancel() {
		this.TimePicker.close();
	}

	onConfirm = async (hours, min) => {
		this.setState({
			hour: hours,
			min: min,
		});
		console.log(hours);
		console.log(min);

		let tmp = this.state.hour + ":" + this.state.min + "$" + this.state.timezoneSelected
		//TIMES SETTINGS HEURE:MIN $ timezone
		if (this.props.action === true) {
			console.log("okA")
			await AsyncStorage.setItem('ActionSettings', tmp);
		} else {
			console.log("okREA")
			await AsyncStorage.setItem('ReactionSettings', tmp);
		}
		this.TimePicker.close();
	};

	render() {
		return(
			<View style={styles.ViewSettings}>
				<RNPickerSelect
					onValueChange={(value) => this.changeValue(value)}
					items={this.state.timezone}>
				</RNPickerSelect>
				<TouchableOpacity
					onPress={() => this.TimePicker.open()}
					style={styles.button}
				>
					<Text>Choose time</Text>
				</TouchableOpacity>
				<Text>{this.state.hour}:{this.state.min}</Text>
				<TimePicker
					ref={ref => {
						this.TimePicker = ref;
					}}
					onCancel={() => this.onCancel()}
					onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
				/>
			</View>
		)
	}
}

export default TimesSettings;

var styles = StyleSheet.create({
	ViewSettings: {
		height: Layout.window.height * 0.5,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
	},
	button: {
		backgroundColor: Theme.theme.seagreen,
		paddingVertical: 11,
		paddingHorizontal: 17,
		borderRadius: 3,
		marginVertical: 50
	},
});