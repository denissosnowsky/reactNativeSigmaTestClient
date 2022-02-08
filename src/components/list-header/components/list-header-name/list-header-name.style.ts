import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  headerText: {
    fontSize: globalStyles.MAIN_FS,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
