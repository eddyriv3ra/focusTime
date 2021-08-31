import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "../../components/roundedButton";
import { useFocusEffect } from "@react-navigation/native";

export const FocusHistory = () => {
  const [focusHistory, setFocusHistory] = useState<any>([]);

  const clearHistory = () => {
    setFocusHistory([]);
    try {
      AsyncStorage.setItem("focusHistory", JSON.stringify([]));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFocusHistory();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Things we've focused on</Text>
        {!!focusHistory.length && (
          <FlatList
            style={styles.itemsContainer}
            contentContainerStyle={styles.contentContainer}
            data={focusHistory}
            keyExtractor={(item, index) => `${item.task}${index}`}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.historyItem,
                  item.status > 0 ? { color: "green" } : { color: "red" },
                ]}
              >
                {item.task}
              </Text>
            )}
          />
        )}
        {!focusHistory.length && (
          <Text style={styles.contentText}>Nothing yet</Text>
        )}
      </View>
      <SafeAreaView style={styles.clearContainer} edges={["bottom"]}>
        <RoundedButton size={75} title="Clear" onPress={clearHistory} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  title: { fontSize: 24, color: "white" },
  itemsContainer: { width: "100%", height: "100%", paddingTop: 16 },
  contentContainer: { alignItems: "center" },
  contentText: { color: "white" },
  historyItem: {
    fontSize: 16,
  },
  clearContainer: {
    alignItems: "center",
    padding: 8,
  },
});
