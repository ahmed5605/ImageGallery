import React from 'react';
import { LogBox, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './src/HomePage';

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
          title: ' ',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => 
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
              <Image
                  source={require('./assets/back.png')}
                  style={{height: 24, width: 24}}
              />
              <Text style={{fontSize: 22}} > home</Text>
          </TouchableOpacity>
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;