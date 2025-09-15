// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Wrapper from '../../../components/wrapper'
// import { clearAppStorage } from '../../../utils/globalFunctions'
// import Button from '../../../components/button'
// import { useNavigation } from '@react-navigation/native'
// import { placeToken, placeUserData } from '../../../redux/reducers/userInfoReducer'
// import { useDispatch } from 'react-redux'

// const Home = () => {
//   const navigation = useNavigation()
//   const dispatch = useDispatch()

//   const logoutPress = async () => {
//     navigation.navigate('Splash');
//     await clearAppStorage()
//     dispatch(placeToken(null));
//     dispatch(placeUserData({}));
//   }


//   return (
//     <Wrapper barStyle="dark-content">
//       <View style={{
//         justifyContent: "center",
//         alignItems: "center",
//         flex: 1,
//         paddingHorizontal: 20
//       }}>
//         <Text>Home screen</Text>
//         <Button onPress={logoutPress} title="Logout" />
//       </View>
//     </Wrapper>
//   )
// }

// export default Home

// const styles = StyleSheet.create({})



import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import BillCard from '../../../components/BillCard';
import TopHeader from '../../../components/TopHeader';
import BillDetails from '../../../components/BillDetails';
import BillDetailsBottomSheet from '../../../components/billDetailsBottomSheet';
import Modal from 'react-native-modal';
import Wrapper from '../../../components/wrapper';
import { colors } from '../../../constant/colors';
import { useNavigation } from '@react-navigation/native';


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

    return billDetails.filter(bill => bill);
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








  useEffect(() => {
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

    loadInitialData();
  }, []);

  const loadMoreBills = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newBills = await fetchBills(currentPage);
      // console.log('newBills===========>', JSON.stringify(newBills, null, 2));

      setResults(prev => [...prev, ...newBills]);
      setCurrentPage(prev => prev + 1);
      setHasMore(newBills.length > 0);
    } catch (error) {
      console.error('Failed to fetch bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const animateAndChangeCard = direction => {
    const currentBillId = results[currentIndex]?.bill_id;

    if (direction > 0) {
      handleLove(currentBillId, false);
    } else {
      handleBookmark(currentBillId, false);
    }

    Animated.timing(swipe, {
      toValue: { x: direction * 500, y: 0 },
      useNativeDriver: true,
      duration: 300,
    }).start(() => {
      if (currentIndex >= results.length - 3) {
        loadMoreBills();
      }

      if (currentIndex < results.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }

      swipe.setValue({ x: 0, y: 0 });
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => swipe.setValue({ x: dx, y: dy }),
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        animateAndChangeCard(direction);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const handleBookmark = async (billId, shouldAnimate = true) => {
    const newBookmarks = new Set(bookmarkedBills);
    newBookmarks.has(billId)
      ? newBookmarks.delete(billId)
      : newBookmarks.add(billId);
    setBookmarkedBills(newBookmarks);
    // await AsyncStorage.setItem(
    //   'bookmarkedBills',
    //   JSON.stringify([...newBookmarks]),
    // );

    if (shouldAnimate) {
      animateAndChangeCard(-1);
    }
  };

  const handleLove = async (billId, shouldAnimate = true) => {
    const newLoves = new Set(lovedBills);
    newLoves.has(billId) ? newLoves.delete(billId) : newLoves.add(billId);
    setLovedBills(newLoves);
    // await AsyncStorage.setItem('lovedBills', JSON.stringify([...newLoves]));

    if (shouldAnimate) {
      animateAndChangeCard(1);
    }
  };

  const openModal = () => {
    handleOpenModal()
    setIsModalVisible(true)
  };

  const handleSearch = () => {
    navigation.navigate("StackScreens", { screen: "SearchScreen" })
  }

  // console.log('results', JSON.stringify(results, null, 2))

  return (
    <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
      <View style={styles.container}>
        <TopHeader onPressSearch={handleSearch} />
        <View style={{ flex: 1 }}>
          {loading && currentIndex === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#050A20" />
            </View>
          ) : results.length > 0 ? (
            <>
              <BillCard
                item={results[currentIndex]}
                swipe={swipe}
                {...panResponder.panHandlers}
                openModal={openModal}
                isBookmarked={bookmarkedBills.has(results[currentIndex]?.bill_id)}
                isLoved={lovedBills.has(results[currentIndex]?.bill_id)}
                onBookmark={() => handleBookmark(results[currentIndex]?.bill_id)}
                onLove={() => handleLove(results[currentIndex]?.bill_id)}
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
      <BillDetailsBottomSheet
        ref={sheetRef}
      >
        <View style={{ flexGrow: 1 }}>
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
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
