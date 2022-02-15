import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
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
