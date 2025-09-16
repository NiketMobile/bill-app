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


import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../constant/colors';
import { scale } from '../../../utils/appScale';
import Wrapper from '../../../components/wrapper';
import AppHeader from '../../../components/AppHeader';
import { images } from '../../../constant/images';
import { fonts } from '../../../constant/fonts';

const bills = [
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

  const renderBill = ({ item }) => {
    const bgColor =
      item.status === 'Approved'
        ? colors.bg_v1
        : item.status === 'Rejected'
          ? '#FAF5F5'
          : '#F6FAF6';

    return (
      <View style={styles.billContainer}>

        <View style={[styles.billDetails, { backgroundColor: bgColor }]}>
          <View style={[styles.approvedContainer, { backgroundColor: bgColor }]}>
            <Image source={item.image} style={styles.approvedIcon} />
          </View>
          <View style={{
            position: 'absolute', right: -10, bottom: -10,
            backgroundColor: item.vote == "1" ? colors.themeColor : colors.lite_red,
            padding: 5,
            borderRadius: 50,
            borderWidth: 0.7,
            borderColor: colors.theme_v1
          }}>
            <Image source={item.vote == "1" ? images.heart2 : images.cross} style={styles.actionIcon}
              tintColor={item.vote == "1" ? colors.white : colors.red}
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
        <AppHeader
          title="Tracked Bills"
          leftIcon={images.back_2}
          rightIcon={images.filter}
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => console.log('Filter pressed')}
        />
        <FlatList
          style={styles.flatList}
          data={bills}
          keyExtractor={(item, index) => `${item.billId}-${index}`}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scale(20) }}
          renderItem={renderBill}
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
    marginBottom: scale(12),
  },
  billContainer: {
    width: '48%', // 2 columns with spacing
    backgroundColor: colors.white,
    borderRadius: scale(12),
    padding: scale(12),
  },
  billDetails: {
    height: scale(100),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(12),
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
