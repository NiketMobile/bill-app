// import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { colors } from '../../../constant/colors'
// import { scale } from '../../../utils/appScale'
// import Wrapper from '../../../components/wrapper'
// import AppHeader from '../../../components/AppHeader'
// import { images } from '../../../constant/images'
// import { useNavigation } from '@react-navigation/native'


// const bills = [
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Approved",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Succeeded",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Rejected",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Approved",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Rejected",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Rejected",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },
//   {
//     name: "100 Years of Women in Act",
//     description:
//       "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
//     status: "Approved",
//     image: images.approved,
//     state: "Pennsylvania",
//     billId: "H.R.4570",
//   },

// ];

// const Liked = () => {
//   const navigation = useNavigation()



//   return (
//     <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
//       <View style={styles.container}>
//         <AppHeader
//           title="My Bills"
//           leftIcon={images.back_2}
//           rightIcon={images.filter}
//           onLeftPress={() => navigation.goBack()}
//           onRightPress={() => console.log('Settings pressed')}
//         />


//         <FlatList
//           style={styles.flatList}
//           data={bills}
//           keyExtractor={(item, index) => `${item.billId}-${index}`}
//           numColumns={2}
//           columnWrapperStyle={styles.columnWrapper}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <View style={styles.billContainer}>
//               <View
//                 style={[
//                   styles.billDetails,
//                   {
//                     backgroundColor:
//                       item.status === 'Approved'
//                         ? '#F5F6FA'
//                         : item.status === 'Rejected'
//                           ? '#FAF5F5'
//                           : '#F6FAF6',
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.approvedContainer,
//                     {
//                       backgroundColor:
//                         item.status === 'Approved'
//                           ? '#F5F6FA'
//                           : item.status === 'Rejected'
//                             ? '#FAF5F5'
//                             : '#F6FAF6',
//                     },
//                   ]}
//                 >
//                   <Image source={item.image} style={styles.approvedIcon} />
//                 </View>
//               </View>

//               <View style={{ flex: 1, gap: 4 }}>
//                 <Text style={styles.billName}>{item.name}</Text>
//                 <View style={styles.row}>
//                   <Text style={styles.billSubText}>{item.state}</Text>
//                   <Text style={styles.billSubText}>{item.billId}</Text>
//                 </View>
//                 <Text style={styles.billDescription} numberOfLines={3}>
//                   {item.description}
//                 </Text>
//               </View>
//             </View>
//           )}
//         />




//       </View>
//     </Wrapper>
//   )
// }

// export default Liked

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bg_v1,
//     paddingHorizontal: scale(15),
//   },
//   flatList: {
//     flex: 1,
//     paddingTop: scale(20),
//   },
//   columnWrapper: {
//     justifyContent: 'space-between',   // space between the two columns
//     marginBottom: scale(10),                  // vertical gap between rows
//   },
//   billContainer: {
//     width: "49%",                            // ensures equal width columns
//     marginHorizontal: 4,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//   },
//   billDetails: {
//     height: 120,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   approvedContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   approvedIcon: {
//     width: 28,
//     height: 28,
//     resizeMode: 'contain',
//   },
//   billName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#050A20',
//   },
//   billSubText: {
//     fontSize: 12,
//     color: '#141C4699',
//   },
//   billDescription: {
//     fontSize: 13,
//     color: '#141C46',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// })


import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../constant/colors';
import { scale } from '../../../utils/appScale';
import Wrapper from '../../../components/wrapper';
import AppHeader from '../../../components/AppHeader';
import { images } from '../../../constant/images';
import { fonts } from '../../../constant/fonts';
import Loader from '../../../components/loader';
import { apiServices } from '../../../services/apiService';
import { useSelector } from 'react-redux';


const billsData = [
  {
    name: '100 Years of Women in Act',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women',
    status: 'Approved',
    image: images.approved,
    state: 'Pennsylvania',
    billId: 'H.R.4570',
    vote: "1"
  },
  {
    name: '100 Years of Women in Act',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women',
    status: 'Succeeded',
    image: images.approved,
    state: 'Pennsylvania',
    billId: 'H.R.4570',
  },
  {
    name: '100 Years of Women in Act',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women',
    status: 'Rejected',
    image: images.approved,
    state: 'Pennsylvania',
    billId: 'H.R.4570',
  },
  {
    name: '100 Years of Women in Act',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women',
    status: 'Rejected',
    image: images.approved,
    state: 'Pennsylvania',
    billId: 'H.R.4570',
    vote: "2"
  },
  {
    name: '100 Years of Women in Act',
    description:
      'To amend the Department of Agriculture program for research and extension grants to increase participation by women',
    status: 'Rejected',
    image: images.approved,
    state: 'Pennsylvania',
    billId: 'H.R.4570',
    vote: "1"
  },
];



const Liked = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true)


  const API_KEY = '134cb3a1ea3eef93c5c1b71312b2da6a';
  const STATE = 'AL';
  const PAGE_SIZE = 10;

  let allBillIdsCache = []; // Cache all IDs globally

  const fetchAllBillIds = async () => {
    try {
      const url = `https://api.legiscan.com/?key=${API_KEY}&op=getSearchRaw&state=${STATE}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.status !== 'OK') throw new Error('Failed to fetch bill IDs');
      setIsLoading(false)
      const ids = json.searchresult.results.map(item => item.bill_id);
      allBillIdsCache = ids;
      return ids;
    } catch (error) {
      console.error('fetchAllBillIds error:', error);
      return [];
    }
  };

  const fetchBillsPage = async (page = 1) => {
    if (allBillIdsCache.length === 0) {
      await fetchAllBillIds(); // fill cache first
    }

    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const pageIds = allBillIdsCache.slice(startIdx, endIdx);

    const bills = await Promise.all(
      pageIds.map(async id => {
        try {
          const url = `https://api.legiscan.com/?key=${API_KEY}&op=getBill&id=${id}`;

          const res = await fetch(url);
          const json = await res.json();
          return json.bill;
        } catch (err) {
          console.error('fetchBillsPage error for id', id, err);
          return null;
        }
      })
    );

    return bills.filter(Boolean);
  };


  const userInfo = useSelector((state) => state?.userInfo?.userData)


  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadNextPage = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newBills = await fetchBillsPage(page);
      if (newBills.length === 0) {
        setHasMore(false);
      } else {
        setBills(prev => [...prev, ...newBills]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('loadNextPage error:', error);
    } finally {
      setLoading(false);
    }
  };

  // console.log('bills', JSON.stringify(bills?.length, null, 2))

  useEffect(() => {
    loadNextPage();
  }, [userInfo]);



  const [leftSwipeBills, setleftSwipeBills] = useState([])
  const [rightSwipeBills, setRightSwipeBills] = useState([])


  const getAllSwipedBills = async (uid) => {

    try {
      const responseLeft = await apiServices.getLeftSwipedBills(uid);
      const responseRight = await apiServices.getRightSwipedBills(uid);

      console.log('responseLeft--->', JSON.stringify(responseLeft?.data?.length, null, 2))
      console.log('responseRight--->', JSON.stringify(responseRight?.data?.length, null, 2))

      if (responseLeft?.success) {
        setleftSwipeBills(responseLeft?.data)
        console.log('Bill successfully liked');
      }
      if (responseRight?.success) {
        setRightSwipeBills(responseRight?.data)
        console.log('Bill successfully liked');
      }
    } catch (err) {
      console.error('addLikedAction threw an error:', err);
    }
  };





  // ✅ Fetch full bill details for an arbitrary array of bill IDs
  const fetchBillsByIds = async (billIds = []) => {
    if (!billIds.length) return [];

    try {
      const bills = await Promise.all(
        billIds.map(async (id) => {
          try {
            const url = `https://api.legiscan.com/?key=${API_KEY}&op=getBill&id=${id}`;
            const res = await fetch(url);
            const json = await res.json();
            return json.bill;        // LegiScan returns { bill: {...} }
          } catch (err) {
            console.error(`Error fetching bill ${id}:`, err);
            return null;
          }
        })
      );

      return bills.filter(Boolean);   // remove nulls if any failed
    } catch (error) {
      console.error('fetchBillsByIds error:', error);
      return [];
    }
  };

  const getLeftSwipedBillDetails = async (uid) => {
    try {
      const responseLeft = await apiServices.getLeftSwipedBills(uid);
      if (responseLeft?.success) {
        // extract just the billId numbers
        const billIds = responseLeft.data.map(b => b.billId);
        // fetch their full details from LegiScan
        const fullBills = await fetchBillsByIds(billIds);
        // setleftSwipeBills(fullBills);
      }
    } catch (err) {
      console.error('getLeftSwipedBillDetails error:', err);
    }
  };

  const getRightSwipedBillDetails = async (uid) => {
    try {
      const responseLeft = await apiServices.getLeftSwipedBills(uid);
      if (responseLeft?.success) {
        // extract just the billId numbers
        const billIds = responseLeft.data.map(b => b.billId);
        // fetch their full details from LegiScan
        const fullBills = await fetchBillsByIds(billIds);
        // setRightSwipeBills(fullBills);
      }
    } catch (err) {
      console.error('getLeftSwipedBillDetails error:', err);
    }
  };

  const [swipedBills, setSwipedBills] = useState([]);

  const getAllSwipedBillDetails = async (uid) => {
    try {
      // Fetch Firestore docs for left & right in parallel
      const [leftRes, rightRes] = await Promise.all([
        apiServices.getLeftSwipedBills(uid),
        apiServices.getRightSwipedBills(uid),
      ]);

      const leftIds = leftRes?.success ? leftRes.data.map(b => b.billId) : [];
      const rightIds = rightRes?.success ? rightRes.data.map(b => b.billId) : [];

      // Fetch full LegiScan details
      const [leftDetails, rightDetails] = await Promise.all([
        fetchBillsByIds(leftIds),
        fetchBillsByIds(rightIds),
      ]);

      // Merge into one array, tagging each with swipe direction
      const combined = [
        ...leftDetails.map(bill => ({ ...bill, swipe: 'left' })),
        ...rightDetails.map(bill => ({ ...bill, swipe: 'right' })),
      ];

      setSwipedBills(combined);

    } catch (err) {
      console.error('getAllSwipedBillDetails error:', err);
    }
  };

  useEffect(() => {
    if (userInfo?.uid) {
      // getLeftSwipedBillDetails(userInfo?.uid)
      // getRightSwipedBillDetails(userInfo?.uid)
      getAllSwipedBillDetails(userInfo?.uid)
      getAllSwipedBills(userInfo?.uid)
    }
  }, [userInfo?.uid])





  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{
        padding: 20,
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  };



  const renderBill = ({ item }) => {
    // console.log('item', JSON.stringify(item, null, 2))
    const bgColor =
      item.status === 'Approved'
        ? colors.bg_v1
        : item.status === 'Rejected'
          ? '#FAF5F5'
          : '#F6FAF6';

    const swipeSide_left = leftSwipeBills?.includes(bill => bill.billId == item?.bill_id);
    const swipeSide_right = rightSwipeBills?.some(bill => bill.billId == item?.bill_id);



    return (
      <View style={styles.billContainer}>

        <View style={[styles.billDetails, { backgroundColor: bgColor }]}>
          <View style={[styles.approvedContainer, { backgroundColor: colors.bg_v1 }]}>
            <Image source={item.image} style={styles.approvedIcon} />
          </View>
          <View style={{
            position: 'absolute', right: -10, bottom: -10,
            // backgroundColor: swipeColor || 'transparent',
            backgroundColor: swipeSide_right ? colors.themeColor : colors.lite_red,
            padding: 5,
            borderRadius: 50,
            borderWidth: 0.7,
            borderColor: colors.theme_v1
          }}>
            <Image source={swipeSide_right ? images.heart2 : images.cross} style={styles.actionIcon}
              tintColor={swipeSide_right ? colors.white : colors.red}
            />
          </View>

        </View>

        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.billName}>{item.name}</Text>
          <View style={styles.row}>
            <Text style={styles.billSubText}>{item.state}</Text>
            <Text style={styles.billSubText}>{item.billId}</Text>
          </View>
          <Text style={styles.billDescription} numberOfLines={3}>
            {item.description}
          </Text>
        </View>

      </View>
    );
  };

  return (
    <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
      <View style={styles.container}>
        {
          isLoading && <Loader />
        }
        <AppHeader
          title="Tracked Bills"
          leftIcon={images.back_2}
          rightIcon={images.filter}
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => console.log('Filter pressed')}
        />
        <FlatList
          style={styles.flatList}
          // data={billsData}
          // data={bills}
          data={swipedBills}
          keyExtractor={(item, index) => `${item.billId}-${index}`}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scale(20) }}
          renderItem={renderBill}
          renderFooter={renderFooter}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
        />
      </View>
    </Wrapper>
  );
};

export default Liked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_v1,
    paddingHorizontal: scale(15),
  },
  flatList: {
    flex: 1,
    paddingTop: scale(20),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    // marginBottom: scale(12),
  },
  billContainer: {
    width: '48%', // 2 columns with spacing
    backgroundColor: colors.white,
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: scale(12),
  },
  billDetails: {
    height: scale(100),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: scale(12),
  },
  approvedContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  approvedIcon: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
  },
  actionIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  billName: {
    fontSize: scale(14.6),
    fontWeight: '600',
    color: colors.text,
    fontFamily: fonts.semiBold,
  },
  billSubText: {
    fontSize: scale(12),
    color: colors.text_v3,
    fontFamily: fonts.medium,
    fontWeight: "500"
  },
  billDescription: {
    fontSize: scale(13),
    color: colors.text_v1,
    fontFamily: fonts.light,
    fontWeight: "300"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
