import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform,
} from "react-native";
import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext, isLoading } = props;

  const loadMore = () => {
    loadPokemons();
  };

  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={!isLoading && isNext && loadMore} // se activa cuando llegas al final del scroll
      onEndReachedThreshold={0.1} // se activa un 0.1 antes de llegar al final del scroll para darle tiempo a cargar mas pokemons
      ListFooterComponent={
        isLoading &&
        isNext && <ActivityIndicator size="large" style={styles.spinner} /> // si hay mas pokemon que cargar sigue cargando mas
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60, // esto le da a android 90 y a ios 60
  },
});
