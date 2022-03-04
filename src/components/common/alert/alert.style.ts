import { StyleSheet } from 'react-native';

import globalStyle from '~global/constants.style';

const styles = StyleSheet.create({
  text: {
    fontSize: globalStyle.ALERT_FS,
    width: '100%',
    textAlign: 'center',
  },
  wrapper: {
    position: 'absolute',
    top: 70,
    width: 300,
    padding: 10,
    left: '50%',
    transform: [{ translateX: -150 }],
    flexWrap: 'wrap',
    flexShrink: 1,
    borderRadius: 10,
    zIndex: 999,
    elevation: 999,
  },
  isShown: {
    display: 'flex',
  },
  isHidden: {
    display: 'none',
  },
});

export default styles;
