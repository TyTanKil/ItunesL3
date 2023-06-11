import React, { useState } from 'react';
import { View, TextInput, Button} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TrackList from '../screens/TrackList';
import AlbumList from '../screens/AlbumList';
import ArtistList from '../screens/ArtistList';


const API_URL = 'https://itunes.apple.com/search';

const Tab = createMaterialTopTabNavigator();


const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchItunes = async () => {
    try {
      const limit = 20;
      const entity = 'musicArtist,musicTrack,album';
      const response = await fetch(`${API_URL}?term=${query}&limit=${limit}&entity=${entity}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };    


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Search..."
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
      <Button title="Search" onPress={searchItunes} />
      <Tab.Navigator>
        <Tab.Screen name="Tracks">
            {() => <TrackList results={results} />}
        </Tab.Screen>
        <Tab.Screen name="Albums">
            {() => <AlbumList results={results} />}
        </Tab.Screen>
        <Tab.Screen name="Artists">
            {() => <ArtistList results={results} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default SearchScreen;
