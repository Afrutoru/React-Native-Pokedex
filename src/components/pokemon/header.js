import {
  SafeAreaProvider,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
} from "react-native";
import React from "react";
import getColorByPokemonType from "../../utils/getColorByPokemonType";
import { capitalize } from "lodash";

export default function header(props) {
  const { name, order, image, type } = props;
  const color = getColorByPokemonType(type);

  const bgStyle = [{ backgroundColor: color, ...styles.bg }];

  return (
    <>
      <View style={bgStyle} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{capitalize(name)}</Text>
          <Text style={styles.order}>#{`${order}`.padStart(3, 0)}</Text>
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  order: {
    color: "#fff",
    fontWeight: "bold",
  },
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transfor: [{ scaleX: 2 }],
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 0,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
});
