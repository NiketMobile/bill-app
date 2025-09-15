import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Circle, G } from "react-native-svg";
import { ImageStyleBlur } from "./ImageStyleBlur";
import LinearGradient from "react-native-linear-gradient";

export const CurvedPieChart = ({
  data,
  size = 150,
  strokeWidth = 4,
  baseRadius = null,
  maxExpansion = 20, // Maximum pixels to expand outward
  minExpansion = 5, // Minimum expansion for smallest segments
  expansionMode = "proportional", // "proportional" or "threshold"
  expansionThreshold = 40, // Only used in threshold mode
}) => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const defaultRadius = size / 2 - strokeWidth - maxExpansion;
  const radius = baseRadius || defaultRadius;
  const centerX = size / 2;
  const centerY = size / 2;
  const cornerRadius = 6;

  // Calculate angles and expansion for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  // Find the largest segment for proportional scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    // Calculate expansion based on selected mode
    let expansion = 0;

    if (expansionMode === "proportional") {
      // Every segment expands proportionally to its size
      // Smallest segment gets minExpansion, largest gets maxExpansion
      const normalizedValue = item.value / maxValue; // 0 to 1
      expansion =
        minExpansion + normalizedValue * (maxExpansion - minExpansion);
    } else if (expansionMode === "threshold") {
      // Original threshold-based expansion
      if (percentage > expansionThreshold) {
        const overThreshold = percentage - expansionThreshold;
        const maxOverThreshold = 100 - expansionThreshold;
        expansion = (overThreshold / maxOverThreshold) * maxExpansion;
      }
    }

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
      percentage,
      expansion,
      segmentRadius: radius + expansion,
    };
  });

  // Helper function to convert degrees to radians
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  // Helper function to get point on circle
  const getPoint = (angle, r = radius) => {
    const rad = toRadians(angle);
    const x = centerX + r * Math.cos(rad);
    const y = centerY + r * Math.sin(rad);
    return { x, y };
  };

  // Create path with rounded outer corners and expansion
  const createExpandedSegmentPath = (segment) => {
    const { startAngle, endAngle, angle, segmentRadius } = segment;
    const largeArcFlag = angle > 180 ? 1 : 0;

    // Calculate the corner radius based on segment size
    const maxCornerRadius = Math.min(
      cornerRadius,
      (angle * Math.PI * segmentRadius) / 360 / 4
    );

    // Calculate offset for rounded corners on the arc
    const angleOffset = (maxCornerRadius / segmentRadius) * (180 / Math.PI);

    // Points for the expanded segment
    const outerStartCorner = getPoint(startAngle + angleOffset, segmentRadius);
    const outerEndCorner = getPoint(endAngle - angleOffset, segmentRadius);

    // Points where the straight lines would meet the arc (for control points)
    const outerStartPoint = getPoint(startAngle, segmentRadius);
    const outerEndPoint = getPoint(endAngle, segmentRadius);

    // Build the path
    let path = "";

    // Start from center
    path += `M ${centerX} ${centerY}`;

    // Line towards start of arc, then curve to connect with arc
    const startLineLength = segmentRadius - maxCornerRadius;
    const startLinePoint = getPoint(startAngle, startLineLength);
    path += ` L ${startLinePoint.x} ${startLinePoint.y}`;

    // Quadratic curve to round the corner at start
    path += ` Q ${outerStartPoint.x} ${outerStartPoint.y} ${outerStartCorner.x} ${outerStartCorner.y}`;

    // Main arc with expanded radius
    path += ` A ${segmentRadius} ${segmentRadius} 0 ${largeArcFlag} 1 ${outerEndCorner.x} ${outerEndCorner.y}`;

    // Quadratic curve to round the corner at end
    const endLineLength = segmentRadius - maxCornerRadius;
    const endLinePoint = getPoint(endAngle, endLineLength);
    path += ` Q ${outerEndPoint.x} ${outerEndPoint.y} ${endLinePoint.x} ${endLinePoint.y}`;

    // Line back to center
    path += ` L ${centerX} ${centerY}`;

    path += " Z";

    return path;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Shadow/background circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius + maxExpansion + 5}
          fill="#ffffff"
          opacity={0.2}
        />

        {/* Render segments in order, expanded ones last for proper layering */}
        {segments
          .sort((a, b) => a.expansion - b.expansion)
          .map((segment, index) => {
            const midAngle = (segment.startAngle + segment.endAngle) / 2;
            const labelRadius = segment.segmentRadius * 0.7;
            const labelPoint = getPoint(midAngle, labelRadius);
            const path = createExpandedSegmentPath(segment);

            return (
              <G key={index}>
                {/* Shadow for expanded segments */}
                {segment.expansion > 0 && (
                  <Path
                    d={path}
                    fill="#000000"
                    opacity={0}
                    transform={`translate(2, 2)`}
                  />
                )}

                {/* Main segment */}
                <Path
                  d={path}
                  fill={segment.color}
                  strokeLinejoin="round"
                  onPress={() => setSelectedSegment(segment)}
                />
                {selectedSegment?.label === segment.label && (
                  <LinearGradient
                    colors={[segment.color, "#ffffff"]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    key={`label-${index}`}
                    style={[
                      styles.label,
                      {
                        left: labelPoint.x - 42,
                        top: labelPoint.y - 20,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.labelText,
                        { color: segment.textColor || "#333" },
                      ]}
                    >
                      {segment?.label} {Math.round(segment?.value)}%
                    </Text>
                  </LinearGradient>
                )}
              </G>
            );
          })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  svg: {
    backgroundColor: "transparent",
  },
  label: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 13,
    paddingHorizontal: 5,
    paddingVertical: 4,
    minWidth: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 0.2,
    borderColor: "#ffffff",
  },
  labelText: {
    fontSize: 11.5,
    fontWeight: "600",
    textAlign: "center",
  },
});
