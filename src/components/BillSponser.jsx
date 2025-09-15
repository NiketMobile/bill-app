import { FlatList, Image, Pressable, StyleSheet, Text, TextProps, TouchableOpacity, View, ViewProps } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { moderateScale, scale } from "../utils/appScale";
import { colors } from "../constant/colors";
import { images } from "../constant/images";
import { fonts } from "../constant/fonts";


const cosponsors = [
  { id: '1', name: 'Flores, Juanita', image: 'https://picsum.photos/200/300' },
  { id: '2', name: 'Black, Marvin', image: 'https://picsum.photos/200/300' },
  { id: '3', name: 'Miles, Esther', image: 'https://placekitten.com/202/202' },
  { id: '4', name: 'Nguyen, Shane', image: 'https://placekitten.com/203/203' },
  { id: '5', name: 'Henry, Arthur', image: 'https://placekitten.com/204/204' },
  { id: '6', name: 'Cooper, Kristin', image: 'https://placekitten.com/205/205' },
];
const CARD_HEIGHT = 80;



const BillSponser = ({ sponsors, ...rest }) => {


  const renderItem = ({ item }) => {
    return (
      <View style={styles.cards}>
        <Image source={{ uri: item.image }} style={styles.avatars} />
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Text style={styles.names}>{item.name}</Text>
          <Text style={styles.role}>Cosponsor</Text>
          <TouchableOpacity style={styles.iconWrappers}>
            <Image source={images.email2} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  return (
    <View style={{
      marginTop: scale(30)
    }}>

      <View style={styles.card}>
        <View>
          <Image
            source={{ uri: 'https://picsum.photos/200/300' }} // replace with your image URL
            style={styles.avatar}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Richard Blumenthal</Text>
              <Text style={styles.role}>Sponsor</Text>
            </View>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image source={images.email2} style={styles.icons} />
            </TouchableOpacity>
          </View>
          <Text style={styles.description} numberOfLines={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>
      </View>

      <View style={{
        marginTop: scale(5)
      }}>
        <View>
          <Text style={styles.titleView}>Cosponsor</Text>
        </View>
        <FlatList
          data={cosponsors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      </View>


    </View>
  );
};

export default BillSponser;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.bg_v1,
    // borderColor: colors.theme_v1,
    // borderWidth: 1,
    borderRadius: 8,
    padding: scale(10),
    marginBottom: scale(14),
  },
  titleView: {
    fontSize: moderateScale(16),
    color: colors.text,
    fontFamily: fonts.medium,
    fontWeight: '400',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  role: {
    color: colors.text_v1,
    fontSize: 14,
    marginTop: 2,
  },
  description: {
    color: colors.text_v3,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(7)
  },
  icon: {
    fontSize: 16,
    color: colors.themeColor,
  },
  icons: {
    width: scale(22),
    height: scale(22),
    resizeMode: "contain",
    tintColor: colors.white
  },


  container: {
    paddingVertical: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg_v1,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    minHeight: CARD_HEIGHT + 5,
  },
  avatars: {
    width: CARD_HEIGHT / 1.4,
    height: CARD_HEIGHT / 1.3,
    borderRadius: 6,
    marginLeft: 8
  },
  names: {
    fontSize: moderateScale(12),
    color: colors.text,
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  role: {
    fontSize: moderateScale(12),
    color: colors.theme_v1,
    fontFamily: fonts.light,
    fontWeight: '400',
  },
  iconWrappers: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
  },
  icons: {
    width: scale(17),
    height: scale(17),
    resizeMode: "contain",
    tintColor: colors.theme_v1
  },

});
