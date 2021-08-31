import React from "react";
import {
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

interface RoundedButtonProps extends TouchableOpacityProps {
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
  ...touchableProps
}: RoundedButtonProps) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} {...touchableProps}>
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
