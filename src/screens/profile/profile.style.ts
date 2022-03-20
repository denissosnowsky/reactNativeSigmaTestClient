import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  logout: {
    position: 'absolute',
    top: 45,
    left: 25,
    zIndex: 999,
    elevation: 999,
  },
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    height: '100%',
    width: '100%',
    marginBottom: 30,
    zIndex: -1,
  },
  testWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  loading: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.LIGHT_BACKGROUND_COLOR,
  },
});

export default styles;
