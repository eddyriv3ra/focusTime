import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CountdownProps {
  minutes: number;
  isPaused: boolean;
  onProgress: (value: number) => void;
  onEnd: () => void;
}

const Countdown = ({
  minutes,
  isPaused,
  onProgress,
  onEnd,
}: CountdownProps) => {
  const countDown = () => {
    setMillis((time: number) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  const minutesToMillis = (min: number) => min * 1000 * 60;
  const [millis, setMillis] = useState<number>(0);
  const interval = useRef<any>(null);

  useEffect(() => {
    if (isPaused) {
      clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
    return () => clearInterval(interval.current);
  }, [isPaused, millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  container: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(94, 132, 226, 0.3)",
    height: 140,
  },
  text: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#fff",
  },
});
