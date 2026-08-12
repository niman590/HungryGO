import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <Text style={styles.text}>
        Map search is coming next.
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
  },

  title: {
    color: COLORS.black,
    fontSize: 28,
    fontWeight: '800',
  },

  text: {
    marginTop: 8,
    color: COLORS.gray500,
  },
});