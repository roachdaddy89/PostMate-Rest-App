import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon as RNEIcon } from 'react-native-elements';

import Favorites from './components/Favorites/Favorites';
import CollectionScreen from './components/HomeScreen/CollectionScreen';
import RouteScreen from './components/CollectionOverView/RouteScreen';
import MenuDrawer from './components/Shared/MenuDrawer';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: CollectionScreen,
    }
  },
  {
    headerMode: 'none',
    contentComponent: ({ navigation }) => {
      return <MenuDrawer navigation={navigation} />
    },
  },
);

const Collections = createStackNavigator(
  {
    Collections: {
      screen: CollectionScreen
    },
    RouteScreen: {
      screen: RouteScreen
    }
  }
);

const App = createBottomTabNavigator(
  {
    Collections: {
      screen: Collections
    },
    Settings: {
      screen: Favorites
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Collections') {
          return <RNEIcon name="list" size={35} color={tintColor} />
        } else if (routeName === 'Settings') {
          return <RNEIcon name="settings" size={30} color={tintColor} />
        }
      },
    }),
    headerMode: 'none',
    tabBarOptions: {
      activeTintColor: '#216F93',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        borderTopColor: 'gray',
        borderTopWidth: 2,
      },
    },
  }
);

const Stack = createStackNavigator(
  {
    Home: {
      screen: App
    }
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(Stack);