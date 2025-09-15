import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const RadialBarChart = ({
  maxSize = 200, // Maximum size when data length is 4 or less
  data,
  showLabels = true,
  minSize = 150, // Minimum chart size
  sizeReduction = 20, // Size reduction per additional data item beyond 4
}) => {
  // Calculate dynamic size based on data length - REDUCE size for more data
  const dataLength = data.length;
  const baseDataLength = 4; // Reference data length for maxSize

  // Calculate size reduction for additional items
  const sizeReduction_calc =
    Math.max(0, dataLength - baseDataLength) * sizeReduction;
  const calculatedSize = Math.max(minSize, maxSize - sizeReduction_calc);

  const size = calculatedSize;
  const centerX = size / 2;
  const centerY = size / 2;

  // No label space reduction - use full SVG area for chart
  const availableRadius = size / 2; // Use full radius of SVG

  // Calculate optimal base radius to fill more of the SVG space
  let baseRadius;
  if (dataLength <= 4) {
    baseRadius = size * 0.25; // Larger base to fill more space
  } else if (dataLength <= 6) {
    baseRadius = size * 0.22;
  } else if (dataLength <= 8) {
    baseRadius = size * 0.18;
  } else {
    baseRadius = size * 0.15; // Still reasonable for many items
  }

  // Calculate initial bar width and gap - scale with chart size
  let barWidth = Math.max(size * 0.04, 6); // Slightly larger bars
  let gap = Math.max(size * 0.025, 3);

  // Calculate total radius needed with current settings
  const calculateMaxRadius = (baseRad, barW, gapW) => {
    return baseRad + (dataLength - 1) * (barW + gapW) + barW;
  };

  let maxNeededRadius = calculateMaxRadius(baseRadius, barWidth, gap);

  // If it exceeds available space, scale everything down
  if (maxNeededRadius > availableRadius) {
    // Calculate scale factor needed
    const scaleFactor = availableRadius / maxNeededRadius;

    // Scale down all components
    baseRadius = Math.max(size * 0.08, baseRadius * scaleFactor);
    barWidth = Math.max(3, barWidth * scaleFactor);
    gap = Math.max(1, gap * scaleFactor);

    // Recalculate max radius
    maxNeededRadius = calculateMaxRadius(baseRadius, barWidth, gap);

    // Final safety check - if still too big, distribute remaining space evenly
    if (maxNeededRadius > availableRadius) {
      const remainingSpace = availableRadius - baseRadius;
      const spacePerBar = remainingSpace / dataLength;
      barWidth = Math.max(3, spacePerBar * 0.7); // 70% for bars
      gap = Math.max(1, spacePerBar * 0.3); // 30% for gaps
    }
  }

  const maxValue = Math.max(...data.map((d) => d.value));

  // Function to create SVG path for arc
  const createArcPath = (
    radius,
    startAngle,
    endAngle
  ) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const outerStart = polarToCartesian(
      centerX,
      centerY,
      radius + barWidth,
      endAngle
    );
    const outerEnd = polarToCartesian(
      centerX,
      centerY,
      radius + barWidth,
      startAngle
    );

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      outerEnd.x,
      outerEnd.y,
      "A",
      radius + barWidth,
      radius + barWidth,
      0,
      largeArcFlag,
      1,
      outerStart.x,
      outerStart.y,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (
    centerX,
    centerY,
    radius,
    angleInDegrees
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Calculate angles for each segment (starting from top, going clockwise)
  const totalAngle = 270; // 3/4 circle
  const startAngle = 0; // Starting angle offset

  // Calculate dynamic font size based on chart size
  const calculateFontSize = () => {
    let baseFontSize = size * 0.055; // Slightly larger base font

    // Ensure minimum readable size but scale with chart
    return Math.max(baseFontSize, 11);
  };

  // Dynamic styles based on size
  const dynamicStyles = StyleSheet.create({
    chartWrapper: {
      position: "relative",
      width: size,
      height: size,
    },
    percentageLabel: {
      position: "absolute",
      width: size * 0.3, // Larger width for labels
      height: size * 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    percentageText: {
      fontSize: calculateFontSize(),
      fontWeight: "600",
    },
    titleText: {
      fontSize: size * 0.12,
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: size * 0.15,
      textAlign: "center",
    },
    legendText: {
      fontSize: size * 0.08,
      color: "#2c3e50",
      fontWeight: "500",
    },
    legendColor: {
      width: size * 0.06,
      height: size * 0.06,
      borderRadius: size * 0.03,
      marginRight: size * 0.05,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: size * 0.075,
    },
  });

  return (
    <View style={dynamicStyles.chartWrapper}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`} // Explicit viewBox to match size
      >
        {data.map((item, index) => {
          const radius = baseRadius + index * (barWidth + gap);
          const normalizedValue = (item.value / maxValue) * totalAngle;
          const endAngle = startAngle + normalizedValue;
          const path = createArcPath(radius, startAngle, endAngle);

          return <Path key={index} d={path} fill={item.color} />;
        })}
      </Svg>

      {/* Percentage labels - positioned at the START of each bar */}
      {showLabels && (
        <View style={styles.percentageLabels}>
          {data.map((item, index) => {
            const radius = baseRadius + index * (barWidth + gap) + barWidth / 2;

            // Position label at the START angle (beginning of the bar)
            const labelAngle = startAngle;
            const labelDistance = radius + size * 0.04; // Reduced distance since chart is bigger
            const position = polarToCartesian(0, 0, labelDistance, labelAngle);

            return (
              <View
                key={index}
                style={[
                  dynamicStyles.percentageLabel,
                  {
                    left: centerX + position.x - size * 0.23,
                    top: centerY + position.y - size * 0.035,
                  },
                ]}
              >
                <Text
                  style={[dynamicStyles.percentageText, { color: item.color }]}
                >
                  {item.value}%
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  percentageLabels: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  debugText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
});

export default RadialBarChart;
