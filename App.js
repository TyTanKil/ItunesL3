import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';
import { FavoritesProvider } from './FavoritesContext';
import FavoriScreen from './components/FavoriScreen';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const [favorites, setFavorites] = useState([]);


  const SearchStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Rechercher" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    );
  };

  const FavoritesStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MaBase"
          component={FavoriScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Recherche"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Ma Base"
            component={FavoritesStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
