import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS } from '../../constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoTranslateY = useRef(new Animated.Value(30)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(25)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(25)).current;

  const pulseAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 55,
        useNativeDriver: true,
      }),

      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(350),

      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.sequence([
      Animated.delay(650),

      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),

        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [
    buttonOpacity,
    buttonTranslateY,
    logoOpacity,
    logoScale,
    logoTranslateY,
    pulseAnimation,
    textOpacity,
    textTranslateY,
  ]);

  const pulseScale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  const pulseOpacity = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.07, 0.16],
  });

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.orangeCircleTop} />
        <View style={styles.orangeCircleLeft} />
        <View style={styles.smallOrangeDot} />

        <View style={styles.logoSection}>
          <Animated.View
            style={[
              styles.logoPulse,
              {
                opacity: pulseOpacity,
                transform: [{ scale: pulseScale }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.logoCard,
              {
                opacity: logoOpacity,
                transform: [
                  { translateY: logoTranslateY },
                  { scale: logoScale },
                ],
              },
            ]}
          >
            <Image
              source={require('../../assets/images/hungrygo-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>FOOD NEAR YOU</Text>
          </View>

          <Text style={styles.title}>
            Your next meal is
            <Text style={styles.orangeText}> closer </Text>
            than you think.
          </Text>

          <Text style={styles.description}>
            Choose your location, budget and what you&apos;re craving.
            HungryGO helps you discover places that fit.
          </Text>

          <View style={styles.featuresRow}>
            <View style={styles.featureChip}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Nearby</Text>
            </View>

            <View style={styles.featureChip}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Budget</Text>
            </View>

            <View style={styles.featureChip}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Cravings</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
            },
          ]}
        >
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Get Started</Text>

            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </Pressable>

          <Text style={styles.bottomText}>
            Find food. Save time. Eat happy.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    overflow: 'hidden',
  },

  orangeCircleTop: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: COLORS.primary,
    top: -210,
    right: -120,
    opacity: 0.08,
  },

  orangeCircleLeft: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primary,
    left: -90,
    top: '42%',
    opacity: 0.05,
  },

  smallOrangeDot: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    right: 35,
    top: '40%',
    opacity: 0.12,
  },

  logoSection: {
    flex: 1.05,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  logoPulse: {
    position: 'absolute',
    width: 245,
    height: 245,
    borderRadius: 123,
    backgroundColor: COLORS.primary,
  },

  logoCard: {
    width: 250,
    height: 250,
    borderRadius: 42,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 8,
  },

  logo: {
    width: 225,
    height: 225,
  },

  content: {
    flex: 0.95,
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EC',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 20,
  },

  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },

  badgeText: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },

  title: {
    color: COLORS.black,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -1,
  },

  orangeText: {
    color: COLORS.primary,
  },

  description: {
    marginTop: 16,
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    maxWidth: 350,
  },

  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },

  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  featureDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },

  featureText: {
    color: COLORS.gray700,
    fontSize: 11,
    fontWeight: '600',
  },

  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    minHeight: 62,
    backgroundColor: COLORS.black,
    borderRadius: 20,
    paddingLeft: 24,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },

  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },

  arrowContainer: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 27,
    fontWeight: '500',
  },

  bottomText: {
    marginTop: 16,
    color: COLORS.gray500,
    fontSize: 12,
    fontWeight: '500',
  },
});