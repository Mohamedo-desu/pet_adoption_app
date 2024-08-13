import { Colors } from "@/constants/colors";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  multiline?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoComplete?: TextInputProps["autoComplete"];
}

const FormInput = ({
  label,
  value,
  onChangeText,
  style,
  multiline,
  keyboardType,
  autoComplete,
}: FormInputProps) => {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}*</Text>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: moderateScale(15),
  },
  label: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(10),
    fontFamily: "Regular",
    color: Colors.gray,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: moderateScale(10),
    fontSize: moderateScale(15),
    backgroundColor: Colors.light_gray,
    fontFamily: "Medium",
  },
});

export default FormInput;
