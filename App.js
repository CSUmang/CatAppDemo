//Import react native hooks
import React, {useEffect, useState} from 'react';

//Import react native controls
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

//Import react navigation
import {NavigationContainer} from '@react-navigation/native';

//Import react stack navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Application main screen
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Cat Breeds"
          component={CatBreedScreen}
          options={{headerStyle: styles.headerStyle}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Create stack navigation
const Stack = createNativeStackNavigator();

//Cat breed list screen
function CatBreedScreen() {

  
}