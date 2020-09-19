import React from 'react';
import {View, Text} from 'react-native';

import {style} from './styles';

interface IItem {
  id: number;
  title: string;
}

interface IProps {
  item: IItem;
  onPress(item: IItem): void;
}

const ListHeader: React.FC<IProps> = ({item, onPress}) => {
  function press() {
    onPress(item);
  }

  return (
    <View style={style.header}>
      <Text style={style.headerText} onPress={press}>
        {item.title}
      </Text>
    </View>
  );
};

export default ListHeader;
