import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  headerText: {
    fontSize: globalStyles.SM_FS,
    fontWeight: 'bold',
  },
  id: {
    width: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
