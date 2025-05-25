import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getHomes } from "../services/api";

const HomeScreen = ({ navigation }) => {
  const {
    data: homes,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["homes"], queryFn: getHomes });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { home: item })}
    >
      <Image
        source={{
          uri:
            item.imageURL ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACUCAMAAADVs1c8AAAAP1BMVEXd3d2EhITh4eGAgIB8fHyNjY3Nzc3W1taJiYmhoaHHx8eenp55eXl1dXWSkpLZ2dm3t7epqam/v7+xsbHn5+f2blrIAAAEmElEQVR4nO2c6WKjOgyFsWSWAGF//2e9TtskRwaytRgzV+fXtCSpPyTLR6LTJFGpVCqVSqVSqVQq1ZYi2nsFfyqivv+XkChPrTXZUYjoruXrSVewMWy65BBIbTnctHSd8srhXMRVfgAiKs1Ndb50PeXrdS7K+HcSlQUA+cultrcGxH0bO5EE8i5OWcNGyDax1wYBlHnXvqqBFKdd3ETrQNRW1sf5DlLUtWEdqITwcFpBkIpyr9W+oBUgSnoISl1lyWAg/fp4j6RlIOcNYPn15UilrLlnIMebdktAzhsADv8UNqIRgmRj9Q0LQJSfkOd0O3qmAeLGVZwFfA5EJRw+XAwQCcp7LBRljEQ+kKwG3HjOgAYGpBhrg2d9KEth65tumr3+5lUvG6mIL+08IPQGtlnKKWo7BrsaXW1AIJvB8WnOmFDost1bwELE1lMgkDFYDUpIN8rQRFB7grdwGVWQJNA9WHjjiVyWjSJeA/qiPqYgLQIxd6JYX84le8JlU1ahb8hmxWM3LQFxisWLfo5TVwDwu8mIrUUXTSs7B2KDIyvXs9bXK7UI0gTNuUvRWAr4DMh5A+RB2+BCJ64J32CGOIh8oFqU4Qn96NeyT7i5krKOrqfwy7bYJ+gKbkEq117BRQTVzu1tWK3YCZQM85HCpQKOLYn3330Dd+0eECAS3qAWS8UdIiQLgNtlUMB3rg2TmBsUIplmEywIkqwb+cnih0y7ITkHA56MK5lJ9SrPJZbYgtNUYiu7m7kTMeBiFDd9eYIF+Klo/DLsKfaZRZLXKeAiRKu9KlHA2w4iKm5OKJ4WK7L1vMGT8FyDKvccbsfQQyF3ImInnQ7YKZSvhOfnPuBOwt6deQh5yrqKDMs6i2VRb17l+ZlwXd/snVsBn1NQhtMo271VDTyiQrxbzCLTQLXBVWRYs8VWxvVtb4Tn9gEYXzGLHEMESXZmwlC6TKyX1vwkSAa3y4Tu3FmKrRs/IqzIVpz4Yi1vCdskd1cw7TbuKfxnCpgS0zvVwJeYdw021CzSnRWYbqMY6zRvVQNPYk5COabdhrNIseVruZkXHj6+R4RDSUo66CnMZj0FDXDj8JhwLpV/x/MVcFHA7xNlrjbicT/mul891/K6N3iIJGKe3LupDc8j+l65GLFdfvRf8Ph+5zqLrLd86ELl9y/tiOR4zxs8RhJ36qunsKdNjyIa2esUflsNPKICfK7rKSyn2/puomqcMN2qD7zBQ9Wi2mSLT2T+lEjYq7+pBlLcDHgebIvjwXW/8AYPiMwYkgKBTlvwOO01cFQgBVIgBVKg4wIVzbr8p7DzV8QHxNV6W5nL4QlXs1+GpvOhgNpnQMnBgJ5GSIE2kgIpUGApkAIFlgIpUGApkAIFlgIpUGAp0LGA8M8QSLWVOR6QacpVDc0RgUyxLnNIoJelQMGkQAoUWAqkQIGlQAoUWAr0/wFKfKAdaJIL0Nl+oHopQuIVZrf/hfehnn7QDiyqQ+jTlHs/JwPx5NlG2guoL9JNtNdfAqPqXD+QnX01/87sC3v5F+90Dv1ze0ilUqlUKpVKpVKpVCqVSqVSfab/AOeOTYrnTq8xAAAAAElFTkSuQmCC",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.address}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "red" }}>
          Error fetching homes. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={homes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    height: 200,
    width: "100%",
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  description: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: "#555",
  },
});
