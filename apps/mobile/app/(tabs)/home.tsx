import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

const DISTANCES = ['1 km', '3 km', '5 km', '10 km'];

const PRICES = [
  'Under Rs. 500',
  'Rs. 500 - 1000',
  'Rs. 1000 - 2000',
  'Rs. 2000+',
];

const CATEGORIES = [
  {
    name: 'All',
    icon: 'restaurant-outline',
  },
  {
    name: 'Rice',
    icon: 'fast-food-outline',
  },
  {
    name: 'Kottu',
    icon: 'restaurant-outline',
  },
  {
    name: 'Burgers',
    icon: 'fast-food-outline',
  },
  {
    name: 'Pizza',
    icon: 'pizza-outline',
  },
  {
    name: 'Chinese',
    icon: 'restaurant-outline',
  },
];

const TOP_PICKS = [
  {
    id: '1',
    name: 'Urban Bites',
    category: 'Burgers',
    distance: '1.2 km',
    price: 'Rs. 800',
    rating: '4.8',
    emoji: '🍔',
  },
  {
    id: '2',
    name: 'Kottu Hub',
    category: 'Sri Lankan',
    distance: '2.1 km',
    price: 'Rs. 650',
    rating: '4.7',
    emoji: '🍛',
  },
  {
    id: '3',
    name: 'Pizza Corner',
    category: 'Pizza',
    distance: '2.8 km',
    price: 'Rs. 1,200',
    rating: '4.6',
    emoji: '🍕',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const [distance, setDistance] = useState('3 km');
  const [price, setPrice] = useState('Rs. 500 - 1000');
  const [category, setCategory] = useState('All');

  const handleNotification = () => {
    console.log('Notifications');
  };

  const handleInfo = () => {
    console.log('Information');
  };

  const handleViewMap = () => {
    router.push({
      pathname: '/search',
      params: {
        distance,
        price,
        category,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {/* Background */}
          <View style={styles.orangeCircle} />

          {/* ===========================
              Header
          ============================ */}

          <View style={styles.header}>
            <View>
              <View style={styles.brandRow}>
                <View style={styles.brandDot} />

                <Text style={styles.brandName}>
                  HungryGO
                </Text>
              </View>

              <Pressable style={styles.locationRow}>
                <Ionicons
                  name="location"
                  size={15}
                  color={COLORS.primary}
                />

                <Text style={styles.locationText}>
                  Current location
                </Text>

                <Ionicons
                  name="chevron-down"
                  size={14}
                  color={COLORS.gray500}
                />
              </Pressable>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                onPress={handleNotification}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.iconButtonPressed,
                ]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={21}
                  color={COLORS.black}
                />

                <View style={styles.notificationDot} />
              </Pressable>

              <Pressable
                onPress={handleInfo}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.iconButtonPressed,
                ]}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={COLORS.black}
                />
              </Pressable>
            </View>
          </View>

          {/* ===========================
              Greeting
          ============================ */}

          <View style={styles.greetingSection}>
            <Text style={styles.helloText}>
              Hungry? 👋
            </Text>

            <Text style={styles.title}>
              Let&apos;s find something
              <Text style={styles.orangeText}> delicious.</Text>
            </Text>

            <Text style={styles.subtitle}>
              Tell HungryGO what you&apos;re looking for and we&apos;ll
              narrow down the best places around you.
            </Text>
          </View>

          {/* ===========================
              Filters
          ============================ */}

          <View style={styles.filterCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>
                  FIND FOOD
                </Text>

                <Text style={styles.filterTitle}>
                  What works for you?
                </Text>
              </View>

              <View style={styles.filterIcon}>
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={COLORS.primary}
                />
              </View>
            </View>

            {/* Distance */}

            <View style={styles.filterSection}>
              <View style={styles.filterLabelRow}>
                <Ionicons
                  name="navigate-outline"
                  size={17}
                  color={COLORS.primary}
                />

                <Text style={styles.filterLabel}>
                  Distance
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionsRow}
              >
                {DISTANCES.map((item) => {
                  const selected = distance === item;

                  return (
                    <Pressable
                      key={item}
                      onPress={() => setDistance(item)}
                      style={[
                        styles.optionChip,
                        selected && styles.optionChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Price */}

            <View style={styles.filterSection}>
              <View style={styles.filterLabelRow}>
                <Ionicons
                  name="wallet-outline"
                  size={17}
                  color={COLORS.primary}
                />

                <Text style={styles.filterLabel}>
                  Price range
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionsRow}
              >
                {PRICES.map((item) => {
                  const selected = price === item;

                  return (
                    <Pressable
                      key={item}
                      onPress={() => setPrice(item)}
                      style={[
                        styles.optionChip,
                        selected && styles.optionChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Categories */}

            <View style={styles.filterSectionLast}>
              <View style={styles.filterLabelRow}>
                <Ionicons
                  name="restaurant-outline"
                  size={17}
                  color={COLORS.primary}
                />

                <Text style={styles.filterLabel}>
                  Food category
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionsRow}
              >
                {CATEGORIES.map((item) => {
                  const selected = category === item.name;

                  return (
                    <Pressable
                      key={item.name}
                      onPress={() => setCategory(item.name)}
                      style={[
                        styles.categoryChip,
                        selected && styles.categoryChipSelected,
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={15}
                        color={
                          selected
                            ? COLORS.white
                            : COLORS.gray700
                        }
                      />

                      <Text
                        style={[
                          styles.categoryText,
                          selected &&
                            styles.categoryTextSelected,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* ===========================
              Map
          ============================ */}

          <View style={styles.mapHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Explore nearby
              </Text>

              <Text style={styles.sectionSubtitle}>
                See matching restaurants around you
              </Text>
            </View>

            <Pressable onPress={handleViewMap}>
              <Text style={styles.seeAllText}>
                View Map
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleViewMap}
            style={({ pressed }) => [
              styles.mapCard,
              pressed && styles.mapPressed,
            ]}
          >
            {/* Fake map background for frontend */}

            <View style={styles.roadOne} />
            <View style={styles.roadTwo} />
            <View style={styles.roadThree} />

            <View style={styles.mapMarkerOne}>
              <Ionicons
                name="restaurant"
                size={16}
                color={COLORS.white}
              />
            </View>

            <View style={styles.mapMarkerTwo}>
              <Ionicons
                name="fast-food"
                size={15}
                color={COLORS.white}
              />
            </View>

            <View style={styles.userMarker}>
              <View style={styles.userMarkerInner} />
            </View>

            <View style={styles.mapOverlay}>
              <View style={styles.mapOverlayIcon}>
                <Ionicons
                  name="map-outline"
                  size={19}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.mapOverlayText}>
                <Text style={styles.mapOverlayTitle}>
                  View restaurants on map
                </Text>

                <Text style={styles.mapOverlaySubtitle}>
                  {distance} • {category}
                </Text>
              </View>

              <Ionicons
                name="arrow-forward"
                size={20}
                color={COLORS.black}
              />
            </View>
          </Pressable>

          {/* ===========================
              Top Picks
          ============================ */}

          <View style={styles.topPicksHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Top picks for you
              </Text>

              <Text style={styles.sectionSubtitle}>
                Based on your current filters
              </Text>
            </View>

            <Pressable>
              <Text style={styles.seeAllText}>
                See all
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantList}
          >
            {TOP_PICKS.map((restaurant) => (
              <Pressable
                key={restaurant.id}
                style={({ pressed }) => [
                  styles.restaurantCard,
                  pressed && styles.restaurantCardPressed,
                ]}
              >
                <View style={styles.foodImage}>
                  <Text style={styles.foodEmoji}>
                    {restaurant.emoji}
                  </Text>

                  <Pressable style={styles.favoriteButton}>
                    <Ionicons
                      name="heart-outline"
                      size={18}
                      color={COLORS.black}
                    />
                  </Pressable>

                  <View style={styles.ratingBadge}>
                    <Ionicons
                      name="star"
                      size={12}
                      color={COLORS.primary}
                    />

                    <Text style={styles.ratingText}>
                      {restaurant.rating}
                    </Text>
                  </View>
                </View>

                <View style={styles.restaurantContent}>
                  <Text
                    style={styles.restaurantName}
                    numberOfLines={1}
                  >
                    {restaurant.name}
                  </Text>

                  <Text style={styles.restaurantCategory}>
                    {restaurant.category}
                  </Text>

                  <View style={styles.restaurantMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons
                        name="location-outline"
                        size={13}
                        color={COLORS.gray500}
                      />

                      <Text style={styles.metaText}>
                        {restaurant.distance}
                      </Text>
                    </View>

                    <View style={styles.metaDot} />

                    <Text style={styles.metaText}>
                      From {restaurant.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.bottomSpace} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    paddingBottom: 10,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    overflow: 'hidden',
  },

  orangeCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.primary,
    opacity: 0.055,
    right: -160,
    top: -100,
  },

  // Header

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 7,
  },

  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.black,
    letterSpacing: -0.5,
  },

  locationRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  locationText: {
    color: COLORS.gray500,
    fontSize: 12,
    fontWeight: '600',
  },

  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },

  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  iconButtonPressed: {
    opacity: 0.65,
  },

  notificationDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    right: 9,
    top: 8,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },

  // Greeting

  greetingSection: {
    marginTop: 34,
  },

  helloText: {
    color: COLORS.gray500,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },

  title: {
    maxWidth: 330,
    fontSize: 31,
    lineHeight: 38,
    color: COLORS.black,
    fontWeight: '900',
    letterSpacing: -1,
  },

  orangeText: {
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 345,
  },

  // Filters

  filterCard: {
    marginTop: 26,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,

    elevation: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 22,
  },

  sectionEyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  filterTitle: {
    color: COLORS.black,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },

  filterIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FFF3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterSection: {
    marginBottom: 20,
  },

  filterSectionLast: {
    marginBottom: 0,
  },

  filterLabelRow: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },

  filterLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray700,
  },

  optionsRow: {
    paddingHorizontal: 18,
    gap: 8,
  },

  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.gray50,
  },

  optionChipSelected: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },

  optionText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gray700,
  },

  optionTextSelected: {
    color: COLORS.white,
  },

  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.gray50,
  },

  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gray700,
  },

  categoryTextSelected: {
    color: COLORS.white,
  },

  // Section headers

  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 32,
    marginBottom: 14,
  },

  topPicksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 32,
    marginBottom: 14,
  },

  sectionTitle: {
    color: COLORS.black,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.4,
  },

  sectionSubtitle: {
    color: COLORS.gray500,
    fontSize: 11,
    marginTop: 4,
  },

  seeAllText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },

  // Map

  mapCard: {
    height: 210,
    backgroundColor: '#F0F0EC',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },

  mapPressed: {
    opacity: 0.93,
  },

  roadOne: {
    position: 'absolute',
    width: 330,
    height: 15,
    backgroundColor: COLORS.white,
    top: 55,
    left: -30,
    transform: [{ rotate: '17deg' }],
  },

  roadTwo: {
    position: 'absolute',
    width: 350,
    height: 12,
    backgroundColor: COLORS.white,
    top: 120,
    left: 35,
    transform: [{ rotate: '-25deg' }],
  },

  roadThree: {
    position: 'absolute',
    width: 14,
    height: 280,
    backgroundColor: COLORS.white,
    left: 110,
    top: -25,
    transform: [{ rotate: '15deg' }],
  },

  mapMarkerOne: {
    position: 'absolute',
    top: 38,
    right: 70,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  mapMarkerTwo: {
    position: 'absolute',
    top: 95,
    left: 65,
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userMarker: {
    position: 'absolute',
    top: 75,
    left: '52%',
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: 'rgba(255,90,0,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userMarkerInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  mapOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    minHeight: 67,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 5,
  },

  mapOverlayIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFF3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapOverlayText: {
    flex: 1,
    marginLeft: 11,
  },

  mapOverlayTitle: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: '800',
  },

  mapOverlaySubtitle: {
    color: COLORS.gray500,
    fontSize: 10,
    marginTop: 3,
  },

  // Restaurant cards

  restaurantList: {
    gap: 12,
    paddingRight: 20,
  },

  restaurantCard: {
    width: 220,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 22,
    overflow: 'hidden',
  },

  restaurantCardPressed: {
    opacity: 0.9,
  },

  foodImage: {
    height: 135,
    backgroundColor: '#FFF3EC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  foodEmoji: {
    fontSize: 64,
  },

  favoriteButton: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    top: 10,
  },

  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.black,
  },

  restaurantContent: {
    padding: 14,
  },

  restaurantName: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: '800',
  },

  restaurantCategory: {
    color: COLORS.gray500,
    fontSize: 11,
    marginTop: 4,
  },

  restaurantMeta: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  metaText: {
    color: COLORS.gray500,
    fontSize: 10,
    fontWeight: '600',
  },

  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.gray400,
    marginHorizontal: 7,
  },

  bottomSpace: {
    height: 25,
  },
});