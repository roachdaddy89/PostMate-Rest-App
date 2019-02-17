import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Text, Icon } from 'native-base';
import { Image } from 'react-native-elements';

export default class RouteList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	handleOnPress = (allroutes, id) => {
		const { navigation } = this.props;

		// allroutes.forEach(element => {
		// 	if (element.id === id) {
		// 		navigation.navigate('CollectionOverView', {
		// 			route: element,
		// 		});
		// 	}
		// });
	}

	render() {
		const list = ({ allroutes }) => {
			if (allroutes) {
				return allroutes.map(item => {
					return (
						<ListItem key={item.id} avatar onPress={() => this.handleOnPress(allroutes, item.id)}>
							<Left>
								<Image
									source={require('../../assets/Icons/route.png')}
									style={{ width: 30, height: 30, marginTop: 5 }}
								/>
							</Left>
							<Body>
								<Text>
									{`${item.name}`}
								</Text>
								<Text note>
									{`${item.route}`}
								</Text>
							</Body>
							<Right style={{ jsutifyContent: 'center' }}>
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
