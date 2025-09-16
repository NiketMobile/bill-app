import {
  StyleSheet,
  View,
  Animated,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import BillCard from '../../../components/BillCard';
import TopHeader from '../../../components/TopHeader';
import BillDetails from '../../../components/BillDetails';
import BillDetailsBottomSheet from '../../../components/billDetailsBottomSheet';
import Wrapper from '../../../components/wrapper';
import { colors } from '../../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import { Host, Portal } from 'react-native-portalize';



const API_KEY = '134cb3a1ea3eef93c5c1b71312b2da6a';
const STATE = 'AL';

const fetchBills = async (page = 1, pageSize = 10) => {
  try {
    const searchUrl = `https://api.legiscan.com/?key=${API_KEY}&op=getSearchRaw&state=${STATE}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK') throw new Error('Failed to fetch bills');

    const allBillIds = searchData.searchresult.results.map(
      item => item.bill_id,
    );

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageBillIds = allBillIds.slice(startIdx, endIdx);

    const billDetails = await Promise.all(
      pageBillIds.map(async billId => {
        const billUrl = `https://api.legiscan.com/?key=${API_KEY}&op=getBill&id=${billId}`;
        const response = await fetch(billUrl);
        const data = await response.json();
        return data.bill;
      }),
    );

    return billDetails.filter(bill => {
      // console.log('bill', JSON.stringify(bill, null, 2))
      return bill
    });

  } catch (error) {
    console.error('Error fetching bills:', error);
    return [];
  }
};

const HomeScreen = () => {
  const navigation = useNavigation()
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkedBills, setBookmarkedBills] = useState(new Set());
  const [lovedBills, setLovedBills] = useState(new Set());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const swipe = useRef(new Animated.ValueXY()).current;
  const sheetRef = useRef(null);
  const swiperRef = useRef(null);

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

  const handlewSlectState = () => {
    handleOpenModal()
  }

  const handleFilter = () => {
    navigation.navigate("StackScreens", { screen: "FilterScreen" })
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [savedBookmarks, savedLoves] = await Promise.all([
        // AsyncStorage.getItem('bookmarkedBills'),
        // AsyncStorage.getItem('lovedBills'),
      ]);

      if (savedBookmarks)
        setBookmarkedBills(new Set(JSON.parse(savedBookmarks)));
      if (savedLoves) setLovedBills(new Set(JSON.parse(savedLoves)));

      await loadMoreBills();
    } catch (error) {
      console.error('Initial load error:', error);
    }
  };

  const loadMoreBills = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newBills = await fetchBills(currentPage);

      console.log('newBills?.length', JSON.stringify(newBills?.length, null, 2))


      setResults(prev => [...prev, ...newBills]);
      setCurrentPage(prev => prev + 1);
      setHasMore(newBills?.length > 0);

    } catch (error) {
      console.error('Failed to fetch bills:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleBookmark = async (billId) => {
    const newBookmarks = new Set(bookmarkedBills);

    newBookmarks.has(billId)
      ? newBookmarks.delete(billId)
      : newBookmarks.add(billId);

    setBookmarkedBills(newBookmarks);
  };

  const handleLove = async (billId, shouldAnimate = true) => {
    const newLoves = new Set(lovedBills);
    newLoves.has(billId) ? newLoves.delete(billId) : newLoves.add(billId);
    setLovedBills(newLoves);
    // await AsyncStorage.setItem('lovedBills', JSON.stringify([...newLoves]));
  };

  const openModal = () => {
    handleOpenModal()
    setIsModalVisible(true)
  };

  const handleSearch = () => {
  }

  console.log('results--->', JSON.stringify(results.length, null, 2))
  console.log('currentIndex--->', JSON.stringify(currentIndex, null, 2))
  console.log('loading', JSON.stringify(loading, null, 2))



  const handlewSwipedLeft = (data) => {

  }

  const handlewSwipedRight = (data) => {

  }
  

  // --- Called every swipe ---
  const handleSwiped = (index) => {
    setCurrentIndex(index + 1);

    // if user reaches 2 cards before the end, prefetch next page
    if (hasMore && index >= results.length - 3) {
      loadMoreBills(false);
    }
  };



  return (
    <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
      <Host>
        <View style={styles.container}>
          <TopHeader onPressSearch={handleSearch} onPressFilter={handleFilter} />
          <View style={{ flex: 1, }}>

            {loading && currentIndex === 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#050A20" />
              </View>
            ) : results?.length > 0 ? (
              <>
                <Swiper
                  ref={swiperRef}
                  cards={results}
                  renderCard={(item) => {
                    console.log('item---', JSON.stringify(item?.bill_id, null, 2))
                    return (
                      <BillCard
                        // item={results[currentIndex]}
                        item={item}
                        swipe={swipe}
                        openModal={openModal}
                        isBookmarked={bookmarkedBills?.has(results[currentIndex]?.bill_id)}
                      // isLoved={lovedBills.has(results[currentIndex]?.bill_id)}
                      // onBookmark={() => handleBookmark(results[currentIndex]?.bill_id)}
                      // onLove={() => handleLove(results[currentIndex]?.bill_id)}
                      />
                    )
                  }}
                  onSwipedLeft={(cardIndex) =>
                    console.log('Swiped LEFT on card index:', cardIndex)
                  }
                  onSwipedRight={(cardIndex) =>
                    console.log('Swiped RIGHT on card index:', cardIndex)
                  }
                  onSwipedAll={() => console.log('All cards swiped')}
                  onSwiped={handleSwiped}
                  stackSize={2}
                  backgroundColor="transparent"
                  cardVerticalMargin={10}
                />
                {loading && (
                  <View style={styles.loadingMoreContainer}>
                    <ActivityIndicator size="small" color="#050A20" />
                    <Text style={styles.loadingText}>Loading more bills...</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {hasMore ? 'Loading bills...' : 'No more bills to display'}
                </Text>
                {!hasMore && (
                  <Pressable
                    onPress={() => {
                      setCurrentIndex(0);
                      setCurrentPage(1);
                      setHasMore(true);
                      loadMoreBills();
                    }}
                    style={styles.resetButton}
                  >
                    <Text style={styles.resetText}>Reload Bills</Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
        <Portal>
          <BillDetailsBottomSheet
            ref={sheetRef}>
            <View style={{
              flexGrow: 1,
            }}>
              <BillDetails
                setIsModalVisible={setIsModalVisible}
                bill={results[currentIndex]}
                isBookmarked={bookmarkedBills.has(results[currentIndex]?.bill_id)}
                isLoved={lovedBills.has(results[currentIndex]?.bill_id)}
                onBookmark={() => handleBookmark(results[currentIndex]?.bill_id)}
                onLove={() => handleLove(results[currentIndex]?.bill_id)}
              />
            </View>
          </BillDetailsBottomSheet>
        </Portal>
      </Host>
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_v1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#050A20',
    marginBottom: 20,
  },
  resetButton: {
    padding: 15,
    backgroundColor: '#050A20',
    borderRadius: 8,
  },
  resetText: {
    color: 'white',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMoreContainer: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#050A20',
  },
  modal: {
    justifyContent: 'flex-end', // 👈 bottom sheet style
    margin: 0, // full width
  },
  modalContent: {
    height: '90%', // take 90% of screen height
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
