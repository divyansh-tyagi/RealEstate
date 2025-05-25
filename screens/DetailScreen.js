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
        console.log("Permission to access location was denied");
        setDistance(null);
        Alert.alert("Permission denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});
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
  const imageURL =
    home.imageURL ||
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACUCAMAAADVs1c8AAAAP1BMVEXd3d2EhITh4eGAgIB8fHyNjY3Nzc3W1taJiYmhoaHHx8eenp55eXl1dXWSkpLZ2dm3t7epqam/v7+xsbHn5+f2blrIAAAEmElEQVR4nO2c6WKjOgyFsWSWAGF//2e9TtskRwaytRgzV+fXtCSpPyTLR6LTJFGpVCqVSqVSqVQq1ZYi2nsFfyqivv+XkChPrTXZUYjoruXrSVewMWy65BBIbTnctHSd8srhXMRVfgAiKs1Ndb50PeXrdS7K+HcSlQUA+cultrcGxH0bO5EE8i5OWcNGyDax1wYBlHnXvqqBFKdd3ETrQNRW1sf5DlLUtWEdqITwcFpBkIpyr9W+oBUgSnoISl1lyWAg/fp4j6RlIOcNYPn15UilrLlnIMebdktAzhsADv8UNqIRgmRj9Q0LQJSfkOd0O3qmAeLGVZwFfA5EJRw+XAwQCcp7LBRljEQ+kKwG3HjOgAYGpBhrg2d9KEth65tumr3+5lUvG6mIL+08IPQGtlnKKWo7BrsaXW1AIJvB8WnOmFDost1bwELE1lMgkDFYDUpIN8rQRFB7grdwGVWQJNA9WHjjiVyWjSJeA/qiPqYgLQIxd6JYX84le8JlU1ahb8hmxWM3LQFxisWLfo5TVwDwu8mIrUUXTSs7B2KDIyvXs9bXK7UI0gTNuUvRWAr4DMh5A+RB2+BCJ64J32CGOIh8oFqU4Qn96NeyT7i5krKOrqfwy7bYJ+gKbkEq117BRQTVzu1tWK3YCZQM85HCpQKOLYn3330Dd+0eECAS3qAWS8UdIiQLgNtlUMB3rg2TmBsUIplmEywIkqwb+cnih0y7ITkHA56MK5lJ9SrPJZbYgtNUYiu7m7kTMeBiFDd9eYIF+Klo/DLsKfaZRZLXKeAiRKu9KlHA2w4iKm5OKJ4WK7L1vMGT8FyDKvccbsfQQyF3ImInnQ7YKZSvhOfnPuBOwt6deQh5yrqKDMs6i2VRb17l+ZlwXd/snVsBn1NQhtMo271VDTyiQrxbzCLTQLXBVWRYs8VWxvVtb4Tn9gEYXzGLHEMESXZmwlC6TKyX1vwkSAa3y4Tu3FmKrRs/IqzIVpz4Yi1vCdskd1cw7TbuKfxnCpgS0zvVwJeYdw021CzSnRWYbqMY6zRvVQNPYk5COabdhrNIseVruZkXHj6+R4RDSUo66CnMZj0FDXDj8JhwLpV/x/MVcFHA7xNlrjbicT/mul891/K6N3iIJGKe3LupDc8j+l65GLFdfvRf8Ph+5zqLrLd86ELl9y/tiOR4zxs8RhJ36qunsKdNjyIa2esUflsNPKICfK7rKSyn2/puomqcMN2qD7zBQ9Wi2mSLT2T+lEjYq7+pBlLcDHgebIvjwXW/8AYPiMwYkgKBTlvwOO01cFQgBVIgBVKg4wIVzbr8p7DzV8QHxNV6W5nL4QlXs1+GpvOhgNpnQMnBgJ5GSIE2kgIpUGApkAIFlgIpUGApkAIFlgIpUGAp0LGA8M8QSLWVOR6QacpVDc0RgUyxLnNIoJelQMGkQAoUWAqkQIGlQAoUWAr0/wFKfKAdaJIL0Nl+oHopQuIVZrf/hfehnn7QDiyqQ+jTlHs/JwPx5NlG2guoL9JNtNdfAqPqXD+QnX01/87sC3v5F+90Dv1ze0ilUqlUKpVKpVKpVCqVSqVSfab/AOeOTYrnTq8xAAAAAElFTkSuQmCC";

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageURL,
        }}
        style={styles.image}
      />
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
