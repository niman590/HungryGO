import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Account
      </Text>

      <Text style={styles.text}>
        Profile and appearance settings will go here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  title: {
    color: COLORS.black,
    fontSize: 28,
    fontWeight: '800',
  },

  text: {
    marginTop: 8,
    color: COLORS.gray500,
    textAlign: 'center',
  },
});