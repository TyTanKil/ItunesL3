import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Button } from 'react-native';
import StarRating from 'react-native-star-rating';
import { FavoritesContext } from '../FavoritesContext';

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [rating, setRating] = useState(item.averageUserRating);

  const { favorites, setFavorites } = useContext(FavoritesContext);

  

  const renderItemView = () => {
    if (item.wrapperType === 'track') {
      return (
        <View>
          <Image source={{ uri: item.artworkUrl100 }} style={{ width: 100, height: 100, marginBottom: 10 }} />
          <Text>Type: Track</Text>
          <Text>Track Name: {item.trackName}</Text>
          <Text>Artist: {item.artistName}</Text>
          <Text>Genre: {item.primaryGenreName}</Text>
          <Text>Album: {item.collectionCensoredName}</Text>
          <StarRating
            disabled={false} // Rendre les étoiles interactives
            maxStars={5}
            rating={rating}
            fullStarColor="gold"
            emptyStarColor="gray"
            selectedStar={handleRatingPress}
          />
          <Button title="Ajouter aux favoris" onPress={handleAddToFavorites} />
        </View>
      );
    } else if (item.wrapperType === 'collection') {
      return (
        <View>
          <Image source={{ uri: item.artworkUrl100 }} style={{ width: 100, height: 100, marginBottom: 10 }} />
          <Text>Type: Artist</Text>
          <Text>Artist Name: {item.artistName}</Text>
          <Text>Genre: {item.primaryGenreName}</Text>
          <StarRating
            disabled={false} // Rendre les étoiles interactives
            maxStars={5}
            rating={rating}
            fullStarColor="gold"
            emptyStarColor="gray"
            selectedStar={handleRatingPress}
          />
          <Button title="Ajouter aux favoris" onPress={handleAddToFavorites} />
        </View>
      );
    } else if(item.wrapperType === 'artist') {
      return (
        <View>
          <View style={{ backgroundColor: '#ccc', width: 100, height: 100, marginBottom: 10 }}>
          </View>
          <Text>Type: Artist</Text>
          <Text>Artist Name: {item.artistName}</Text>
          <Text>Genre: {item.primaryGenreName}</Text>
          <StarRating
            disabled={false} // Rendre les étoiles interactives
            maxStars={5}
            rating={rating}
            fullStarColor="gold"
            emptyStarColor="gray"
            selectedStar={handleRatingPress}
          />
          <Button title="Ajouter aux favoris" onPress={handleAddToFavorites} />
        </View>
      );
    } else {
      return null;
    }
  };

  const handleRatingPress = (rating) => {
    setRating(rating);
  };

  const handleAddToFavorites = () => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };
  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {renderItemView()}
    </View>
  );
};

export default DetailsScreen;
