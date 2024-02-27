import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null); // es para la url de los siguientes 20 pokemons
  const [loading, setLoading] = useState(false);

  //el use effect se ejecuta una vez cuando se monta el componente si el array esta vacio, si tiene
  //algun estado por ejemplo estado1, se ejecuta cada vez que cambia el estado1

  useEffect(() => {
    //funcion anomina autoejecutable "()()"
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl);
      setLoading(true);
      setNextUrl(response.next); // le pasa la url de los 20 siguientes pokemons
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetail = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          type: pokemonDetail.types[0].type.name,
          order: pokemonDetail.order,
          image: pokemonDetail.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ marginTop: 50 }} edges={{ bottom: "minimun" }}>
      <View>
        <PokemonList
          pokemons={pokemons}
          loadPokemons={loadPokemons}
          isNext={nextUrl} //pregunta si hay mas pokemons que cargar de los mil y pico
          isLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
