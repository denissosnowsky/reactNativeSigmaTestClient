import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: 15,
    marginBottom: 7,
  },
  active: {
    borderColor: globalStyles.LIGHT_MAIN_COLOR,
    borderWidth: 2,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowColor: globalStyles.LIGHT_MAIN_COLOR,
    elevation: 15,
  },
});

export default styles;
