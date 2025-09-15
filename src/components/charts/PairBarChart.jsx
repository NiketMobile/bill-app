import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const PairBarChart = ({ data }) => {
  const [selectedBar, setSelectedBar] = useState(null);

  // Sample data

  // Responsive calculations
  const isTablet = screenWidth / 2 >= 768;
  const isSmallPhone = screenWidth / 2 < 360;

  // Dynamic sizing based on screen size
  const getResponsiveSizes = () => {
    if (isTablet) {
      return {
        chartWidth: (screenWidth / 2) * 0.4, // 40% of screen width for tablets
        chartHeight: 120,
        barWidth: 8,
        barSpacing: 4,
        groupSpacing: 8,
        fontSize: {
          title: 16,
          legend: 12,
          label: 10,
        },
        dotSize: 12,
      };
    } else if (isSmallPhone) {
      return {
        chartWidth: (screenWidth / 2) * 0.85, // 85% of screen width for small phones
        chartHeight: 90,
        barWidth: 5,
        barSpacing: 2,
        groupSpacing: 2,
        fontSize: {
          title: 12,
          legend: 9,
          label: 7,
        },
        dotSize: 8,
      };
    } else {
      // Regular phones
      return {
        chartWidth: (screenWidth / 2) * 0.75, // 75% of screen width
        chartHeight: 105,
        barWidth: 6,
        barSpacing: 3,
        groupSpacing: 4,
        fontSize: {
          title: 14,
          legend: 10,
          label: 8,
        },
        dotSize: 10,
      };
    }
  };

  const sizes = getResponsiveSizes();
  const maxValue = 100;

  // Colors
  const color1 = "#E8E3FF"; // Light purple
  const color2 = "#8B7EFF"; // Dark purple

  const renderBarGroup = (item, index) => {
    const bar1Height = (item.value1 / maxValue) * sizes.chartHeight;
    const bar2Height = (item.value2 / maxValue) * sizes.chartHeight;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.barGroup,
          {
            backgroundColor: selectedBar === index ? "#f5f3ff" : "transparent",
            marginRight: sizes.groupSpacing,
          },
        ]}
        onPress={() => {
          setSelectedBar(index);
        }}
      >
        {/* Bar container with flex to align bars to bottom */}
        <View style={[styles.barsContainer, { height: sizes.chartHeight }]}>
          {/* First bar */}
          <View style={[styles.barWrapper, { height: sizes.chartHeight }]}>
            <View
              style={[
                styles.bar,
                {
                  width: sizes.barWidth,
                  height: bar1Height,
                  backgroundColor: color1,
                },
              ]}
            />
          </View>

          {/* Spacing between bars */}
          <View style={{ width: sizes.barSpacing }} />

          {/* Second bar */}
          <View style={[styles.barWrapper, { height: sizes.chartHeight }]}>
            <View
              style={[
                styles.bar,
                {
                  width: sizes.barWidth,
                  height: bar2Height,
                  backgroundColor: color2,
                },
              ]}
            />
          </View>
        </View>

        {/* Label */}
        <Text style={[styles.label, { fontSize: sizes.fontSize.label }]}>
          {item.label}
        </Text>
        {selectedBar === index ? (
          <View
            style={[
              styles.scrollDot,
              {
                width: sizes.dotSize,
                height: sizes.dotSize,
                borderRadius: sizes.dotSize / 2,
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.transparentDot,
              {
                width: sizes.dotSize,
                height: sizes.dotSize,
                borderRadius: sizes.dotSize / 2,
              },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <Text style={[styles.legendTitle, { fontSize: sizes.fontSize.title }]}>
          Age Range
        </Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: color1 }]} />
          <Text
            style={[styles.legendText, { fontSize: sizes.fontSize.legend }]}
          >
            Male
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: color2 }]} />
          <Text
            style={[styles.legendText, { fontSize: sizes.fontSize.legend }]}
          >
            Female
          </Text>
        </View>
      </View>
      <View style={[styles.chartContainer, { width: sizes.chartWidth }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
        >
          <View
            style={[styles.chartContent, { height: sizes.chartHeight + 40 }]}
          >
            {/* Chart area */}
            <View style={[styles.chart, { height: sizes.chartHeight }]}>
              {data.map((item, index) => renderBarGroup(item, index))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Main container styles if needed
    paddingHorizontal: (screenWidth / 2) * 0.05, // 5% padding on each side
    alignItems: "center",
  },
  chartContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#edeff7",
    marginBottom: 8,
    maxWidth: (screenWidth / 2) * 0.8, // Maximum 90% of screen width
  },
  scrollView: {
    // ScrollView specific styles
  },
  scrollContent: {
    paddingHorizontal: 5,
    justifyContent: "flex-end",
  },
  chartContent: {
    justifyContent: "flex-end",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 5,
  },
  barGroup: {
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 8,
    paddingHorizontal: 1,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barWrapper: {
    justifyContent: "flex-end",
  },
  bar: {
    borderRadius: 2,
    minHeight: 2, // Minimum height for very small values
  },
  label: {
    color: "#9CA3AF",
    marginTop: screenHeight > 700 ? 8 : 6, // Adjust margin based on screen height
    textAlign: "center",
    fontFamily: "System",
    marginHorizontal: 2,
  },
  scrollDot: {
    backgroundColor: "#8B7EFF",
    borderWidth: 2,
    borderColor: "#ffffff",
    marginTop: 4,
  },
  transparentDot: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "transparent",
    marginTop: 4,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: screenHeight > 700 ? 12 : 8, // Responsive margin
    // paddingHorizontal: 2,
    flex: 1,
  },
  legendTitle: {
    fontWeight: "500",
    color: "#050A20",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  legendColor: {
    width: screenWidth / 2 > 400 ? 8 : 6, // Responsive legend color size
    height: screenWidth / 2 > 400 ? 8 : 6,
    marginRight: 4,
    borderRadius: 1,
  },
  legendText: {
    fontWeight: "400",
    color: "#050A20",
  },
});

export default PairBarChart;
