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

//Image preview component
import Lightbox from 'react-native-lightbox-v2';

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

  //Page Limit
  const PAGE_PER_LIMIT = 10;

  //Variables using react native hooks
  const [value, setValue] = useState(null);
  const [carBridList,setCatBridList] = useState([]);
  const [catImageList, setCatImageList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  //React native useEffect hook
  useEffect(() => {
    getCatBreedListFromApi();
  }, []);

  useEffect(() => {
  }, [isLoading]);

  //Cat breed list api for filter dropdown
  const getCatBreedListFromApi = async () => {
    return fetch('https://api.thecatapi.com/v1/breeds?limit=30&page=1')
      .then((response) => response.json())
      .then((jsonResponse) => {
        if(jsonResponse){
          jsonResponse.forEach(element => {
            setCatBridList(carBridList => [...carBridList, { label: element.name, value: element.id }])
          });
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message)
      });
  };

  //Get cat images api call
  function getCatImagesFromApi(breedID) {
    if (catImageList.length == 0) {
      setShowLoader(true)
    }
    return fetch('https://api.thecatapi.com/v1/images/search?breed_ids='+breedID+'&limit='+PAGE_PER_LIMIT+'&page='+page)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if(jsonResponse){
        //Set paglimit for pagination
        setPageLimit(Object.keys(jsonResponse).length)
        
        jsonResponse.forEach(element => {
          setCatImageList(catImageList => [...catImageList, element])
        });
        setIsLoading(false)
        setShowLoader(false)
      }
    })
    .catch((error) => {
      setIsLoading(false)
      setShowLoader(false)
      Alert.alert("Error", error.message)
    });
  }

  //Render cat image list item 
  const imageItem = ({ item, index }) => {
    return(
      <View>
        <Lightbox underlayColor="white">
          <Image
            defaultSource={require('./assets/placeholderImg.png')}
            style={styles.contain}
            resizeMode='contain'
            source={{ uri: item.url}}
          />
        </Lightbox>
        <View style={styles.lineSep} />
      </View>
    )
  }

  //Show loading animation from bottom for pagination
  function renderBottomLoader() {
    return (
        <View style={styles.viewBottomLoader}>
          <ActivityIndicator color={'black'} size={30} />
          <Text style={{fontSize: 16}}>Please wait...</Text>
        </View>
    )
  }

  //Render UI
  return (
    //Show activity indicator first time or item changed from filter
    showLoader ? <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View> 
    : 
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

      {/* Cat image list */}
      <FlatList
        extraData={isLoading}
        initialNumToRender={10} 
        onEndReached={() => {
          setPage(page + 1);
          if (pageLimit == PAGE_PER_LIMIT) {
            setIsLoading(true)
            getCatImagesFromApi(value);
          }
        }}
        style={{paddingBottom: 30}}
        ListFooterComponent={isLoading ? renderBottomLoader : null}
        keyExtractor={(item, index) => index.toString()}
        data={catImageList}
        renderItem={imageItem}
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
  contain: {
    flex: 1,
    height: 150
  },
  lineSep: {
    height: 1,
    backgroundColor: "gray",
    width: '100%',
    marginVertical: 10,
  },
  viewBottomLoader:{
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});