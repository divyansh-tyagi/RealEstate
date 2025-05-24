import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { useMutation } from "@tanstack/react-query";
import { unlockHome } from "../services/api";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const DetailScreen = ({ route }) => {
  const { home } = route.params;
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const dist = getDistance(
        location.coords.latitude,
        location.coords.longitude,
        home.latitude,
        home.longitude
      );
      setDistance(dist);
    })();
  }, []);

  const mutation = useMutation({
    queryKey: ["unlockHome"],
    mutationFn: unlockHome,
    onSuccess: () => {
      Alert.alert(
        "Success",
        `Home unlocked successfully! Price is ${home.price}`
      );
    },
    onError: () => {
      Alert.alert("Error", "Error unlocking home.");
    },
  });

  const handleUnlock = () => {
    mutation.mutate(home.id);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: home.imageURL }} style={styles.image} />
      <Text style={styles.title}>{home.address}</Text>
      <Text>{home.description}</Text>
      <Text style={{ marginVertical: 10 }}>
        Distance:{" "}
        {distance !== null
          ? `${(distance / 1000).toFixed(2)} km`
          : "Loading..."}
      </Text>
      {distance !== null && distance <= 30 ? (
        <Button title="Unlock Home" onPress={handleUnlock} />
      ) : (
        <Text style={{ color: "red" }}>
          You are too far to unlock this home.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { height: 250, borderRadius: 10 },
  title: { fontWeight: "bold", fontSize: 18, marginVertical: 10 },
});
export default DetailScreen;
