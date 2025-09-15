import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CurvedPieChart } from "./charts/CurvedPieChart";
// import PieCharts from "./PieCharts";
import PolarAreaChart from "./charts/PolarAreaChart";
import PairBarChart from "./charts/PairBarChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import DonutChart from "./charts/DonutChart";
import RadialBarChart from "./charts/RadialBarChart";
import { scale } from "../utils/appScale";
import { colors } from "../constant/colors";
// import { ICONS } from "@assets/icons";

const BillCharts = ({ bill }) => {

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
  const sampleData = [
    { label: "< $25,000", value: 130, color: "#9f97f7", percentage: "24%" },
    {
      label: "$25,000 - $50,000",
      value: 90,
      color: "#ffb44f",
      percentage: "18%",
    },
    {
      label: "$50,000 - $100,000",
      value: 60,
      color: "#f99bab",
      percentage: "12%",
    },
    {
      label: "$100,000 - $200,000",
      value: 150,
      color: "#9bdfc4",
      percentage: "30%",
    },
    { label: "$200,000 +", value: 105, color: "#62b2fd", percentage: "21%" },
  ];

  const data = [
    { label: "18-25", value1: 25, value2: 35 },
    { label: "26-35", value1: 40, value2: 55 },
    { label: "36-45", value1: 70, value2: 85 },
    { label: "46-55", value1: 60, value2: 45 },
    { label: "56-65", value1: 30, value2: 25 },
    { label: "65+", value1: 20, value2: 75 },
  ];

  const religionData = [
    { label: "Christian", value: 2435 },
    { label: "Muslim", value: 1325 },
    { label: "Jewish", value: 735 },
    { label: "Hindu", value: 580 },
    { label: "Buddhist", value: 428 },
    { label: "Atheist", value: 208 },
  ];

  const DonutData = [
    {
      value: 18,
      startColor: "#7AD3FF",
      endColor: "#4FBAF0",
      percentage: "18%",
      label: "American Indian",
    },
    {
      value: 17,
      startColor: "#FE464B",
      endColor: "#FE464B",
      percentage: "14%",
      label: "Asian",
    },
    {
      value: 20,
      startColor: "#FD95D3",
      endColor: "#FF5CBE",
      percentage: "20%",
      label: "Black or African American",
    },
    {
      value: 18,
      startColor: "#99FFA3",
      endColor: "#68EE76",
      percentage: "18%",
      label: "Native Hawaiian or Other Pacific Islander",
    },
    {
      value: 16,
      startColor: "#FF9364",
      endColor: "#F25F33",
      percentage: "16%",
      label: "American Indian",
    },
    {
      value: 13,
      startColor: "#B09FFF",
      endColor: "#8D79F6",
      percentage: "12%",
      label: "White",
    },
    {
      value: 20,
      startColor: "#FFD572",
      endColor: "#FEBD38",
      percentage: "20%",
      label: "Black or African American",
    },
  ];

  const maritalData = [
    { label: "Single", value: 22, color: "#62B2FD" },
    { label: "Married", value: 27, color: "#9BDFC4" },
    { label: "Divorced", value: 38, color: "#9F97F7" },
    { label: "Widowed", value: 39, color: "#F59E0B" },
  ];




  return (
    <View style={{
      marginTop: scale(24)
    }}>
      {/* <View style={styles.statesContainer}>
        <LinearGradient
          colors={["#8A9EFF", "#F0D9D9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.border}
        >
          <View style={styles.states}>
            <View style={styles.statesTextContainer}>
              <Text style={styles.statesMainText}>25K+</Text>
              <Text style={styles.statesSubText}>Voted</Text>
            </View>
            <View style={styles.statesIconContainer}>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#8A9EFF", "#F0D9D9"]}
          style={styles.border2}
        >
          <View style={styles.states2}>
            <View style={styles.statesTextContainer}>
              <Text style={styles.percentageText}>61%</Text>
              <Text style={styles.labelText}>For</Text>
            </View>
            <View style={{ gap: 3 }}>
              <Text style={styles.percentageText}>31%</Text>
              <Text style={styles.labelText}>Against</Text>
            </View>
            <View style={{ gap: 3 }}>
              <Text style={styles.percentageText}>8%</Text>
              <Text style={styles.labelText}>Neutral</Text>
            </View>
          </View>
        </LinearGradient>

      </View> */}
      {/* <Text style={styles.title}>Insights</Text> */}


      <View style={styles.chartContainer}>
        <View style={styles.chartBorder} >
          <View style={styles.chartItem}>
            <CurvedPieChart data={chartData} size={150} strokeWidth={6} />
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

      <View style={styles.chartBorder} >
        <View style={styles.polarChartContainer}>
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Income Range</Text>
            {sampleData?.map((item, index) => {
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
          <PolarAreaChart data={sampleData} size={300} />
        </View>
      </View>

      <View style={styles.chartBorder} >
        <View style={styles.polarChartContainer}>
          <HorizontalBarChart title="Religion" data={religionData} />
        </View>
      </View>

      <View style={styles.chartBorder} >
        <View style={styles.polarChartContainer}>
          <DonutChart data={DonutData} />
          <View style={styles.donutLegendContainer}>
            {DonutData?.map((item, index) => {
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

      <View style={styles.chartBorder} >
        <View style={styles.radialChartContainer}>
          <View style={styles.radialLegendContainer}>
            <Text style={styles.legendTitle}>Marital Status</Text>
            {maritalData?.map((item, index) => {
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
          <RadialBarChart data={maritalData} maxSize={180} />
        </View>
      </View>

      {/* <View style={styles.statesContainer}>
        <LinearGradient
          colors={["#8A9EFF", "#F0D9D9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.border}
        >
          <View style={styles.states}>
            <View style={styles.statesTextContainer}>
              <Text style={styles.statesMainText}>506</Text>
              <Text style={styles.statesSubText}>Veteran</Text>
            </View>
            <View style={styles.statesIconContainer}>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#8A9EFF", "#F0D9D9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.border}
        >
          <View style={styles.states}>
            <View style={styles.statesTextContainer}>
              <Text style={styles.statesMainText}>140</Text>
              <Text style={styles.statesSubText}>Disability</Text>
            </View>
            <View style={styles.statesIconContainer}>
            </View>
          </View>
        </LinearGradient>
      </View> */}



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
    padding: 15,
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
    gap: 8,
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
    fontSize: 13.5,
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
    gap: 13,
    marginTop: scale(30),
  },
  border: { padding: 1.5, borderRadius: 10, flex: 2 },

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
  statesMainText: { fontSize: 20, color: "#050A20", fontWeight: "600" },
  statesSubText: { fontSize: 16, color: "#050A20", fontWeight: "300" },
  border2: { padding: 1.5, borderRadius: 10, flex: 2 },
  states2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    flex: 1,
  },
  percentageText: { fontSize: 17, color: "#050A20", fontWeight: "600" },
  labelText: { fontSize: 13, color: "#050A20", fontWeight: "500" },
  statesIconContainer: {
    backgroundColor: "#F5F6FA",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
