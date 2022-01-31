import { StyleSheet } from 'react-native';

import globalStyle from '~global/constants.style';

const styles = StyleSheet.create({
  text: {
    fontSize: globalStyle.ALERT_FS,
  },
  wrapper: {
    backgroundColor: globalStyle.LIGHT_SUCCESS_ALERT_BG,
    position: 'absolute',
    top: 70,
    width: 300,
    padding: 10,
    left: '50%',
    transform: [{ translateX: -150 }],
    display: 'flex',
  },
  isShown: {
    display: 'flex',
  },
  isHidden: {
    display: 'none',
  },
});

export default styles;
