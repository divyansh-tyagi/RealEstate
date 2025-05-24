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
            "https://images.pexels.com/photos/1063999/pexels-photo-1063999.jpeg",
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
