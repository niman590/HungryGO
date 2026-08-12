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

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [focusedField, setFocusedField] = useState<
    'name' | 'email' | 'password' | 'confirmPassword' | null
  >(null);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(25)).current;

  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(35)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(120),

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.sequence([
      Animated.delay(260),

      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),

        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 550,
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
    logoScale,
  ]);

  const validateForm = () => {
    let valid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');

    if (!name.trim()) {
      setNameError('Your name is required.');
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError('Enter a valid name.');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setEmailError('Enter a valid email address.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Use at least 6 characters.');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm your password.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (!acceptedTerms) {
      setTermsError('Please accept the Terms and Privacy Policy.');
      valid = false;
    }

    return valid;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    console.log({
      name,
      email,
      password,
    });
  };

  const handleLogin = () => {
    router.replace('/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.orangeCircleTop} />
          <View style={styles.orangeCircleBottom} />

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
              styles.logoSection,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <View style={styles.logoCard}>
              <Image
                source={require('../../assets/images/hungrygo-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.headingSection,
              {
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslateY }],
              },
            ]}
          >
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>JOIN HUNGRYGO</Text>
            </View>

            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.subtitle}>
              Tell us who you are and we&apos;ll help you find food that
              matches your location, cravings and budget.
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
              <Text style={styles.label}>Full name</Text>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'name' && styles.inputFocused,
                  !!nameError && styles.inputError,
                ]}
              >
                <TextInput
                  value={name}
                  onChangeText={(value) => {
                    setName(value);

                    if (nameError) {
                      setNameError('');
                    }
                  }}
                  placeholder="Your full name"
                  placeholderTextColor={COLORS.gray400}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.input}
                />
              </View>

              {!!nameError && (
                <Text style={styles.errorText}>{nameError}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'email' && styles.inputFocused,
                  !!emailError && styles.inputError,
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
              <Text style={styles.label}>Password</Text>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'password' && styles.inputFocused,
                  !!passwordError && styles.inputError,
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
                  placeholder="Create a password"
                  placeholderTextColor={COLORS.gray400}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
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
                  <Text style={styles.showText}>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {!!passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : (
                <Text style={styles.helperText}>
                  Minimum 6 characters
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm password</Text>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'confirmPassword' &&
                    styles.inputFocused,
                  !!confirmPasswordError && styles.inputError,
                ]}
              >
                <TextInput
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);

                    if (confirmPasswordError) {
                      setConfirmPasswordError('');
                    }
                  }}
                  placeholder="Enter password again"
                  placeholderTextColor={COLORS.gray400}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                  onFocus={() =>
                    setFocusedField('confirmPassword')
                  }
                  onBlur={() => setFocusedField(null)}
                  style={styles.passwordInput}
                />

                <Pressable
                  onPress={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  hitSlop={10}
                >
                  <Text style={styles.showText}>
                    {showConfirmPassword ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {!!confirmPasswordError && (
                <Text style={styles.errorText}>
                  {confirmPasswordError}
                </Text>
              )}
            </View>

            <Pressable
              onPress={() => {
                setAcceptedTerms((current) => !current);
                setTermsError('');
              }}
              style={styles.termsRow}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxActive,
                ]}
              >
                {acceptedTerms && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text style={styles.termsLink}>
                  Privacy Policy
                </Text>
                .
              </Text>
            </Pressable>

            {!!termsError && (
              <Text style={styles.termsError}>{termsError}</Text>
            )}

            <Pressable
              onPress={handleRegister}
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.registerButtonPressed,
              ]}
            >
              <Text style={styles.registerButtonText}>
                Create Account
              </Text>

              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Pressable>

            <View style={styles.loginRow}>
              <Text style={styles.loginQuestion}>
                Already have an account?
              </Text>

              <Pressable onPress={handleLogin}>
                <Text style={styles.loginText}>Sign In</Text>
              </Pressable>
            </View>
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
    minHeight: 880,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 30,
    paddingBottom: 35,
    overflow: 'hidden',
  },

  orangeCircleTop: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: COLORS.primary,
    right: -170,
    top: -140,
    opacity: 0.08,
  },

  orangeCircleBottom: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: COLORS.primary,
    left: -125,
    bottom: 100,
    opacity: 0.05,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  backButtonPressed: {
    opacity: 0.65,
  },

  backArrow: {
    color: COLORS.black,
    fontSize: 34,
    lineHeight: 35,
    fontWeight: '300',
    marginTop: -3,
  },

  logoSection: {
    alignItems: 'center',
    marginTop: 8,
  },

  logoCard: {
    width: 95,
    height: 95,
    borderRadius: 27,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },

  logo: {
    width: 88,
    height: 88,
  },

  headingSection: {
    alignItems: 'center',
    marginTop: 22,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EC',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
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
    color: COLORS.primaryDark,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
  },

  title: {
    color: COLORS.black,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.9,
    textAlign: 'center',
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 340,
    marginTop: 10,
  },

  form: {
    marginTop: 30,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 9,
  },

  inputContainer: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 17,
    paddingHorizontal: 17,
  },

  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  inputError: {
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

  showText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  helperText: {
    color: COLORS.gray400,
    fontSize: 10,
    marginTop: 6,
    marginLeft: 4,
  },

  errorText: {
    color: '#E5484D',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
    marginLeft: 4,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    marginTop: 1,
  },

  checkboxActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },

  checkmark: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '900',
  },

  termsText: {
    flex: 1,
    color: COLORS.gray500,
    fontSize: 11,
    lineHeight: 18,
  },

  termsLink: {
    color: COLORS.black,
    fontWeight: '700',
  },

  termsError: {
    color: '#E5484D',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 7,
    marginLeft: 33,
  },

  registerButton: {
    width: '100%',
    height: 62,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingRight: 9,
    marginTop: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 6,
  },

  registerButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
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
    fontSize: 23,
    lineHeight: 25,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  loginQuestion: {
    color: COLORS.gray500,
    fontSize: 13,
  },

  loginText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 5,
  },
});