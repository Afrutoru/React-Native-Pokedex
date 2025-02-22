import { Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonDetailsApi } from "../api/pokemon";
import Header from "../components/pokemon/header";
import Type from "../components/pokemon/Type";
import Stats from "../components/pokemon/Stats";
import Icon from "react-native-vector-icons/FontAwesome5";
import Favorite from "../components/pokemon/Favorite";
import useAuth from "../hooks/useAuth";

export default function PokemonScreen(props) {
  const {
    route: { params },
    navigation,
  } = props;
  const [pokemon, setPokemon] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (auth ? <Favorite id={pokemon?.id} /> : undefined),
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 5 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);
  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats}></Stats>
    </ScrollView>
  );
}
