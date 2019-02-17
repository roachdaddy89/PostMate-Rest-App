import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Text } from 'react-native';
import { Button as RNEButton, Overlay, Input } from 'react-native-elements';
import MenuButton from '../Shared/MenuButton';
import { Collections, Routes } from '../../lib/Helper';
import RouteList from './RouteList';

export default class RouteScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collection: [],
			routes: [],
			collectionId: null,
			isVisible: false,
			routeToAddName: '',
			routeToAddDesc: '',
			routeToAddBaseUrl: '',
			routeToAddApiRoute: ''
		}
	}

	async componentDidMount() {
		const { navigation } = this.props;
		const collectionId = navigation.getParam('collectionId', '');
		const response = await Routes.handleLoadRoutesFromCollection(collectionId);

		this.setState({
			collectionId: collectionId,
			routes: response.routes
		});
	}

	async handleSaveRoute() {
		const { collectionId, routeToAddName, routeToAddDesc, routeToAddBaseUrl, routeToAddApiRoute } = this.state;

		var response = await Routes.handleSaveRoute(collectionId,
			routeToAddName,
			routeToAddDesc,
			routeToAddBaseUrl,
			routeToAddApiRoute
		);

		this.setState({ isVisible: response.isVisible, routes: response.routes });
	}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.navHeader}>
					<MenuButton navigation={navigation} />
				</View>
				<View style={styles.container}>
					{
						this.state.isVisible && (
							<Overlay isVisible
								windowBackgroundColor="rgba(100, 100, 100, .1)"
								onBackdropPress={() => this.setState({ isVisible: false })}
								overlayStyle={stylesCollectionOverlay.overlay}
								borderRadius={5}
							>
								<View>
									<View style={stylesCollectionContainer.header}>
										<Text style={stylesCollectionContainer.headerText}>
											CREATE A NEW ROUTE
                    </Text>
									</View>
									<View style={stylesCollectionContainer.mainBody}>
										<Text style={stylesCollectionContainer.mainBodyText}>
											Enter the new route name:
                    </Text>
										<Input
											inputContainerStyle={stylesCollectionContainer.input}
											onChangeText={(text) => this.setState({ routeToAddName: text })}
										/>
										<Text style={stylesCollectionContainer.mainBodyText}>
											Enter the new route description:
                    </Text>
										<Input
											inputContainerStyle={stylesCollectionContainer.input}
											onChangeText={(text) => this.setState({ routeToAddDesc: text })}
										/>
										<Text style={stylesCollectionContainer.mainBodyText}>
											Enter the new base url:
                    </Text>
										<Input
											inputContainerStyle={stylesCollectionContainer.input}
											placeholder="https://api.unsplash.com"
											onChangeText={(text) => this.setState({ routeToAddBaseUrl: text })}
										/>
										<Text style={stylesCollectionContainer.mainBodyText}>
											Enter the new api route
                    </Text>
										<Input
											inputContainerStyle={stylesCollectionContainer.input}
											placeholder="/photos/random/"
											onChangeText={(text) => this.setState({ routeToAddApiRoute: text })}
										/>
										<View style={stylesCollectionContainer.buttonContainer}>
											<RNEButton
												title="Save Route"
												type="solid"
												onPress={() => {
													this.handleSaveRoute()
												}}
												buttonStyle={stylesCollectionContainer.button}
											/>
										</View>
									</View>
								</View>
							</Overlay>
						)
					}

					<ScrollView contentContainerStyle={styles.routeList}>
						<RouteList navigation={navigation} allroutes={this.state.routes} />
					</ScrollView>

					<View style={styles.tabBarInfoContainer}>
						<RNEButton
							title="Add Route"
							type="solid"
							onPress={() => this.setState({ isVisible: true })}
						/>
					</View>
				</View>
			</View>
		)
	}
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: height * .01
	},
	routeList: {
		flex: 1,
		marginTop: height * .1,
		borderTopWidth: 1,
		borderTopColor: 'gray'
	}
});

const stylesCollectionOverlay = StyleSheet.create({
	overlay: {
		height: height * .5,
		width: width * .8,
		borderColor: 'gray',
		borderWidth: 1
	},
});

const stylesCollectionContainer = StyleSheet.create({
	header: {
		height: height * .05,
		borderWidth: 1,
		borderColor: 'gray',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	headerText: {
		paddingTop: height * .01,
		paddingLeft: width * .025,
	},
	mainBody: {
		height: height * .42,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderColor: 'gray',
	},
	mainBodyText: {
		fontSize: 15,
		paddingTop: height * .01,
		paddingLeft: width * .025,
	},
	buttonContainer: {
		paddingTop: height * .01,
		marginLeft: width * .015,
	},
	button: {
		marginLeft: width * .01,
		width: width * .68,
	},
	input: {
		paddingLeft: width * .02,
		marginLeft: width * .005,
		marginTop: height * .01,
		width: width * .68,
		height: height * .04,
		backgroundColor: 'lightgray'
	}
})