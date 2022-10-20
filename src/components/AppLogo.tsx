import React from "react";
import { StyleSheet, View, Image } from "react-native";

const AppLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/cake_timer.png")}
        style={styles.img}
      />
    </View>
  );
};

export default AppLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
