import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native'
import { Button as RNEButton, Overlay, Input } from 'react-native-elements';

import { Collections } from '../../lib/Helper';
import MenuButton from '../Shared/MenuButton';
import CollectionList from './CollectionList';

export default class CollectionScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: '',
			collections: [],
			isVisible: false,
			collectionToAddName: '',
			collectionToAddDesc: ''
		}
	}

	async handleSave() {
		const response = await Collections.handleSaveCollections({
			collectionToAddName: this.state.collectionToAddName,
			collectionToAddDesc: this.state.collectionToAddDesc
		});
		this.setState({ collections: response.collections, isVisible: response.isVisible })
	}

	async componentDidMount() {
		// Collections.handleRemoveAllCollections();
		const response = await Collections.handleLoadCollections();

		if (response.collections != null) {
			this.setState({ collections: response.collections });
		}
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
											CREATE A NEW COLLECTION
										</Text>
									</View>
									<View style={stylesCollectionContainer.mainBody}>
										<Text style={stylesCollectionContainer.mainBodyText}>
											Enter the new collections name:
										</Text>
										<Input
											inputContainerStyle={stylesCollectionContainer.input}
											onChangeText={(text) => this.setState({ collectionToAddName: text })}
										/>
										<Text style={stylesCollectionContainer.mainBodyText}>
											Enter the new collections description:
										</Text>
										<Input
											inputContainerStyle={stylesCollectionContainer.input}
											onChangeText={(text) => this.setState({ collectionToAddDesc: text })}
										/>
										<View style={stylesCollectionContainer.buttonContainer}>
											<RNEButton
												title="Save Collection"
												type="solid"
												onPress={() => this.handleSave()}
												buttonStyle={stylesCollectionContainer.button}
											/>
										</View>
									</View>
								</View>
							</Overlay>
						)
					}

					<ScrollView contentContainerStyle={styles.container}>
						<CollectionList navigation={navigation} allcollections={this.state.collections} />
					</ScrollView>

					<View style={styles.tabBarInfoContainer}>
						<RNEButton
							title="Add Collection"
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
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: { height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		height: height * .08,
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
		paddingVertical: 10,
		borderTopColor: 'grey',
		borderTopWidth: 2
	},
});

const stylesCollectionOverlay = StyleSheet.create({
	overlay: {
		height: height * .4,
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
		height: height * .32,
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
		paddingTop: height * .05,
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
		height: height * .05,
		backgroundColor: 'lightgray'
	}
})