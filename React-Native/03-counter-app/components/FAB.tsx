import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
    label: string;
    position?: "left" | "right";
    onPress?: () => void;
    onLongPress?: () => void
}

export default function FAB({ label, position = "right", onPress, onLongPress }: Props) {
  return (
    <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.floatingButton, position === "right" ? styles.positionRight : styles.positionLeft, pressed ? {opacity: 0.5} : {opacity: 1}]}
        onLongPress={onLongPress}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{label}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create ({
    floatingButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#65558f",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 5,
    shadowRadius: 4,
  },

  positionRight: {
    right: 20,
  },

  positionLeft: {
    left: 20,
  }
})