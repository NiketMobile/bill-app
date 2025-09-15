import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, {
  Rect,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const HorizontalBarChart = ({ title, data }) => {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  // Dynamic width calculations based on screen size
  const screenWidth = screenData.width;
  const containerPadding = 30; // Assuming container has 20px padding on each side
  const availableWidth = screenWidth - containerPadding * 2;

  // Dynamic margins based on screen size
  const leftMargin = screenWidth < 375 ? 60 : 70;
  const rightMargin = screenWidth < 375 ? 50 : 60;

  // Dynamic chart width with min/max constraints
  const chartWidth = Math.max(
    Math.min(
      availableWidth - leftMargin - rightMargin,
      screenWidth * 0.6 // Maximum 60% of screen width for chart area
    ),
    150 // Minimum width
  );

  // Height calculations (keeping your dynamic height logic)
  const barHeight = 23;
  const barSpacing = 15;
  const topMargin = 0;
  const bottomMargin = 5;

  const chartHeight =
    data?.length > 0
      ? data.length * barHeight + (data.length - 1) * barSpacing + bottomMargin
      : 0;

  const maxValue = Math.max(...data.map((d) => d.value));

  // Handle empty data case
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <Svg
          width={chartWidth + leftMargin + rightMargin}
          height={chartHeight + topMargin}
          style={styles.svg}
        >
          <Defs>
            <LinearGradient
              id={`barGradient_${title.replace(/\s+/g, "_")}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor="#5A3FFF" />
              <Stop offset="100%" stopColor="#1ED6FF" />
            </LinearGradient>
          </Defs>

          {data.map((item, index) => {
            const barWidth = (item.value / maxValue) * chartWidth;
            const yPosition = topMargin + index * (barHeight + barSpacing);

            return (
              <React.Fragment key={`${title}_${index}`}>
                {/* Bar */}
                <Rect
                  x={leftMargin}
                  y={yPosition}
                  width={barWidth}
                  height={barHeight}
                  fill={`url(#barGradient_${title.replace(/\s+/g, "_")})`}
                  rx={1}
                />

                {/* Label */}
                <SvgText
                  x={leftMargin - (screenWidth < 375 ? 60 : 70)}
                  y={yPosition + barHeight / 2 + 5}
                  fontSize={screenWidth < 375 ? "12" : "14"}
                  fill="#374151"
                  textAnchor="start"
                  fontWeight="500"
                >
                  {item.label}
                </SvgText>

                {/* Value */}
                <SvgText
                  x={leftMargin + chartWidth + (screenWidth < 375 ? 45 : 55)}
                  y={yPosition + barHeight / 2 + 5}
                  fontSize={screenWidth < 375 ? "12" : "14"}
                  fill="#2B47D3"
                  textAnchor="end"
                  fontWeight="600"
                >
                  {item.value}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#050A20",
    marginBottom: 15,
  },
  chartContainer: {
    // alignItems: "center",
  },
  svg: {
    // backgroundColor: "red",
  },
  noDataText: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default HorizontalBarChart;
