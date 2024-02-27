import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import React from "react";
import getColorByPokemonType from "../utils/getColorByPokemonType";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function PokemonCard(props) {
  const navigation = useNavigation();

  const { pokemon } = props;
  const pokemonColor = getColorByPokemonType(pokemon.type);
  const card = { backgroundColor: pokemonColor, ...styles.card };
  const goToPokemon = () => {
    navigation.navigate("PokemonScreen", { id: pokemon.id });
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goToPokemon}>
        <View style={card}>
          <Text style={styles.order}>#{`${pokemon.order}`.padStart(3, 0)}</Text>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  order: {
    color: "#fff",
    textAlign: "right",
  },
  card: {
    borderRadius: 10,
    padding: 10,
    height: 130,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: -5,
  },
  image: {
    alignSelf: "flex-end",
    width: 90,
    height: 90,
  },
});
