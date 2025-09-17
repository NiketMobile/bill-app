import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { colors } from '../../../constant/colors';
import Wrapper from '../../../components/wrapper';
import AppHeader from '../../../components/AppHeader';
import { scale } from '../../../utils/appScale';
import { images } from '../../../constant/images';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../constant/fonts';
import BillDetailsBottomSheet from '../../../components/billDetailsBottomSheet';
import NewsDetails from '../../../components/newsDetails';

const sampleData = [
  {
    id: '1',
    title: 'The On the Dot Award',
    date: '5th December, 1990',
    author: 'Richard Blumenthal',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women and minorities in STEM Fields.',
  },
  {
    id: '2',
    title: 'The On the Dot Award',
    date: '5th December, 1990',
    author: 'Richard Blumenthal',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women and minorities in STEM Fields.',
  },
];

const News = () => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleCountrySelect = useCallback(() => {
    handleClosePress();
  }, []);

  const handleOpenModal = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);







  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal()} style={styles.card} activeOpacity={0.7}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.metaRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={images.calender} style={styles.icon} />
          <Text style={styles.meta}>{item.date}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={images.calender} style={styles.icon} />
          <Text style={styles.meta}>{item.author}</Text>
        </View>
      </View>

      <Text style={styles.desc} numberOfLines={4}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );




  return (
    <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
      <View style={styles.containerView}>
        <AppHeader
          title="News"
          // leftIcon={images.back_2}
          rightIcon={images.filter}
          // onLeftPress={() => navigation.goBack()}
          onRightPress={() => console.log('Filter pressed')}
        />
        <FlatList
          style={styles.flatList}
          data={sampleData}
          keyExtractor={(item, idx) => `${item.id}-${idx}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={renderItem}
        />
      </View>

      <BillDetailsBottomSheet
        ref={sheetRef}
        sheetStyle={{
          shadowColor: 'transparent',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <NewsDetails />
        </View>
      </BillDetailsBottomSheet>

    </Wrapper>
  );
};

export default News;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: colors.bg_v1,
    paddingHorizontal: scale(15),
  },
  flatList: {
    marginTop: scale(10),
  },
  listContainer: {
    paddingTop: scale(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: scale(12),
    marginBottom: scale(12),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: scale(15),
    fontWeight: '600',
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 6,
  },
  icon: {
    width: scale(14),
    height: scale(14),
    tintColor: colors.theme_v1,
    marginRight: 4,
  },
  meta: {
    fontSize: scale(12),
    fontWeight: '400',
    fontFamily: fonts.regular,
    color: colors.theme_v1,
  },
  dot: {
    marginHorizontal: 6,
    color: colors.text_v3,
  },
  desc: {
    color: colors.text_v1,
    lineHeight: 16,
    fontSize: scale(13),
    fontWeight: '400',
    fontFamily: fonts.light,
  },
});
