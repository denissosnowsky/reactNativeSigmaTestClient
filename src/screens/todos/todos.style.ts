import { StyleSheet } from 'react-native';

import globalStyles from '~/global/constants.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  body: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  boardAvoidBlock: {
    display: 'flex',
    height: '100%',
  },
  alert: {
    position: 'absolute',
    top: 50,
    zIndex: 2,
  },
  showAlert: {
    display: 'flex',
  },
  hideAlert: {
    display: 'none',
    height: 0,
  },
});

export default styles;
