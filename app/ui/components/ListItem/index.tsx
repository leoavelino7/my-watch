import React from 'react';
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

  function remove() {
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
  }

  return (
    <Animated.View
      style={[style.itemContainer, {left: left, opacity: opacity}]}>
      <Text style={style.itemTitle}>{item.title}</Text>
      <TouchableHighlight onPress={remove}>
        <Text style={style.removeButton}>X</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default ListItem;
