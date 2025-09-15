import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

const { width } = Dimensions.get("window");


const PolarDonutChart = ({
  size = (width / 1.9) * 0.85,
  data,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Scale all dimensions relative to size
  const center = size / 2;
  const innerRadius = size * 0.12; // 5% of total size
  const minRadius = size * 0.2; // 20% of total size
  const maxRadius = size * 0.48; // 45% of total size

  // Find min and max values for scaling
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));

  // Calculate angles for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  const createPolarPath = (
    startAngle,
    endAngle,
    segmentRadius
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    // Outer arc points (at segment's specific radius)
    const x1 = center + segmentRadius * Math.cos(startAngleRad);
    const y1 = center + segmentRadius * Math.sin(startAngleRad);
    const x2 = center + segmentRadius * Math.cos(endAngleRad);
    const y2 = center + segmentRadius * Math.sin(endAngleRad);

    // Inner arc points (at inner radius)
    const x3 = center + innerRadius * Math.cos(endAngleRad);
    const y3 = center + innerRadius * Math.sin(endAngleRad);
    const x4 = center + innerRadius * Math.cos(startAngleRad);
    const y4 = center + innerRadius * Math.sin(startAngleRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      x1,
      y1, // Move to start of outer arc
      "A",
      segmentRadius,
      segmentRadius,
      0,
      largeArcFlag,
      1,
      x2,
      y2, // Outer arc
      "L",
      x3,
      y3, // Line to inner arc
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      0,
      x4,
      y4, // Inner arc (reverse)
      "Z", // Close path
    ].join(" ");
  };

  // Pre-calculate all segments data
  const segmentsData = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const marginAngle = size * 0.01; // Gap size scales with chart size

    const startAngle = currentAngle + marginAngle / 2;
    const endAngle = currentAngle + angle - marginAngle / 2;

    // Calculate radius based on value (polar expansion)
    const valueRatio =
      maxValue === minValue
        ? 1
        : (item.value - minValue) / (maxValue - minValue);
    const segmentRadius = minRadius + valueRatio * (maxRadius - minRadius);

    const path = createPolarPath(startAngle, endAngle, segmentRadius);

    // Calculate text position (middle of the segment, at 70% of radius)
    const textAngle = (startAngle + endAngle) / 2;
    const textAngleRad = (textAngle * Math.PI) / 180;
    const textRadius = segmentRadius * 0.7;
    const textX = center + textRadius * Math.cos(textAngleRad);
    const textY = center + textRadius * Math.sin(textAngleRad);

    currentAngle = currentAngle + angle;

    return {
      ...item,
      path,
      textX,
      textY,
      gradientId: `barGradient_${index}`, // Use index instead of label for unique ID
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Define all gradients once */}
        <Defs>
          {segmentsData.map((segment, index) => (
            <LinearGradient
              key={index}
              id={segment.gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={segment.startColor} />
              <Stop offset="100%" stopColor={segment.endColor} />
            </LinearGradient>
          ))}
        </Defs>

        {/* Render all paths */}
        {segmentsData.map((segment, index) => (
          <Path
            key={index}
            d={segment.path}
            fill={`url(#${segment.gradientId})`}
            opacity={1}
            onPress={() => {
              console.log("Segment pressed:", index);
              setSelectedItem(index);
            }}
          />
        ))}

        {/* Render labels for selected item */}
        {selectedItem !== null && segmentsData[selectedItem] && (
          <Text
            style={[
              styles.selectedItemLabel,
              {
                top: segmentsData[selectedItem].textY - 15,
                left: segmentsData[selectedItem].textX - 20,
                backgroundColor: segmentsData[selectedItem].startColor,
              },
            ]}
          >
            {segmentsData[selectedItem]?.percentage}
          </Text>
        )}

        {/* Optional: Center circle */}
        <Circle cx={center} cy={center} r={innerRadius} fill="white" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItemLabel: {
    fontSize: 12,
    position: "absolute",
    fontWeight: "bold",
    color: "#333",
    padding: 6,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PolarDonutChart;
