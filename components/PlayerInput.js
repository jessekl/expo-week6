import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default PlayerInput = ({ submitAnswer, randomPokemon }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmitAnswer = () => {
    submitAnswer(answer);
    randomPokemon();
    setAnswer("");
  };

  const handleSkip = () => {
    randomPokemon();
    setAnswer("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.answerBox}
        onChangeText={setAnswer}
        value={answer}
        onSubmitEditing={handleSubmitAnswer}
      />
      <View style={styles.btnContainer}>
        <Pressable onPress={handleSkip} android_ripple={{ color: "#dddddd" }} >
          <Text style={styles.buttonText}>Skip</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmitAnswer}
          android_ripple={{ color: "#dddddd" }}
        >
          <Text style={styles.buttonText}>Answer</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 4,
    gap: 4
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
  },
  answerBox: {
    height: 40,
    borderWidth: 1,
  },
});
