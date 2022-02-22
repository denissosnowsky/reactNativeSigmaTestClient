import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  infoWrapper: {
    flex: 3,
    width: '100%',
  },
  text: {
    fontSize: globalStyles.MAIN_FS,
    flex: 4,
  },
  textWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  buttons: {
    flex: 1,
  },
  button: {
    marginBottom: 20,
  },
  icon: {
    justifyContent: 'center',
  },
});

export default styles;
