import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  infoWrapper: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: globalStyles.BIG_FS,
    marginTop: 10,
    marginBottom: 40,
  },
  buttons: {
    flex: 1,
  },
  button: {
    marginBottom: 20,
  },
});

export default styles;
