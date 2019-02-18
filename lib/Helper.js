import { AsyncStorage } from 'react-native';
import SuccessType from './SuccessType';

const uuidv4 = require('uuid/v4');

const Helper = {
	logIn: async (type) => {
		if (type === 'FB') {
			try {
				const {
					type,
					token,
				} = await Expo.Facebook.logInWithReadPermissionsAsync('231447147761484', {
					permissions: ['public_profile'],
				});
				if (type === 'success') {
					const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
					return {
						json: await response.json(),
						type: SuccessType.Success
					};
				}
				return { type: SuccessType.Fail }
			}
			catch ({ message }) { alert(`Facebook Login Error: ${message}`); }
		}
		else if (type === 'Local') {
			return {
				json: null,
				type: SuccessType.Success
			};
		}
		return [null, SuccessType.Fail];
	}
}

const Users = {
	handleSaveUsers: async (user) => {
		const allUsers = await AsyncStorage.getItem('Users');
		const users = [...allUsers, user];
		try {
			await AsyncStorage.setItem('Users', JSON.stringify(users));
			return user;
		}
		catch (err) { console.error(err); }
	},
	handleLogin: async (user) => {
		const allUsers = await AsyncStorage.getItem('Users');
		const foundUser = allUsers.map(u => u.id === user.id);
		try {
			if (foundUser.length > 0) {
				const itemsToLoad = await AsyncStorage.getItem('Users');
				return JSON.parse(itemsToLoad);
			}
		}
		catch (err) { console.error(err); }
	},
	handleRemoveUser: async (user) => {
		const allUsers = await AsyncStorage.getItem('Users');
		allUsers.forEach((u, i) => {
			if (u.id === user.id) {
				allUsers.splice(i, 1);
			}
		});

		try {
			await AsyncStorage.removeItem('Users');
			await AsyncStorage.setItem('Users', allUsers);
		}
		catch (err) { console.error(err); }
	},
	handleRemoveAllUsers: async () => {
		try { await AsyncStorage.removeItem('Users'); }
		catch (err) { console.error(err); }
	},
}

const Collections = {
	handleSaveCollections: async (data) => {
		const collections = await AsyncStorage.getItem('Collections');
		const response = await JSON.parse(collections) || [];
		const newCollection = {
			id: uuidv4(),
			name: data.collectionToAddName,
			avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
			subtitle: data.collectionToAddDesc,
			routes: []
		};
		const list = [...response, newCollection];

		try {
			await AsyncStorage.setItem('Collections', JSON.stringify(list));
			return {
				collections: list,
				isVisible: false
			}
		}
		catch (err) { console.error(err); }
	},
	handleRemoveAllCollections: async () => {
		try { await AsyncStorage.removeItem('Collections'); }
		catch (err) { console.error(err); }
	},
	handleLoadCollections: async () => {
		try {
			const itemsToLoad = await AsyncStorage.getItem('Collections');
			console.log(await JSON.parse(itemsToLoad));
			return {
				collections: await JSON.parse(itemsToLoad)
			}
		}
		catch (err) { console.error(err); }
	},
	handleLoadCollection: async (collectionId) => {
		try {
			const itemsToLoad = await AsyncStorage.getItem('Collections');
			let response = await JSON.parse(itemsToLoad);
			let result;
			let routes;

			response.forEach(element => {
				if (element.id === collectionId) {
					result = element;
				}
			});

			if (typeof routes === 'object') {
				routes = result.routes;
			}

			return {
				collection: result,
				routes: result.routes
			}
		}
		catch (err) { console.error(err); }
	},
	handleEditCollection: async (collectionToUpdate) => {
		const collections = await AsyncStorage.getItem('Collections');
		const response = await JSON.parse(collections);

		if (response) {
			try {
				const removeCollectionToUpdate = response.filter(collection => {
					if (collection.id != collectionToUpdate.id) {
						return collection;
					}
				});
				const collectionArrayToSave = [...removeCollectionToUpdate, collectionToUpdate];

				await AsyncStorage.setItem('Collections', JSON.stringify(collectionArrayToSave));
			}
			catch (err) { console.error(err); }
		}
	}
}

const Routes = {
	handleSaveRoute: async (id, name, description, baseUrl, apiRoute) => {
		try {
			const response = await Collections.handleLoadCollection(id);

			const routes = [...response.collection.routes, {
				id: uuidv4(),
				name: name,
				subtitle: description,
				route: `${baseUrl}${apiRoute}`
			}];

			response.routes = routes;
			response.collection.routes = routes;

			await Collections.handleEditCollection(response.collection);

			return {
				routes: response.collection.routes,
				isVisible: false
			}
		}
		catch (err) {
			console.error(err);
		}
	},
	handleLoadRoutesFromCollection: async (collectionId) => {
		try {
			const response = await Collections.handleLoadCollection(collectionId);
			return {
				routes: response.routes,
			}
		}
		catch (err) { console.error(err); }
	}
}

const RouteOptions = {
	types: [{
		value: 'GET'
	}, {
		value: 'POST'
	}, {
		value: 'PUT'
	}, {
		value: 'DELETE'
		//}, {
		// 	value: 'COPY'
		// }, {
		// 	value: 'HEAD'
		// }, {
		// 	value: 'OPTIONS'
		// }, {
		// 	value: 'LINK'
		// }, {
		// 	value: 'UNLINK'
		// }, {
		// 	value: 'PURGE'
		// }, {
		// 	value: 'LOCK'
		// }, {
		// 	value: 'UNLOCK'
		// }, {
		// 	value: 'VIEW'
		// 
	}]
}

export {
	RouteOptions,
	Routes,
	Collections,
	Helper,
	Users,
};