import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import {style} from './styles';

interface IItem {
  timeId: number;
  title: string;
}

interface IProps {
  item: IItem;
}

const ListItem: React.FC<IProps> = ({item}) => {
  return (
    <View style={style.itemContainer}>
      <Text style={style.itemTitle}>{item.title}</Text>
      <TouchableHighlight>
        <Text style={style.removeButton}>X</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ListItem;
