import React, {useCallback, useEffect, useRef} from 'react';
import {Text, TouchableHighlight, Animated, Easing} from 'react-native';

import {style} from './styles';

export interface IItemListItem {
  timeId: number;
  title: string;
}

interface IProps {
  item: IItemListItem;
  onRemove(item: IItemListItem): void;
}

const ListItem: React.FC<IProps> = ({item, onRemove}) => {
  const left = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const progress = new Animated.Value(0);

  const animation = useRef<Animated.CompositeAnimation>();

  const remove = useCallback(() => {
    Animated.parallel([
      Animated.timing(left, {
        toValue: 300,
        duration: 1000,
        easing: Easing.back(1),
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start(() => onRemove(item));
  }, [item, left, opacity, onRemove]);

  function onPress() {
    progress.setValue(0);

    animation.current = Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    });

    animation.current.start();
  }

  function onUnPress() {
    animation.current?.stop();
    progress.setValue(0);
  }

  useEffect(() => {
    progress.addListener(({value}) => {
      if (value === 100) {
        console.log('Action...');
      }
    });
  }, [progress, remove]);

  return (
    <Animated.View
      style={[style.itemContainer, {left: left, opacity: opacity}]}
      onStartShouldSetResponder={() => true}
      onResponderGrant={onPress}
      onResponderRelease={onUnPress}>
      <Text style={style.itemTitle}>{item.title}</Text>
      <TouchableHighlight onPress={remove}>
        <Text style={style.removeButton}>X</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default ListItem;
