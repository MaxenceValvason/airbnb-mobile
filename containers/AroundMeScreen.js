import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";

import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function AroundMeScreen() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        const position = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        console.log(position);
        setCoords(position);
      } else {
        setError(true);
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);

  return isLoading ? (
    <Text>Chargement...</Text>
  ) : error ? (
    <Text>Permission refusée</Text>
  ) : (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
