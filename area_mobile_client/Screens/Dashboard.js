import React from "react";
import {TextInput, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";
import axios from 'axios';
import ConnectScreen from "./Connexion";
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import Theme from "../Constant/Theme";
import Area from "../Component/Area";
//import { Ionicons } from '@expo/vector-icons';

class DashScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Dashboard",
			headerRight: () => (
				<Button onPress={navigation.getParam('handleProfilTap')}
								title={"Services"}
								color="red"
				/>
			),
			headerStyle: {
				backgroundColor: Theme.theme.seagreen,
			},
			headerTintColor: '#fff',

			headerTitleStyle: {
				fontWeight: 'bold',
				textAlign: 'center',
				flex: 1
			},
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			area : [],
			isThereSomeone: false,
			keyValue: 1,
		};
		this.forceRemount = this.forceRemount.bind(this)
	}

	componentDidMount() {
		console.log("COMPONENTDIDMOUNT DASHBOARD")
		this.props.navigation.setParams({ handleProfilTap: this._handleProfil });
		const config = {
			headers : { Authorization: `Bearer ${global.User.token}`},
		};
		axios.get(`http://lucaspoirel.ovh:8080/action/react/${global.User.id}`, config)
			.then(res => {
				console.log(res)
				console.log("Area call information");
				console.log(res.data);
				this.setState({
					area: Array.from(res.data)
				});
			})
	}

	_retrieveData = async () => {
	};

	forceRemount() {
		const config = {
			headers : { Authorization: `Bearer ${global.User.token}`},
		};
		axios.get(`http://lucaspoirel.ovh:8080/action/react/${global.User.id}`, config)
			.then(res => {
				console.log("Area call information");
				//console.log(res.data);
				this.setState({
					area: Array.from(res.data),
					keyValue: this.state.keyValue + 1
				});
			})
	}

	_handleProfil = () => {
		this.props.navigation.navigate('Profil')
	};

	handleTabChange = () => {
		console.log("Tap");
		this.props.navigation.navigate('Ajouter')
	};

	getAreas(elem, i) {
		console.log("GetAreas ");
		return <Area settings={this.state.area[i]} unique={i} forceUpdate={this.forceRemount}/>
	}

	render() {
		let areas;
		let tmp;

		console.log("a");
		if (this.state.area !== undefined) {
			console.log("b");
			let i = 0
			console.log(this.state.area);
			while (this.state.area[i] !== undefined) {
				console.log("build an area");
				areas = this.getAreas(i)
				i++;

			}
			areas = this.state.area.map((elem, i) => { return this.getAreas(elem, i)})
			console.log("fin area");
		} else {
			this.forceRemount()
		}
		return (
			<View style={styles.mainViewStyle} key={this.state.keyValue}>
				{areas}
				<TouchableOpacity onPress={this.forceRemount}>
					<Text style={{justifyContent: "center", textAlign: "center"}}> Update this Page</Text>
				</TouchableOpacity>
				<View style={styles.footer}>
					<TouchableHighlight style={styles.bottomButtons}>
							<Text style={styles.footerText}>Home</Text>
					</TouchableHighlight>
					<TouchableOpacity style={styles.bottomButtons} onPress={this.handleTabChange}>
						<Text>Add</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default DashScreen

var styles = StyleSheet.create({
	mainViewStyle: {
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
	}
});