import React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import AppSettings from '../../app.json';

const { height } = Dimensions.get('window');

export default class MenuDrawer extends React.Component {
	navLink(nav, text) {
		return (
			<TouchableOpacity
				style={{ height: 50 }}
				onPress={() => this.props.navigation.navigate(nav)}
			>
				<Text style={styles.link}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.topLinks}>
					<View style={styles.profile}>
						<View style={styles.imgView}>
							<Image
								style={styles.img}
								source={require('../../assets/Profile/profilePic.jpg')}
							/>
						</View>
						<View style={styles.profileText}>
							<Text style={styles.name}>
								Welcome to
							</Text>
							<Text style={styles.name}>
								PostMate
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.bototmLinks}>
					{this.navLink('Home', 'Home')}
					{this.navLink('Settings', 'Settings')}
					{this.navLink('Profile', 'Profile')}
				</View>
				<View style={styles.footer}>
					<Text style={styles.description}>PostMate API EXP</Text>
					<Text style={styles.version}>V{AppSettings.expo.version}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightgrey"
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left'
	},
	topLinks: {
		height: height * 0.23,
		backgroundColor: '#2a2e38',
	},
	bototmLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	cardText: {
		color: 'white',
		paddingTop: 40,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: 'white',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 50,
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderBottomColor: 'lightgrey',
	},
	description: {
		flex: 1,
		marginLeft: 20,
		fontSize: 14,
	},
	version: {
		flex: 1,
		textAlign: 'right',
		marginRight: 20,
		color: 'grey',
	}
})