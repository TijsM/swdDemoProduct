import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import consts from "../../constants/ApiKeys";

const RegisterScreen = props => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [registerSuccess, setRegisterSuccess] = useState(false);

  let content = <Text></Text>;

  const register = async () => {
    console.log("register clicked");
    console.log(email);
    console.log(password);

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${consts.firebaseConfig.apiKey}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    console.log(response);

    if (response.ok) {
      console.log("registered");
      setRegisterSuccess(true);
    } else {
      console.log("something went wrong");
    }
  };

  let form = (
    <View>
      <Text style={styles.title}>register</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="register" onPress={() => register()}></Button>
    </View>
  );

  let message = <Text>you are registered in firebase</Text>;

  return (
    <View style={styles.container}>
      {form}
      {registerSuccess ? message : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 35,
    marginTop: 50,
    marginLeft: "5%",
    borderRadius: 15
  },
  title: {
    fontSize: 25,
    marginBottom: 20
  },
  input: {
    height: 30,
    width: "75%",
    marginLeft: "12.5%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#b0b0b0",
    margin: 5,
    paddingLeft: 10
  }
});

export default RegisterScreen;
