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

//Dropdown component
import { Dropdown } from 'react-native-element-dropdown';

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

  //Render UI
  return (
    <View>
      {/* Filter dropdown */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={carBridList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select cat breed"
        searchPlaceholder="Search breed..."
        value={value}
        onChange={item => {
          setCatImageList([])
          setShowLoader(true)
          setValue(item.value);
          getCatImagesFromApi(item.value);
        }}
      />
    </View>
  );
}

//Custom styles
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'cyan',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 2,
  },
  dropdown: {
    margin: 16,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderBottomColor: 'gray',
    borderWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});