import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../FavoritesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {

  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris :', error);
    }
  };

  const saveFavorites = async () => {
    try {
      const favoritesJson = JSON.stringify(favorites);
      await AsyncStorage.setItem('favorites', favoritesJson);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris :', error);
    }
  };

  const removeFavorite = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.trackId !== item.trackId));
  };

  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{item.artistName} - </Text>
          <Text>{item.trackName}</Text>
        </View>
        <Text>({item.wrapperType})</Text>
        <Ionicons
          name="trash"
          size={20}
          color="black"
          onPress={() => removeFavorite(item)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name="heart" size={20} color="red" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mes Favoris</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={renderFavoriteItem}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <Text style={{ fontStyle: 'italic' }}>Aucun favori pour le moment</Text>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
