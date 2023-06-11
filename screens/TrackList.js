import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TrackList = ({ results }) => {

    console.log(results);
    
    const navigation = useNavigation();

  const renderItem = ({ item }) => {
    // Vérifier si l'élément est une chanson
    if (item.wrapperType === 'track') {
      return (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: item.artworkUrl60 }}
              style={{ width: 60, height: 60, marginRight: 10 }}
            />
            <Text>{item.trackName}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  
    // Si ce n'est pas une chanson, retourner null pour ne rien afficher
    return null;
  };

  const handleItemClick = (item) => {
    console.log(item);
    navigation.navigate('Details', { item });
  };
  
  

  return (
    <View style={{ flex: 1}}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TrackList;
