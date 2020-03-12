import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

import LoginScreen from '../components/Authorization/LoginScreen';
import RegisterScreen from '../components/Authorization/RegisterScreen';
import { ScrollView } from "react-native-gesture-handler";


const AuthScreen = props => {

  return (
    <ScrollView>
      <LoginScreen></LoginScreen>
      <RegisterScreen></RegisterScreen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default AuthScreen;
