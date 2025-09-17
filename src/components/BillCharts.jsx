import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CurvedPieChart } from "./charts/CurvedPieChart";
// import PieCharts from "./PieCharts";
import PolarAreaChart from "./charts/PolarAreaChart";
import PairBarChart from "./charts/PairBarChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import DonutChart from "./charts/DonutChart";
import RadialBarChart from "./charts/RadialBarChart";
import { fontScale, scale } from "../utils/appScale";
import { colors } from "../constant/colors";
import { images } from "../constant/images";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionAction } from "../redux/actions/getCollectionsAction";
import { getByDocumentByIdAction } from "../redux/actions/getByDocumentByIdAction";
import { apiServices } from "../services/apiService";
import Loader from "./loader";
import { fonts } from "../constant/fonts";
// import { ICONS } from "@assets/icons";

const BillCharts = ({ bill }) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState([]);

  const { data: listData, loading: loader, error } = useSelector((state) => state?.collectionReducer)
  const { data: billData, loading: loading, error: isError } = useSelector((state) => state?.documentByIdReducer)

  console.log('bill--->', JSON.stringify(bill?.bill_id, null, 2))
  console.log('billData--->', JSON.stringify(billData?.billId, null, 2))


  const checkBillIdIsPresent = async (collection_name, docs_Id) => {
    const result = await apiServices.checkDocumentIdIsPresent("SwipeSummary", "1885910");
    console.log('Document exists:sss--->', result);

    if (Number(result) !== 0) {
      console.log('Document exists:--->', result);
      dispatch(getByDocumentByIdAction({ collectionName: "SwipeSummary", docId: bill?.bill_id.toString() }));
      // call your API or continue processing
    } else {
      console.log('Document not found, skipping API call.');
    }
  }

  useEffect(() => {
    dispatch(getCollectionAction({ collectionName: "MaritalStatus" }));
    fetchAll();

    if (bill?.bill_id) {

      // console.log('bill?.bill_id--->', JSON.stringify(bill?.bill_id, null, 2))
      // checkBillIdIsPresent("SwipeSummary", bill?.bill_id)

      // dispatch(getByDocumentByIdAction({ collectionName: "SwipeSummary", docId: "1885910" }));
      dispatch(getByDocumentByIdAction({ collectionName: "SwipeSummary", docId: bill?.bill_id?.toString() }));
    }
  }, [bill?.bill_id])


  const getVoteTotals = (billData) => {
    if (!billData) return {
      liked: 0,
      disliked: 0,
      neutral: 0
    }
    const totals = { liked: 0, disliked: 0, neutral: 0 };

    Object?.entries(billData)?.forEach(([key, value]) => {
      if (key.endsWith("_counts") && typeof value === "object") {
        Object.values(value).forEach(group => {
          totals.liked += group.liked || 0;
          totals.disliked += group.disliked || 0;
          totals.neutral += group.neutral || 0;
        });
      }
    });

    // add grand total
    totals.grandTotal = totals.liked + totals.disliked + totals.neutral;
    return totals;
  };

  const totals = getVoteTotals(billData);
  // console.log('totals', JSON.stringify(totals, null, 2))



  const fetchAll = async () => {
    // const collections = ["Disability", "Gender", "IncomeRange","PoliticalAffiliation","Race","Religion","SexualOrientation","SexualOrientation"];
    const collections = ["IncomeRange", "Religion", "Race", "Gender"];

    setIsLoading(true);

    const results = [];

    try {
      for (const name of collections) {
        // wait for each API call to complete before moving on
        const res = await apiServices.getCollectionDocs(name);
        results.push({ collection: name, data: res });
      }
      setAllData(results);

    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      // ✅ stop loader after *all* calls finish (success or error)
      setIsLoading(false);
    }
  };

  const colorOptions = ["#9f97f7", "#ffb44f", "#f99bab", "#9bdfc4", "#62b2fd", "#c2c2c2"];


  const gendercolorOptions = ["#B39DDB", "#FFB74D", "#4FC3F7", "#edf7fc", "#62b2fd", "#c2c2c2"];
  const textColor = "#333"; // common text color for all slices

  const genderOptions = allData?.find(item => item.collection == "Gender")?.data || [];
  const genderRangeData = genderOptions?.map((item, i) => {
    const counts = billData?.gender_counts?.[item.id] || {
      liked: 0,
      disliked: 0,
      neutral: 0
    };
    const value = counts.liked + counts.disliked + counts.neutral;
    return {
      label: item.name,
      value,
      color: gendercolorOptions[i % gendercolorOptions.length],
      textColor
    };
  });

  // console.log('genderRangeData', JSON.stringify(genderRangeData, null, 2))


  const religionOptions = allData?.find(item => item.collection == "Religion")?.data || [];
  const religionRangeData = religionOptions?.map((item, i) => {
    const counts = billData?.religion_counts?.[item.id] || {
      liked: 0,
      disliked: 0,
      neutral: 0
    };
    const value = counts.liked + counts.disliked + counts.neutral;
    return {
      label: item.name,
      value,
      color: colorOptions[i % colorOptions.length]
    };
  });

  const gradients = [
    { start: "#7AD3FF", end: "#4FBAF0" },
    { start: "#FE464B", end: "#FE464B" },
    { start: "#FD95D3", end: "#FF5CBE" },
    { start: "#99FFA3", end: "#68EE76" },
    { start: "#FF9364", end: "#F25F33" },
    { start: "#B09FFF", end: "#8D79F6" },
    { start: "#FFD572", end: "#FEBD38" },
  ];

  const raceOptions = allData?.find(item => item.collection == "Race")?.data || [];
  const raceRangeData = raceOptions.map((item, i) => {
    const counts = billData?.race_counts?.[item.id] || { liked: 0, disliked: 0, neutral: 0 };
    const value = counts.liked + counts.disliked + counts.neutral;
    const { start, end } = gradients[i % gradients.length];

    return {
      label: item.name,
      value,
      color: colorOptions[i % colorOptions.length],
      startColor: start,
      endColor: end,
    };
  });

  const incomeOptions = allData?.find(item => item.collection == "IncomeRange")?.data || [];
  const incomeRangeData = incomeOptions
    // skip "Prefer not to answer" if you don't want it
    // .filter(opt => opt.id !== "06")
    ?.map((opt, i) => {
      const counts = billData?.income_range_counts?.[opt.id] || {
        liked: 0,
        disliked: 0,
        neutral: 0
      };
      const value = counts.liked + counts.disliked + counts.neutral;
      return {
        label: opt.name,
        value,
        color: colorOptions[i % colorOptions.length]
      };
    });



  const maritalDataColors = ["#62B2FD", "#9BDFC4", "#9F97F7", "#F59E0B", "#F87171", "#c2c2c2"];

  const maritalDataDynamic = listData
    // ?.filter(item => item.id !== "05") // skip "Prefer not to answer" if needed
    ?.map((item, index) => {
      const counts = billData?.marital_status_counts?.[item.id] || {
        disliked: 0,
        liked: 0,
        neutral: 0
      };

      const value = counts.liked + counts.disliked + counts.neutral;

      return {
        label: item.name,
        value,
        color: maritalDataColors[index % maritalDataColors?.length]
      };
    });

  const getVoteSummary = (billData, key) => {
    const counts = billData?.[key] || {};
    let liked = 0, disliked = 0, neutral = 0;

    Object?.values(counts)?.forEach(item => {
      liked += item?.liked || 0;
      disliked += item?.disliked || 0;
      neutral += item?.neutral || 0;
    });

    return {
      liked,
      disliked,
      neutral,
      total: liked + disliked + neutral,
    };
  };

  const veteranSummary = getVoteSummary(billData, "veteran_counts");
  const disabilitySummary = getVoteSummary(billData, "disability_counts");
  // console.log('disabilitySummary', JSON.stringify(disabilitySummary, null, 2))




  const chartData = [
    {
      label: "Female",
      value: 50,
      color: "#B39DDB",
      textColor: "#333",
    },
    {
      label: "Other",
      value: 25,
      color: "#FFB74D",
      textColor: "#333",
    },
    {
      label: "Male",
      value: 15,
      color: "#4FC3F7",
      textColor: "#333",
    },
    {
      label: "Transgender",
      value: 10,
      color: "#edf7fc",
      textColor: "#333",
    },
  ];


  const data = [
    {
      label: "18-25",
      value1: 25,
      value2: 35
    },
    {
      label: "26-35",
      value1: 40,
      value2: 55
    },
    {
      label: "36-45",
      value1: 70,
      value2: 85
    },
    {
      label: "46-55",
      value1: 60,
      value2: 45
    },
    {
      label: "56-65",
      value1: 30, value2: 25
    },
    {
      label: "65+",
      value1: 20,
      value2: 75
    },
  ];



  const formatCount = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num?.toString();
  };

  const grandTotal = totals?.liked + totals?.disliked + totals?.neutral;
  const likedPct = ((totals?.liked / grandTotal) * 100)?.toFixed(1);
  const dislikedPct = ((totals?.disliked / grandTotal) * 100)?.toFixed(1);
  const neutralPct = ((totals?.neutral / grandTotal) * 100)?.toFixed(1);

  const totalVotes = Number(billData?.liked) + Number(billData?.disliked) + Number(billData?.neutral)



  return (
    <View style={{
      marginTop: scale(24)
    }}>
      {
        (loading || isLoading) && (
          <ActivityIndicator color={colors.themeColor} size={"large"} />
        )
      }

      {
        (Number(billData?.billId) !== Number(bill?.bill_id)) && (
          <View style={styles.noVoteView}>
            <Text style={styles.noVoteText}>No voted yet</Text>
          </View>
        )
      }

      {
        (!loading && !isLoading && (billData?.id == bill?.bill_id)) && (
          <>
            <View style={styles.statesContainer}>
              <View
                style={styles.border}
              >
                <View style={styles.states}>
                  <View style={styles.statesTextContainer}>
                    <Text style={styles.statesMainText}>{formatCount(totalVotes || "")}</Text>
                    <Text style={styles.statesSubText}>Voted</Text>
                  </View>
                  <View style={styles.statesIconContainer}>
                    <Image source={images.check} style={styles.searchIcon} tintColor={colors.themeColor} />
                  </View>
                </View>
              </View>

              <View
                style={styles.border2}
              >
                <View style={styles.states2}>
                  <View style={styles.statesTextContainer}>
                    <Text style={styles.percentageText}>{likedPct || ""}%</Text>
                    <Text style={styles.labelText}>For</Text>
                  </View>
                  <View style={{ gap: 3 }}>
                    <Text style={styles.percentageText}>{dislikedPct || ""}%</Text>
                    <Text style={styles.labelText}>Against</Text>
                  </View>
                  <View style={{ gap: 3 }}>
                    <Text style={styles.percentageText}>{neutralPct || ""}%</Text>
                    <Text style={styles.labelText}>Neutral</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <Text style={styles.title}>Insights</Text> */}

            {
              (!loading && !loader && genderRangeData?.length > 0 && (billData?.id == bill?.bill_id)) && (
                <View style={styles.chartContainer}>
                  <View style={styles.chartBorder} >
                    <View style={styles.chartItem}>
                      <CurvedPieChart data={genderRangeData} size={150} strokeWidth={6} />
                    </View>
                  </View>
                  <View style={styles.chartBorder} >
                    <View
                      style={[styles.chartItem, { padding: 0, paddingHorizontal: 0 }]}
                    >
                      <PairBarChart data={data} />
                    </View>
                  </View>
                </View>
              )
            }

            {
              (!loading && !loader && incomeRangeData?.length > 0 && (billData?.id == bill?.bill_id)) && (
                <View style={styles.chartBorder} >
                  <View style={styles.polarChartContainer}>
                    <View style={styles.legendContainer}>
                      <Text style={styles.legendTitle}>Income Range</Text>
                      {incomeRangeData?.map((item, index) => {
                        return (
                          <View key={index} style={styles.legendItem}>
                            <View
                              style={[
                                styles.legendColor,
                                { backgroundColor: item.color },
                              ]}
                            />
                            <Text style={styles.legendText} numberOfLines={1}>
                              {item.label?.toString()}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <PolarAreaChart data={incomeRangeData} size={300} />
                  </View>
                </View>
              )
            }

            {
              (!loading && !loader && religionRangeData?.length > 0 && (billData?.id == bill?.bill_id)) && (
                <View style={styles.chartBorder} >
                  <View style={styles.polarChartContainer}>
                    <HorizontalBarChart title="Religion" data={religionRangeData} />
                  </View>
                </View>

              )
            }

            {
              (!loading && !loader && raceRangeData?.length > 0 && (billData?.id == bill?.bill_id)) && (
                <View style={styles.chartBorder} >
                  <View style={styles.polarChartContainer}>
                    <DonutChart data={raceRangeData} />
                    <View style={styles.donutLegendContainer}>
                      {raceRangeData?.map((item, index) => {
                        return (
                          <View key={index} style={styles.donutLegend}>
                            <Text style={styles.donutLegendText} numberOfLines={2}>
                              {item.label}
                            </Text>
                            <LinearGradient
                              colors={[item.startColor, item.endColor]}
                              style={styles.legendColor}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )
            }

            {
              (!loading && !loader && maritalDataDynamic?.length > 0 && (billData?.id == bill?.bill_id)) && (
                <View style={styles.chartBorder} >
                  <View style={styles.radialChartContainer}>
                    <View style={styles.radialLegendContainer}>
                      <Text style={styles.legendTitle}>Marital Status</Text>
                      {maritalDataDynamic?.map((item, index) => {
                        return (
                          <View key={index} style={styles.legendItem}>
                            <View
                              style={[
                                styles.legendColor,
                                { backgroundColor: item.color },
                              ]}
                            />
                            <Text style={styles.legendText} numberOfLines={1}>
                              {item.label}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <RadialBarChart data={maritalDataDynamic} maxSize={180} />
                  </View>
                </View>
              )
            }


            <View style={styles.statesContainer}>
              <View style={styles.border} >
                <View style={styles.states}>
                  <View style={styles.statesTextContainer}>
                    <Text style={styles.statesMainText}>{veteranSummary?.total || ""}</Text>
                    <Text style={styles.statesSubText}>Veteran</Text>
                  </View>
                  <View style={styles.statesIconContainer}>
                    <Image source={images.carbon_badge} style={styles.searchIcon} />
                  </View>
                </View>
              </View>
              <View style={styles.border} >
                <View style={styles.states}>
                  <View style={styles.statesTextContainer}>
                    <Text style={styles.statesMainText}>{disabilitySummary?.total || ""}</Text>
                    <Text style={styles.statesSubText}>Disability</Text>
                  </View>
                  <View style={styles.statesIconContainer}>
                    <Image source={images.disability} style={styles.searchIcon} />
                  </View>
                </View>
              </View>
            </View>
          </>
        )
      }

    </View>
  );
};

export default BillCharts;

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  chartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  noVoteView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: scale(50)
  },
  noVoteText: {
    fontSize: fontScale(13),
    color: colors.text,
    fontWeight: "500",
    fontFamily: fonts.regular
  },
  chartItem: {
    borderRadius: 8,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  polarChartContainer: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  radialChartContainer: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  legendContainer: { gap: 12, flex: 1 },
  radialLegendContainer: { gap: 3 },
  donutLegendContainer: { gap: 4, flex: 1 },
  legendTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#050A20",
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  donutLegend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  legendText: {
    fontSize: fontScale(12.6),
    fontWeight: "400",
    color: "#050A20",
    flex: 1,
  },
  donutLegendText: {
    fontSize: 13.5,
    fontWeight: "400",
    color: "#050A20",
    flex: 1,
    textAlign: "right",
  },
  searchIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  billContainer: { flex: 1, gap: 5, marginTop: scale(25) },
  billTitle: { fontSize: 18, fontWeight: "600", color: "#050A20" },
  billDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  billState: {
    fontSize: 15,
    color: "#050A20",
    fontWeight: "500",
  },
  statesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    marginTop: scale(15),
  },
  border: {
    padding: 1.5,
    borderRadius: 10,
    width: "48%",
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: colors.border_v1
  },
  chartBorder: {
    padding: 1.5,
    borderRadius: 10,
    flex: 2,
    marginTop: 14,
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: colors.border_v1
  },

  states: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    padding: 13,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    flex: 1,
  },
  statesTextContainer: { gap: 3 },
  statesMainText: {
    fontSize: 20,
    color: "#050A20",
    fontWeight: "600"
  },
  statesSubText: {
    fontSize: fontScale(13),
    color: "#050A20",
    fontWeight: "300"
  },
  border2: {
    padding: 1.5,
    borderRadius: 10,
    flex: 2
  },
  states2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    borderWidth: 0.7,
    borderColor: colors.border_v1
  },
  percentageText: {
    fontSize: fontScale(12),
    color: "#050A20",
    fontWeight: fonts.regular,
    fontWeight: "600"
  },
  labelText: {
    fontSize: fontScale(11),
    fontWeight: fonts.regular,
    fontWeight: "500"
  },
  statesIconContainer: {
    backgroundColor: "#F5F6FA",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
