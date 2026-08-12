import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS } from '../../constants/colors';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [focusedField, setFocusedField] = useState<
    'email' | 'password' | null
  >(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-15)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(25)).current;

  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(150),

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),

        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.sequence([
      Animated.delay(300),

      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    contentOpacity,
    contentTranslateY,
    formOpacity,
    formTranslateY,
    logoOpacity,
    logoTranslateY,
  ]);

  const validateForm = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setEmailError('Enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must contain at least 6 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    console.log({
      email,
      password,
    });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  const handleCreateAccount = () => {
    router.push('/register');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.orangeShapeTop} />
          <View style={styles.orangeShapeBottom} />

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>

          <Animated.View
            style={[
              styles.brandContainer,
              {
                opacity: logoOpacity,
                transform: [{ translateY: logoTranslateY }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/hungrygo-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.headingContainer,
              {
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslateY }],
              },
            ]}
          >
            <View style={styles.miniBadge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>WELCOME BACK</Text>
            </View>

            <Text style={styles.title}>Hungry again?</Text>

            <Text style={styles.subtitle}>
              Sign in and find something worth eating nearby.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.form,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }],
              },
            ]}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'email' && styles.inputContainerFocused,
                  !!emailError && styles.inputContainerError,
                ]}
              >
                <TextInput
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);

                    if (emailError) {
                      setEmailError('');
                    }
                  }}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.gray400}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.input}
                />
              </View>

              {!!emailError && (
                <Text style={styles.errorText}>{emailError}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.label}>Password</Text>

                <Pressable onPress={handleForgotPassword}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'password' &&
                    styles.inputContainerFocused,
                  !!passwordError && styles.inputContainerError,
                ]}
              >
                <TextInput
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);

                    if (passwordError) {
                      setPasswordError('');
                    }
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.gray400}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.passwordInput}
                />

                <Pressable
                  onPress={() =>
                    setShowPassword((current) => !current)
                  }
                  hitSlop={10}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {!!passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}
            </View>

            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>

              <View style={styles.loginArrowContainer}>
                <Text style={styles.loginArrow}>→</Text>
              </View>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <Pressable
              onPress={handleCreateAccount}
              style={({ pressed }) => [
                styles.createAccountButton,
                pressed && styles.createAccountPressed,
              ]}
            >
              <Text style={styles.createAccountText}>
                Create a new account
              </Text>
            </Pressable>

            <Text style={styles.footerText}>
              By continuing, you agree to HungryGO&apos;s Terms and Privacy
              Policy.
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    minHeight: 760,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 30,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },

  orangeShapeTop: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.primary,
    right: -145,
    top: -120,
    opacity: 0.08,
  },

  orangeShapeBottom: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.primary,
    left: -120,
    bottom: 80,
    opacity: 0.05,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  backButtonPressed: {
    opacity: 0.65,
  },

  backArrow: {
    fontSize: 34,
    lineHeight: 35,
    color: COLORS.black,
    fontWeight: '300',
    marginTop: -3,
  },

  brandContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },

  logo: {
    width: 100,
    height: 100,
  },

  headingContainer: {
    marginTop: 25,
    alignItems: 'center',
  },

  miniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#FFF3EC',
    marginBottom: 14,
  },

  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 7,
  },

  badgeText: {
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },

  title: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '800',
    color: COLORS.black,
    letterSpacing: -0.9,
  },

  subtitle: {
    marginTop: 9,
    maxWidth: 310,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
  },

  form: {
    marginTop: 32,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 9,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.black,
  },

  passwordLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  forgotText: {
    marginBottom: 9,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },

  inputContainer: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.gray50,
    borderRadius: 17,
    paddingHorizontal: 17,
  },

  inputContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  inputContainerError: {
    borderColor: '#E5484D',
  },

  input: {
    flex: 1,
    height: '100%',
    color: COLORS.black,
    fontSize: 15,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    color: COLORS.black,
    fontSize: 15,
    paddingRight: 12,
  },

  showPasswordText: {
    color: COLORS.primary,
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: '800',
  },

  errorText: {
    color: '#E5484D',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
    marginLeft: 4,
  },

  loginButton: {
    width: '100%',
    height: 62,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingRight: 9,
    marginTop: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 6,
  },

  loginButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },

  loginArrowContainer: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginArrow: {
    color: COLORS.white,
    fontSize: 23,
    lineHeight: 25,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },

  dividerText: {
    marginHorizontal: 14,
    color: COLORS.gray400,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  createAccountButton: {
    height: 58,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  createAccountPressed: {
    backgroundColor: COLORS.gray50,
  },

  createAccountText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
  },

  footerText: {
    marginTop: 22,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: COLORS.gray400,
    fontSize: 10,
    lineHeight: 16,
  },
});