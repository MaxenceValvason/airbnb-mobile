import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";

export default function Rooms({ data }) {
  const navigation = useNavigation();
  const starsArray = [];

  const generateStars = (ratingValue) => {
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <FontAwesome name="star" size={20} color="#FFB100" key={i} />
        );
      } else {
        starsArray.push(
          <FontAwesome name="star" size={20} color="grey" key={i} />
        );
      }
    }
    return starsArray;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Room", { id: data._id, stars: starsArray });
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            style={styles.roomImage}
            source={{ uri: data.photos[0].url }}
          />

          <Text style={styles.textPrice}>{data.price} €</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <Text>{generateStars(data.ratingValue)}</Text>
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
        </View>
        <View style={{ width: 70, height: 70 }}>
          <Image
            style={styles.profilPicture}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textPrice: {
    position: "absolute",
    color: "white",
    bottom: "10%",
    backgroundColor: "black",
    width: "25%",
    height: "20%",
    textAlign: "center",
    paddingTop: "7%",
    fontSize: 20,
  },
  roomImage: {
    marginTop: 10,
    height: 200,
  },
  container: {
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 20,
    width: 275,
  },

  reviews: {
    marginHorizontal: 10,
  },

  profilPicture: {
    height: 60,
    width: 60,
    borderRadius: 100,
    marginHorizontal: 5,
    resizeMode: "contain",
  },
});
