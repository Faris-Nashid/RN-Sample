import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Easing, Dimensions, Text} from 'react-native';

const {height} = Dimensions.get('window');

export default function Sample() {
  const backgroundFade = useRef(new Animated.Value(0)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoMovement = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(logoFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoMovement, {
          toValue: -250,
          duration: 2000,
          easing: Easing.inOut(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(textFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2250);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF7F43',
      opacity: backgroundFade,
      height: height,
    },
    logo: {
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold',
      opacity: logoFade,
      transform: [{translateY: logoMovement}],
      marginTop: 50
    },
    additionalText: {
      color: 'white',
      fontSize: 24,
      marginTop: 20,
      width: 300,
    },
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.Text style={[styles.logo, {opacity: logoFade}]}>
        React Native
      </Animated.Text>
      <Animated.Text style={[styles.additionalText, {opacity: textFade}]}>
        This is a sample project to test SDKs
      </Animated.Text>
      <Animated.Text style={[styles.additionalText, {opacity: textFade}]}>
        Open App.tsx to modify the codebase.
      </Animated.Text>
    </Animated.View>
  );
}
