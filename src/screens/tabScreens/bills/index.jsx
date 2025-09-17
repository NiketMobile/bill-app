import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "../../../constant/images";
import Wrapper from "../../../components/wrapper";
import { colors } from "../../../constant/colors";
import AppHeader from "../../../components/AppHeader";
import { fontScale, scale } from "../../../utils/appScale";
import { fonts } from "../../../constant/fonts";
import { useSelector } from "react-redux";
import Loader from "../../../components/loader";
import { useNavigation } from "@react-navigation/native";


const bills = [
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Approved",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Succeeded",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Rejected",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Approved",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Rejected",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Rejected",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Approved",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
  {
    name: "100 Years of Women in Act",
    description:
      "To amend the Department of Agriculture program for research and extension grants to increase participation by women",
    status: "Rejected",
    image: images.approved,
    state: "Pennsylvania",
    billId: "H.R.4570",
  },
];

const Bills = () => {

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
  }, []);

  const userInfo = useSelector((state) => state?.userInfo?.userData)


  const navigation = useNavigation();

  const handleFilter = () => {
    navigation.navigate("StackScreens", { screen: "FilterScreen" })
  }


  return (
    <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
      <View style={styles.container}>
        <AppHeader
          title="Bills"
          leftIcon={images.back_2}
          rightIcon={images.filter}
          onLeftPress={() => navigation.goBack()}
          onRightPress={handleFilter}
        />

        {
          isLoading && <Loader />
        }

        <FlatList
          style={styles.flatList}
          data={bills}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log('item', JSON.stringify(item, null, 2))
            return (
              <View
                style={styles.billContainer}
              >
                <View
                  style={[
                    styles.billDetails,
                    {
                      backgroundColor:
                        item.status === "Approved"
                          ? "#F5F6FA"
                          : item.status === "Rejected"
                            ? "#FAF5F5"
                            : "#F6FAF6",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.approvedContainer,
                      {
                        backgroundColor:
                          item.status === "Approved"
                            ? "#F5F6FA"
                            : item.status === "Rejected"
                              ? "#FAF5F5"
                              : "#F6FAF6",
                      },
                    ]}
                  >
                    <Image source={item.image} style={[styles.approvedIcon]} />
                  </View>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.billName} numberOfLines={2}>{item.title}</Text>
                  <View style={styles.row}>
                    <Text style={styles.billSubText}>{item.state}</Text>
                    <Text style={styles.billSubText}>{item.bill_number}</Text>
                  </View>
                  <Text style={styles.billDescription} numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>
              </View>
            )
          }}
        />

      </View>
    </Wrapper>
  );
};

export default Bills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: scale(15),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  backIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 1,
  },
  filterIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 1,
  },
  backContainer: {
    borderRadius: 25,
    padding: 1.5,
  },
  searchGradient: {
    borderRadius: 25,
    padding: 1.5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#050A20",
  },
  filterContainer: {
    borderRadius: 25,
    padding: 12,
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  billContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    // alignItems: "center",
    padding: 10,
    borderRadius: 5,
    gap: 10,
    marginBottom: scale(10),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // backgroundColor: 'pink'
  },
  approvedIcon: {
    height: scale(23),
    width: scale(23),
    resizeMode: "contain",
  },
  approvedContainer: {
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  billDetails: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  billName: {
    fontSize: fontScale(16),
    fontWeight: "600",
    color: "#141C46",
    fontFamily: fonts.semiBold,
  },
  billDescription: {
    fontWeight: "400",
    color: "#141C46",
    fontSize: fontScale(14),
    fontWeight: "300",
    color: "#141C46",
    fontFamily: fonts.light,
  },
  billSubText: {
    fontSize: fontScale(14),
    fontWeight: "500",
    fontFamily: fonts.medium,
    color: "#141C46",
  },
  flatList: {
    marginTop: scale(20),
  },
});
