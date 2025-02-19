import { StyleSheet, Image, View } from "react-native";
import React from "react";

const Sprite = ({currentPokemon}) => {
  return (
    <View style={styles.imageContainer}>
      {currentPokemon && (
        <Image
          source={{ uri: currentPokemon?.sprite }}
          style={{ width: 300, height: 300, resizeMode: "contain" }}
        />
      )}
    </View>
  );
};

export default Sprite;

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center"
    }
});
