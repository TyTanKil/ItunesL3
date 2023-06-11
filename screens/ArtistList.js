import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArtistList = ({ results }) => {

    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        // Vérifier si l'élément est une chanson
        if (item.wrapperType === 'artist') {
          return (
            <TouchableOpacity onPress={() => handleItemClick(item)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: '#ccc', marginRight: 10 }}>
                <Image
                    source={{ uri: item.artistImage }}
                    style={{ width: 60, height: 60 }}
                />
                </View>
                <Text>{item.artistName}</Text>
              </View>
            </TouchableOpacity>
          );
        }
      
        // Si ce n'est pas un artiste, retourner null pour ne rien afficher
        return null;
      };

      const handleItemClick = (item) => {
        console.log(item);
        navigation.navigate('Details', { item });
      };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ArtistList;
