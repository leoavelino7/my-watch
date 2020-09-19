import React, {useEffect, useState} from 'react';
import {TouchableHighlight, Text, useWindowDimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {style} from './styles';

interface IProps {
  onOpen(): void;
}

function timeStyle(value: number) {
  return {
    top: `${value * 4}%`,
  };
}

function containerStyle(value: number) {
  return {
    transform: [{translateY: -45 * value}, {rotateX: `${8.9 * value}deg`}],
  };
}

const Intro: React.FC<IProps> = ({onOpen}) => {
  const {height} = useWindowDimensions();

  const [top, setTop] = useState(0);
  const [timeTop, setTimeTop] = useState(0);

  function firstOpen() {
    const newValue = top + 1;
    setTop(newValue);
  }

  useEffect(() => {
    function timeStart() {
      if (timeTop < 10) {
        setTimeTop(timeTop + 1);
      }
    }
    setTimeout(timeStart, 200);
  }, [timeTop]);

  useEffect(() => {
    function open() {
      if (top < 10) {
        setTop(top + 1);
      } else {
        onOpen();
      }
    }

    if (top > 0) {
      setTimeout(open, 200);
    }
  }, [top, onOpen]);

  return (
    <LinearGradient
      colors={['#146fa0', '#71c5df']}
      style={[style.container, {height: height}, containerStyle(top)]}>
      <TouchableHighlight
        style={[style.timeContainer, timeStyle(timeTop)]}
        onPress={firstOpen}>
        <Text style={style.time}>09:41</Text>
      </TouchableHighlight>
    </LinearGradient>
  );
};

export default Intro;
