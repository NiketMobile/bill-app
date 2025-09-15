// import { Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');
// const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// //Default guideline sizes are based on standard ~5" screen mobile device
// const guidelineBaseWidth = 350;
// const guidelineBaseHeight = 680;

// export const scale = size => shortDimension / guidelineBaseWidth * size;
// export const verticalScale = size => longDimension / guidelineBaseHeight * size;
// export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
// export const moderateVerticalScale = (size, factor = 0.5) => size + (verticalScale(size) - size) * factor;

// export const s = scale;
// export const vs = verticalScale;
// export const ms = moderateScale;
// export const mvs = moderateVerticalScale;


import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const [shortDimension, longDimension] =
    SCREEN_WIDTH < SCREEN_HEIGHT ? [SCREEN_WIDTH, SCREEN_HEIGHT] : [SCREEN_HEIGHT, SCREEN_WIDTH];

export const scale = (size) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size) => (longDimension / guidelineBaseHeight) * size;

export const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const moderateVerticalScale = (size, factor = 0.5) =>
    size + (verticalScale(size) - size) * factor;

// Optional: pixel-perfect rounding for Android high-density screens
export const fontScale = (size) =>
    Math.round(PixelRatio.roundToNearestPixel(size));


export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;