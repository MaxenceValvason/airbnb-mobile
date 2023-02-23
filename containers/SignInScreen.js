import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Entypo } from "@expo/vector-icons";

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

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const [displayPassword, setDisplayPassword] = useState(true);

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (submit) {
          const response = await axios.post(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in`,
            { email: email, password: password }
          );
          // console.log(response.data.token);
          if (response.data.token) {
            alert("Connexion réussi");
            setToken(response.data.token);
          }
        }
      } catch (error) {
        setErrorMessage("Wrong email or password");
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
          <View style={{ alignItems: "center", marginVertical: 30 }}>
            <Image
              source={{
                uri: "http://crapaudvoyageur.com/wp-content/uploads/2019/11/airbnb-vector-png-airbnb-logo-airbnb-logo-877.png",
              }}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text style={styles.mainText}>Sign In</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={(input) => {
              setEmail(input);
            }}
          />
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
          {submit ? <ActivityIndicator color={"#FFBAC0"} /> : null}

          <View
            style={{
              alignItems: "center",
              marginTop: "35%",
            }}
          >
            <Text style={{ color: "red", marginVertical: 15, fontSize: 14 }}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={styles.btnSubmit}
              disabled={submit}
              onPress={() => {
                if (!email || !password) {
                  setErrorMessage("Please fill all fields");
                }

                setSubmit(true);
              }}
            >
              <Text style={styles.textSubmit}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{ color: "#717171", marginVertical: 15, fontSize: 18 }}
              >
                No account ? Register
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
    marginTop: 15,
    height: 40,
    fontSize: 18,
  },

  inputPassword: {
    marginTop: 15,
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
