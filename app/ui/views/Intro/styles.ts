import {StyleSheet} from 'react-native';
import {colors} from '../../styles/global';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    // ...StyleSheet.absoluteFillObject,
    // zIndex: 999999999999999,
  },
  timeContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,

    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  time: {
    // fontFamily: 'Nunito-BlackItalic.ttf',
    fontSize: 50,
    color: colors.white,
  },
});
