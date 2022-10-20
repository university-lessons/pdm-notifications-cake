import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AppLogo from "./src/components/AppLogo";

import NotificationHelper from "./src/services/NotificationHelper";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [timerTrigger, setTimerTrigger] = useState("1");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    NotificationHelper.registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handlePress = () => {
    NotificationHelper.send(
      "Corre pro forno!!",
      "O bolo está assado!!",
      parseInt(timerTrigger)
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AppLogo />

      <Text>Quanto tempo o bolo ficará no forno (segundos)?</Text>
      <TextInput
        style={styles.orange}
        onChangeText={(text) => setTimerTrigger(text)}
        value={timerTrigger}
        placeholder="1"
      />

      <TouchableOpacity style={styles.orange} onPress={handlePress}>
        <Text style={styles.buttonText}>Está no Forno!</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 2,
    borderRadius: 8,
    margin: 16,
    marginTop: 32,
    backgroundColor: "#e3d8ca",
  },
  orange: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#e6b101",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  buttonText: {
    fontSize: 28,
  },
});
