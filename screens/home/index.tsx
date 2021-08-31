import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundedButton from "../../components/roundedButton";
import { TextInput } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { FocusHistory } from "./FocusHistory";

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const [task, setTask] = useState<string>("");

  const handleFocus = () => {
    if (task) {
      navigation.navigate("Timer", { task });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setTask("");
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What would you like to focus on?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={50}
              value={task}
              style={{ flex: 1, marginRight: 20 }}
              onChange={({ nativeEvent: { text } }) => setTask(text)}
              onSubmitEditing={({ nativeEvent: { text } }) => setTask(text)}
            />
            <RoundedButton title="+" size={50} onPress={handleFocus} />
          </View>
        </View>
        <FocusHistory />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252250",
  },
  titleContainer: {
    flex: 0.5,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
