import React, { Component } from 'react'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Text, Icon } from 'native-base';
import { Image } from 'react-native-elements';

export default class CollectionOverView extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	handleOnPress = (allcollections, collectionId) => {
		const { navigation } = this.props;

		allcollections.forEach(element => {
			if (element.id === collectionId) {
				navigation.navigate('RouteScreen', {
					collectionId: collectionId
				});
			}
		});
	}

	render() {
		const list = ({ allcollections }) => {
			if (allcollections) {
				return allcollections.map(collection => {
					return (
						<ListItem key={collection.id} avatar onPress={() => this.handleOnPress(allcollections, collection.id)}>
							<Left>
								<Image
									source={require('../../assets/Icons/collection.png')}
									style={{ width: 30, height: 30, marginTop: 5 }}
								/>
							</Left>
							<Body>
								<Text>
									{`${collection.name}, Request URLS: ${collection.routes.length || 0}`}
								</Text>
								<Text note>
									{`${collection.subtitle}`}
								</Text>
							</Body>
							<Right style={{ justifyContent: 'center' }}>
								<Icon name="heart" style={{ paddingRight: 5, fontSize: 30 }} />
							</Right>
						</ListItem>
					);
				})
			}
		}

		return (
			<Container>
				<Content>
					<List>
						{list(this.props)}
					</List>
				</Content>
			</Container>
		)
	}
}


