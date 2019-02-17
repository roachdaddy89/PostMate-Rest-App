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
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <MenuDrawer navigation={navigation} />
    },
  },
);


const App = createBottomTabNavigator(
  {
    Collections: {
      screen: CollectionScreen
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
    tabBarOptions: {
      activeTintColor: '#216F93',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        height: 55,
        borderTopColor: 'gray',
        borderTopWidth: 2,
      },
    },
  },
)

const Stack = createStackNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator,
    },
    Home: {
      screen: App
    },
    RouteScreen: {
      screen: RouteScreen
    }
  },
  {
    headerMode: 'none',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default createAppContainer(Stack);