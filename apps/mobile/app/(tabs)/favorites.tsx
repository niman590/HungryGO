import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Favorites
      </Text>

      <Text style={styles.text}>
        Your saved restaurants will appear here.
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