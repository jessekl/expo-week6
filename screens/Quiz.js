import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import PlayerInput from "../components/PlayerInput";
import Sprite from "../components/Sprite";

const Quiz = () => {
  const [allpokemon, setAllPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      if (allpokemon.length !== 0) return;
      try {
        const allOldPokemon = await AsyncStorage.getItem("pokemon");
        if (allOldPokemon) {
          setAllPokemon(JSON.parse(allOldPokemon));
        } else {
          fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
            .then((response) => response.json())
            .then((json) => {
              console.log(json.results);
              const gen1ToGen3 = json.results.slice(0, 386);
              setAllPokemon(gen1ToGen3);

              AsyncStorage.setItem("pokemon", JSON.stringify(gen1ToGen3));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPokemon();
  }, []);

  const randomPokemon = async () => {
    if (allpokemon.length === 0) return;

    const randomIndex = Math.floor(Math.random() * allpokemon.length);
    const pokemon = allpokemon[randomIndex];
    const response = await fetch(pokemon.url);
    const data = await response.json();

    setCurrentPokemon({
      name: data.name,
      sprite: data.sprites.front_default,
    });
  };

  const submitAnswer = (answer) => {
    if (!currentPokemon || !answer) return;
    const isCorrect = currentPokemon.name === answer.toLowerCase();
    setScore((prev) => (isCorrect ? prev + 50 : Math.max(0, prev - 30)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{`Score: ${score}`}</Text>
      <Sprite currentPokemon={currentPokemon} />
      <PlayerInput submitAnswer={submitAnswer} randomPokemon={randomPokemon} />
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: "8",
    marginRight: "8",
  },
  score: {
    fontSize: 20,
  },
});
