import React, { useState, useEffect } from "react";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import { StyleSheet, Text, View, Platform, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import Countdown from "../../components/countdown";
import RoundedButton from "../../components/roundedButton";
import Timing from "../../components/timing";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TimerScreenProp = StackNavigationProp<RootStackParamList, "Timer">;
type TimerScreenRouteProp = RouteProp<RootStackParamList, "Timer">;

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 0,
};

const Timer = () => {
  const navigation = useNavigation<TimerScreenProp>();
  const route = useRoute<TimerScreenRouteProp>();
  const { task } = route.params;
  const [minutes, setMinutes] = useState<number>(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [focusHistory, setFocusHistory] = useState<any>([]);

  const saveFocusHistory = async () => {
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
      saveFocusHistory();
    }, [])
  );

  const addFocusHistorySubjectWithStatus = async (status: number) => {
    const newHistory = [...focusHistory, { task, status }];
    try {
      AsyncStorage.setItem("focusHistory", JSON.stringify(newHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const onProgress = (progress: number) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(1000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    addFocusHistorySubjectWithStatus(STATUSES.COMPLETED);
    navigation.navigate("Home");
  };

  const handleTime = (min: number) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onCancel = () => {
    addFocusHistorySubjectWithStatus(STATUSES.CANCELLED);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.countdown}>
          <Countdown
            isPaused={!isStarted}
            onProgress={onProgress}
            minutes={minutes}
            onEnd={onEnd}
          />
        </View>
      </SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{task}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={handleTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
              activateKeepAwake();
            }}
          />
        ) : (
          <RoundedButton
            title="Pause"
            onPress={() => {
              setIsStarted(false);
              deactivateKeepAwake();
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={onCancel} />
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252250",
    justifyContent: "center",
  },
  titleContainer: {
    marginTop: 80,
  },
  title: {
    color: "#fff",
    textAlign: "center",
  },
  task: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    paddingTop: 8,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
