import React, {useEffect} from 'react';
import {
  TouchableHighlight,
  Text,
  useWindowDimensions,
  Animated,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {style} from './styles';

interface IProps {
  onOpen(): void;
}

function timeStyle(value: Animated.Value) {
  return {
    top: value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '40%'],
    }),
  };
}

function containerStyle(value: Animated.Value) {
  return {
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -450],
        }),
      },
      {
        rotateX: value.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '89deg'],
        }),
      },
    ],
  };
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(
  TouchableHighlight,
);

const Intro: React.FC<IProps> = ({onOpen}) => {
  const {height} = useWindowDimensions();

  const top = new Animated.Value(0);
  const timeTop = new Animated.Value(0);

  // function getAnimatedValue(state: any) {
  //   return state.translateAnim._value;
  // }

  function open() {
    top.setValue(0);

    Animated.timing(top, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(onOpen);
  }

  useEffect(() => {
    function timeStart() {
      timeTop.setValue(0);
      Animated.timing(timeTop, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }
    timeStart();
  }, [timeTop]);

  return (
    <AnimatedLinearGradient
      colors={['#146fa0', '#71c5df']}
      style={[style.container, {height: height}, containerStyle(top)]}>
      <AnimatedTouchableHighlight
        style={[style.timeContainer, timeStyle(timeTop)]}
        onPress={open}>
        <Text style={style.time}>09:41</Text>
      </AnimatedTouchableHighlight>
    </AnimatedLinearGradient>
  );
};

export default Intro;
