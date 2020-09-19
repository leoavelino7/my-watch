import {StyleSheet} from 'react-native';
import {colors} from '../../styles/global';

export const style = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 15,
    paddingLeft: 15,
    zIndex: -1999,
  },
  itemTitle: {
    flex: 1,
  },
  removeButton: {
    padding: 7,

    textAlign: 'center',

    backgroundColor: colors.red,
    color: colors.white,
    borderRadius: 2,
  },
});
