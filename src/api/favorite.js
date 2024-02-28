import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { FAVORITE_STORAGE } from "../utils/constants";

export async function addPokemonFavoriteApi(id) {
  try {
    const favorites = [];
    favorites.push(id);
    await AsyncStorage.setItem("favorites");
  } catch (error) {}
}
