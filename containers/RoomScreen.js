import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import LottieView from "lottie-react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function RoomScreen() {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const route = useRoute();
  const animation = useRef(null);

  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        if (response.data) {
          setData(response.data);
          setIsLoad(true);
        }
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoad ? (
    <View>
      <View style={{ height: 300, position: "relative" }}>
        <ScrollView>
          <SwiperFlatList
            style={styles.wrapper}
            showPagination={true}
            autoplay
            autoplayDelay={6}
          >
            {data.photos.map((slide, index) => {
              return (
                <View key={index} style={styles.slide}>
                  <Image style={styles.roomImage} source={{ uri: slide.url }} />
                </View>
              );
            })}
          </SwiperFlatList>
        </ScrollView>

        <Text style={styles.textPrice}>{data.price} €</Text>
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {route.params.stars}
              <Text style={{ marginHorizontal: 10, fontSize: 15 }}>
                {data.reviews} reviews
              </Text>
            </View>
          </View>
          <View style={{ width: 70, height: 70 }}>
            <Image
              style={styles.profilPicture}
              source={{ uri: data.user.account.photo.url }}
            />
          </View>
        </View>
        <Text numberOfLines={3} style={styles.desc}>
          {data.description}
        </Text>
      </View>
    </View>
  ) : (
    <LottieView
      autoPlay
      ref={animation}
      style={{ width: 300, height: 300 }}
      source={require("../assets/loading.gif")}
    />
  );
}
const styles = StyleSheet.create({
  textPrice: {
    position: "absolute",
    color: "white",
    bottom: "10%",
    backgroundColor: "black",
    width: "30%",
    height: "20%",
    textAlign: "center",
    paddingTop: "8%",
    fontSize: 28,
  },
  roomImage: {
    height: "100%",
    width: "100%",
    // flex: 1,
    resizeMode: "contain",
  },
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    width: 300,
  },

  profilPicture: {
    height: 70,
    width: 70,
    borderRadius: 100,
    marginHorizontal: 5,
    resizeMode: "contain",
  },

  desc: {
    fontSize: 17,
    marginVertical: 10,
  },

  wrapper: {
    height: 300,
    width: 400,
  },
  slide: {
    height: "100%",
    width: 400,
  },
});
