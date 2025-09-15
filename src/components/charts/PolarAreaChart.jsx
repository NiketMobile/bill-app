import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Line, Path, Text as SvgText } from "react-native-svg";
import { ImageStyleBlur } from "./ImageStyleBlur";

const { width: screenWidth } = Dimensions.get("window");

const PolarAreaChart = ({
  data = [],
  size = 300,
  colors = ["#9f97f7", "#ffb44f", "#f99bab", "#9bdfc4", "#62b2fd"],
  showLabels = false,
  showValues = false,
  showGrid = true,
}) => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const center = size / 2;
  const maxRadius = size / 2 - 40;

  // Calculate maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  // Generate paths for each segment
  const generateSegments = () => {
    const segments = [];
    const angleStep = (2 * Math.PI) / data.length;

    data.forEach((item, index) => {
      const startAngle = index * angleStep - Math.PI / 2; // Start from top
      const endAngle = (index + 1) * angleStep - Math.PI / 2;

      // Scale radius based on value
      const radius = (item.value / maxValue) * maxRadius;

      // Calculate points for the segment
      const startX = center + Math.cos(startAngle) * radius;
      const startY = center + Math.sin(startAngle) * radius;
      const endX = center + Math.cos(endAngle) * radius;
      const endY = center + Math.sin(endAngle) * radius;

      // Create path for polar segment
      const largeArcFlag = angleStep > Math.PI ? 1 : 0;
      const pathData = `
        M ${center} ${center}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;

      segments.push({
        path: pathData,
        color: item.color,
        label: item.label,
        value: item.value,
        percentage: item.percentage,
        midAngle: startAngle + angleStep / 2,
        radius: radius,
      });
    });

    return segments;
  };

  // Generate grid circles
  const generateGridCircles = () => {
    const circles = [];
    const steps = 4;

    for (let i = 1; i <= steps; i++) {
      const radius = (maxRadius / steps) * i;
      circles.push(
        <Circle
          key={i}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={"#a7acc5"}
          strokeWidth={i === steps ? "1.5" : "1"}
          // strokeDasharray="0"
          opacity={i === steps ? 1 : 0.5}
        />
      );
    }

    return circles;
  };

  // Generate grid lines
  const generateGridLines = () => {
    const lines = [];
    const angleStep = (2 * Math.PI) / data.length;

    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const endX = center + Math.cos(angle) * maxRadius;
      const endY = center + Math.sin(angle) * maxRadius;

      lines.push(
        <Line
          key={i}
          x1={center}
          y1={center}
          x2={endX}
          y2={endY}
          stroke="#a7acc5"
          strokeWidth="1.5"
        // strokeDasharray="0"
        />
      );
    }

    return lines;
  };

  const segments = generateSegments();

  return (
    <View style={styles.container}>
      {/* {title && <Text style={styles.title}>{title}</Text>} */}

      <View style={styles.chartContainer}>
        <Svg
          width={size - 50}
          height={size - 50}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            margin: -35,
          }}
        >
          {/* Grid */}
          {showGrid && (
            <G>
              {generateGridCircles()}
              {generateGridLines()}
            </G>
          )}

          {/* Segments */}
          <G>
            {segments.map((segment, index) => {
              const labelRadius = segment.radius;
              const labelX = center + Math.cos(segment.midAngle) * labelRadius;
              const labelY = center + Math.sin(segment.midAngle) * labelRadius;

              return (
                <G key={index}>
                  <Path
                    key={index}
                    d={segment.path}
                    fill={segment.color}
                    // fillOpacity={0.8}
                    stroke={segment.color}
                    strokeWidth={2}
                    onPress={() => {
                      setSelectedSegment(segment?.label);
                    }}
                  />
                  {selectedSegment === segment?.label && (
                    <ImageStyleBlur
                      x={labelX}
                      y={labelY}
                      text={segment?.percentage}
                      fontSize={12}
                      textColor="#333"
                      gradientStart={segment?.color}
                      gradientEnd="#ffffff"
                    />
                  )}
                </G>
              );
            })}
          </G>

          {/* Labels and Values */}
          {(showLabels || showValues) && (
            <G>
              {segments.map((segment, index) => {
                const labelRadius = segment.radius + 20;
                const labelX =
                  center + Math.cos(segment.midAngle) * labelRadius;
                const labelY =
                  center + Math.sin(segment.midAngle) * labelRadius;

                return (
                  <G key={`label-${index}`}>
                    {showLabels && (
                      <SvgText
                        x={labelX}
                        y={labelY}
                        fontSize="12"
                        fill="#333"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        {segment.label}
                      </SvgText>
                    )}
                    {showValues && (
                      <SvgText
                        x={labelX}
                        y={labelY + (showLabels ? 15 : 0)}
                        fontSize="10"
                        fill="#666"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        {segment.value}
                      </SvgText>
                    )}
                  </G>
                );
              })}
            </G>
          )}
        </Svg>
      </View>

      {/* Legend */}
      {/* <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colors[index % colors.length] },
              ]}
            />
            <Text style={styles.legendText}>
              {item.label}: {item.value}
            </Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

// Example usage component
const PolarAreaChartExample = () => {
  const sampleData = [
    { label: "A", value: 80 },
    { label: "B", value: 60 },
    { label: "C", value: 150 },
    { label: "D", value: 45 },
    { label: "E", value: 75 },
    { label: "F", value: 55 },
  ];

  return (
    <View style={styles.exampleContainer}>
      <PolarAreaChart
        data={sampleData}
        size={300}
        title="Sample Data Distribution"
      // showGrid={true}
      // showLabels={false}
      // showValues={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // padding: 20,
    // backgroundColor: "red",
    borderRadius: 10,
    // marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  chartContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "blue",
  },
  legend: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: screenWidth - 40,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#555",
  },
  exampleContainer: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
});

export default PolarAreaChart;
