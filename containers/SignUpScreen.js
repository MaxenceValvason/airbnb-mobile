import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayPassword, setDisplayPassword] = useState(true);
  const [displayPasswordConfirm, setDisplayPasswordConfirm] = useState(true);

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (submit) {
          const response = await axios.post(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up`,
            {
              email: email,
              username: username,
              description: desc,
              password: password,
            }
          );
          setErrorMessage("");
          alert("Connexion réussi");
          const userToken = response.data.token;
          setToken(userToken);
        }
      } catch (error) {
        setErrorMessage("Email or username already use");
        setSubmit(false);
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, [submit]);

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              source={{
                uri: "http://crapaudvoyageur.com/wp-content/uploads/2019/11/airbnb-vector-png-airbnb-logo-airbnb-logo-877.png",
              }}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text style={styles.mainText}>Sign up</Text>
          </View>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(input) => {
              setEmail(input);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="username"
            value={username}
            onChangeText={(input) => {
              setUsername(input);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="  Describe yourself in a few words..."
            value={desc}
            onChangeText={(input) => {
              setDesc(input);
            }}
            style={styles.inputDesc}
            multiline={true}
            textAlignVertical="top"
          />
          {submit ? <ActivityIndicator color={"#FFBAC0"} /> : null}

          <View style={styles.inputPassword}>
            <TextInput
              style={{ fontSize: 18, flex: 1 }}
              placeholder="password"
              value={password}
              onChangeText={(input) => {
                setPassword(input);
              }}
              secureTextEntry={displayPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setDisplayPassword(!displayPassword);
              }}
            >
              <Entypo name="eye" size={18} color="#F9585D" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputPassword}>
            <TextInput
              style={{ fontSize: 18, flex: 1 }}
              placeholder="confirm password"
              value={password}
              onChangeText={(input) => {
                setPasswordConfirm(input);
              }}
              secureTextEntry={displayPasswordConfirm}
            />
            <TouchableOpacity
              onPress={() => {
                setDisplayPasswordConfirm(!displayPasswordConfirm);
              }}
            >
              <Entypo name="eye" size={18} color="#F9585D" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ color: "red", marginVertical: 15, fontSize: 14 }}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={styles.btnSubmit}
              disabled={submit}
              onPress={() => {
                if (
                  !email ||
                  !password ||
                  !username ||
                  !desc ||
                  !passwordConfirm
                ) {
                  setErrorMessage("Please fill all fields");
                } else if (password !== passwordConfirm) {
                  setErrorMessage("Not the same password");
                } else {
                  setSubmit(true);
                }
              }}
            >
              <Text style={styles.textSubmit}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text
                style={{ color: "#717171", marginVertical: 15, fontSize: 18 }}
              >
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginBottom: 15,
    height: 40,
    fontSize: 18,
  },
  inputDesc: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    marginHorizontal: 20,
    marginBottom: 15,
    height: 80,
    fontSize: 18,
  },
  inputPassword: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    justifyContent: "space-between",
    height: 40,
  },
  mainText: {
    color: "#717171",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },

  btnSubmit: {
    width: 220,
    height: 60,
    borderRadius: 30,
    borderColor: "#F9585D",
    borderWidth: 4,
    backgroundColor: "white",
    justifyContent: "center",
  },

  textSubmit: {
    textAlign: "center",
    fontSize: 20,
    color: "#717171",
    fontWeight: "bold",
  },
});
