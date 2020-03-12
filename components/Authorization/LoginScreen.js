import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import consts from "../../constants/ApiKeys";

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false)

  const login = async () => {
    console.log("login clicked");
    console.log(email);
    console.log(password);

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${consts.firebaseConfig.apiKey}`,
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
      console.log("login successful");
      setLoginSuccess(true)
    } else {
      console.log("something went wrong");
    }
  };

  let form = (
    <View>
      <Text style={styles.title}>login</Text>
      <TextInput  
        placeholder="email"
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='password'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="login" onPress={() => login()}></Button>
    </View>
  );

  let message = (<Text>
      you are logged in
  </Text>)

  return <View style={styles.container}>
      {form}
      {loginSuccess?message:null}
      
      </View>;
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

export default LoginScreen;
