import React from 'react';
import { Switch as RNSwitch } from 'react-native-switch';

const CommonSwitch = ({ value, onToggle, ...props }) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onToggle}
      renderActiveText={false}
      renderInActiveText={false}
      circleSize={24}
      barHeight={28}
      backgroundActive="#30a566"
      backgroundInactive="#ecf0f1"
      circleActiveColor="#FFFFFF"
      circleInActiveColor="#FFFFFF"
      circleBorderWidth={0}
      switchLeftPx={2.5}
      switchRightPx={2.5}
      {...props} // let caller override any prop if needed
    />
  );
};

export default CommonSwitch;
