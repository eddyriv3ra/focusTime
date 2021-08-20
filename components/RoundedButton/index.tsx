import React from "react";
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { View, Text } from "react-native";

interface RoundedButtonProps {
  style?: StyleProp<TouchableOpacityProps>;
  textStyle?: StyleProp<TextStyle>;
  size?: number;
  title: string;
}

const RoundedButton = ({
  style,
  textStyle,
  size = 125,
  title,
}: RoundedButtonProps) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = (size: number) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2,
    },
    text: {
      color: "#fff",
      fontSize: size / 3,
    },
  });
