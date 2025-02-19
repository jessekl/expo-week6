import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import Quiz from "./screens/Quiz";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Quiz />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#e2ed80",
    paddingTop: 24,
  },
});
