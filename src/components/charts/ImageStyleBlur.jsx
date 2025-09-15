import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  G,
  Rect,
  Text as SvgText,
  Defs,
  Filter,
  FeGaussianBlur,
  FeFlood,
  FeComposite,
  FeOffset,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";

// Exact style from your image - semi-transparent with subtle blur
export const ImageStyleBlur = ({
  x,
  y,
  text,
  fontSize = 16,
  textColor = "#333333",
  backgroundColor = "rgba(255, 255, 255, 0.5)",
  borderColor = "rgba(0, 0, 0, 1)",
  gradientStart = "#ffffff88", // semi-transparent white
  gradientEnd = "#ffffff", // semi-transparent gray
}) => {
  // Calculate container size based on text
  const textWidth = text?.length * (fontSize * 0.6);
  const padding = fontSize * 0.8;
  const containerWidth = textWidth + padding * 2;
  const containerHeight = fontSize + padding * 1.2;

  return (
    <Svg>
      <G>
        <Defs>
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradientStart} />
            <Stop offset="100%" stopColor={gradientEnd} />
          </LinearGradient>
          {/* Subtle backdrop blur */}
          <Filter
            id="imageStyleBlur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <FeGaussianBlur stdDeviation="1.5" result="blur" />
            <FeComposite
              in="flood"
              in2="blur"
              operator="over"
              result="composite"
            />
          </Filter>
        </Defs>

        <Rect
          x={x - containerWidth / 2}
          y={y - containerHeight / 2}
          width={containerWidth}
          height={containerHeight}
          fill="url(#bgGradient)"
          stroke={borderColor}
          strokeWidth="0.1"
          rx="10"
          ry="10"
        //   filter="url(#imageStyleBlur)"
        />

        {/* Main blur container - matches your image */}
        <Rect
          x={x - containerWidth / 2}
          y={y - containerHeight / 2}
          width={containerWidth}
          height={containerHeight}
          fill="url(#bgGradient)"
          stroke={borderColor}
          strokeWidth="0.1"
          rx="10"
          ry="10"
        />

        {/* Text */}
        <SvgText
          x={x}
          y={y}
          fontSize={fontSize}
          fill={textColor}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight="600"
        >
          {text}
        </SvgText>
      </G>
    </Svg>
  );
};
