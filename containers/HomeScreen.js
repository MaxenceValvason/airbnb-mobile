import { FlatList, Text, View, StyleSheet } from "react-native";
import Rooms from "../components/Rooms";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";

export default function HomeScreen({}) {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.reset();
    animation.current?.play();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        setData(response.data);
        setIsLoad(true);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoad ? (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <Rooms key={item._id} data={item} />;
        }}
      />
    </View>
  ) : (
    <LottieView
      ref={animation}
      style={{ width: 300, height: 300, color: "#FFBAC0" }}
      source={require("../assets/loading.gif")}
    />
  );
}
