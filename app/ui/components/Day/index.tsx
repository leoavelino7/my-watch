import React from 'react';
import {Animated} from 'react-native';

import {style} from './styles';

interface IProps {
  pageHeight: number;
  scrollY: Animated.Value;
  onPress(): void;
}

function getContainerStyle(value: Animated.Value, pageHeight: number) {
  const backgroundColor = value.interpolate({
    inputRange: [
      0,
      pageHeight * 0.4,
      pageHeight * 0.8,
      pageHeight * 0.9,
      pageHeight,
    ],
    outputRange: ['#1E237F', '#47B9FF', '#901570', '#86009E', '#1E237F'],
  });

  return {
    backgroundColor,
  };
}

function getSunMoonStyle(value: Animated.Value, pageHeight: number) {
  const backgroundColor = value.interpolate({
    inputRange: [0, pageHeight * 0.5, pageHeight * 0.65, pageHeight * 0.9],
    outputRange: ['white', 'yellow', 'orange', 'white'],
  });

  const left = value.interpolate({
    inputRange: [0, pageHeight],
    outputRange: ['0%', '87%'],
  });

  const top = value.interpolate({
    inputRange: [30, pageHeight * 0.5, pageHeight],
    outputRange: [60, 10, 60],
  });

  return {
    backgroundColor,
    left,
    top,
  };
}

const Day: React.FC<IProps> = ({onPress, scrollY, pageHeight}) => {
  return (
    <Animated.View
      onStartShouldSetResponder={() => true}
      onResponderGrant={onPress}
      style={[style.dayContainer, getContainerStyle(scrollY, pageHeight)]}>
      <Animated.View
        style={[style.sumMoon, getSunMoonStyle(scrollY, pageHeight)]}
      />
    </Animated.View>
  );
};

export default Day;
